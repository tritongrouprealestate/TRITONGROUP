#!/usr/bin/env python3
"""Reverse funnel and budget calculator for lead generation.

Two modes:
  target  : from a sales or revenue target, compute leads and budget needed
  budget  : from a budget, compute expected leads, visits and sales

Rates are decimals (0.25 = 25%).

Examples:
  python funnel_calc.py target --sales 10 --cpl 800 --qual-rate 0.4 \
      --visit-rate 0.3 --close-rate 0.1 --deal-value 9000000 --margin 0.25
  python funnel_calc.py budget --budget 500000 --cpl 800 --qual-rate 0.4 \
      --visit-rate 0.3 --close-rate 0.1
"""
import argparse
import math


def fmt(x):
    if x is None:
        return "n/a"
    if abs(x) >= 100 or float(x).is_integer():
        return f"{x:,.0f}"
    return f"{x:,.2f}"


def funnel_rates(a):
    return a.qual_rate * a.visit_rate * a.close_rate  # sales per raw lead


def affordable_cpl(a, sales_per_lead):
    if not (a.deal_value and a.margin):
        return None
    return a.deal_value * a.margin * sales_per_lead * a.acq_share


def scaling_note(a, budget):
    """Rough diminishing returns: each doubling of spend raises CPL by a.decay."""
    if not a.current_budget or a.current_budget <= 0:
        return None
    doublings = math.log2(budget / a.current_budget) if budget > 0 else 0
    return a.cpl * (1 + a.decay) ** doublings if doublings > 0 else a.cpl


def run_target(a):
    spl = funnel_rates(a)
    sales = a.sales
    if sales is None and a.revenue and a.deal_value:
        sales = a.revenue / a.deal_value
    if sales is None:
        raise SystemExit("Give --sales or --revenue with --deal-value")
    visits = sales / a.close_rate
    qualified = visits / a.visit_rate
    leads = qualified / a.qual_rate
    budget = leads * a.cpl
    adj_cpl = scaling_note(a, budget)
    print("REVERSE FUNNEL (target mode)")
    print(f"  Sales needed           : {fmt(sales)}")
    print(f"  Site visits / meetings : {fmt(visits)}")
    print(f"  Qualified leads        : {fmt(qualified)}")
    print(f"  Raw leads              : {fmt(leads)}")
    print(f"  Budget at CPL {fmt(a.cpl)}  : {fmt(budget)}")
    if adj_cpl and adj_cpl != a.cpl:
        print(f"  With diminishing returns (CPL ~{fmt(adj_cpl)}): budget ~{fmt(leads * adj_cpl)}")
    print(f"  Cost per qualified lead: {fmt(a.cpl / a.qual_rate)}")
    print(f"  Cost per visit         : {fmt(a.cpl / (a.qual_rate * a.visit_rate))}")
    print(f"  Cost per sale (CAC)    : {fmt(a.cpl / spl)}")
    report_affordability(a, spl)


def run_budget(a):
    spl = funnel_rates(a)
    cpl = scaling_note(a, a.budget) or a.cpl
    leads = a.budget / cpl
    print("FORWARD FUNNEL (budget mode)")
    print(f"  Budget                 : {fmt(a.budget)}")
    print(f"  CPL assumed            : {fmt(cpl)}")
    for name, mult in (("Conservative", 0.8), ("Expected", 1.0), ("Optimistic", 1.2)):
        l = leads * mult
        print(f"  {name:<13}: leads {fmt(l)} | qualified {fmt(l * a.qual_rate)} | "
              f"visits {fmt(l * a.qual_rate * a.visit_rate)} | sales {fmt(l * spl)}")
    print("  (Scenarios vary lead volume by +/-20%. Replace with account variance if known.)")
    report_affordability(a, spl)


def report_affordability(a, spl):
    max_cpl = affordable_cpl(a, spl)
    if max_cpl is None:
        print("  Add --deal-value and --margin to check affordability.")
        return
    print(f"  Max affordable CPL     : {fmt(max_cpl)} "
          f"(deal x margin x sales/lead x {a.acq_share:.0%} reinvested)")
    verdict = "OK, within affordable range" if a.cpl <= max_cpl else "NOT affordable at these rates"
    print(f"  Verdict                : {verdict}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("mode", choices=["target", "budget"])
    p.add_argument("--sales", type=float, help="sales / bookings target")
    p.add_argument("--revenue", type=float, help="revenue target (needs --deal-value)")
    p.add_argument("--budget", type=float, help="media budget (budget mode)")
    p.add_argument("--cpl", type=float, required=True, help="expected cost per raw lead")
    p.add_argument("--qual-rate", type=float, required=True, help="lead to qualified rate")
    p.add_argument("--visit-rate", type=float, default=1.0, help="qualified to visit/meeting rate")
    p.add_argument("--close-rate", type=float, required=True, help="visit to sale rate")
    p.add_argument("--deal-value", type=float, help="average deal value")
    p.add_argument("--margin", type=float, help="gross margin as decimal")
    p.add_argument("--acq-share", type=float, default=0.3,
                   help="share of gross margin you accept spending on acquisition (default 0.3)")
    p.add_argument("--current-budget", type=float,
                   help="current monthly budget, enables diminishing returns adjustment")
    p.add_argument("--decay", type=float, default=0.2,
                   help="CPL increase per doubling of spend (default 0.2 = 20%%)")
    a = p.parse_args()
    for r in ("qual_rate", "visit_rate", "close_rate"):
        v = getattr(a, r)
        if not 0 < v <= 1:
            raise SystemExit(f"--{r.replace('_', '-')} must be between 0 and 1")
    if a.mode == "budget":
        if a.budget is None:
            raise SystemExit("budget mode needs --budget")
        run_budget(a)
    else:
        run_target(a)


if __name__ == "__main__":
    main()
