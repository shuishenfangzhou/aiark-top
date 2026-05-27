import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const site = "https://www.ai-ark.top";
const source = fs.readFileSync(path.join(root, "app.js"), "utf8");

const categorySlugMap = new Map([
  ["对话助手", "chatbot"],
  ["AI搜索", "ai-search"],
  ["写作办公", "writing"],
  ["图像设计", "image-design"],
  ["视频创作", "video-creation"],
  ["编程开发", "programming"],
  ["自动化智能体", "agent"],
  ["学术研究", "academic-research"],
  ["本地开源", "local-open-source"],
  ["音频语音", "audio-voice"],
]);

const scenarioSlugMap = new Map([
  ["research", "research-discovery"],
  ["paper", "research-paper-reading"],
  ["design", "poster-design"],
  ["video", "short-video-production"],
  ["code", "code-assistant"],
  ["slides", "ai-presentation"],
  ["web-mvp", "web-mvp"],
  ["automation", "agent-workbench"],
  ["local", "local-ai-deployment"],
  ["resume", "resume-optimization"],
  ["ai-coding", "ai-coding"],
  ["ecommerce", "ecommerce-operations"],
]);

const toolSlugOverrides = new Map([
  ["豆包", "doubao"],
  ["通义千问", "tongyi"],
  ["通义灵码", "tongyi-lingma"],
  ["秘塔AI搜索", "metaso"],
  ["稿定设计", "gaoding-design"],
  ["即梦AI", "jimeng-ai"],
  ["可灵AI", "kling"],
  ["扣子 Coze", "coze"],
  ["飞书妙记", "feishu-minutes"],
  ["剪映", "jianying"],
  ["美图设计室", "meitu-design"],
  ["Hugging Face", "hugging-face"],
  ["Microsoft Copilot", "microsoft-copilot"],
  ["Stable Diffusion WebUI", "stable-diffusion-webui"],
  ["Mistral Le Chat", "mistral-le-chat"],
  ["Shopify Magic", "shopify-magic"],
]);

function extractConst(name) {
  const marker = `const ${name} =`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Cannot find ${name} in app.js`);

  let valueStart = start + marker.length;
  while (/\s/.test(source[valueStart])) valueStart += 1;

  const open = source[valueStart];
  const close = open === "[" ? "]" : "}";
  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let i = valueStart; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = "";
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) return `${marker} ${source.slice(valueStart, i + 1)};`;
    }
  }

  throw new Error(`Cannot parse ${name} from app.js`);
}

function loadAppData() {
  const code = [
    extractConst("categories"),
    extractConst("scenarios"),
    extractConst("priceLabel"),
    extractConst("capabilityLabel"),
    extractConst("tools"),
    extractConst("stacks"),
    "JSON.stringify({ categories, scenarios, priceLabel, capabilityLabel, tools, stacks })",
  ].join("\n");

  return JSON.parse(vm.runInNewContext(code, {}, { timeout: 1000 }));
}

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function jsonLd(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function asciiSlug(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hostnameSlug(tool) {
  try {
    const host = new URL(tool.url).hostname.replace(/^www\./, "");
    const [first, second] = host.split(".");
    return asciiSlug(first === "chat" && second ? second : first);
  } catch {
    return asciiSlug(tool.domain);
  }
}

function uniqueSlug(base, used) {
  let slug = base || "item";
  let index = 2;
  while (used.has(slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  used.add(slug);
  return slug;
}

function toolSlug(tool, used) {
  const override = toolSlugOverrides.get(tool.name);
  if (override) return uniqueSlug(override, used);

  const byName = asciiSlug(tool.name);
  const base = byName && byName !== "ai" ? byName : hostnameSlug(tool);
  return uniqueSlug(base, used);
}

function categorySlug(category, used) {
  return uniqueSlug(categorySlugMap.get(category) || asciiSlug(category), used);
}

function scenarioSlug(scenario, used) {
  return uniqueSlug(scenarioSlugMap.get(scenario.value) || asciiSlug(scenario.label), used);
}

function writePage(filePath, html) {
  const target = path.join(root, filePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html, "utf8");
}

function clearGeneratedDirs() {
  for (const dir of ["categories", "tools", "use-cases"]) {
    fs.rmSync(path.join(root, dir), { recursive: true, force: true });
  }
}

function layout({ title, description, pagePath, h1, eyebrow = "AIark SEO Page", body, schema }) {
  const canonical = `${site}${pagePath}`;
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">${jsonLd(schema)}</script>
  </head>
  <body>
    <main class="seo-page">
      <a class="primary-link" href="/">返回 AIark 工具库</a>
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h1>${esc(h1)}</h1>
      <p class="seo-lead">${esc(description)}</p>
      ${body}
    </main>
  </body>
</html>
`;
}

