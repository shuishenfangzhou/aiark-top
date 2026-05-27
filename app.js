const categories = [
  "全部",
  "对话助手",
  "AI搜索",
  "写作办公",
  "图像设计",
  "视频创作",
  "编程开发",
  "自动化智能体",
  "学术研究",
  "本地开源",
  "音频语音",
];

const scenarios = [
  { label: "找资料", value: "research" },
  { label: "写论文", value: "paper" },
  { label: "做海报", value: "design" },
  { label: "做视频", value: "video" },
  { label: "写代码", value: "code" },
  { label: "做PPT", value: "slides" },
  { label: "Web MVP", value: "web-mvp" },
  { label: "自动化", value: "automation" },
  { label: "本地部署", value: "local" },
  { label: "简历优化", value: "resume" },
  { label: "AI编程", value: "ai-coding" },
  { label: "电商运营", value: "ecommerce" },
];

const priceLabel = {
  free: "免费",
  freemium: "免费增值",
  paid: "付费",
};

const capabilityLabel = {
  api: "API",
  team: "团队协作",
  local: "本地开源",
  mobile: "移动端",
};

const categoryMeta = {
  全部: { icon: "全", label: "全部" },
  对话助手: { icon: "聊", label: "对话助手" },
  AI搜索: { icon: "搜", label: "AI搜索" },
  写作办公: { icon: "写", label: "写作办公" },
  图像设计: { icon: "图", label: "图像设计" },
  视频创作: { icon: "视", label: "视频创作" },
  编程开发: { icon: "码", label: "编程开发" },
  自动化智能体: { icon: "自", label: "自动化智能体" },
  学术研究: { icon: "研", label: "学术研究" },
  本地开源: { icon: "本", label: "本地开源" },
  音频语音: { icon: "音", label: "音频语音" },
};

