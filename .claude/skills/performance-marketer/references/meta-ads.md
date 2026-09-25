# Meta Ads Playbook

Meta ships changes constantly. Treat feature names and limits here as a starting point and verify anything critical in Ads Manager or the Meta Business Help Centre before acting.

## Account structure principles

- **Consolidate.** Fewer campaigns and ad sets with more budget each exit the learning phase faster. Meta's learning phase guidance has long been about 50 optimisation events per ad set per week. If an ad set cannot reach that, merge ad sets or optimise for a higher funnel event temporarily.
- **Separate by objective and by budget intent,** not by tiny audience slices. A typical lead gen setup:
  - Prospecting: 1 campaign, broad or Advantage+ audience, several creative concepts
  - Retargeting (optional, only if the audience is large enough): website visitors, video viewers, lead form openers who did not submit
  - Testing: 1 campaign with controlled budget for new creative concepts, winners graduate to prospecting
- **Creative is the targeting.** With broad audiences, the ad itself decides who engages. Diversify concepts, formats and messages rather than audiences.
- **Budget:** Campaign budget (Advantage campaign budget) when ad sets are similar. Ad set budget when you need guaranteed spend on a test.

## Objectives and optimisation for lead generation

| Setup | When to use | Watch out |
|---|---|---|
| Leads objective, Instant Form | Fast, cheap volume, mobile first | Lower intent. Use Higher Intent form type, add a qualifying question, and a review screen |
| Leads objective, website conversion | Want landing page control and pixel data | Needs solid Pixel and Conversions API |
| Leads objective, conversion leads optimisation | You send CRM stage data back to Meta | Needs CRM integration (Conversions API for CRM) and enough qualified events |
| Calls or messaging (WhatsApp, Messenger) | Markets where chat is the norm (India, Middle East, SEA) | Need a team that responds within minutes |
| Sales objective | E-commerce or where purchase is tracked | Not for pure lead gen |

The biggest lever for lead quality on Meta is optimising for a deeper event. If you can send "qualified" or "site visit booked" back via Conversions API, do it and eventually optimise for it.

## Special Ad Categories

Housing, employment, credit/financial products and social issues or politics have restricted targeting. Housing covers real estate listings and many property ads. In the US and Canada this has been mandatory for years (no age, gender or narrow zip targeting, minimum radius). Meta has been extending these rules to more countries. Always check whether the category applies in your market before launching, because non compliance means rejected ads or account restrictions.

## Audiences

- Default to broad or Advantage+ audience with only hard constraints (geo, language, legal age).
- Use custom audiences (CRM lists, site visitors, engagers) as signals and for exclusions (exclude existing customers and recent leads from prospecting).
- Lookalikes still help in some accounts but often underperform broad plus good creative now. Test, do not assume.
- Geo: for local businesses or projects, radius or city targeting. Check "people living in" vs "people recently in" settings where available.
- NRI or cross border targeting: target by country with language and interest signals, and localise creative and time zones for call follow up.

## Placements

- Start with Advantage+ placements. Then check the placement breakdown after enough spend.
- If Audience Network or a placement shows cheap clicks but zero quality leads, exclude it.
- Make creative for 9:16 (Stories, Reels), 4:5 (Feed) and 1:1. Missing vertical assets lose Reels inventory.

## Budget and scaling rules

- Increase budgets in steps of about 20% every 2 to 3 days for stable ad sets. Big jumps can reset learning and spike CPL.
- Horizontal scale: duplicate winning concepts into new creative variations rather than only raising budget.
- Do not edit an ad set constantly. Each significant edit can re-enter learning.
- Learning Limited is a signal, not a disaster. It means not enough events. Fix by consolidating, raising budget, or optimising for a more frequent event.

## Signals and tracking

- Pixel plus Conversions API (server side) with deduplication via event_id.
- Check Event Match Quality in Events Manager. Higher is better. Send email, phone, external ID, IP and user agent where consent allows.
- Aggregated Event Measurement and privacy changes reduce observed conversions. Expect modelled numbers.

## Weekly Meta checklist

- Spend pacing vs plan
- CPL and cost per qualified lead by campaign
- Frequency in prospecting (rising above ~3 to 4 weekly with falling CTR means fatigue)
- CTR and hook rate by ad, retire bottom performers
- New creative launched this week (aim for a steady cadence)
- Placement and region breakdown for waste
- Lead form drop off and quality flags from sales
- Account quality, rejected ads, policy warnings

## Using the Meta connector (if available)

Useful tools: `ads_get_ad_accounts`, `ads_get_ad_entities`, `ads_insights_performance_trend`, `ads_insights_anomaly_signal`, `ads_insights_industry_benchmark`, `ads_insights_auction_ranking_benchmarks`, `ads_get_opportunity_score`, `ads_get_dataset_quality`, `ads_library_search` (competitor ads), `ads_get_creatives`, `ads_get_ad_preview`.

Write tools (create, update, activate, pause, budget edits, audience uploads) require explicit user confirmation each time. Show the diff first.

## Competitor research

Use the Meta Ad Library (connector `ads_library_search` or the public site) to see what competitors run: offers, formats, hooks, how long ads have been live (long running ads are likely winners). Summarise patterns, do not copy.
