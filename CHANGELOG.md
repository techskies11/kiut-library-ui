# Change Log

## [current]
### Changed
- DAI-470: Disruption dropdown shows one Sankey at a time, Flow by default, and loads the Notifications diagram only after it is selected.
- DAI-470: Disruption Sankey header matches the design: dropdown, process-flow and notifications-flow titles, and node colors.
- DAI-470: Notifications Sankey keeps Contactable as a branch after Valid Reservations, with Notified continuing from that branch.
- ConversationVolume: rename custom_tags breakdown option label from Tags to Label (dropdown and default chart title).

### Added
- DAI-312: Add Offline time in range column to Agent Human Conversations table (complements summed online time from the API).
- DAI-312: Info tooltips on Connected, Disconnected, and online/offline time columns; Table supports optional `headerTooltip` on columns.
- DAI-533: Add a refresh button on each chart card header so one metric can be reloaded on its own.
- ConversationVolume chart titles support for `custom_tags` breakdown (backoffice conversation tags).
- CardMetric optional expandable `details` breakdown rows with chevron toggle (`detailsDefaultOpen`).

### Changed
- CardMetric draws its own refresh button in the card body and hides the header one, keeping the same per-metric reload.
- Export compact cost/token KPI cards (`AwsCostCard`, `TotalCost`, `TotalTokens`, `MeanConversationCost`) from the package barrel for direct `kiut-library-ui` imports.
- CardMetric details layout: inline chevron after info icon, divider spacing, and bold detail values to match KPI design.
- DAI-400: Add AwsCostCard compact KPI for allocated AWS infrastructure spend.
- DAI-400: Add `useCompactNumberFormat` for token KPI values (e.g. `15M`).
- Button `active` prop for toggle/segmented secondary controls with filled brand styles and `aria-pressed`.

### Changed
- DAI-400: Redesign Total Cost as a compact KPI card (wallet icon, inline daily average, period change badge) aligned with CardMetric.
- DAI-400: Redesign Total Tokens as a compact KPI card (coin icon, compact value, period change badge) aligned with CardMetric.
- DAI-400: Redesign Mean Conversation Cost as a compact KPI card (dollar icon, precise currency value, period change badge) aligned with CardMetric.
- DAI-400: Expose optional `#icon` slot on compact cost/token KPI cards (TotalCost, AwsCostCard, TotalTokens, MeanConversationCost).
- DAI-400: Rename Daily Cost Trends chart to Average cost with header metric/scope selectors (per conversation and All enabled; per interaction pending backend).

### Fixed
- Seller KPI "Sales Initiated" card now uses `total_seller_conversations` (Initiated by agent) instead of `total_sell_started`.
- Seller KPI "% Sales Success" count includes bank transfer and cash when those totals are reported separately from online sell success.
- Seller KPI "% Abandon" and "% Errors" now follow the same funnel rules as the Sankey and Sales Volume chart (pre-sales drop vs booking/completion gaps), not `total_sell_failed` or a residual over initiated.
- Seller KPI "Revenue" adds bank transfer and cash USD when those buckets are reported separately and the main USD total is online-only.
- SellerContainer accepts `revenueCurrency` so the revenue KPI uses the dashboard-selected currency from seller value breakdowns.
- Seller revenue KPI no longer falls back to native COP/MXN when the selected dashboard currency is absent from seller-metrics breakdowns.
- Seller funnel table can show converted daily sales values via `dailyRevenueByDate` and `displayCurrency` on SellerContainer.
- Transactions chart agent breakdown: clearer labels, stable series keys, and no stale chart while refetching after breakdown change.
- Rebuild `dist` so compact KPI cards (`AwsCostCard`, `TotalCost`, `TotalTokens`, `MeanConversationCost`) are named exports in `kiut-ui.es.js` (barrel matched source but stale bundle broke Hangar CI).
- Remove duplicate transfer-count fields in Agent Human Conversations so the library typecheck passes.
- DAI-532: Treat seller success totals as inclusive while preserving cash and bank-transfer Sankey branches without double counting.
- Table: align body cell vertical padding with header (`py-3`) and remove fixed 61px row height so content is not cramped.
### Changed
- DAI-483: Split Agent Human Conversations transfer metrics into Transfers Received and Transfers Made KPIs and table columns; keep deprecated `transferred_count` / `total_transferred` mapped to received.

### Removed
- DAI-408: Remove Agent and Channel & Agent breakdown options from Average Resolution Time. Keep All, Resolution Mode, and Channel.