const themeModes = ["light", "dark", "system"];
const sidebarModes = ["full", "compact", "hidden"];
const cardViewModes = ["standard", "compact"];
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const tools = [
  {
    name: "ChatGPT",
    domain: "chatgpt.com",
    url: "https://chatgpt.com",
    category: "对话助手",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile", "team"],
    score: 98,
    tags: ["通用", "多模态", "创作"],
    scenarios: ["research", "paper", "code", "slides"],
    description: "通用型 AI 助手，适合头脑风暴、写作、代码解释、图片理解和日常知识任务。",
    bestFor: "复杂问题拆解、长文改写、方案生成。",
    watchOut: "重要事实仍需交叉验证。",
  },
  {
    name: "Claude",
    domain: "claude.ai",
    url: "https://claude.ai",
    category: "对话助手",
    price: "freemium",
    region: "海外",
    capabilities: ["team", "api"],
    score: 96,
    tags: ["长文", "分析", "写作"],
    scenarios: ["research", "paper", "code"],
    description: "擅长长文阅读、推理、写作润色和代码协作，适合需要稳定上下文的工作。",
    bestFor: "阅读资料、重构文档、审校文字。",
    watchOut: "国内访问和付费方式可能受环境影响。",
  },
  {
    name: "Gemini",
    domain: "gemini.google.com",
    url: "https://gemini.google.com",
    category: "对话助手",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile", "team"],
    score: 94,
    tags: ["Google", "多模态", "办公"],
    scenarios: ["research", "slides"],
    description: "与 Google 生态结合紧密，适合搜索、文档、表格和多模态资料处理。",
    bestFor: "Google Workspace 用户的资料整理。",
    watchOut: "部分功能依赖账号地区和产品权限。",
  },
  {
    name: "DeepSeek",
    domain: "chat.deepseek.com",
    url: "https://chat.deepseek.com",
    category: "对话助手",
    price: "free",
    region: "国内",
    capabilities: ["api", "mobile"],
    score: 95,
    tags: ["推理", "中文", "编程"],
    scenarios: ["research", "code", "paper"],
    description: "中文友好、推理和代码场景表现突出，适合学习、问答和开发辅助。",
    bestFor: "低成本高频问答、代码思路。",
    watchOut: "高峰期可用性可能波动。",
  },
  {
    name: "豆包",
    domain: "doubao.com",
    url: "https://www.doubao.com",
    category: "对话助手",
    price: "free",
    region: "国内",
    capabilities: ["mobile"],
    score: 91,
    tags: ["中文", "办公", "语音"],
    scenarios: ["research", "slides", "paper"],
    description: "面向大众的中文 AI 助手，适合日常问答、写作、翻译和轻办公。",
    bestFor: "移动端使用、中文内容整理。",
    watchOut: "专业领域内容需补充来源。",
  },
  {
    name: "通义千问",
    domain: "tongyi.aliyun.com",
    url: "https://tongyi.aliyun.com",
    category: "对话助手",
    price: "free",
    region: "国内",
    capabilities: ["api", "mobile"],
    score: 90,
    tags: ["阿里", "中文", "办公"],
    scenarios: ["research", "slides", "code"],
    description: "中文对话和办公场景覆盖完整，适合企业和个人的通用智能助手。",
    bestFor: "中文办公、模型 API 入门。",
    watchOut: "不同入口的能力和套餐有差异。",
  },
  {
    name: "Kimi",
    domain: "kimi.moonshot.cn",
    url: "https://kimi.moonshot.cn",
    category: "对话助手",
    price: "freemium",
    region: "国内",
    capabilities: ["mobile"],
    score: 90,
    tags: ["长文", "文件", "中文"],
    scenarios: ["research", "paper"],
    description: "适合上传文档、读材料、总结长文本和中文资料问答。",
    bestFor: "PDF、合同、报告的快速阅读。",
    watchOut: "引用和细节仍要回看原文。",
  },
  {
    name: "Perplexity",
    domain: "perplexity.ai",
    url: "https://www.perplexity.ai",
    category: "AI搜索",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile", "api"],
    score: 97,
    tags: ["搜索", "引用", "研究"],
    scenarios: ["research", "paper"],
    description: "AI 搜索与答案引用结合，适合快速了解一个新主题并追踪来源。",
    bestFor: "英文资料、竞品调研、快速事实查找。",
    watchOut: "摘要不是原文，关键结论要打开来源核对。",
  },
  {
    name: "秘塔AI搜索",
    domain: "metaso.cn",
    url: "https://metaso.cn",
    category: "AI搜索",
    price: "free",
    region: "国内",
    capabilities: ["mobile"],
    score: 93,
    tags: ["中文搜索", "无广告", "研究"],
    scenarios: ["research", "paper"],
    description: "中文 AI 搜索入口，适合资料检索、结构化摘要和学术版搜索。",
    bestFor: "中文资料搜集、论文初筛。",
    watchOut: "学术引用要以原始论文和数据库为准。",
  },
  {
    name: "Felo",
    domain: "felo.ai",
    url: "https://felo.ai",
    category: "AI搜索",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile"],
    score: 86,
    tags: ["多语言", "搜索", "总结"],
    scenarios: ["research"],
    description: "支持跨语言搜索和总结，适合快速扫外文信息。",
    bestFor: "多语言资料发现。",
    watchOut: "小语种内容质量与来源质量相关。",
  },
  {
    name: "NotebookLM",
    domain: "notebooklm.google.com",
    url: "https://notebooklm.google.com",
    category: "学术研究",
    price: "free",
    region: "海外",
    capabilities: ["team"],
    score: 92,
    tags: ["资料库", "笔记", "引用"],
    scenarios: ["research", "paper"],
    description: "围绕用户上传资料建立问答和摘要，适合课程、论文和项目资料整理。",
    bestFor: "对自己的资料集提问。",
    watchOut: "资料管理边界要清楚，敏感文档谨慎上传。",
  },
  {
    name: "Semantic Scholar",
    domain: "semanticscholar.org",
    url: "https://www.semanticscholar.org",
    category: "学术研究",
    price: "free",
    region: "海外",
    capabilities: ["api"],
    score: 88,
    tags: ["论文", "引用", "学术"],
    scenarios: ["research", "paper"],
    description: "学术搜索和论文引用网络工具，适合发现相关论文和研究脉络。",
    bestFor: "论文检索、引用追踪。",
    watchOut: "全文获取仍取决于出版源。",
  },
  {
    name: "SciSpace",
    domain: "typeset.io",
    url: "https://typeset.io",
    category: "学术研究",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 87,
    tags: ["论文阅读", "解释", "学术"],
    scenarios: ["paper", "research"],
    description: "帮助解释论文段落、公式和图表，适合快速读懂陌生领域论文。",
    bestFor: "论文精读辅助。",
    watchOut: "解释可辅助理解，但不能替代原文判断。",
  },
  {
    name: "Elicit",
    domain: "elicit.com",
    url: "https://elicit.com",
    category: "学术研究",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 85,
    tags: ["文献综述", "研究", "证据"],
    scenarios: ["paper", "research"],
    description: "面向研究问题的文献发现和证据表格工具，适合综述前期整理。",
    bestFor: "快速建立论文证据矩阵。",
    watchOut: "检索范围和摘要准确性要复核。",
  },
  {
    name: "Notion AI",
    domain: "notion.so",
    url: "https://www.notion.so/product/ai",
    category: "写作办公",
    price: "paid",
    region: "海外",
    capabilities: ["team", "mobile"],
    score: 86,
    tags: ["笔记", "团队", "知识库"],
    scenarios: ["slides", "paper", "research"],
    description: "嵌入 Notion 工作区的写作、总结和问答能力，适合已有知识库的团队。",
    bestFor: "会议纪要、项目文档、知识库问答。",
    watchOut: "价值取决于团队是否重度使用 Notion。",
  },
  {
    name: "Gamma",
    domain: "gamma.app",
    url: "https://gamma.app",
    category: "写作办公",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 89,
    tags: ["PPT", "网页", "文档"],
    scenarios: ["slides"],
    description: "从主题或大纲生成演示文稿、文档和页面，适合快速出初稿。",
    bestFor: "路演、课程、方案汇报初稿。",
    watchOut: "最终视觉和事实内容仍需人工校对。",
  },
  {
    name: "AiPPT",
    domain: "aippt.cn",
    url: "https://www.aippt.cn",
    category: "写作办公",
    price: "freemium",
    region: "国内",
    capabilities: ["team"],
    score: 86,
    tags: ["PPT", "中文", "模板"],
    scenarios: ["slides"],
    description: "中文 PPT 生成工具，适合用主题快速生成演示初稿。",
    bestFor: "中文汇报、课程、营销方案。",
    watchOut: "模板审美和行业内容需要二次打磨。",
  },
  {
    name: "Canva",
    domain: "canva.com",
    url: "https://www.canva.com",
    category: "图像设计",
    price: "freemium",
    region: "海外",
    capabilities: ["team", "mobile"],
    score: 91,
    tags: ["设计", "海报", "模板"],
    scenarios: ["design", "slides", "video"],
    description: "集成大量模板和 AI 设计能力，适合非设计师制作海报、社媒图和演示。",
    bestFor: "品牌物料、社媒内容、快速排版。",
    watchOut: "高级素材和团队功能多为付费。",
  },
  {
    name: "稿定设计",
    domain: "gaoding.com",
    url: "https://www.gaoding.com",
    category: "图像设计",
    price: "freemium",
    region: "国内",
    capabilities: ["team"],
    score: 84,
    tags: ["电商", "海报", "中文"],
    scenarios: ["design"],
    description: "中文设计平台，适合电商主图、海报、短视频封面和营销图制作。",
    bestFor: "电商运营和中文营销素材。",
    watchOut: "高级模板、去水印和商用权益要看套餐。",
  },
  {
    name: "Midjourney",
    domain: "midjourney.com",
    url: "https://www.midjourney.com",
    category: "图像设计",
    price: "paid",
    region: "海外",
    capabilities: ["team"],
    score: 93,
    tags: ["绘画", "风格", "视觉"],
    scenarios: ["design"],
    description: "高质量图像生成工具，适合概念设计、风格探索和视觉创意。",
    bestFor: "视觉风格稿、概念图、海报灵感。",
    watchOut: "商业授权和素材合规需按套餐确认。",
  },
  {
    name: "即梦AI",
    domain: "jimeng.jianying.com",
    url: "https://jimeng.jianying.com",
    category: "图像设计",
    price: "freemium",
    region: "国内",
    capabilities: ["mobile"],
    score: 88,
    tags: ["图片", "视频", "中文"],
    scenarios: ["design", "video"],
    description: "面向中文创作者的图像与视频生成入口，适合短视频素材制作。",
    bestFor: "短视频封面、图转视频、视觉创意。",
    watchOut: "生成效果受提示词和素材质量影响。",
  },
  {
    name: "Runway",
    domain: "runwayml.com",
    url: "https://runwayml.com",
    category: "视频创作",
    price: "freemium",
    region: "海外",
    capabilities: ["team", "api"],
    score: 92,
    tags: ["视频", "剪辑", "生成"],
    scenarios: ["video"],
    description: "AI 视频生成和编辑平台，适合广告、概念片和社媒视频制作。",
    bestFor: "视频概念验证、镜头生成、视觉特效。",
    watchOut: "高质量输出通常消耗额度较快。",
  },
  {
    name: "可灵AI",
    domain: "klingai.kuaishou.com",
    url: "https://klingai.kuaishou.com",
    category: "视频创作",
    price: "freemium",
    region: "国内",
    capabilities: ["mobile"],
    score: 90,
    tags: ["文生视频", "图生视频", "中文"],
    scenarios: ["video"],
    description: "国内视频生成平台，适合中文创作者做文生视频和图生视频。",
    bestFor: "短视频镜头、动态海报、产品展示。",
    watchOut: "排队、额度和清晰度随套餐变化。",
  },
  {
    name: "Vidu",
    domain: "vidu.cn",
    url: "https://www.vidu.cn",
    category: "视频创作",
    price: "freemium",
    region: "国内",
    capabilities: ["mobile"],
    score: 86,
    tags: ["视频生成", "中文", "创意"],
    scenarios: ["video"],
    description: "中文视频生成工具，适合短视频创意、镜头草稿和图像动态化。",
    bestFor: "内容创作者的视频素材补充。",
    watchOut: "复杂叙事仍需要剪辑和分镜控制。",
  },
  {
    name: "HeyGen",
    domain: "heygen.com",
    url: "https://www.heygen.com",
    category: "视频创作",
    price: "paid",
    region: "海外",
    capabilities: ["team", "api"],
    score: 88,
    tags: ["数字人", "口播", "翻译"],
    scenarios: ["video"],
    description: "数字人口播和视频翻译工具，适合课程、营销和多语言内容。",
    bestFor: "企业介绍、培训视频、多语言口播。",
    watchOut: "肖像授权和合成内容标注要谨慎。",
  },
  {
    name: "ElevenLabs",
    domain: "elevenlabs.io",
    url: "https://elevenlabs.io",
    category: "音频语音",
    price: "freemium",
    region: "海外",
    capabilities: ["api"],
    score: 89,
    tags: ["配音", "TTS", "克隆"],
    scenarios: ["video"],
    description: "语音合成和配音平台，适合短视频、播客和多语言旁白。",
    bestFor: "自然旁白、角色配音、多语言声音。",
    watchOut: "声音克隆需获得明确授权。",
  },
  {
    name: "Suno",
    domain: "suno.com",
    url: "https://suno.com",
    category: "音频语音",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile"],
    score: 87,
    tags: ["音乐", "歌曲", "创作"],
    scenarios: ["video"],
    description: "通过提示词生成歌曲和音乐片段，适合短视频配乐和创意 demo。",
    bestFor: "快速生成背景音乐和歌曲草稿。",
    watchOut: "商用版权和平台条款要逐项确认。",
  },
  {
    name: "Cursor",
    domain: "cursor.com",
    url: "https://www.cursor.com",
    category: "编程开发",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 95,
    tags: ["IDE", "Agent", "代码"],
    scenarios: ["code", "web-mvp"],
    description: "AI 优先代码编辑器，适合在真实代码库里改代码、问项目、重构和调试。",
    bestFor: "日常开发、跨文件修改、代码理解。",
    watchOut: "大型改动仍要跑测试和代码审查。",
  },
  {
    name: "GitHub Copilot",
    domain: "github.com",
    url: "https://github.com/features/copilot",
    category: "编程开发",
    price: "paid",
    region: "海外",
    capabilities: ["team"],
    score: 90,
    tags: ["补全", "代码", "GitHub"],
    scenarios: ["code", "web-mvp"],
    description: "深度集成开发工具和 GitHub 工作流，适合代码补全、解释和日常开发辅助。",
    bestFor: "已有 GitHub 工作流的团队。",
    watchOut: "生成代码需要安全和许可证审查。",
  },
  {
    name: "Claude Code",
    domain: "anthropic.com",
    url: "https://www.anthropic.com/claude-code",
    category: "编程开发",
    price: "paid",
    region: "海外",
    capabilities: ["team"],
    score: 91,
    tags: ["CLI", "Agent", "代码库"],
    scenarios: ["code"],
    description: "面向代码库协作的命令行代理，适合分析、修改和验证工程任务。",
    bestFor: "命令行开发、复杂代码库变更。",
    watchOut: "要设置权限边界并审查文件改动。",
  },
  {
    name: "通义灵码",
    domain: "tongyi.aliyun.com",
    url: "https://tongyi.aliyun.com/lingma",
    category: "编程开发",
    price: "freemium",
    region: "国内",
    capabilities: ["team"],
    score: 86,
    tags: ["IDE插件", "中文", "代码"],
    scenarios: ["code"],
    description: "中文开发者友好的编程辅助工具，支持主流 IDE 场景。",
    bestFor: "中文代码问答、补全、解释。",
    watchOut: "企业代码使用要检查隐私和权限配置。",
  },
  {
    name: "Lovable",
    domain: "lovable.dev",
    url: "https://lovable.dev",
    category: "编程开发",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 88,
    tags: ["建站", "应用", "原型"],
    scenarios: ["code", "web-mvp"],
    description: "用自然语言生成全栈 Web 应用原型，适合快速验证产品想法。",
    bestFor: "MVP、后台页面、产品原型。",
    watchOut: "上线前需要工程化、安全和数据校验。",
  },
  {
    name: "Bolt.new",
    domain: "bolt.new",
    url: "https://bolt.new",
    category: "编程开发",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 86,
    tags: ["Web应用", "原型", "开发"],
    scenarios: ["code", "web-mvp"],
    description: "浏览器内构建和运行 Web 项目，适合从一句话生成可交互应用。",
    bestFor: "前端原型、演示 demo、快速试错。",
    watchOut: "复杂项目需要迁移到标准工程流程。",
  },
  {
    name: "v0",
    domain: "v0.dev",
    url: "https://v0.dev",
    category: "编程开发",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 86,
    tags: ["UI生成", "React", "Vercel"],
    scenarios: ["code", "design", "web-mvp"],
    description: "根据提示词生成前端界面，适合 React 和产品 UI 草稿。",
    bestFor: "仪表盘、落地页、组件原型。",
    watchOut: "视觉一致性和可维护性需人工整理。",
  },
  {
    name: "OpenClaw",
    domain: "openclaw.ai",
    url: "https://docs.openclaw.ai",
    category: "自动化智能体",
    price: "free",
    region: "海外",
    capabilities: ["local", "api", "team"],
    score: 90,
    tags: ["Gateway", "Agent", "多渠道"],
    scenarios: ["automation", "code", "local"],
    description: "面向多渠道消息、控制台和本地 agent 的 AI gateway，适合把模型、聊天入口和自动化任务接到一起。",
    bestFor: "本地控制台、消息机器人、跨工具 agent 编排。",
    watchOut: "上线或局域网开放前要保留 token，并检查端口和权限范围。",
  },
  {
    name: "Hermes Agent",
    domain: "github.com",
    url: "https://github.com/NousResearch/hermes-agent",
    category: "自动化智能体",
    price: "free",
    region: "海外",
    capabilities: ["local", "api"],
    score: 88,
    tags: ["开源", "技能库", "工具调用"],
    scenarios: ["automation", "code", "local"],
    description: "Nous Research 开源 agent，内置技能、记忆、工具调用和多模型配置，适合搭建个人自动化工作台。",
    bestFor: "本地 agent 实验、技能驱动工作流、多工具协作。",
    watchOut: "需要配置可用模型 API key，浏览器、搜索和消息平台工具也要单独授权。",
  },
  {
    name: "扣子 Coze",
    domain: "coze.cn",
    url: "https://www.coze.cn",
    category: "自动化智能体",
    price: "freemium",
    region: "国内",
    capabilities: ["team", "api"],
    score: 89,
    tags: ["Bot", "Agent", "中文"],
    scenarios: ["automation"],
    description: "低代码智能体和机器人平台，适合搭建问答、客服和流程助手。",
    bestFor: "企业助手、知识库问答、微信生态探索。",
    watchOut: "复杂流程要设计状态、权限和兜底逻辑。",
  },
  {
    name: "Dify",
    domain: "dify.ai",
    url: "https://dify.ai",
    category: "自动化智能体",
    price: "freemium",
    region: "海外",
    capabilities: ["api", "local", "team"],
    score: 91,
    tags: ["开源", "工作流", "RAG"],
    scenarios: ["automation", "local"],
    description: "开源 AI 应用开发平台，适合构建聊天助手、RAG 和工作流应用。",
    bestFor: "企业知识库、AI 应用后端、低代码工作流。",
    watchOut: "自托管需要模型、向量库和权限运维能力。",
  },
  {
    name: "n8n",
    domain: "n8n.io",
    url: "https://n8n.io",
    category: "自动化智能体",
    price: "freemium",
    region: "海外",
    capabilities: ["api", "local", "team"],
    score: 88,
    tags: ["自动化", "集成", "开源"],
    scenarios: ["automation", "local"],
    description: "自动化工作流平台，可连接大量 SaaS 和 AI 节点，适合搭建业务流程。",
    bestFor: "数据同步、内容发布、AI 自动化流水线。",
    watchOut: "流程越长越需要错误重试和日志监控。",
  },
  {
    name: "Make",
    domain: "make.com",
    url: "https://www.make.com",
    category: "自动化智能体",
    price: "freemium",
    region: "海外",
    capabilities: ["team", "api"],
    score: 85,
    tags: ["自动化", "集成", "无代码"],
    scenarios: ["automation"],
    description: "可视化自动化平台，适合把表单、表格、邮件、AI 和应用连接起来。",
    bestFor: "运营自动化、跨工具数据流。",
    watchOut: "高频任务要关注操作次数成本。",
  },
  {
    name: "Zapier",
    domain: "zapier.com",
    url: "https://zapier.com",
    category: "自动化智能体",
    price: "freemium",
    region: "海外",
    capabilities: ["team", "api"],
    score: 84,
    tags: ["自动化", "应用集成", "Agent"],
    scenarios: ["automation"],
    description: "覆盖大量应用连接器的自动化平台，适合非技术用户串联工具。",
    bestFor: "SaaS 自动化、销售和运营流程。",
    watchOut: "复杂逻辑和高频任务成本需提前估算。",
  },
  {
    name: "Ollama",
    domain: "ollama.com",
    url: "https://ollama.com",
    category: "本地开源",
    price: "free",
    region: "海外",
    capabilities: ["local", "api"],
    score: 91,
    tags: ["本地模型", "开源", "开发"],
    scenarios: ["local", "code"],
    description: "本地运行大模型的常用入口，适合开发者在电脑或服务器上管理模型。",
    bestFor: "隐私敏感任务、离线实验、模型 API 原型。",
    watchOut: "效果取决于硬件、模型和量化版本。",
  },
  {
    name: "LM Studio",
    domain: "lmstudio.ai",
    url: "https://lmstudio.ai",
    category: "本地开源",
    price: "free",
    region: "海外",
    capabilities: ["local", "api"],
    score: 88,
    tags: ["桌面端", "本地模型", "聊天"],
    scenarios: ["local"],
    description: "桌面端本地模型管理和聊天工具，适合低门槛体验开源模型。",
    bestFor: "本地聊天、模型对比、隐私实验。",
    watchOut: "大模型需要足够内存和显存。",
  },
  {
    name: "ComfyUI",
    domain: "github.com",
    url: "https://github.com/comfyanonymous/ComfyUI",
    category: "本地开源",
    price: "free",
    region: "海外",
    capabilities: ["local"],
    score: 90,
    tags: ["图片生成", "节点", "开源"],
    scenarios: ["local", "design"],
    description: "节点式图像生成工作流工具，适合 Stable Diffusion 和 Flux 等模型玩法。",
    bestFor: "可控图像生成、批量工作流、模型实验。",
    watchOut: "学习曲线较陡，插件依赖要管理。",
  },
  {
    name: "Hugging Face",
    domain: "huggingface.co",
    url: "https://huggingface.co",
    category: "本地开源",
    price: "freemium",
    region: "海外",
    capabilities: ["api", "team", "local"],
    score: 92,
    tags: ["模型社区", "数据集", "开源"],
    scenarios: ["local", "code", "research"],
    description: "AI 模型、数据集和应用社区，适合寻找开源模型与技术 demo。",
    bestFor: "模型选型、开源项目发现、技术实验。",
    watchOut: "模型许可证、数据来源和安全风险要检查。",
  },
  {
    name: "Poe",
    domain: "poe.com",
    url: "https://poe.com",
    category: "对话助手",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile"],
    score: 88,
    tags: ["多模型", "Bot", "移动端"],
    scenarios: ["research", "paper", "code"],
    description: "集合多种模型和机器人入口，适合在一个界面中比较不同模型回答。",
    bestFor: "模型对比、轻量问答、移动端快速使用。",
    watchOut: "不同模型能力和额度随套餐变化。",
  },
  {
    name: "Microsoft Copilot",
    domain: "copilot.microsoft.com",
    url: "https://copilot.microsoft.com",
    category: "对话助手",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile", "team"],
    score: 89,
    tags: ["微软", "搜索", "办公"],
    scenarios: ["research", "slides", "resume"],
    description: "微软生态里的 AI 助手，适合搜索、总结、办公草稿和浏览器内任务。",
    bestFor: "Edge、Windows、Microsoft 365 用户。",
    watchOut: "企业级能力通常依赖组织账号和授权。",
  },
  {
    name: "You.com",
    domain: "you.com",
    url: "https://you.com",
    category: "AI搜索",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile", "api"],
    score: 85,
    tags: ["搜索", "研究", "多模型"],
    scenarios: ["research", "paper"],
    description: "AI 搜索和多模型问答入口，适合快速查资料并获得带来源的摘要。",
    bestFor: "英文资料搜索、竞品调研、主题初筛。",
    watchOut: "结论仍需打开来源核对。",
  },
  {
    name: "Consensus",
    domain: "consensus.app",
    url: "https://consensus.app",
    category: "学术研究",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 87,
    tags: ["论文", "证据", "学术搜索"],
    scenarios: ["research", "paper"],
    description: "面向研究问题的学术搜索工具，适合寻找论文证据和快速判断研究共识。",
    bestFor: "文献综述、证据搜集、论文选题。",
    watchOut: "学术结论要回到原文和研究方法复核。",
  },
  {
    name: "Phind",
    domain: "phind.com",
    url: "https://www.phind.com",
    category: "AI搜索",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile"],
    score: 86,
    tags: ["开发搜索", "代码", "引用"],
    scenarios: ["code", "ai-coding", "research"],
    description: "面向开发者的 AI 搜索和问答工具，适合查技术问题、库用法和报错原因。",
    bestFor: "编程资料检索、技术方案比较。",
    watchOut: "代码片段要结合项目版本和测试验证。",
  },
  {
    name: "Grammarly",
    domain: "grammarly.com",
    url: "https://www.grammarly.com",
    category: "写作办公",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 86,
    tags: ["英文写作", "校对", "浏览器插件"],
    scenarios: ["paper", "resume"],
    description: "英文写作和语法校对工具，适合邮件、简历、论文初稿和商务文本润色。",
    bestFor: "英文表达纠错、语气调整、简历润色。",
    watchOut: "学术写作仍需保留作者自己的判断和引用规范。",
  },
  {
    name: "QuillBot",
    domain: "quillbot.com",
    url: "https://quillbot.com",
    category: "写作办公",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile"],
    score: 84,
    tags: ["改写", "摘要", "英文"],
    scenarios: ["paper", "resume"],
    description: "英文改写、摘要和语法辅助工具，适合把草稿整理成更清晰的表达。",
    bestFor: "英文段落改写、摘要、简历措辞。",
    watchOut: "论文场景要避免过度改写造成含义偏移。",
  },
  {
    name: "Jasper",
    domain: "jasper.ai",
    url: "https://www.jasper.ai",
    category: "写作办公",
    price: "paid",
    region: "海外",
    capabilities: ["team"],
    score: 82,
    tags: ["营销文案", "品牌", "团队"],
    scenarios: ["ecommerce", "resume"],
    description: "面向营销团队的 AI 写作平台，适合品牌文案、广告草稿和内容日历。",
    bestFor: "营销团队、品牌内容、广告创意。",
    watchOut: "中文场景和行业事实需要人工校对。",
  },
  {
    name: "WPS AI",
    domain: "wps.cn",
    url: "https://ai.wps.cn",
    category: "写作办公",
    price: "freemium",
    region: "国内",
    capabilities: ["team", "mobile"],
    score: 85,
    tags: ["办公", "文档", "中文"],
    scenarios: ["slides", "paper", "resume"],
    description: "嵌入 WPS 办公场景的 AI 助手，适合中文文档、表格和演示稿辅助。",
    bestFor: "中文办公、PPT 初稿、文档总结。",
    watchOut: "高级能力和模板权益要看会员规则。",
  },
  {
    name: "飞书妙记",
    domain: "feishu.cn",
    url: "https://www.feishu.cn/product/minutes",
    category: "写作办公",
    price: "freemium",
    region: "国内",
    capabilities: ["team"],
    score: 84,
    tags: ["会议纪要", "转写", "团队"],
    scenarios: ["research", "slides"],
    description: "会议录音转写和纪要整理工具，适合团队会议、访谈和课程资料沉淀。",
    bestFor: "会议纪要、访谈转写、知识沉淀。",
    watchOut: "敏感会议音频要关注企业权限和数据边界。",
  },
  {
    name: "Adobe Firefly",
    domain: "adobe.com",
    url: "https://www.adobe.com/products/firefly.html",
    category: "图像设计",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 88,
    tags: ["Adobe", "图片生成", "设计"],
    scenarios: ["design", "ecommerce"],
    description: "Adobe 的生成式创意工具，适合图片生成、视觉元素扩展和设计软件联动。",
    bestFor: "品牌视觉、海报元素、创意素材。",
    watchOut: "商用授权和生成额度需要按 Adobe 账号确认。",
  },
  {
    name: "Leonardo AI",
    domain: "leonardo.ai",
    url: "https://leonardo.ai",
    category: "图像设计",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 86,
    tags: ["图片生成", "资产", "游戏美术"],
    scenarios: ["design", "ecommerce"],
    description: "图像和视觉资产生成平台，适合产品图、概念图和游戏美术风格探索。",
    bestFor: "视觉资产、风格稿、产品创意图。",
    watchOut: "模型风格和商用条款要按项目确认。",
  },
  {
    name: "Ideogram",
    domain: "ideogram.ai",
    url: "https://ideogram.ai",
    category: "图像设计",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile"],
    score: 87,
    tags: ["海报", "文字生成", "视觉"],
    scenarios: ["design", "ecommerce"],
    description: "擅长带文字的视觉生成，适合海报、标题图和品牌视觉实验。",
    bestFor: "海报标题、社媒图、广告概念。",
    watchOut: "中文文字和品牌字体仍需人工检查。",
  },
  {
    name: "Krea AI",
    domain: "krea.ai",
    url: "https://www.krea.ai",
    category: "图像设计",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 85,
    tags: ["实时生成", "图片增强", "创意"],
    scenarios: ["design", "ecommerce"],
    description: "面向视觉探索和实时生成的创作工具，适合快速迭代图像方向。",
    bestFor: "视觉草稿、图片增强、风格探索。",
    watchOut: "最终交付素材要做清晰度和版权检查。",
  },
  {
    name: "Pika",
    domain: "pika.art",
    url: "https://pika.art",
    category: "视频创作",
    price: "freemium",
    region: "海外",
    capabilities: ["mobile"],
    score: 86,
    tags: ["文生视频", "图生视频", "短视频"],
    scenarios: ["video"],
    description: "AI 视频生成工具，适合用文字或图片快速生成短视频镜头。",
    bestFor: "概念镜头、短视频素材、动态广告草稿。",
    watchOut: "复杂叙事和稳定角色仍需要后期控制。",
  },
  {
    name: "Luma AI",
    domain: "lumalabs.ai",
    url: "https://lumalabs.ai",
    category: "视频创作",
    price: "freemium",
    region: "海外",
    capabilities: ["api"],
    score: 88,
    tags: ["视频生成", "3D", "Dream Machine"],
    scenarios: ["video", "design"],
    description: "视频与 3D 生成平台，适合高质感镜头、产品展示和视觉实验。",
    bestFor: "镜头生成、产品短片、动态视觉。",
    watchOut: "生成时长、清晰度和排队速度随套餐变化。",
  },
  {
    name: "剪映",
    domain: "capcut.cn",
    url: "https://www.capcut.cn",
    category: "视频创作",
    price: "freemium",
    region: "国内",
    capabilities: ["mobile", "team"],
    score: 89,
    tags: ["剪辑", "字幕", "模板"],
    scenarios: ["video", "ecommerce"],
    description: "大众短视频剪辑工具，内置字幕、模板和 AI 辅助能力，适合快速出片。",
    bestFor: "短视频剪辑、字幕、商品视频。",
    watchOut: "模板素材商用和平台水印要看具体权益。",
  },
  {
    name: "Descript",
    domain: "descript.com",
    url: "https://www.descript.com",
    category: "视频创作",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 84,
    tags: ["转写", "视频剪辑", "播客"],
    scenarios: ["video", "resume"],
    description: "基于文本编辑音视频的工具，适合播客、访谈、课程和口播剪辑。",
    bestFor: "采访剪辑、字幕、口播内容。",
    watchOut: "中文转写和声音功能要按素材测试。",
  },
  {
    name: "Murf",
    domain: "murf.ai",
    url: "https://murf.ai",
    category: "音频语音",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 83,
    tags: ["配音", "TTS", "旁白"],
    scenarios: ["video", "ecommerce"],
    description: "AI 配音和旁白工具，适合课程、产品介绍、营销视频和演示讲解。",
    bestFor: "英文旁白、课程配音、产品视频。",
    watchOut: "声音授权和中文效果需要单独确认。",
  },
  {
    name: "PlayHT",
    domain: "play.ht",
    url: "https://play.ht",
    category: "音频语音",
    price: "freemium",
    region: "海外",
    capabilities: ["api"],
    score: 84,
    tags: ["TTS", "API", "克隆"],
    scenarios: ["video", "automation"],
    description: "语音生成和 TTS API 平台，适合把配音能力接入产品或内容流水线。",
    bestFor: "语音 API、旁白自动化、多角色音频。",
    watchOut: "声音克隆需要明确授权。",
  },
  {
    name: "Windsurf",
    domain: "windsurf.com",
    url: "https://windsurf.com",
    category: "编程开发",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 88,
    tags: ["IDE", "Agent", "代码"],
    scenarios: ["code", "ai-coding", "web-mvp"],
    description: "AI 编程 IDE，适合在项目内理解上下文、生成修改和辅助调试。",
    bestFor: "前端项目、全栈原型、跨文件开发。",
    watchOut: "重要改动仍需代码审查和测试。",
  },
  {
    name: "Replit",
    domain: "replit.com",
    url: "https://replit.com",
    category: "编程开发",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 86,
    tags: ["在线 IDE", "Agent", "部署"],
    scenarios: ["code", "ai-coding", "web-mvp"],
    description: "浏览器内编码、运行和部署项目的平台，适合学习、原型和轻量应用。",
    bestFor: "在线开发、教学、快速 demo。",
    watchOut: "生产级项目要关注资源、权限和部署边界。",
  },
  {
    name: "Trae",
    domain: "trae.ai",
    url: "https://www.trae.ai",
    category: "编程开发",
    price: "free",
    region: "国内",
    capabilities: ["team"],
    score: 85,
    tags: ["IDE", "中文", "代码助手"],
    scenarios: ["code", "ai-coding"],
    description: "中文开发者友好的 AI IDE，适合代码理解、生成、重构和项目问答。",
    bestFor: "中文开发场景、前端原型、代码解释。",
    watchOut: "企业代码使用前要确认隐私和数据设置。",
  },
  {
    name: "Qodo",
    domain: "qodo.ai",
    url: "https://www.qodo.ai",
    category: "编程开发",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 84,
    tags: ["测试", "代码质量", "PR"],
    scenarios: ["code", "ai-coding"],
    description: "面向代码质量、测试生成和 PR 审查的 AI 工具，适合工程团队提效。",
    bestFor: "测试补齐、代码审查、质量门禁。",
    watchOut: "生成测试仍需覆盖真实业务边界。",
  },
  {
    name: "Flowise",
    domain: "flowiseai.com",
    url: "https://flowiseai.com",
    category: "自动化智能体",
    price: "free",
    region: "海外",
    capabilities: ["local", "api"],
    score: 85,
    tags: ["开源", "工作流", "RAG"],
    scenarios: ["automation", "local"],
    description: "开源低代码 AI 工作流构建工具，适合搭建聊天助手、RAG 和工具调用流程。",
    bestFor: "RAG 原型、内部助手、低代码编排。",
    watchOut: "自托管需要处理鉴权、日志和模型成本。",
  },
  {
    name: "LangChain",
    domain: "langchain.com",
    url: "https://www.langchain.com",
    category: "自动化智能体",
    price: "freemium",
    region: "海外",
    capabilities: ["api", "team", "local"],
    score: 88,
    tags: ["开发框架", "Agent", "RAG"],
    scenarios: ["automation", "code", "local"],
    description: "AI 应用开发框架和平台，适合构建 RAG、Agent、工具调用和评估流程。",
    bestFor: "开发者构建 AI 应用和工作流。",
    watchOut: "框架版本和依赖变化较快，要跟随官方文档。",
  },
  {
    name: "AutoGen",
    domain: "microsoft.github.io",
    url: "https://microsoft.github.io/autogen/",
    category: "自动化智能体",
    price: "free",
    region: "海外",
    capabilities: ["local", "api"],
    score: 84,
    tags: ["多智能体", "开源", "微软"],
    scenarios: ["automation", "code", "local"],
    description: "微软开源的多智能体框架，适合研究和构建协作式 Agent 原型。",
    bestFor: "多 Agent 实验、自动化研究、原型验证。",
    watchOut: "生产落地需要额外设计权限、监控和失败恢复。",
  },
  {
    name: "Stable Diffusion WebUI",
    domain: "github.com",
    url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    category: "本地开源",
    price: "free",
    region: "海外",
    capabilities: ["local"],
    score: 86,
    tags: ["图片生成", "开源", "本地部署"],
    scenarios: ["local", "design"],
    description: "经典本地图像生成 WebUI，适合体验 Stable Diffusion 生态和插件玩法。",
    bestFor: "本地图片生成、模型实验、插件工作流。",
    watchOut: "环境配置和模型来源需要谨慎管理。",
  },
  {
    name: "Mistral Le Chat",
    domain: "mistral.ai",
    url: "https://chat.mistral.ai",
    category: "对话助手",
    price: "freemium",
    region: "海外",
    capabilities: ["api", "team"],
    score: 85,
    tags: ["欧洲模型", "对话", "开发"],
    scenarios: ["research", "code", "paper"],
    description: "Mistral 的对话入口，适合体验其模型在写作、分析和开发任务中的表现。",
    bestFor: "模型体验、英文分析、代码辅助。",
    watchOut: "账号地区、模型可用性和额度可能变化。",
  },
  {
    name: "Shopify Magic",
    domain: "shopify.com",
    url: "https://www.shopify.com/magic",
    category: "写作办公",
    price: "freemium",
    region: "海外",
    capabilities: ["team"],
    score: 82,
    tags: ["电商", "商品文案", "运营"],
    scenarios: ["ecommerce"],
    description: "面向 Shopify 商家的 AI 文案和运营辅助能力，适合商品描述和电商内容。",
    bestFor: "商品文案、店铺运营、营销素材。",
    watchOut: "更适合 Shopify 生态内用户。",
  },
  {
    name: "美图设计室",
    domain: "xiuxiu.meitu.com",
    url: "https://xiuxiu.meitu.com",
    category: "图像设计",
    price: "freemium",
    region: "国内",
    capabilities: ["mobile"],
    score: 83,
    tags: ["修图", "电商", "中文"],
    scenarios: ["design", "ecommerce"],
    description: "中文图片处理和设计工具，适合商品图、人像、社媒图和电商素材处理。",
    bestFor: "电商图、证件照、人像修图、运营配图。",
    watchOut: "高级模板、批量能力和商用权益要看套餐。",
  },
];

