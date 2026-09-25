# Analysis Playbook

How to explain why numbers moved, and what to do about it.

## 1. Frame the question first

Before touching data, write down:
- Metric that moved, by how much, versus which period (week over week, same period last year, pre vs post change)
- Is the move bigger than normal noise? Compare to the last 8 to 12 weeks of variation. A 15% swing on 20 leads a week is noise. On 400 leads a week it is a signal.
- What changed in the same window: budget, bids, creative, audience, landing page, form, offer, tracking, pricing, competitor activity, season, holidays, platform outages.

## 2. The CPL decomposition (use every time)

CPL = CPM / (1000 x CTR x CVR)

So a CPL change splits into three causes. Compute the percentage change of each between periods:

| Driver | If it rose or fell | Usual causes |
|---|---|---|
| CPM up | Paying more for attention | Seasonal auction pressure (festive season, year end, elections, big sale events), narrower audience, frequency fatigue, low ad quality ranking, new competitors |
| CTR down | Ad stopped earning the click | Creative fatigue, frequency above ~3 to 4 in prospecting, message and audience mismatch, weaker offer, placement mix shifted to low CTR inventory (Audience Network, some Reels) |
| CVR down | Clicks not converting | Landing page slow or broken, form got longer, offer changed, tracking broke, traffic quality dropped (placements, broad match drift), mobile UX issue |

Rough attribution of a change: log(new CPL / old CPL) = log(CPM ratio) - log(CTR ratio) - log(CVR ratio). Report the share each driver explains. This is the single most useful slide in any "why did CPL spike" conversation.

`scripts/analyze_export.py --compare` does this automatically for two period exports.

## 3. Diagnostic tree

```
Lead volume or CPL got worse
├── Did tracking break? (check first, always)
│   ├── Leads in CRM vs leads in platform diverged? → tracking or form integration issue
│   ├── Event Match Quality or dataset quality dropped? → CAPI / Pixel problem
│   └── Sudden drop to near zero on a date? → tag removed, site deploy, consent change
├── Did spend delivery change?
│   ├── Spend down → budget cap, billing issue, disapproved ads, learning limited
│   └── Spend up fast (>20 to 30% jumps) → learning reset, diminishing returns
├── CPM up? → auction, audience size, frequency, season
├── CTR down? → creative fatigue, relevance
├── CVR down? → landing page, form, offer, traffic quality
└── All platform metrics fine but sales down? → lead quality or sales follow up problem, not a media problem
```

The last branch matters. Many "ad problems" are speed to lead problems. If the sales team calls back in 4 hours instead of 5 minutes, contact rates collapse regardless of ad quality. Ask for the CRM funnel.

## 4. Levels of analysis

Go top down. Stop when you find the cause.
1. Account total vs prior period and vs target
2. Channel (Meta vs Google vs others) and campaign type
3. Campaign
4. Ad set or ad group (audience, keyword theme)
5. Ad or creative
6. Breakdowns: placement, device, age, gender, region, hour of day, search term

Concentration check: usually 20% of ads or keywords drive 80% of results. Find them. Find the bottom 20% that eats spend with no results.

## 5. Significance and sample size

Do not call a winner on thin data.
- For conversion rate differences, use a two proportion z test. Rule of thumb: you need roughly 100+ conversions per variant to detect a 20% relative difference with reasonable confidence. With 10 leads each, almost nothing is significant.
- For CPL comparisons with few conversions, look at the confidence interval. 5 leads at 1,000 per lead could easily be 3 to 10 leads with more spend.
- Practical kill rule for a new ad: if it has spent 2 to 3x the target CPL with zero leads, it is safe to pause. Before that, it is still unknown.
- State the sample size in every conclusion.

## 6. Attribution sanity checks

- Platforms over count. Meta and Google can both claim the same lead. Sum of platform conversions often exceeds CRM leads by 10 to 40%.
- Know the window. Meta default is 7 day click, 1 day view. View through conversions inflate numbers on retargeting and brand heavy campaigns. Look at click only for a harder view.
- Google Ads data driven attribution distributes credit across clicks. Changing attribution model changes history.
- The CRM is the source of truth for lead count and quality. The platform is the source of truth for spend and delivery.
- For big budget calls, recommend incrementality evidence: Meta conversion lift tests, geo holdout tests, or on and off tests by region.

## 7. Output template for an analysis

1. **What happened** (one line with numbers)
2. **Why** (driver decomposition with shares, then the specific cause with evidence)
3. **What is not the cause** (ruled out items, briefly)
4. **What to do** (action table)
5. **The other side** (alternative explanation that fits the same data)
6. **What to watch next week** (1 to 3 metrics with thresholds)
