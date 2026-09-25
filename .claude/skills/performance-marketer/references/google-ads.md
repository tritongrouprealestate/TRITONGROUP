# Google Ads Playbook

Google renames and merges products often. Verify feature names, eligibility and thresholds in the Google Ads Help Centre before a major change.

## Campaign types and when to use them

| Type | Best for | Watch out |
|---|---|---|
| Search | Capturing existing demand. Highest intent. Start here for lead gen | Broad match can drift. Needs negatives and search term review |
| Performance Max | Extra reach across Search, YouTube, Display, Discover, Gmail, Maps using one goal | Low transparency. Can cannibalise brand search. Needs strong conversion signals and good assets. Use brand exclusions and check channel reports |
| Demand Gen | Visual, social style prospecting on YouTube, Discover, Gmail | Behaves more like Meta prospecting. Judge on qualified leads, not clicks |
| YouTube / Video | Awareness and consideration, remarketing | Measure with lift or view through carefully |
| Display | Cheap remarketing | Prospecting display often brings junk leads for lead gen |

## Search structure

- Group by intent theme, not one keyword per ad group. Tight themes: brand, category plus location, competitor, problem or solution terms.
- Keep brand in its own campaign so it does not mask non brand performance and so you control brand CPCs.
- Match types: exact and phrase for control. Broad match works best paired with Smart Bidding and strong conversion data. Test broad in a controlled experiment rather than switching everything.
- Negative keywords: build shared lists (jobs, careers, free, rent if you sell, DIY, irrelevant locations). Review the search terms report at least weekly in the first months.
- Responsive Search Ads: up to 15 headlines and 4 descriptions. Include keyword, benefit, proof, offer, and a call to action. Pin only when legally required.
- Assets (extensions): sitelinks, callouts, structured snippets, call, lead form, location, image. They raise CTR and ad rank.

## Bidding

- New account with little data: Maximise Clicks with a CPC cap or Manual CPC briefly, or Maximise Conversions to gather data.
- Once conversions are steady (a common guideline is 30+ conversions in 30 days per campaign or portfolio), move to Target CPA for lead gen or Target ROAS if values are tracked.
- Change targets by 10 to 20% at a time and allow 1 to 2 weeks (or one conversion lag cycle) before judging.
- Use conversion value rules or offline conversion values to bid for quality, not just volume.

## Conversion setup (the foundation)

- Primary conversions are what bidding optimises to. Keep only real business events as primary (form submit, qualified call, booked visit). Set micro events (page views, scroll) as secondary.
- Enhanced conversions for leads: send hashed first party data to improve matching.
- Offline conversion import from CRM: send back qualified lead, site visit, sale with GCLID or enhanced conversions. This is the biggest quality lever in lead gen.
- Calls: track calls from ads with a minimum call duration that reflects a real conversation.
- Consent Mode is required for EEA and UK traffic. Check it is implemented if you advertise there.

## Performance Max hygiene

- Feed it good assets: multiple images, logos, videos (if none, Google auto generates, often poor), headlines and descriptions.
- Use audience signals (customer lists, website visitors, custom segments) as hints.
- Add brand exclusions if brand Search is running.
- Check the insights and channel performance reports. If most conversions come from low quality inventory, judge it on CRM quality.
- Do not run PMax as the only campaign for lead gen without offline conversion feedback. It optimises for whatever you count, including spam.

## Weekly Google checklist

- Search terms report: add negatives, find new keyword themes
- Impression share and lost IS (budget vs rank). Lost to budget on a profitable campaign means scale opportunity
- CPA or cost per qualified lead by campaign and by device
- Quality Score components on top spend keywords (expected CTR, ad relevance, landing page experience)
- Auction insights: new competitors, overlap rate changes
- Asset performance: replace low performing headlines and images
- Recommendations tab: review, do not auto apply blindly. Many recommendations raise spend
- Conversion tracking status and any "no recent conversions" warnings

## Common money leaks

- Location setting on "presence or interest" when it should be "presence" only
- Search partners and Display network ticked on Search campaigns without review
- Auto applied recommendations turned on
- Broad match with no negatives and no Smart Bidding
- Counting page views or duplicate form fires as primary conversions
- Brand terms absorbed by PMax and reported as "new" conversions
