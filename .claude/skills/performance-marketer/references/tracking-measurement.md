# Tracking and Measurement

Bad tracking makes every other decision wrong. Check it first when numbers look strange.

## Minimum viable measurement stack for lead gen

1. **Meta Pixel + Conversions API** with deduplication (same event_id from browser and server).
2. **Google Ads conversion tracking** with enhanced conversions for leads, plus Google tag or Google Tag Manager.
3. **GA4** with key events for form submit, call click, WhatsApp click. Linked to Google Ads.
4. **UTM parameters** on every ad URL. Consistent naming: utm_source, utm_medium, utm_campaign, utm_content (ad or creative ID), utm_term.
5. **CRM capture** of source, campaign, ad, click IDs (gclid, fbclid / fbc, fbp) and lead stage.
6. **Offline feedback loop:** send qualified lead, visit and sale back to Meta (Conversions API for CRM) and Google (offline conversion import or enhanced conversions for leads).

## Health checks

| Check | How |
|---|---|
| Platform leads vs CRM leads | Compare counts per day. Gap over ~15 to 20% needs investigation |
| Duplicate conversions | Thank you page reloads, double fired tags, both Pixel and CAPI without dedup |
| Meta event quality | Events Manager: Event Match Quality, dataset quality, deduplication status |
| Google conversion status | Conversions page: "Recording", no "No recent conversions" warnings |
| Consent | Consent Mode v2 in EEA or UK. Cookie banner does not block all tags silently |
| Instant form leads | Leads reaching CRM in near real time (integration or Zapier style sync), not downloaded weekly |
| Call tracking | Calls from ads counted with a sensible minimum duration |

## Attribution

- Every platform takes credit generously. Use the CRM for truth on counts and quality.
- Keep one consistent reporting view (for example: CRM first touch source plus platform reported for optimisation).
- For budget decisions above a meaningful threshold, seek incrementality: Meta conversion lift, geo holdouts, or matched market tests.
- Marketing mix modelling (for example Meta Robyn or Google Meridian, both open source) becomes useful once spend and history are large enough. Not a first step for smaller accounts.

## Naming convention (recommended)

Campaign: `[Channel]_[Objective]_[Audience or Theme]_[Geo]_[Start YYYYMM]`
Ad set / ad group: `[Audience]_[Placement or match]_[Optimisation]`
Ad: `[Concept]_[Format]_[Angle]_[Version]`

Consistent names make exports analysable in minutes instead of hours.