const stacks = [
  {
    title: "论文速读",
    tools: ["秘塔AI搜索", "Semantic Scholar", "SciSpace"],
    category: "学术研究",
    scenario: "paper",
    note: "先搜资料，再追引用，最后解释难段落。",
  },
  {
    title: "短视频生产",
    tools: ["即梦AI", "可灵AI", "ElevenLabs"],
    category: "视频创作",
    scenario: "video",
    note: "先做视觉草稿，再生成镜头和旁白。",
  },
  {
    title: "Web MVP",
    tools: ["v0", "Lovable", "Cursor"],
    category: "编程开发",
    scenario: "web-mvp",
    note: "先出界面，再生成原型，最后进代码库收口。",
  },
  {
    title: "Agent 工作台",
    tools: ["Claude Code", "OpenClaw", "Hermes Agent"],
    category: "自动化智能体",
    scenario: "automation",
    note: "代码任务用 Claude Code，统一入口用 OpenClaw，个人自动化用 Hermes。",
  },
  {
    title: "本地隐私",
    tools: ["Ollama", "LM Studio", "Dify"],
    category: "本地开源",
    scenario: "local",
    note: "本地模型加应用编排，适合私有知识库。",
  },
  {
    title: "简历优化",
    tools: ["ChatGPT", "Grammarly", "QuillBot"],
    category: "写作办公",
    scenario: "resume",
    note: "先整理经历，再改英文表达，最后检查语气和格式。",
  },
  {
    title: "PPT 生成",
    tools: ["Gamma", "WPS AI", "AiPPT"],
    category: "写作办公",
    scenario: "slides",
    note: "先生成大纲，再出页面初稿，最后按品牌风格微调。",
  },
  {
    title: "AI 编程",
    tools: ["Cursor", "Windsurf", "Qodo"],
    category: "编程开发",
    scenario: "ai-coding",
    note: "一个负责编码，一个负责项目上下文，一个补质量和测试。",
  },
  {
    title: "电商运营",
    tools: ["美图设计室", "Shopify Magic", "剪映"],
    category: "图像设计",
    scenario: "ecommerce",
    note: "商品图、详情文案和短视频一起打包，提高上新效率。",
  },
];

