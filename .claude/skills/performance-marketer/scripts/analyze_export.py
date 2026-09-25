#!/usr/bin/env python3
"""Analyse a Meta Ads or Google Ads CSV export. Standard library only.

Usage:
  python analyze_export.py report.csv [--group "Ad name"] [--target-cpl 800]
  python analyze_export.py --compare last_week.csv this_week.csv

Recognises common column names from Meta Ads Manager and Google Ads exports
(Amount spent / Cost, Impressions, Clicks / Link clicks, Leads / Results /
Conversions, Conversion value / Purchase conversion value). Currency symbols
and thousands separators are stripped.
"""
import argparse
import csv
import math
import sys

ALIASES = {
    "spend": ["amount spent", "spend", "cost", "amount spent (inr)", "amount spent (usd)",
              "amount spent (aed)", "cost (converted currency)"],
    "impressions": ["impressions", "impr.", "impr"],
    "clicks": ["link clicks", "clicks", "outbound clicks"],
    "leads": ["leads", "results", "conversions", "on-facebook leads", "website leads",
              "all conv.", "meta leads"],
    "value": ["conversion value", "conv. value", "purchase conversion value",
              "purchases conversion value", "website purchases conversion value"],
    "reach": ["reach"],
}
NAME_COLS = ["ad name", "ad", "ad set name", "ad group", "campaign name", "campaign",
             "search term", "keyword", "placement", "platform", "age", "region"]


def num(v):
    if v is None:
        return 0.0
    s = str(v).strip().replace(",", "")
    for ch in "₹$€£AED ":
        s = s.replace(ch, "")
    s = s.rstrip("%")
    try:
        return float(s)
    except ValueError:
        return 0.0


def load(path):
    with open(path, newline="", encoding="utf-8-sig") as f:
        sample = f.read(4096)
        f.seek(0)
        lines = f.read().splitlines()
    # Google exports often have 1 to 2 title lines before the header
    start = 0
    for i, line in enumerate(lines[:10]):
        low = line.lower()
        if any(k in low for k in ("impr", "impressions")) and ("cost" in low or "spent" in low or "spend" in low):
            start = i
            break
    dialect = csv.Sniffer().sniff(sample, delimiters=",\t;") if sample else csv.excel
    rows = list(csv.DictReader(lines[start:], dialect=dialect))
    if not rows:
        raise SystemExit(f"No rows in {path}")
    header = {h.lower().strip(): h for h in rows[0].keys() if h}
    cols = {}
    for key, names in ALIASES.items():
        for n in names:
            if n in header:
                cols[key] = header[n]
                break
        else:
            for h_low, h in header.items():
                if any(h_low.startswith(n) for n in names):
                    cols[key] = h
                    break
    missing = [k for k in ("spend", "impressions") if k not in cols]
    if missing:
        raise SystemExit(f"Could not find columns {missing}. Headers: {list(header.values())}")
    # drop total rows
    rows = [r for r in rows if not any(str(v).lower().startswith("total") for v in list(r.values())[:3] if v)]
    return rows, cols, header


def metrics(spend, impr, clicks, leads, value, reach=0):
    d = lambda a, b: a / b if b else None
    return {
        "spend": spend, "impr": impr, "clicks": clicks, "leads": leads,
        "ctr": d(clicks, impr), "cpc": d(spend, clicks), "cpm": d(spend * 1000, impr),
        "cvr": d(leads, clicks), "cpl": d(spend, leads), "roas": d(value, spend) if value else None,
        "freq": d(impr, reach) if reach else None,
    }


def aggregate(rows, cols, group_col=None):
    groups = {}
    for r in rows:
        key = r.get(group_col, "ALL") if group_col else "ALL"
        g = groups.setdefault(key or "(blank)", [0.0] * 6)
        g[0] += num(r.get(cols.get("spend")))
        g[1] += num(r.get(cols.get("impressions")))
        g[2] += num(r.get(cols.get("clicks"))) if "clicks" in cols else 0
        g[3] += num(r.get(cols.get("leads"))) if "leads" in cols else 0
        g[4] += num(r.get(cols.get("value"))) if "value" in cols else 0
        g[5] += num(r.get(cols.get("reach"))) if "reach" in cols else 0
    return {k: metrics(*v) for k, v in groups.items()}


def f(x, pct=False):
    if x is None:
        return "-"
    if pct:
        return f"{x * 100:.2f}%"
    return f"{x:,.0f}" if abs(x) >= 100 or float(x).is_integer() else f"{x:,.2f}"


def print_table(res, target_cpl=None, limit=25):
    total = sum(m["spend"] for m in res.values()) or 1
    items = sorted(res.items(), key=lambda kv: kv[1]["spend"], reverse=True)
    print(f"{'Name':<40} {'Spend':>10} {'Share':>6} {'CTR':>7} {'CPM':>8} {'CPC':>8} {'CVR':>7} {'Leads':>6} {'CPL':>8} {'ROAS':>6}")
    for name, m in items[:limit]:
        print(f"{str(name)[:40]:<40} {f(m['spend']):>10} {m['spend'] / total * 100:>5.1f}% "
              f"{f(m['ctr'], True):>7} {f(m['cpm']):>8} {f(m['cpc']):>8} {f(m['cvr'], True):>7} "
              f"{f(m['leads']):>6} {f(m['cpl']):>8} {f(m['roas']):>6}")
    if len(items) > limit:
        print(f"... {len(items) - limit} more rows")
    return items


