# AIark Minimal Agent Directory Design

AIark 的界面定位从“AI 工具导航站”升级为“任务驱动的 AI 工具控制台”。设计目标是让用户先输入任务，再快速比较可用工具和工作流，而不是在厚重卡片墙里寻找入口。

## Aesthetic

- 方向：Minimal Agent Directory
- 关键词：克制、低噪声、深色产品感、任务优先、信息摘要
- 参考气质：Linear 的信息层级、Raycast 的工具入口、Vercel 的留白、Supabase 的低饱和绿色
- 避免：霓虹发光、大色块按钮、卡片套卡片、过多边框、后台面板感

## Tokens

```css
--bg: #0b1117;
--panel: #101820;
--panel-soft: #141d26;
--border: rgba(148, 163, 184, 0.16);
--border-strong: rgba(148, 163, 184, 0.28);
--text: #e5e7eb;
--text-muted: #94a3b8;
--text-soft: #64748b;
--brand: #2dd4bf;
--brand-muted: rgba(45, 212, 191, 0.12);
--brand-border: rgba(45, 212, 191, 0.32);
--radius-card: 18px;
--radius-control: 12px;
```

## Layout

- Desktop uses three columns: light left navigation, primary tool grid, right workflow/compare rail.
- Left rail width should stay between 220px and 240px in full mode.
- Main search is the primary entry point and should appear before all filters.
- The result grid should feel unframed; individual tool cards carry the structure.
- On mobile, the left rail becomes a drawer and the right rail moves below results.
- Detailed filters are collapsed by default. The first screen should show search, task chips, overview metrics, and a single "more filters" control.
- The compare area should not consume a permanent column. Keep workflows in the right rail and expose compare as a light bottom-right dock on desktop.

## Components

- Category nav: 40-44px rows, muted icon, weak count, active state with a 2px brand line and soft background.
- Tool card: one panel only, no nested dark blocks. Name, domain, score, description, fit, caution, tags, compare, visit.
- Tags: small pills, low contrast, max 5 visible.
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