const defaultFilters = {
  query: "",
  category: "全部",
  price: "all",
  region: "all",
  capability: "all",
  scenario: "all",
  sort: "score",
  favoritesOnly: false,
};

const state = {
  ...defaultFilters,
  theme: getInitialTheme(),
  sidebarMode: getInitialSidebarMode(),
  cardView: getInitialCardView(),
  advancedFiltersOpen: false,
  mobileSidebarOpen: false,
  themeMenuOpen: false,
  favorites: readStoredSet("favorites"),
  compare: readStoredSet("compare"),
};

const elements = {
  body: document.body,
  searchInput: document.querySelector("#searchInput"),
  categorySelect: document.querySelector("#categorySelect"),
  priceSelect: document.querySelector("#priceSelect"),
  regionSelect: document.querySelector("#regionSelect"),
  capabilitySelect: document.querySelector("#capabilitySelect"),
  sortSelect: document.querySelector("#sortSelect"),
  scenarioFilters: document.querySelector("#scenarioFilters"),
  favoritesOnly: document.querySelector("#favoritesOnly"),
  resetFilters: document.querySelector("#resetFilters"),
  copyFilters: document.querySelector("#copyFilters"),
  advancedFilters: document.querySelector("#advancedFilters"),
  advancedFilterToggle: document.querySelector("#advancedFilterToggle"),
  activeFilters: document.querySelector("#activeFilters"),
  categoryButtons: document.querySelector("#categoryButtons"),
  toolGrid: document.querySelector("#toolGrid"),
  resultCount: document.querySelector("#resultCount"),
  resultLabel: document.querySelector("#resultLabel"),
  toolCount: document.querySelector("#toolCount"),
  categoryCount: document.querySelector("#categoryCount"),
  freeCount: document.querySelector("#freeCount"),
  apiCount: document.querySelector("#apiCount"),
  localCount: document.querySelector("#localCount"),
  savedCount: document.querySelector("#savedCount"),
  emptyState: document.querySelector("#emptyState"),
  emptyReset: document.querySelector("#emptyReset"),
  stackList: document.querySelector("#stackList"),
  compareBox: document.querySelector("#compareBox"),
  compareList: document.querySelector("#compareList"),
  compareCount: document.querySelector("#compareCount"),
  clearCompare: document.querySelector("#clearCompare"),
  themeToggle: document.querySelector("#themeToggle"),
  themeIcon: document.querySelector("#themeIcon"),
  themeMenu: document.querySelector("#themeMenu"),
  themeOptions: document.querySelector("#themeOptions"),
  themeChoices: document.querySelectorAll("[data-theme-choice]"),
  mobileSidebarOpen: document.querySelector("#mobileSidebarOpen"),
  mobileSidebarClose: document.querySelector("#mobileSidebarClose"),
  sidebarOverlay: document.querySelector("#sidebarOverlay"),
  sidebarCompactToggle: document.querySelector("#sidebarCompactToggle"),
  sidebarHideToggle: document.querySelector("#sidebarHideToggle"),
  sidebarReveal: document.querySelector("#sidebarReveal"),
  categoryRail: document.querySelector("#categoryRail"),
  cardViewButtons: document.querySelectorAll("[data-card-view]"),
  template: document.querySelector("#toolCardTemplate"),
};