function toolCard(tool, route) {
  return `<article>
    <h3><a class="text-link" href="${route}">${esc(tool.name)}</a></h3>
    <p>${esc(tool.description)}</p>
    <div class="tag-row">
      <span class="tag">${esc(tool.category)}</span>
      <span class="tag">${esc(tool.region)}</span>
      <span class="tag">${esc(tool.score)}分</span>
    </div>
  </article>`;
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site}${item.path}`,
    })),
  };
}

const { categories, scenarios, priceLabel, capabilityLabel, tools, stacks } = loadAppData();
const categoryPathByName = new Map();
const scenarioPathByValue = new Map();
const toolPathByName = new Map();
const toolUsed = new Set();
const categoryUsed = new Set();
const scenarioUsed = new Set();

for (const category of categories.filter((item) => item !== "全部")) {
  categoryPathByName.set(category, `/categories/${categorySlug(category, categoryUsed)}/`);
}

for (const scenario of scenarios) {
  scenarioPathByValue.set(scenario.value, `/use-cases/${scenarioSlug(scenario, scenarioUsed)}/`);
}

for (const tool of tools) {
  toolPathByName.set(tool.name, `/tools/${toolSlug(tool, toolUsed)}/`);
}

clearGeneratedDirs();

const urls = ["/"];

for (const category of categories.filter((item) => item !== "全部")) {
  const pagePath = categoryPathByName.get(category);
  const categoryTools = tools.filter((tool) => tool.category === category).sort((a, b) => b.score - a.score);
  const description = `AIark 收录 ${categoryTools.length} 个${category}工具，覆盖价格、地区、适用任务、核心能力和使用注意事项，帮助中文用户更快找到可靠的 AI 工具。`;
  urls.push(pagePath);

  writePage(
    path.join("categories", pagePath.split("/").filter(Boolean).at(-1), "index.html"),
    layout({
      title: `${category} AI 工具分类 - AIark.top`,
      description,
      pagePath,
      h1: `${category} AI 工具分类`,
      body: `<section class="seo-section">
        <h2>分类工具清单</h2>
        <div class="seo-grid">${categoryTools.map((tool) => toolCard(tool, toolPathByName.get(tool.name))).join("")}</div>
      </section>
      <section class="seo-section">
        <h2>筛选建议</h2>
        <p>选择工具时建议同时比较价格、国内可用性、团队协作、API、本地部署和移动端支持。AIark 首页还可以按任务场景继续筛选，例如写论文、做 PPT、生成视频、AI 编程和电商运营。</p>
      </section>`,
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category} AI 工具分类`,
          description,
          url: `${site}${pagePath}`,
        },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: categoryTools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            url: `${site}${toolPathByName.get(tool.name)}`,
          })),
        },
        breadcrumbSchema([
          { name: "AIark", path: "/" },
          { name: category, path: pagePath },
        ]),
      ],
    }),
  );
}

