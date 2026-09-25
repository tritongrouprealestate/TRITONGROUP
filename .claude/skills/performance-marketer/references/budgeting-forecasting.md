# Budgeting and Forecasting

## 1. Start from the business target (reverse funnel)

Work backwards from what the business needs, not forwards from last year's budget.

```
Revenue target
÷ average deal value            = sales needed
÷ close rate (visit to sale)    = site visits or meetings needed
÷ visit rate (qualified to visit) = qualified leads needed
÷ qualification rate (lead to qualified) = raw leads needed
× expected CPL                  = media budget needed
```

Run `python scripts/funnel_calc.py --help`. It does this and also the reverse: given a budget, what sales it should produce.

Then compare required CPL with the **maximum affordable CPL**:

Max affordable CPL = deal value x gross margin x (sales / leads) x acquisition share of margin

If required CPL is below what the market delivers, the plan is not realistic. Say so and show which lever (conversion rates, deal value, budget, timeline) has to move.

## 2. Allocation across channels and campaigns

Principles:
- **Fund by marginal return, not average return.** The last rupee or dollar spent on a campaign matters, not its average CPL. A campaign with a great average CPL may already be saturated.
- **Signals of room to scale:** Google lost impression share due to budget is high, Meta frequency is low and CPL is stable as spend rises, CPL below target consistently.
- **Signals of saturation:** CPL rises faster than spend, frequency climbs, impression share already above ~80 to 90% on core terms.
- **Keep a test budget.** 10 to 20% for new creative, channels or campaign types. Without it you have no next winner.
- **Protect intent first.** Brand and high intent Search usually get funded before cold prospecting because they are closest to conversion. Check they are not just harvesting people who would convert anyway.

A practical allocation method:
1. Rank campaigns by cost per qualified lead (or CPA from CRM, not platform).
2. Fund the ones below target up to the point where marginal CPL hits target.
3. Cut or fix those above target for 2+ weeks with sufficient data.
4. Reserve test budget.
5. Re check every 2 weeks.

## 3. Pacing

- Daily pacing target = remaining budget / remaining days.
- Flag if month to date spend is more than 10% off plan.
- Watch end of month overspend on Google (daily budget can spend up to 2x on a given day, capped monthly at about 30.4x daily).
- Meta campaign budgets can also fluctuate day to day. Use lifetime budgets for fixed flight dates.

## 4. Forecasting

- Base forecast on the last 8 to 12 weeks of CPL and conversion rates, adjusted for seasonality (same period last year if available).
- Model diminishing returns: assume CPL rises as spend rises. A simple rule when you have no curve: every doubling of spend raises CPL by 15 to 30%. Replace with the account's own data where possible (plot weekly spend vs CPL).
- Always give three scenarios: conservative, expected, optimistic. State the assumption that differs in each.
- Separate leads that will close this month from leads that close later. High ticket sales cycles lag spend by weeks or months.

## 5. Budget recommendation template

| Channel / campaign | Current monthly | Proposed | Change | Current CPQL | Expected CPQL at new spend | Reason |
|---|---|---|---|---|---|---|

Then:
- Expected outcome at proposed budget (leads, qualified leads, visits, sales) with range
- What we give up (the cut or the risk)
- Review date and the metric that would reverse the decision

## 6. The other side (common counter arguments to prepare for)

- "Shift everything to the cheapest channel." Cheapest CPL often means lowest quality or saturation at scale. Show quality and marginal data.
- "Cut the budget, results are bad." Cutting below the learning threshold can make CPL worse. Show the minimum viable budget per campaign (target CPL x ~50 events per week on Meta, ~30 per month on Google Smart Bidding as a guideline).
- "Brand Search is wasted money." Maybe, maybe not. Suggest a geo or time based holdout test to measure how much would come through organically.