function readStoredSet(key) {
  try {
    const value = JSON.parse(localStorage.getItem(`aiark:${key}`) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

function saveStoredSet(key, value) {
  try {
    localStorage.setItem(`aiark:${key}`, JSON.stringify([...value]));
  } catch {
    // Keep the UI usable when storage is blocked.
  }
}

function readStoredValue(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function saveStoredValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Current-session state still works when storage is blocked.
  }
}

function getInitialTheme() {
  const saved = readStoredValue("theme", readStoredValue("aiark:theme", "system"));
  return themeModes.includes(saved) ? saved : "system";
}

function getInitialSidebarMode() {
  const saved = readStoredValue("sidebar-mode", "full");
  return sidebarModes.includes(saved) ? saved : "full";
}

function getInitialCardView() {
  const saved = readStoredValue("tool-card-view", "standard");
  return cardViewModes.includes(saved) ? saved : "standard";
}

function favicon(domain) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

function normalize(value) {
  return String(value).trim().toLowerCase();
}

function queryTokens() {
  return normalize(state.query).split(/\s+/).filter(Boolean);
}

function getCategoryCounts() {
  return categories.reduce((acc, category) => {
    if (category === "全部") {
      acc[category] = tools.length;
      return acc;
    }
    acc[category] = tools.filter((tool) => tool.category === category).length;
    return acc;
  }, {});
}

function getOverviewCounts() {
  return {
    free: tools.filter((tool) => tool.price === "free").length,
    api: tools.filter((tool) => tool.capabilities.includes("api")).length,
    local: tools.filter((tool) => tool.capabilities.includes("local")).length,
  };
}

function scenarioLabel(value) {
  return scenarios.find((scenario) => scenario.value === value)?.label || value;
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}

function resolveTheme(mode) {
  if (mode === "system") return systemThemeQuery.matches ? "dark" : "light";
  return mode;
}

function applyTheme() {
  const resolved = resolveTheme(state.theme);
  document.documentElement.dataset.themeMode = state.theme;
  document.documentElement.dataset.theme = resolved;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = resolved === "dark" ? "#0b1117" : "#0f766e";

  const label = { light: "浅色", dark: "深色", system: "跟随系统" }[state.theme];
  const icon = { light: "○", dark: "●", system: "◐" }[state.theme];
  elements.themeIcon.textContent = icon;
  elements.themeToggle.title = `当前：${label}`;
  elements.themeToggle.setAttribute("aria-label", `切换主题，当前为${label}`);

  elements.themeChoices.forEach((button) => {
    const checked = button.dataset.themeChoice === state.theme;
    button.classList.toggle("is-active", checked);
    button.setAttribute("aria-checked", String(checked));
  });
}

function setTheme(mode) {
  if (!themeModes.includes(mode)) return;
  state.theme = mode;
  saveStoredValue("theme", mode);
  closeThemeMenu();
  applyTheme();
}

function toggleThemeMenu() {
  setThemeMenuOpen(!state.themeMenuOpen);
}

function setThemeMenuOpen(open) {
  state.themeMenuOpen = open;
  elements.themeOptions.hidden = !open;
  elements.themeToggle.setAttribute("aria-expanded", String(open));
}

function closeThemeMenu() {
  setThemeMenuOpen(false);
}

function applySidebarMode(save = false) {
  elements.body.dataset.sidebarMode = state.sidebarMode;
  elements.sidebarReveal.hidden = state.sidebarMode !== "hidden";
  elements.sidebarCompactToggle.setAttribute("aria-pressed", String(state.sidebarMode === "compact"));
  elements.sidebarCompactToggle.setAttribute(
    "aria-label",
    state.sidebarMode === "compact" ? "展开完整侧栏" : "简化侧栏",
  );
  elements.sidebarCompactToggle.title = state.sidebarMode === "compact" ? "展开完整侧栏" : "简化侧栏";
  elements.sidebarHideToggle.setAttribute("aria-pressed", String(state.sidebarMode === "hidden"));
  if (save) saveStoredValue("sidebar-mode", state.sidebarMode);
}

function applyCardView(save = false) {
  elements.body.dataset.cardView = state.cardView;
  elements.cardViewButtons.forEach((button) => {
    const active = button.dataset.cardView === state.cardView;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (save) saveStoredValue("tool-card-view", state.cardView);
}

function applyAdvancedFilters() {
  elements.advancedFilters.hidden = !state.advancedFiltersOpen;
  elements.advancedFilterToggle.classList.toggle("is-active", state.advancedFiltersOpen);
  elements.advancedFilterToggle.setAttribute("aria-expanded", String(state.advancedFiltersOpen));
  elements.advancedFilterToggle.textContent = state.advancedFiltersOpen ? "收起筛选" : "更多筛选";
}

function toggleAdvancedFilters() {
  state.advancedFiltersOpen = !state.advancedFiltersOpen;
  applyAdvancedFilters();
}

function setCardView(view) {
  if (!cardViewModes.includes(view)) return;
  state.cardView = view;
  applyCardView(true);
}

function setSidebarMode(mode) {
  if (!sidebarModes.includes(mode)) return;
  state.sidebarMode = mode;
  applySidebarMode(true);
}

function toggleCompactSidebar() {
  setSidebarMode(state.sidebarMode === "compact" ? "full" : "compact");
}

function setMobileSidebarOpen(open) {
  state.mobileSidebarOpen = open;
  elements.body.classList.toggle("mobile-sidebar-open", open);
  elements.sidebarOverlay.hidden = !open;
  elements.mobileSidebarOpen.setAttribute("aria-expanded", String(open));
  elements.categoryRail.setAttribute("aria-hidden", String(!open && window.matchMedia("(max-width: 780px)").matches));
}

function closeMobileSidebar() {
  setMobileSidebarOpen(false);
}

function getActiveFilterItems() {
  const items = [];
  if (state.query) items.push({ key: "query", label: `关键词：${state.query}` });
  if (state.category !== defaultFilters.category) items.push({ key: "category", label: `分类：${state.category}` });
  if (state.price !== defaultFilters.price) items.push({ key: "price", label: `价格：${priceLabel[state.price]}` });
  if (state.region !== defaultFilters.region) items.push({ key: "region", label: `地区：${state.region}` });
  if (state.capability !== defaultFilters.capability) {
    items.push({ key: "capability", label: `能力：${capabilityLabel[state.capability]}` });
  }
  if (state.scenario !== defaultFilters.scenario) items.push({ key: "scenario", label: `任务：${scenarioLabel(state.scenario)}` });
  if (state.favoritesOnly) items.push({ key: "favoritesOnly", label: "只看收藏" });
  if (state.sort !== defaultFilters.sort) {
    const sortLabel = { name: "名称 A-Z", price: "免费优先" }[state.sort] || "AIark 推荐";
    items.push({ key: "sort", label: `排序：${sortLabel}` });
  }
  return items;
}

function clearFilter(key) {
  state[key] = defaultFilters[key];
  render();
}

function renderActiveFilters() {
  const items = getActiveFilterItems();
  elements.activeFilters.innerHTML = "";
  elements.activeFilters.hidden = items.length === 0;

  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-pill";
    button.textContent = `${item.label} ×`;
    button.setAttribute("aria-label", `移除${item.label}`);
    button.addEventListener("click", () => clearFilter(item.key));
    elements.activeFilters.append(button);
  });
}

function toolMatches(tool) {
  const text = normalize(
    [
      tool.name,
      tool.domain,
      tool.category,
      tool.description,
      tool.bestFor,
      tool.watchOut,
      tool.price,
      priceLabel[tool.price],
      tool.region,
      ...tool.tags,
      ...tool.capabilities.map((capability) => capabilityLabel[capability] || capability),
      ...tool.scenarios.map(scenarioLabel),
    ].join(" "),
  );
  const tokens = queryTokens();
  const queryMatch = !tokens.length || tokens.every((token) => text.includes(token));
  const categoryMatch = state.category === "全部" || tool.category === state.category;
  const priceMatch = state.price === "all" || tool.price === state.price;
  const regionMatch = state.region === "all" || tool.region === state.region;
  const capabilityMatch = state.capability === "all" || tool.capabilities.includes(state.capability);
  const scenarioMatch = state.scenario === "all" || tool.scenarios.includes(state.scenario);
  const favoritesMatch = !state.favoritesOnly || state.favorites.has(tool.name);

  return queryMatch && categoryMatch && priceMatch && regionMatch && capabilityMatch && scenarioMatch && favoritesMatch;
}

function sortTools(list) {
  return [...list].sort((a, b) => {
    if (state.sort === "name") return a.name.localeCompare(b.name);
    if (state.sort === "price") {
      const rank = { free: 0, freemium: 1, paid: 2 };
      return rank[a.price] - rank[b.price] || b.score - a.score;
    }
    return b.score - a.score;
  });
}

function createTag(text, className = "") {
  const tag = document.createElement("span");
  tag.className = `tag ${className}`.trim();
  tag.textContent = text;
  return tag;
}

function renderCard(tool) {
  const node = elements.template.content.firstElementChild.cloneNode(true);
  const image = node.querySelector(".tool-icon");
  const saveButton = node.querySelector(".save-button");
  const compareButton = node.querySelector(".compare-button");
  const visitLink = node.querySelector(".visit-link");
  const scoreBadge = node.querySelector(".score-badge");

  image.src = favicon(tool.domain);
  image.alt = `${tool.name} 图标`;
  node.querySelector("h3").textContent = tool.name;
  node.querySelector(".domain").textContent = tool.domain;
  node.querySelector(".tool-desc").textContent = tool.description;
  node.querySelector(".best-for").textContent = tool.bestFor;
  node.querySelector(".watch-out").textContent = tool.watchOut;
  scoreBadge.textContent = `${tool.score}分`;
  visitLink.href = tool.url;
  visitLink.title = `打开 ${tool.name} 官网`;

  const tags = node.querySelector(".tag-row");
  const priceClass = tool.price === "paid" ? "price-paid" : "price-free";
  const tagItems = [priceLabel[tool.price], tool.region, tool.category, ...tool.tags];
  const maxTags = state.cardView === "compact" ? 3 : 4;
  const visibleTags = tagItems.length > maxTags ? tagItems.slice(0, maxTags - 1) : tagItems.slice(0, maxTags);
  visibleTags.forEach((tag, index) => {
    tags.append(createTag(tag, index === 0 ? priceClass : ""));
  });
  if (tagItems.length > maxTags) tags.append(createTag(`+${tagItems.length - maxTags}`));

  saveButton.classList.toggle("is-active", state.favorites.has(tool.name));
  saveButton.textContent = state.favorites.has(tool.name) ? "★" : "☆";
  saveButton.setAttribute("aria-pressed", String(state.favorites.has(tool.name)));
  saveButton.setAttribute("aria-label", state.favorites.has(tool.name) ? `取消收藏 ${tool.name}` : `收藏 ${tool.name}`);
  saveButton.addEventListener("click", () => toggleSet("favorites", tool.name));

  compareButton.classList.toggle("is-active", state.compare.has(tool.name));
  compareButton.textContent = state.compare.has(tool.name) ? "已加入" : "加入对比";
  compareButton.setAttribute("aria-pressed", String(state.compare.has(tool.name)));
  compareButton.addEventListener("click", () => toggleCompare(tool.name));

  return node;
}

function toggleSet(key, name) {
  const target = state[key];
  if (target.has(name)) target.delete(name);
  else target.add(name);
  saveStoredSet(key, target);
  render();
}

function toggleCompare(name) {
  if (state.compare.has(name)) {
    state.compare.delete(name);
  } else {
    if (state.compare.size >= 4) {
      const [first] = state.compare;
      state.compare.delete(first);
    }
    state.compare.add(name);
  }
  saveStoredSet("compare", state.compare);
  render();
}

function renderFilters() {
  const counts = getCategoryCounts();
  elements.categorySelect.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
  elements.categorySelect.value = state.category;
  elements.searchInput.value = state.query;
  elements.priceSelect.value = state.price;
  elements.regionSelect.value = state.region;
  elements.capabilitySelect.value = state.capability;
  elements.sortSelect.value = state.sort;
  elements.favoritesOnly.classList.toggle("is-active", state.favoritesOnly);
  elements.favoritesOnly.setAttribute("aria-pressed", String(state.favoritesOnly));
  elements.favoritesOnly.textContent = state.favoritesOnly ? "★ 正在看收藏" : "☆ 只看收藏";

  elements.categoryButtons.innerHTML = "";
  categories.forEach((category) => {
    const meta = categoryMeta[category] || { icon: category.slice(0, 1), label: category };
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-button";
    button.title = `${meta.label}，${counts[category] || 0} 个工具`;
    button.setAttribute("aria-label", `${meta.label}，${counts[category] || 0} 个工具`);
    button.classList.toggle("is-active", state.category === category);
    button.append(createTextElement("span", "category-icon", meta.icon));
    button.append(createTextElement("span", "category-name", meta.label));
    button.append(createTextElement("span", "category-count", String(counts[category] || 0)));
    button.addEventListener("click", () => {
      state.category = category;
      elements.categorySelect.value = category;
      closeMobileSidebar();
      render();
    });
    elements.categoryButtons.append(button);
  });

  elements.scenarioFilters.innerHTML = "";
  const all = document.createElement("button");
  all.type = "button";
  all.className = "chip";
  all.classList.toggle("is-active", state.scenario === "all");
  all.textContent = "全部任务";
  all.addEventListener("click", () => {
    state.scenario = "all";
    render();
  });
  elements.scenarioFilters.append(all);

  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.classList.toggle("is-active", state.scenario === scenario.value);
    button.textContent = scenario.label;
    button.addEventListener("click", () => {
      state.scenario = scenario.value;
      render();
    });
    elements.scenarioFilters.append(button);
  });
}