for (const tool of tools) {
  const pagePath = toolPathByName.get(tool.name);
  const relatedTools = tools
    .filter((item) => item.category === tool.category && item.name !== tool.name)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  const scenarioLinks = tool.scenarios
    .map((value) => scenarios.find((scenario) => scenario.value === value))
    .filter(Boolean);
  const description = `${tool.name} 是 ${tool.category} 类 AI 工具，评分 ${tool.score} 分，适合${tool.bestFor}。AIark 整理了它的核心用途、价格、地区、适用场景和注意事项。`;
  urls.push(pagePath);

  writePage(
    path.join("tools", pagePath.split("/").filter(Boolean).at(-1), "index.html"),
    layout({
      title: `${tool.name} - AI 工具介绍、适合场景与注意事项`,
      description,
      pagePath,
      h1: `${tool.name} 工具详情`,
      body: `<section class="seo-section">
        <h2>工具介绍</h2>
        <p>${esc(tool.description)}</p>
        <h2>适合人群</h2>
        <p>${esc(tool.bestFor)}</p>
        <h2>核心标签</h2>
        <div class="tag-row">
          <span class="tag">${esc(priceLabel[tool.price] || tool.price)}</span>
          <span class="tag">${esc(tool.region)}</span>
          <span class="tag">${esc(tool.category)}</span>
          ${tool.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}
        </div>
        <h2>能力与场景</h2>
        <p>能力：${esc(tool.capabilities.map((item) => capabilityLabel[item] || item).join("、") || "基础 Web 使用")}。</p>
        <p>相关场景：${scenarioLinks
          .map((scenario) => `<a class="text-link" href="${scenarioPathByValue.get(scenario.value)}">${esc(scenario.label)}</a>`)
          .join("、")}。</p>
        <h2>注意事项</h2>
        <p>${esc(tool.watchOut)}</p>
        <p><a class="primary-link" href="${esc(tool.url)}" rel="noreferrer" target="_blank">打开 ${esc(tool.name)} 官网</a></p>
      </section>
      <section class="seo-section">
        <h2>替代工具</h2>
        <div class="seo-grid">${relatedTools.map((item) => toolCard(item, toolPathByName.get(item.name))).join("")}</div>
      </section>`,
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          applicationCategory: "AI Tool",
          description: tool.description,
          url: tool.url,
          operatingSystem: "Web",
        },
        breadcrumbSchema([
          { name: "AIark", path: "/" },
          { name: tool.category, path: categoryPathByName.get(tool.category) || "/" },
          { name: tool.name, path: pagePath },
        ]),
      ],
    }),
  );
}

for (const scenario of scenarios) {
  const pagePath = scenarioPathByValue.get(scenario.value);
  const scenarioTools = tools
    .filter((tool) => tool.scenarios.includes(scenario.value))
    .sort((a, b) => b.score - a.score);
  const stack = stacks.find((item) => item.scenario === scenario.value);
  const description = `${scenario.label} 场景推荐 ${scenarioTools.length} 个 AI 工具，适合从任务目标出发组合工具链，而不是只按工具名称逐个搜索。`;
  urls.push(pagePath);

  writePage(
    path.join("use-cases", pagePath.split("/").filter(Boolean).at(-1), "index.html"),
    layout({
      title: `${scenario.label} AI 工具组合 - AIark.top`,
      description,
      pagePath,
      h1: `${scenario.label} AI 工具组合`,
      body: `<section class="seo-section">
        <h2>推荐工具链</h2>
        <p>${stack ? esc(`${stack.tools.join(" + ")}：${stack.note}`) : "先确定任务目标，再从下方工具中选择 2-4 个组成工作流。"}</p>
      </section>
      <section class="seo-section">
        <h2>适合这个场景的工具</h2>
        <div class="seo-grid">${scenarioTools.map((tool) => toolCard(tool, toolPathByName.get(tool.name))).join("")}</div>
      </section>
      <section class="seo-section">
        <h2>使用建议</h2>
        <p>先用搜索或对话工具拆解任务，再用垂直工具完成生成、编辑、校对或自动化，最后人工复核事实、版权、隐私和商业授权。</p>
      </section>`,
      schema: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${scenario.label} AI 工具组合`,
          description,
          url: `${site}${pagePath}`,
        },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: scenarioTools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            url: `${site}${toolPathByName.get(tool.name)}`,
          })),
        },
        breadcrumbSchema([
          { name: "AIark", path: "/" },
          { name: scenario.label, path: pagePath },
        ]),
      ],
    }),
  );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${site}${url}</loc>
    <priority>${url === "/" ? "1.0" : "0.7"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
console.log(`Generated ${urls.length - 1} SEO pages and sitemap.xml`);
