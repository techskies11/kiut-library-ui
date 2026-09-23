# Change Log

## [current]

### Added
- CardMetric optional expandable `details` breakdown rows with chevron toggle (`detailsDefaultOpen`).

### Changed
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
- DAI-532: Treat seller success totals as inclusive while preserving cash and bank-transfer Sankey branches without double counting.
- Table: align body cell vertical padding with header (`py-3`) and remove fixed 61px row height so content is not cramped.

### Removed
- DAI-408: Remove Agent and Channel & Agent breakdown options from Average Resolution Time. Keep All, Resolution Mode, and Channel.