function renderStacks() {
  elements.stackList.innerHTML = "";
  stacks.forEach((stack) => {
    const item = document.createElement("article");
    item.className = "stack-item";
    item.append(createTextElement("strong", "", stack.title));

    const tools = document.createElement("div");
    tools.className = "stack-tools";
    stack.tools.forEach((tool) => tools.append(createTag(tool)));
    item.append(tools);

    item.append(createTextElement("span", "", stack.note));

    const applyButton = document.createElement("button");
    applyButton.type = "button";
    applyButton.className = "stack-apply";
    applyButton.textContent = "套用";
    applyButton.addEventListener("click", () => applyStack(stack));
    item.append(applyButton);

    elements.stackList.append(item);
  });
}

function applyStack(stack) {
  state.query = "";
  state.category = stack.category;
  state.scenario = stack.scenario;
  state.favoritesOnly = false;
  render();
  document.querySelector("#directory")?.scrollIntoView({ block: "start", behavior: "smooth" });
}

function renderCompare() {
  elements.compareList.innerHTML = "";
  const selected = tools.filter((tool) => state.compare.has(tool.name));
  if (elements.compareCount) elements.compareCount.textContent = `已选 ${selected.length}/4`;
  elements.compareBox.classList.toggle("is-empty", selected.length === 0);
  elements.clearCompare.hidden = selected.length === 0;

  if (!selected.length) {
    const empty = document.createElement("div");
    empty.className = "compare-item";
    empty.append(createTextElement("span", "", "选择 2-4 个工具后，这里会显示适合场景、价格和注意点。"));
    elements.compareList.append(empty);
    return;
  }

  selected.forEach((tool) => {
    const item = document.createElement("article");
    item.className = "compare-item";
    item.append(createTextElement("strong", "", tool.name));
    item.append(createTextElement("span", "", `${priceLabel[tool.price]} · ${tool.region}\n${tool.bestFor}`));

    const capabilityRow = document.createElement("div");
    capabilityRow.className = "compare-tags";
    tool.capabilities.forEach((capability) => capabilityRow.append(createTag(capabilityLabel[capability] || capability)));
    item.append(capabilityRow);

    const actions = document.createElement("div");
    actions.className = "compare-actions";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "text-button compact-button";
    removeButton.textContent = "移除";
    removeButton.addEventListener("click", () => toggleCompare(tool.name));

    const visitLink = document.createElement("a");
    visitLink.className = "text-button compact-button";
    visitLink.href = tool.url;
    visitLink.target = "_blank";
    visitLink.rel = "noreferrer";
    visitLink.textContent = "直达";

    actions.append(removeButton, visitLink);
    item.append(actions);
    elements.compareList.append(item);
  });
}