def flags(items, overall, target_cpl):
    tgt = target_cpl or overall["cpl"]
    out = []
    for name, m in items:
        if m["leads"] == 0 and tgt and m["spend"] >= 2 * tgt:
            out.append(f"WASTE: '{name}' spent {f(m['spend'])} (>=2x target CPL) with 0 leads")
        elif m["cpl"] and tgt and m["cpl"] > 1.5 * tgt and m["leads"] >= 3:
            out.append(f"EXPENSIVE: '{name}' CPL {f(m['cpl'])} is >1.5x target {f(tgt)} on {f(m['leads'])} leads")
        elif m["cpl"] and tgt and m["cpl"] < 0.7 * tgt and m["leads"] >= 5:
            out.append(f"SCALE CANDIDATE: '{name}' CPL {f(m['cpl'])} is <0.7x target on {f(m['leads'])} leads")
        if m["ctr"] and overall["ctr"] and m["ctr"] < 0.5 * overall["ctr"] and m["impr"] > 1000:
            out.append(f"LOW CTR: '{name}' CTR {f(m['ctr'], True)} vs account {f(overall['ctr'], True)}")
        if m["freq"] and m["freq"] > 4:
            out.append(f"FATIGUE RISK: '{name}' frequency {m['freq']:.1f}")
    return out


def pick_group(header, requested):
    if requested:
        for h_low, h in header.items():
            if h_low == requested.lower():
                return h
        raise SystemExit(f"Group column '{requested}' not found")
    for n in NAME_COLS:
        if n in header:
            return header[n]
    return None


def compare(p1, p2):
    r1, c1, _ = load(p1)
    r2, c2, _ = load(p2)
    a = aggregate(r1, c1)["ALL"]
    b = aggregate(r2, c2)["ALL"]
    print(f"{'Metric':<8} {'Period A':>12} {'Period B':>12} {'Change':>8}")
    for k in ("spend", "impr", "clicks", "leads", "cpm", "ctr", "cvr", "cpl"):
        x, y = a[k], b[k]
        ch = f"{(y / x - 1) * 100:+.1f}%" if x and y else "-"
        pct = k in ("ctr", "cvr")
        print(f"{k.upper():<8} {f(x, pct):>12} {f(y, pct):>12} {ch:>8}")
    if all(a[k] and b[k] for k in ("cpm", "ctr", "cvr", "cpl")):
        lc = math.log(b["cpl"] / a["cpl"])
        parts = {
            "CPM (cost of attention)": math.log(b["cpm"] / a["cpm"]),
            "CTR (ad relevance)": -math.log(b["ctr"] / a["ctr"]),
            "CVR (landing page / form)": -math.log(b["cvr"] / a["cvr"]),
        }
        print(f"\nCPL DECOMPOSITION: CPL changed {(b['cpl'] / a['cpl'] - 1) * 100:+.1f}%")
        for k, v in parts.items():
            share = v / lc * 100 if lc else 0
            direction = "pushed CPL up" if v > 0 else "pulled CPL down"
            print(f"  {k:<28} {direction:<16} share of change {share:+.0f}%")
        print("  (Shares sum to 100%. Negative share = worked against the overall move.)")
    else:
        print("\nNot enough data for CPL decomposition (need impressions, clicks and leads in both files).")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("files", nargs="+")
    p.add_argument("--group", help="column to group by (default: first name-like column)")
    p.add_argument("--target-cpl", type=float)
    p.add_argument("--compare", action="store_true", help="compare two period files")
    p.add_argument("--limit", type=int, default=25)
    a = p.parse_args()
    if a.compare:
        if len(a.files) != 2:
            raise SystemExit("--compare needs exactly two files")
        compare(*a.files)
        return
    rows, cols, header = load(a.files[0])
    print("Columns used:", {k: v for k, v in cols.items()})
    if "leads" not in cols:
        print("WARNING: no leads/results/conversions column found. CPL and CVR unavailable.")
    overall = aggregate(rows, cols)["ALL"]
    print("\nACCOUNT TOTAL")
    for k in ("spend", "impr", "clicks", "leads", "ctr", "cpm", "cpc", "cvr", "cpl", "roas"):
        print(f"  {k.upper():<6} {f(overall[k], k in ('ctr', 'cvr'))}")
    g = pick_group(header, a.group)
    if g:
        print(f"\nBY {g.upper()}")
        items = print_table(aggregate(rows, cols, g), a.target_cpl, a.limit)
        fl = flags(items, overall, a.target_cpl)
        print("\nFLAGS")
        print("\n".join(f"  - {x}" for x in fl) if fl else "  none")
        top = sorted([i for i in items if i[1]["leads"]], key=lambda kv: kv[1]["leads"], reverse=True)
        if top and overall["leads"]:
            n = max(1, math.ceil(len(items) * 0.2))
            share = sum(m["leads"] for _, m in top[:n]) / overall["leads"] * 100
            print(f"\nCONCENTRATION: top {n} of {len(items)} rows deliver {share:.0f}% of leads")
    print("\nNote: platform-reported leads. Validate against CRM before budget decisions.")


if __name__ == "__main__":
    try:
        main()
    except BrokenPipeError:
        sys.exit(0)
