# AIark Minimal Agent Directory Design

AIark 的界面定位从“AI 工具导航站”升级为“任务驱动的 AI 工具控制台”。设计目标是让用户先输入任务，再快速比较可用工具和工作流，而不是在厚重卡片墙里寻找入口。

## Competitive Positioning

- 学习对象：大型 AI 工具导航站的分类宽度、更新密度、SEO 页面覆盖和工具数量。
- AIark 差异：不只做“工具墙”，而是把工具组织成任务、工作流、筛选条件和可分享的选型清单。
- 扩容目标：第一阶段从 76 个工具扩展到 217 个工具，第二阶段扩展到 641 个工具和 29 个分类；后续继续向 1000+ 工具库扩展。
- 内容原则：工具名称和分类可以参考公开目录，但描述、适合场景、注意事项和工作流建议必须用 AIark 自己的选型语言重写。

## Aesthetic

- 方向：Minimal Agent Directory
- 关键词：克制、低噪声、浅色 SaaS 产品感、任务优先、信息摘要
- 参考气质：Linear 的信息层级、Raycast 的工具入口、Vercel 的留白、shadcn/ui 的组件秩序
- 避免：霓虹发光、大色块按钮、卡片套卡片、过多边框、后台面板感

## Tokens

```css
--bg: #f7f8fa;
--panel: #ffffff;
--panel-soft: #f3f4f6;
--border: #e5e7eb;
--border-strong: #c7d2fe;
--text: #111827;
--text-muted: #6b7280;
--text-soft: #9ca3af;
--brand: #4f46e5;
--brand-muted: #eef2ff;
--brand-border: #c7d2fe;
--radius-card: 20px;
--radius-control: 12px;
```

## Layout

- Desktop uses a 1480px max-width container with two browsing columns: a light left navigation rail and a wide primary results area.
- Workflow recommendations should not consume a permanent right column because that makes the tool cards feel cramped.
- Left rail width should stay between 220px and 240px in full mode.
- Main search is the primary entry point and should appear before all filters.
- The result grid should feel unframed; individual tool cards carry the structure.
- On mobile, the left rail becomes a drawer and the right rail moves below results.
- Detailed filters are collapsed by default. The first screen should show search, task chips, overview metrics, and a single "more filters" control.
- The compare area should not consume a permanent column. Keep workflows in the right rail and expose compare as a light bottom-right dock on desktop.
- The hero is a two-column task story: clear positioning on the left, a restrained "task input to tool chain" mock console on the right, then the real search panel below.

## Components

- Category nav: 40-44px rows, muted icon, weak count, active state with a 2px brand line and soft background.
- Tool card: one panel only, no nested dark blocks. Name, domain, score, description, fit, caution, tags, compare, visit.
- Tool card: show summary, fit, caution, compare, and visit actions by default so users can scan and compare quickly.
- Tags: small pills, low contrast, max 3-4 visible.
- Buttons: one primary visit action, one secondary compare action, same radius and height system.
- Controls: filter selects, segmented view switch, utility buttons share the same pill language.
- Empty state: provide recovery suggestions, not just “no results”.
- Advanced filters: category, price, region, and capability live inside a collapsible region with `aria-expanded` on the trigger.
- Compare dock: compact when empty, expanded only when tools are selected, always showing selected count.

## Motion

- Hover lift: 2px.
- Duration: 120ms-180ms.
- No glow. Border and background shifts are enough.
- Respect `prefers-reduced-motion`.

## SEO

- Never let static HTML show “0 tools” for the full directory state.
- Homepage should include readable task/category/workflow text.
- Build step generates category, tool, use-case pages and `sitemap.xml`.

## Architecture Roadmap

- Current production remains a static, build-generated site because it already gives crawlable homepage counts, category pages, tool pages, use-case pages, and sitemap output.
- Next.js App Router migration should happen as a separate branch when product requirements need a real database, server actions, or authenticated submissions.
- Preserve the same URL shape during migration: `/tools/[slug]`, `/categories/[slug]`, `/use-cases/[slug]`, `/sitemap.xml`, and `/robots.txt`.