function resetFilters() {
  Object.assign(state, defaultFilters);
  state.advancedFiltersOpen = false;
  render();
}

function getFilterUrl() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams();
  if (state.query) params.set("q", state.query);
  if (state.category !== "全部") params.set("category", state.category);
  if (state.price !== "all") params.set("price", state.price);
  if (state.region !== "all") params.set("region", state.region);
  if (state.capability !== "all") params.set("capability", state.capability);
  if (state.scenario !== "all") params.set("scenario", state.scenario);
  if (state.sort !== "score") params.set("sort", state.sort);
  if (state.favoritesOnly) params.set("favorites", "1");
  url.search = params.toString();
  url.hash = "directory";
  return url.toString();
}

async function copyFilterUrl() {
  const url = getFilterUrl();
  const originalText = elements.copyFilters.textContent;
  try {
    await navigator.clipboard.writeText(url);
    elements.copyFilters.textContent = "已复制";
  } catch {
    window.prompt("复制这个筛选链接", url);
  }
  window.setTimeout(() => {
    elements.copyFilters.textContent = originalText;
  }, 1400);
}

function render() {
  const filtered = sortTools(tools.filter(toolMatches));
  const overview = getOverviewCounts();
  elements.toolGrid.innerHTML = "";
  filtered.forEach((tool) => elements.toolGrid.append(renderCard(tool)));

  elements.resultCount.textContent = filtered.length;
  elements.resultLabel.textContent = state.query
    ? `个结果匹配「${state.query}」`
    : state.favoritesOnly
      ? "个收藏结果"
      : "个结果";
  elements.emptyState.hidden = filtered.length > 0;
  elements.toolCount.textContent = tools.length;
  elements.categoryCount.textContent = categories.length - 1;
  elements.freeCount.textContent = overview.free;
  elements.apiCount.textContent = overview.api;
  elements.localCount.textContent = overview.local;
  elements.savedCount.textContent = state.favorites.size;

  renderFilters();
  applyAdvancedFilters();
  renderActiveFilters();
  renderStacks();
  renderCompare();
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    render();
  });
  elements.searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.query) {
      state.query = "";
      render();
    }
  });
  elements.categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });
  elements.priceSelect.addEventListener("change", (event) => {
    state.price = event.target.value;
    render();
  });
  elements.regionSelect.addEventListener("change", (event) => {
    state.region = event.target.value;
    render();
  });
  elements.capabilitySelect.addEventListener("change", (event) => {
    state.capability = event.target.value;
    render();
  });
  elements.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });
  elements.favoritesOnly.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    render();
  });
  elements.resetFilters.addEventListener("click", resetFilters);
  elements.emptyReset.addEventListener("click", resetFilters);
  elements.copyFilters.addEventListener("click", copyFilterUrl);
  elements.advancedFilterToggle.addEventListener("click", toggleAdvancedFilters);
  elements.clearCompare.addEventListener("click", () => {
    state.compare.clear();
    saveStoredSet("compare", state.compare);
    render();
  });
  elements.themeToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleThemeMenu();
  });
  elements.themeChoices.forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
  });
  elements.sidebarCompactToggle.addEventListener("click", toggleCompactSidebar);
  elements.sidebarHideToggle.addEventListener("click", () => setSidebarMode("hidden"));
  elements.sidebarReveal.addEventListener("click", () => setSidebarMode("full"));
  elements.cardViewButtons.forEach((button) => {
    button.addEventListener("click", () => setCardView(button.dataset.cardView));
  });
  elements.mobileSidebarOpen.addEventListener("click", () => setMobileSidebarOpen(true));
  elements.mobileSidebarClose.addEventListener("click", closeMobileSidebar);
  elements.sidebarOverlay.addEventListener("click", closeMobileSidebar);
  document.addEventListener("click", (event) => {
    if (state.themeMenuOpen && !elements.themeMenu.contains(event.target)) closeThemeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeThemeMenu();
      closeMobileSidebar();
    }
  });
  systemThemeQuery.addEventListener("change", () => {
    if (state.theme === "system") applyTheme();
  });
}

function initUiState() {
  applyTheme();
  applySidebarMode(false);
  applyCardView(false);
  applyAdvancedFilters();
  setMobileSidebarOpen(false);
}

function initFilters() {
  const params = new URLSearchParams(window.location.search);
  const priceValues = ["all", "free", "freemium", "paid"];
  const regionValues = ["all", "国内", "海外"];
  const capabilityValues = ["all", ...Object.keys(capabilityLabel)];
  const scenarioValues = ["all", ...scenarios.map((scenario) => scenario.value)];
  const sortValues = ["score", "name", "price"];

  state.query = params.get("q") || "";
  if (categories.includes(params.get("category"))) state.category = params.get("category");
  if (priceValues.includes(params.get("price"))) state.price = params.get("price");
  if (regionValues.includes(params.get("region"))) state.region = params.get("region");
  if (capabilityValues.includes(params.get("capability"))) state.capability = params.get("capability");
  if (scenarioValues.includes(params.get("scenario"))) state.scenario = params.get("scenario");
  if (sortValues.includes(params.get("sort"))) state.sort = params.get("sort");
  state.favoritesOnly = params.get("favorites") === "1";
  state.advancedFiltersOpen =
    state.category !== defaultFilters.category ||
    state.price !== defaultFilters.price ||
    state.region !== defaultFilters.region ||
    state.capability !== defaultFilters.capability;
}

initUiState();
initFilters();
bindEvents();
render();
