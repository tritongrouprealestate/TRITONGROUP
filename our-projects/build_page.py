#!/usr/bin/env python3
"""Generate the Our Projects page body (a single wp:html block inside an alignfull group)."""
import json, sys
from html import escape
from urllib.parse import quote

OUT = sys.argv[1]
UP = 'https://tritongroup.in/wp-content/uploads/'
IMG = {
    'hv': UP + '2026/03/triton-humming-valley-villas-nandi-hills.webp',
    'aero': UP + '2026/10/sanvi-aero-gardens-rooftop-pool-sunset.webp',
    'eloria': UP + '2026/03/triton-codename-eloria-villas-rajanukunte.webp',
    'uitc': UP + '2026/03/triton-up-in-the-clouds-villas-nandi-hills.webp',
    'high': UP + '2026/03/triton-highstreet-commercial-bagalur.webp',
    'res': UP + '2026/05/WhatsApp-Image-2026-05-05-at-12.15.24-PM-1.webp',
    'sank': UP + '2026/05/WhatsApp-Image-2026-05-05-at-12.15.24-PM-2.webp',
    'sam': UP + '2026/05/WhatsApp-Image-2026-05-05-at-12.15.24-PM.webp',
    'sai': UP + '2026/06/sai-residency-sanvi-triton-group.png',
    'eus': UP + '2026/05/WhatsApp-Image-2026-05-05-at-12.15.23-PM.webp',
}
e = escape
def wa(n):
    return 'https://wa.me/919036682626?text=' + quote("Hi, I'd like details on " + n, safe="'")

ongoing = [
    dict(slug='triton-humming-valley', name='Triton Humming Valley', tags='villas', badge='Ongoing · Villas',
         location='Near Nandi Hills · North Bangalore',
         desc='A private, Bali-inspired retreat of 3, 4 & 5 BHK triplex villas at the foothills of Nandi Hills. Resort-like living with a lift to every floor, an indoor waterfall and a roof terrace with plunge pool.',
         facts=[('Starting from', '₹3.5 Cr'), ('Configuration', '3, 4 & 5 BHK'), ('Villas', '30'), ('Possession', 'Oct 2026')],
         points=['Infinity swimming pools, jacuzzis & clubhouse amenities', 'Rental income of ₹30 to 36 Lakhs annually', 'STRR & NH44 highway 15 minutes away', 'Kempegowda International Airport in 30 minutes'],
         rera='PRM/KA/RERA/1254/460/PR/131224/007292', url='https://villas.tritongroup.in/', cta='Discover Humming Valley',
         img=IMG['hv'], w=1446, h=1087, alt='Triton Humming Valley luxury villas near Nandi Hills, North Bangalore'),
    dict(slug='sanvi-aero-gardens', name='Sanvi Aero Gardens', tags='apartments', badge='Ongoing · Apartments',
         location='Kannamangala Gate, Devanahalli · Near Bengaluru Airport',
         desc='Spacious 1 BHK apartments in Block A, 600 to 820 sq ft, beside NH44. 316 homes on 5 acres with rooftop pools and a 10,000 sq ft clubhouse, in North Bengaluru’s fastest-growing rental market.',
         facts=[('Starting from', '₹68 Lakhs'), ('Configuration', '1 BHK · 600 to 820 sq ft'), ('Land · Units', '5 acres · 316'), ('Completion', 'Dec 2027')],
         points=['Rooftop swimming pools & 10,000 sq ft clubhouse', 'Right beside NH44 National Highway', '15 minutes from KIADB & Aerospace tech parks', '10 minutes from Kempegowda International Airport'],
         rera='ACK/KA/RERA/1250/303/PR/201124/008686', url='https://tritongroup.in/residential-projects-north-bangalore-triton-group/', cta='View Aero Gardens',
         img=IMG['aero'], w=1200, h=900, alt='Rooftop pool at Sanvi Aero Gardens apartments near Kempegowda Airport, North Bangalore'),
]
upcoming = [
    dict(slug='triton-codename-eloria', name='Triton Codename Eloria', tags='villas', type='Villas', theme='French-themed', location='Rajanukunte, near Yelahanka',
         desc='Luxury 4 & 5 BHK villas across 8 acres with private jacuzzi pools, personal lifts and rooftop terraces.', img=IMG['eloria'], w=1448, h=1086,
         alt='Triton Codename Eloria French-themed luxury villas in Rajanukunte, North Bengaluru'),
    dict(slug='triton-up-in-the-clouds', name='Triton Up in The Clouds', tags='villas', type='Villas', theme='Swiss-themed', location='Foothills of Nandi Hills',
         desc='A private 4 acre hillside retreat of 3, 4 & 5 BHK villas with private pools and panoramic hill views.', img=IMG['uitc'], w=1600, h=887,
         alt='Living room with mountain views at Triton Up in The Clouds villas near Nandi Hills'),
    dict(slug='triton-highstreet', name='Triton Highstreet', tags='commercial', type='Commercial', theme='Retail & office', location='KIADB Tech Park, Bagalur Cross',
         desc='A commercial landmark built for high visibility, strong footfall and future-ready growth.', img=IMG['high'], w=684, h=376,
         alt='Triton Highstreet commercial project at Bagalur'),
]
completed = [
    dict(slug='sanvi-residency', name='Sanvi Residency', tags='apartments', location='Horamavu Agara', year='2015',
         desc='2 & 3 BHK apartments up to 1,420 sq ft, connected to Banaswadi, Hennur, ORR and Manyata Tech Park. Fully occupied.', img=IMG['res'],
         alt='Sanvi Residency completed apartments in Horamavu Agara, Bengaluru'),
    dict(slug='sanvi-sankalpam', name='Sanvi Sankalpam', tags='apartments', location='Nagondanahalli, Whitefield', year='2016',
         desc='76 low-rise 2 & 3 BHK homes up to 1,550 sq ft on 1 acre, near ITPL and Hope Farm Junction.', img=IMG['sank'],
         alt='Sanvi Sankalpam completed apartments in Whitefield, Bengaluru'),
    dict(slug='sanvi-samveda', name='Sanvi Samveda', tags='apartments', location='Medahalli', year='2018',
         desc='2 & 3 BHK homes near Old Madras Road, East Bengaluru. A thriving, established community.', img=IMG['sam'],
         alt='Sanvi Samveda completed apartment community in Medahalli, East Bengaluru'),
    dict(slug='sai-residency', name='Sai Residency', tags='apartments', location='Krishnarajapuram', year='2018',
         desc='1, 2 & 3 BHK homes in the Virgonagar and KR Puram corridor, close to schools, workplaces and hospitals.', img=IMG['sai'],
         alt='Sai Residency completed apartments in KR Puram, Bengaluru'),
    dict(slug='eustoma-serenity-gardens', name='Eustoma Serenity Gardens', tags='apartments', location='Nagondanahalli, Whitefield', year='2019',
         desc='88 low-rise 2 & 3 BHK homes up to 1,775 sq ft on 1 acre, near Hope Farm Junction and ITPL.', img=IMG['eus'],
         alt='Eustoma Serenity Gardens completed apartments in Whitefield, Bengaluru'),
]
locations = [
    ('Luxury villas near Nandi Hills', 'Bali, Swiss and resort-style 3, 4 & 5 BHK villas in the foothills of Nandi Hills, 30 minutes from Kempegowda International Airport and 15 minutes from the STRR and NH44.', [('Triton Humming Valley', '#triton-humming-valley'), ('Up in The Clouds', '#triton-up-in-the-clouds')]),
    ('Apartments near Kempegowda International Airport', 'Spacious 1 BHK flats from 600 to 820 sq ft, 10 minutes from the airport and beside NH44, with strong rental demand from the KIADB Aerospace Park and nearby tech parks.', [('Sanvi Aero Gardens', '#sanvi-aero-gardens')]),
    ('Commercial property in Bagalur', 'Retail and office space at KIADB Tech Park, Bagalur, built for high visibility and footfall on North Bengaluru’s airport corridor.', [('Triton Highstreet', '#triton-highstreet')]),
    ('Upcoming villa projects in Rajanukunte', 'French-themed 4 & 5 BHK villas at Codename Eloria in Rajanukunte, near Yelahanka in North Bengaluru.', [('Codename Eloria', '#triton-codename-eloria')]),
    ('Ready homes in East Bengaluru & Whitefield', 'Delivered 2 & 3 BHK apartment communities in Horamavu Agara, Medahalli, KR Puram and Whitefield, close to Hennur, Old Madras Road, ITPL and Manyata Tech Park.', [('Sanvi Residency', '#sanvi-residency'), ('Sanvi Samveda', '#sanvi-samveda'), ('Eustoma Serenity Gardens', '#eustoma-serenity-gardens'), ('Sai Residency', '#sai-residency')]),
]
faqs = [
    ('What projects does Triton Group have in North Bangalore?', 'Ongoing: Triton Humming Valley (villas near Nandi Hills) and Sanvi Aero Gardens (apartments near Kempegowda International Airport). Upcoming: Triton Codename Eloria, Triton Highstreet and Triton Up in The Clouds. Delivered: Sanvi Residency, Sanvi Samveda, Sai Residency, Eustoma Serenity Gardens and Sanvi Sankalpam.'),
    ('Are Triton Group projects RERA approved?', 'Yes. Triton Humming Valley is registered under PRM/KA/RERA/1254/460/PR/131224/007292 and Sanvi Aero Gardens under ACK/KA/RERA/1250/303/PR/201124/008686.'),
    ('What is the starting price of villas at Triton Humming Valley?', '3, 4 & 5 BHK triplex villas at Triton Humming Valley near Nandi Hills start from ₹3.5 Cr.'),
    ('Which Triton project is closest to Kempegowda International Airport?', 'Sanvi Aero Gardens, about 10 minutes from the airport, offers spacious 1 BHK apartments starting from ₹68 Lakhs.'),
    ('Is North Bangalore good for real estate investment?', 'North Bengaluru is shaped by the airport, NH44, the STRR and the KIADB Aerospace and tech parks, infrastructure that drives rental demand and long-term appreciation.'),
    ('Was Triton Group formerly Sanvi Group?', 'Yes. Triton Group, formerly Sanvi Group, has developed residential communities in Bengaluru for 15 years, with over 10 million sq ft developed and planned and 1,000+ homeowners.'),
]

CSS = r"""
.tg-op{--ink-900:#0A0F0E;--teal-1000:#04110F;--teal-900:#071A17;--teal-800:#0A2420;--teal-700:#0E322C;--teal-600:#134239;--teal-500:#1B564A;--teal-400:#2E6E60;--teal-300:#5C9184;--teal-200:#9FBAB2;--teal-100:#D6E2DE;--paper-000:#FFFFFF;--paper-100:#FAF8F4;--paper-200:#F4F1EA;--text-on-inverse:var(--paper-200);--line-on-inverse:rgba(244,241,234,.16);--line-on-inverse-strong:rgba(244,241,234,.34);--gradient-signature:linear-gradient(180deg,#1B564A 0%,#0A2420 48%,#000 100%);--gradient-signature-diagonal:linear-gradient(135deg,#1B564A 0%,#0A2420 50%,#000 100%);--gradient-signature-radial:radial-gradient(120% 90% at 20% 0%,#1B564A 0%,#0A2420 45%,#000 100%);--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-7:48px;--space-8:64px;--space-9:96px;--space-10:128px;--grid-gutter:clamp(16px,2vw,32px);--page-margin:clamp(20px,5vw,88px);--container-max:1680px;--container-editorial:1180px;--section-y-tight:clamp(64px,7vw,120px);--font-display:"Gloock",Georgia,"Times New Roman",serif;--font-sans:"Instrument Sans","Helvetica Neue",Arial,sans-serif;--type-display-1:clamp(2.375rem,5.6vw,6rem);--type-display-2:clamp(2rem,4vw,4.125rem);--type-title-1:clamp(1.5rem,2.4vw,2.625rem);--type-title-2:clamp(1.25rem,1.75vw,1.75rem);--type-lead:clamp(1.0625rem,1.35vw,1.4375rem);--type-body:1rem;--type-body-sm:.9375rem;--type-caption:.8125rem;--type-label:.6875rem;--leading-display:1.02;--leading-title:1.12;--leading-lead:1.5;--leading-body:1.65;--tracking-hero:-.025em;--tracking-display:-.015em;--tracking-title:-.005em;--tracking-label:.22em;--tracking-label-wide:.34em;--measure-prose:62ch;--measure-lead:44ch;--ease-out-architectural:cubic-bezier(.16,1,.3,1);--ease-standard:cubic-bezier(.4,0,.2,1);--dur-fast:220ms;--dur-base:420ms;--dur-slow:720ms;
font-family:var(--font-sans);font-size:var(--type-body);font-weight:400;line-height:var(--leading-body);color:var(--teal-100);background:#000;overflow-x:clip;-webkit-font-smoothing:antialiased;font-variant-numeric:lining-nums tabular-nums;letter-spacing:0;text-align:left;width:100%;max-width:none;margin:0!important}
.tg-op *,.tg-op *::before,.tg-op *::after{box-sizing:border-box}
.tg-op h1,.tg-op h2,.tg-op h3,.tg-op p,.tg-op ul,.tg-op ol,.tg-op li,.tg-op dl,.tg-op dd,.tg-op dt,.tg-op figure{margin:0;padding:0}
.tg-op ul,.tg-op ol{list-style:none}
.tg-op h1,.tg-op h2,.tg-op h3{font-family:var(--font-display);font-weight:400;color:var(--paper-100);text-transform:none;letter-spacing:var(--tracking-display);line-height:var(--leading-display);text-wrap:balance}
.tg-op p{font-family:var(--font-sans);text-wrap:pretty}
.tg-op img{display:block;max-width:100%}
.tg-op a{color:var(--teal-200);text-decoration:none;transition:color var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard)}
.tg-op a:hover{color:var(--paper-000)}
.tg-op a:focus-visible,.tg-op button:focus-visible{outline:1px solid var(--teal-200);outline-offset:4px}
.tg-op button{font-family:var(--font-sans);text-transform:none;box-shadow:none;margin:0}
.tg-op .tg-wrap{max-width:var(--container-max);margin:0 auto}
.tg-op .tg-label{font-size:var(--type-label);letter-spacing:var(--tracking-label);text-transform:uppercase;font-weight:500;line-height:1.2;color:var(--teal-200)}
.tg-op .tg-sec{padding:var(--section-y-tight) var(--page-margin)}
/* buttons */
.tg-op a.tg-btn{display:inline-flex;align-items:center;gap:var(--space-3);font-family:var(--font-sans);font-weight:500;text-transform:uppercase;line-height:1;border:1px solid;border-radius:2px;padding:15px 28px;font-size:var(--type-label);letter-spacing:var(--tracking-label);white-space:nowrap;transition:background var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-out-architectural)}
.tg-op a.tg-btn:active{transform:translateY(2px)}
.tg-op a.tg-btn-lg{padding:20px 40px;font-size:12px;letter-spacing:var(--tracking-label-wide)}
.tg-op a.tg-btn-primary{background:var(--paper-200);color:var(--teal-1000);border-color:var(--paper-200)}
.tg-op a.tg-btn-primary:hover{background:var(--paper-000);color:var(--teal-1000);border-color:var(--paper-000)}
.tg-op a.tg-btn-secondary{background:transparent;color:var(--paper-200);border-color:var(--line-on-inverse-strong)}
.tg-op a.tg-btn-secondary:hover{background:transparent;color:var(--paper-200);border-color:var(--paper-200)}
.tg-op .tg-btns{display:flex;flex-wrap:wrap;gap:var(--space-4)}
/* intro */
.tg-op .tg-intro{background:var(--gradient-signature-radial);color:var(--text-on-inverse);padding:var(--space-10) var(--page-margin) var(--space-9)}
.tg-op .tg-intro .tg-wrap{display:flex;flex-direction:column;gap:var(--space-7)}
.tg-op .tg-intro-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));gap:var(--space-8);align-items:end}
.tg-op h1{font-size:var(--type-display-1);letter-spacing:var(--tracking-hero)}
.tg-op .tg-mask{display:block;overflow:hidden;padding-bottom:.06em}
.tg-op .tg-mask>span{display:block}
.tg-op .tg-lead-col{display:flex;flex-direction:column;gap:var(--space-6);max-width:var(--measure-lead)}
.tg-op .tg-lead{font-size:var(--type-lead);line-height:var(--leading-lead);color:var(--teal-100)}
.tg-op .tg-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:var(--space-6);margin-top:var(--space-6)}
.tg-op .tg-stat{padding-top:var(--space-5);border-top:1px solid var(--line-on-inverse)}
.tg-op .tg-stat-n{font-family:var(--font-display);font-size:var(--type-display-2);line-height:1;letter-spacing:var(--tracking-display);color:var(--text-on-inverse)}
.tg-op .tg-stat-l{margin-top:var(--space-4)}
/* filter */
.tg-op .tg-filter{background:var(--teal-800);padding:var(--space-8) var(--page-margin) var(--space-2)}
.tg-op .tg-toolbar{max-width:var(--container-max);margin:0 auto;display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--space-7);align-items:flex-end;border-bottom:1px solid var(--line-on-inverse-strong);padding-bottom:var(--space-6)}
.tg-op .tg-count{display:flex;align-items:baseline;gap:var(--space-4)}
.tg-op .tg-count-n{font-family:var(--font-display);font-size:var(--type-display-2);line-height:1;color:var(--paper-100)}
.tg-op .tg-count-t{display:flex;flex-direction:column;gap:6px}
.tg-op .tg-chipcols{display:flex;flex-direction:column;gap:var(--space-5);min-width:0;max-width:100%;overflow-x:auto;scrollbar-width:none}
.tg-op .tg-chipcols::-webkit-scrollbar{display:none}
.tg-op .tg-chiprow{display:grid;grid-template-columns:96px minmax(0,1fr);gap:var(--space-4);align-items:baseline}
.tg-op .tg-chips{display:flex;flex-wrap:nowrap;white-space:nowrap;gap:var(--space-2) var(--space-6)}
.tg-op button.tg-chip{position:relative;display:inline-flex;align-items:flex-start;gap:6px;padding:6px 0;background:none;border:0;border-radius:0;cursor:pointer;font-family:var(--font-display);font-size:var(--type-title-2);font-weight:400;line-height:1.1;color:var(--teal-300);transition:color var(--dur-fast) var(--ease-standard)}
.tg-op button.tg-chip:hover,.tg-op button.tg-chip[aria-pressed="true"]{color:var(--paper-100);background:none}
.tg-op button.tg-chip[aria-pressed="true"]{color:var(--paper-000)}
.tg-op .tg-chip sup{font-family:var(--font-sans);font-size:10px;letter-spacing:.08em;color:var(--teal-200);line-height:1;top:0;vertical-align:baseline}
.tg-op .tg-chip i{position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--teal-200);transform-origin:left;transform:scaleX(0);transition:transform 600ms var(--ease-out-architectural)}
.tg-op .tg-chip[aria-pressed="true"] i{transform:scaleX(1)}
/* section header */
.tg-op .tg-sechead{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:var(--space-5);border-bottom:1px solid var(--line-on-inverse);padding-bottom:var(--space-6)}
.tg-op h2{font-size:var(--type-display-2)}
.tg-op .tg-sechead p{max-width:44ch;color:var(--teal-200)}
/* ongoing */
.tg-op .tg-ongoing{background:linear-gradient(180deg,#000 0%,var(--teal-1000) 100%)}
.tg-op .tg-ongoing .tg-wrap{display:flex;flex-direction:column;gap:var(--space-9)}
.tg-op .tg-feature{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:var(--space-8);align-items:center}
.tg-op .tg-media{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--teal-800)}
.tg-op .tg-media img,.tg-op .tg-thumb img,.tg-op .tg-poster img,.tg-op .tg-wide img{width:100%;height:100%;object-fit:cover;transition:transform 1400ms var(--ease-out-architectural)}
.tg-op .tg-media:hover img,.tg-op .tg-thumb:hover img,.tg-op .tg-poster:hover img,.tg-op .tg-wide:hover img{transform:scale(1.03)}
.tg-op .tg-badge{position:absolute;top:var(--space-5);left:var(--space-5);padding:8px 12px;background:rgba(7,26,23,.44);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:var(--paper-100);pointer-events:none}
.tg-op .tg-badge.tg-label{color:var(--paper-100)}
.tg-op .tg-body{display:flex;flex-direction:column;gap:var(--space-6)}
.tg-op .tg-titles{display:flex;flex-direction:column;gap:var(--space-3)}
.tg-op .tg-body>p{max-width:52ch}
.tg-op .tg-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:var(--space-5) var(--space-6)}
.tg-op .tg-fact{border-top:1px solid var(--line-on-inverse);padding-top:var(--space-3);display:flex;flex-direction:column;gap:6px}
.tg-op .tg-fact dd{font-family:var(--font-display);font-size:1.375rem;line-height:1.2;color:var(--paper-100)}
.tg-op .tg-points{display:flex;flex-direction:column}
.tg-op .tg-points li{display:flex;gap:var(--space-4);padding:12px 0;border-bottom:1px solid var(--line-on-inverse);font-size:var(--type-body-sm)}
.tg-op .tg-points li span{color:var(--teal-300);font-size:var(--type-label);letter-spacing:.1em;padding-top:3px}
.tg-op .tg-rera{font-size:var(--type-caption);color:var(--teal-200)}
/* upcoming */
.tg-op .tg-upcoming{background:var(--gradient-signature)}
.tg-op .tg-upcoming .tg-wrap{display:flex;flex-direction:column;gap:var(--space-8)}
.tg-op .tg-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:var(--space-7) var(--grid-gutter)}
.tg-op .tg-card{display:flex;flex-direction:column;gap:var(--space-4)}
.tg-op .tg-poster{aspect-ratio:4/5;overflow:hidden;background:var(--teal-800)}
.tg-op .tg-cardmeta{display:flex;justify-content:space-between;gap:var(--space-3);border-top:1px solid var(--line-on-inverse);padding-top:var(--space-3)}
.tg-op h3{font-size:var(--type-title-2);line-height:var(--leading-title);letter-spacing:0}
.tg-op h3.tg-h3-lg{font-size:var(--type-display-2);line-height:var(--leading-display);letter-spacing:var(--tracking-display)}
.tg-op .tg-loc{font-size:var(--type-caption);letter-spacing:.04em;color:var(--teal-200)}
.tg-op .tg-card p.tg-desc{font-size:var(--type-body-sm)}
.tg-op a.tg-link{margin-top:auto;display:inline-flex;align-items:center;gap:var(--space-3);font-size:var(--type-label);letter-spacing:var(--tracking-label);text-transform:uppercase;font-weight:500;color:var(--paper-100);padding:var(--space-2) 0;border-bottom:1px solid var(--line-on-inverse-strong);align-self:flex-start}
.tg-op a.tg-link:hover{border-color:var(--teal-200);color:var(--teal-200)}
/* completed */
.tg-op .tg-completed{background:#000}
.tg-op .tg-completed .tg-wrap{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:var(--space-8);align-items:start}
.tg-op .tg-completed header{display:flex;flex-direction:column;gap:var(--space-4);max-width:44ch}
.tg-op .tg-completed header p{color:var(--teal-200)}
.tg-op .tg-list{border-top:1px solid var(--line-on-inverse-strong)}
.tg-op .tg-item{display:grid;grid-template-columns:minmax(0,200px) minmax(0,1fr);gap:var(--space-6);align-items:start;padding:var(--space-6) 0;border-bottom:1px solid var(--line-on-inverse)}
.tg-op .tg-thumb{aspect-ratio:16/10;overflow:hidden;background:var(--teal-800)}
.tg-op .tg-item-body{display:flex;flex-direction:column;gap:var(--space-2)}
.tg-op .tg-item-meta{display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--space-3)}
.tg-op .tg-item-body p{font-size:var(--type-body-sm);max-width:56ch}
.tg-op .tg-empty{padding:var(--space-10) var(--page-margin);text-align:center}
.tg-op .tg-empty p{font-family:var(--font-display);font-size:var(--type-title-1);color:var(--paper-100);margin-bottom:var(--space-5)}
.tg-op .tg-empty button{background:none;border:0;border-bottom:1px solid var(--line-on-inverse-strong);border-radius:0;padding:var(--space-2) 0;font-size:var(--type-label);letter-spacing:var(--tracking-label);text-transform:uppercase;font-weight:500;cursor:pointer;color:var(--paper-100)}
/* locations */
.tg-op .tg-locations{background:var(--gradient-signature-diagonal)}
.tg-op .tg-locations .tg-wrap{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:var(--space-8);align-items:start}
.tg-op .tg-loc-left{display:flex;flex-direction:column;gap:var(--space-6)}
.tg-op .tg-loc-left>p{max-width:52ch;color:var(--teal-200)}
.tg-op .tg-wide{aspect-ratio:16/10;overflow:hidden;background:var(--teal-800)}
.tg-op .tg-loc-list{border-top:1px solid var(--line-on-inverse-strong)}
.tg-op .tg-loc-item{display:flex;flex-direction:column;gap:var(--space-3);padding:var(--space-6) 0;border-bottom:1px solid var(--line-on-inverse)}
.tg-op .tg-loc-item p{max-width:60ch;font-size:var(--type-body-sm)}
.tg-op .tg-loc-links{display:flex;flex-wrap:wrap;gap:var(--space-2) var(--space-5);margin-top:var(--space-2)}
.tg-op .tg-loc-links a{padding:4px 0;border-bottom:1px solid var(--line-on-inverse)}
.tg-op .tg-loc-links a:hover{border-color:var(--teal-200)}
@media(min-width:960px){.tg-op .tg-loc-left{position:sticky;top:var(--space-9)}.tg-op .tg-feature.tg-alt .tg-media{order:2}}
/* faq */
.tg-op .tg-faq{background:#000}
.tg-op .tg-faq .tg-wrap{max-width:var(--container-editorial);display:flex;flex-direction:column;gap:var(--space-7)}
.tg-op .tg-acc{border-top:1px solid var(--line-on-inverse)}
.tg-op .tg-acc-item{border-bottom:1px solid var(--line-on-inverse)}
.tg-op button.tg-acc-q{width:100%;display:flex;align-items:baseline;gap:var(--space-5);padding:var(--space-5) 0;background:none;border:0;border-radius:0;cursor:pointer;text-align:left;font:inherit;color:inherit}
.tg-op .tg-acc-n{flex:none;width:28px;font-size:var(--type-label);font-weight:500;letter-spacing:var(--tracking-label);color:var(--teal-200)}
.tg-op .tg-acc-t{flex:1;font-family:var(--font-display);font-size:var(--type-title-2);letter-spacing:var(--tracking-title);line-height:var(--leading-title);color:var(--paper-100)}
.tg-op .tg-acc-i{flex:none;width:14px;height:14px;position:relative;margin-top:6px}
.tg-op .tg-acc-i::before,.tg-op .tg-acc-i::after{content:"";position:absolute;background:var(--paper-100)}
.tg-op .tg-acc-i::before{top:6px;left:0;width:14px;height:1px}
.tg-op .tg-acc-i::after{top:0;left:6px;width:1px;height:14px;transition:transform var(--dur-base) var(--ease-out-architectural)}
.tg-op .tg-acc-q[aria-expanded="true"] .tg-acc-i::after{transform:scaleY(0)}
.tg-op .tg-acc-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--dur-slow) var(--ease-out-architectural)}
.tg-op .tg-acc-q[aria-expanded="true"]+.tg-acc-a{grid-template-rows:1fr}
.tg-op .tg-acc-a>div{overflow:hidden}
.tg-op .tg-acc-a p{padding:0 0 var(--space-6) 52px;max-width:var(--measure-prose);font-size:var(--type-body-sm);line-height:var(--leading-body);color:var(--teal-200);opacity:0;transition:opacity var(--dur-base) var(--ease-standard)}
.tg-op .tg-acc-q[aria-expanded="true"]+.tg-acc-a p{opacity:1}
/* enquire */
.tg-op .tg-enquire{background:var(--gradient-signature);color:var(--text-on-inverse)}
.tg-op .tg-enquire .tg-wrap{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:var(--space-8);align-items:end}
.tg-op .tg-enquire .tg-col{display:flex;flex-direction:column;gap:var(--space-6)}
.tg-op a.tg-mail{color:var(--teal-100);font-size:var(--type-body);align-self:flex-start;border-bottom:1px solid var(--line-on-inverse-strong);padding-bottom:4px}
.tg-op a.tg-mail:hover{color:var(--paper-000);border-color:var(--paper-200)}
/* motion (only when JS is running) */
.tg-op.tg-js [data-reveal="1"]:not(.tg-in){opacity:0;transform:translateY(28px)}
.tg-op.tg-js [data-reveal="img"]:not(.tg-in){opacity:0;transform:scale(1.04);clip-path:inset(8% 0 0 0)}
.tg-op.tg-js [data-reveal="line"]:not(.tg-in){transform:translateY(105%)}
.tg-op.tg-js [data-reveal]{transition:opacity 1100ms var(--ease-out-architectural),transform 1100ms var(--ease-out-architectural),clip-path 1400ms var(--ease-out-architectural)}
.tg-op.tg-js [data-reveal="img"].tg-in{clip-path:inset(0 0 0 0)}
.tg-op [hidden]{display:none!important}
@media(max-width:640px){.tg-op .tg-item{grid-template-columns:minmax(0,1fr)}.tg-op .tg-chiprow{grid-template-columns:minmax(0,1fr);gap:var(--space-2)}.tg-op .tg-acc-a p{padding-left:0}}
@media(prefers-reduced-motion:reduce){.tg-op *{transition-duration:1ms!important;animation-duration:1ms!important}.tg-op.tg-js [data-reveal]:not(.tg-in){opacity:1!important;transform:none!important;clip-path:none!important}}
"""

JS = r"""
(function(){
var root=document.getElementById('tg-op');if(!root)return;
root.classList.add('tg-js');
/* theme hook: the hero is dark, so let the fixed header float transparent over it (theme turns it solid after 80px of scroll) */
var hw=document.querySelector('.site-header .header-wrapper.position-fixed');if(hw)hw.classList.add('is-transparent');
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* tracking: feeds the site's existing dataLayer / gtag / fbq, no extra tags are loaded */
window.dataLayer=window.dataLayer||[];
window.tritonTrack=function(name,p){p=Object.assign({page:'our-projects'},p||{});window.dataLayer.push(Object.assign({event:'triton_'+name},p));
if(window.gtag){window.gtag('event',name,p)}
if(window.fbq){p.lead?window.fbq('track','Contact',p):window.fbq('trackCustom',name,p)}};
document.addEventListener('click',function(ev){var el=ev.target.closest&&ev.target.closest('.tg-op [data-track]');if(!el)return;var h=el.getAttribute('href')||'';
tritonTrack(el.dataset.track,{project:el.dataset.project||'',label:(el.textContent||'').trim().slice(0,60),lead:/^(tel:|mailto:|https:\/\/wa\.me)/.test(h)})},true);
var hit={};addEventListener('scroll',function(){var s=(scrollY+innerHeight)/document.documentElement.scrollHeight*100;[25,50,75,90].forEach(function(m){if(s>=m&&!hit[m]){hit[m]=1;tritonTrack('scroll_depth',{percent:m})}})},{passive:true});
/* reveal */
var q=function(s,c){return Array.prototype.slice.call((c||root).querySelectorAll(s))};
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target;io.unobserve(el);el.classList.add('tg-in');
if(el.dataset.projectView)tritonTrack('project_impression',{project:el.dataset.projectView})})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
q('[data-reveal="line"]').forEach(function(el,i){el.style.transitionDelay=(i*90)+'ms';setTimeout(function(){el.classList.add('tg-in')},120)});
function watch(){q('[data-reveal]:not([data-reveal="line"]):not(.tg-seen),[data-project-view]:not(.tg-seen)').forEach(function(el){el.classList.add('tg-seen');if(reduce)el.classList.add('tg-in');io.observe(el)})}
watch();
/* counters */
q('[data-count]').forEach(function(el){var to=+el.dataset.count,suf=el.dataset.suffix||'';if(reduce)return;el.textContent='0'+suf;
var cio=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;cio.disconnect();var t0=performance.now();(function step(t){var p=Math.min(1,(t-t0)/1600),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=v+suf;if(p<1)requestAnimationFrame(step)})(t0)},{threshold:.4});cio.observe(el)});
/* filter */
var items=q('[data-status]'),chips=q('.tg-chip'),sections=q('[data-section]'),state='all';
var names={all:'Entire portfolio',ongoing:'Ongoing',upcoming:'Upcoming',completed:'Delivered',villas:'Villas',apartments:'Apartments',commercial:'Commercial'};
function match(el,f){return f==='all'||el.dataset.status===f||el.dataset.tags.split(' ').indexOf(f)>-1}
chips.forEach(function(c){var k=c.dataset.filter;c.querySelector('sup').textContent=('0'+items.filter(function(el){return match(el,k)}).length).slice(-2)});
function apply(f){state=f;var n=0;
chips.forEach(function(c){c.setAttribute('aria-pressed',c.dataset.filter===f?'true':'false')});
items.forEach(function(el){var ok=match(el,f);el.hidden=!ok;if(ok)n++});
sections.forEach(function(s){s.hidden=!q('[data-status]:not([hidden])',s).length});
q('[data-feature]').filter(function(a){return !a.hidden}).forEach(function(a,i){a.classList.toggle('tg-alt',i%2===1)});
root.querySelector('[data-result-n]').textContent=('0'+n).slice(-2);
root.querySelector('[data-result-l]').textContent=names[f];
root.querySelector('[data-empty]').hidden=n>0;
watch()}
chips.forEach(function(c){c.addEventListener('click',function(){apply(c.dataset.filter)})});
root.querySelector('[data-reset]').addEventListener('click',function(){apply('all')});
apply('all');
/* in-page links: reveal the target even if a filter hides it */
q('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(ev){var id=a.getAttribute('href').slice(1);if(!id)return;var t=document.getElementById(id);if(!t)return;
if(t.hidden||t.closest('[hidden]'))apply('all');ev.preventDefault();t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});if(history.replaceState)history.replaceState(null,'','#'+id)})});
/* accordion */
q('.tg-acc-q').forEach(function(b){b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')==='true';
q('.tg-acc-q').forEach(function(o){o.setAttribute('aria-expanded','false')});b.setAttribute('aria-expanded',open?'false':'true')})});
})();
"""

def fonts():
    return ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gloock&amp;family=Instrument+Sans:wght@400;500;600&amp;display=swap">')

def btn(href, label, variant, track, project='', lg=False, extra=''):
    cls = 'tg-btn tg-btn-%s%s' % (variant, ' tg-btn-lg' if lg else '')
    p = ' data-project="%s"' % e(project) if project else ''
    return '<a class="%s" href="%s" data-track="%s"%s%s>%s</a>' % (cls, e(href), track, p, extra, label)

def picture(p):
    return '<img src="%s" alt="%s" loading="lazy" decoding="async" width="%d" height="%d">' % (e(p['img']), e(p['alt']), p['w'], p['h'])

def feature(p):
    facts = ''.join('<div class="tg-fact"><dt class="tg-label">%s</dt><dd>%s</dd></div>' % (e(k), e(v)) for k, v in p['facts'])
    pts = ''.join('<li><span>%02d</span>%s</li>' % (i + 1, e(t)) for i, t in enumerate(p['points']))
    return (
        '<article id="%(slug)s" class="tg-feature" data-feature data-status="ongoing" data-tags="%(tags)s" data-project-view="%(nm)s">'
        '<div class="tg-media" data-reveal="img">%(pic)s<span class="tg-badge tg-label">%(badge)s</span></div>'
        '<div class="tg-body" data-reveal="1"><div class="tg-titles"><span class="tg-label">%(loc)s</span><h3 class="tg-h3-lg">%(nm)s</h3></div>'
        '<p>%(desc)s</p><dl class="tg-facts">%(facts)s</dl><ul class="tg-points">%(pts)s</ul>'
        '<p class="tg-rera">RERA · %(rera)s</p><div class="tg-btns">%(b1)s%(b2)s</div></div></article>'
    ) % dict(slug=p['slug'], tags=p['tags'], nm=e(p['name']), pic=picture(p), badge=e(p['badge']), loc=e(p['location']), desc=e(p['desc']),
             facts=facts, pts=pts, rera=e(p['rera']),
             b1=btn(p['url'], e(p['cta']), 'primary', 'project_details', p['name']),
             b2=btn(wa(p['name']), 'Enquire on WhatsApp', 'secondary', 'whatsapp_click', p['name'], extra=' target="_blank" rel="noopener"'))

def card(p):
    return (
        '<article id="%(slug)s" class="tg-card" data-reveal="1" data-status="upcoming" data-tags="%(tags)s" data-project-view="%(nm)s">'
        '<div class="tg-poster" data-reveal="img">%(pic)s</div>'
        '<div class="tg-cardmeta tg-label"><span>%(type)s</span><span>%(theme)s</span></div>'
        '<h3>%(nm)s</h3><p class="tg-loc">%(loc)s</p><p class="tg-desc">%(desc)s</p>'
        '<a class="tg-link" href="#enquire" data-track="register_interest" data-project="%(nm)s">Register interest <span aria-hidden="true">→</span></a></article>'
    ) % dict(slug=p['slug'], tags=p['tags'], nm=e(p['name']), pic=picture(p), type=e(p['type']), theme=e(p['theme']), loc=e(p['location']), desc=e(p['desc']))

def done(p):
    return (
        '<li id="%(slug)s" class="tg-item" data-reveal="1" data-status="completed" data-tags="%(tags)s">'
        '<div class="tg-thumb">%(pic)s</div><div class="tg-item-body"><div class="tg-item-meta tg-label"><span>%(loc)s</span><span>Delivered %(yr)s</span></div>'
        '<h3>%(nm)s</h3><p>%(desc)s</p></div></li>'
    ) % dict(slug=p['slug'], tags=p['tags'], nm=e(p['name']), pic='<img src="%s" alt="%s" loading="lazy" decoding="async" width="1024" height="640">' % (e(p['img']), e(p['alt'])),
             loc=e(p['location']), yr=p['year'], desc=e(p['desc']))

def chip(k, label):
    return '<button type="button" class="tg-chip" data-filter="%s" data-track="filter_select" data-project="%s" aria-pressed="false">%s<sup>00</sup><i aria-hidden="true"></i></button>' % (k, k, label)

def loc(l):
    t, d, links = l
    ls = ''.join('<a class="tg-label" href="%s" data-track="location_project_click" data-project="%s">%s</a>' % (h, e(n), e(n)) for n, h in links)
    return '<article class="tg-loc-item" data-reveal="1"><h3>%s</h3><p>%s</p><div class="tg-loc-links">%s</div></article>' % (e(t), e(d), ls)

def faq(i, q, a):
    return ('<div class="tg-acc-item"><button type="button" class="tg-acc-q" id="tg-q%d" aria-expanded="false" aria-controls="tg-a%d"><span class="tg-acc-n">%02d</span><span class="tg-acc-t">%s</span><span class="tg-acc-i" aria-hidden="true"></span></button>'
            '<div class="tg-acc-a" id="tg-a%d" role="region" aria-labelledby="tg-q%d"><div><p>%s</p></div></div></div>') % (i, i, i + 1, e(q), i, i, e(a))

def stat(n, suffix, label):
    return '<div class="tg-stat"><div class="tg-stat-n"><span data-count="%d" data-suffix="%s">%d%s</span></div><div class="tg-stat-l tg-label">%s</div></div>' % (n, suffix, n, suffix, e(label))

jsonld = {
    "@context": "https://schema.org",
    "@graph": [
        {"@type": "ItemList", "name": "Triton Group projects", "itemListElement": [
            {"@type": "ListItem", "position": 1, "item": {"@type": "Residence", "name": "Triton Humming Valley", "description": "3, 4 & 5 BHK Bali-inspired triplex villas near Nandi Hills, North Bangalore. RERA PRM/KA/RERA/1254/460/PR/131224/007292.", "url": "https://villas.tritongroup.in/", "address": {"@type": "PostalAddress", "addressLocality": "Nandi Hills, North Bangalore", "addressRegion": "Karnataka", "addressCountry": "IN"}}},
            {"@type": "ListItem", "position": 2, "item": {"@type": "ApartmentComplex", "name": "Sanvi Aero Gardens", "description": "Spacious 1 BHK apartments (600 to 820 sq ft) near Kempegowda International Airport, 316 units on 5 acres. RERA ACK/KA/RERA/1250/303/PR/201124/008686.", "numberOfAccommodationUnits": 316, "address": {"@type": "PostalAddress", "addressLocality": "North Bangalore", "addressRegion": "Karnataka", "addressCountry": "IN"}}},
            {"@type": "ListItem", "position": 3, "item": {"@type": "Residence", "name": "Triton Codename Eloria", "description": "French-themed 4.5 & 5 BHK luxury villas in Rajanukunte, North Bengaluru."}},
            {"@type": "ListItem", "position": 4, "item": {"@type": "Place", "name": "Triton Highstreet", "description": "Premium commercial development at KIADB Tech Park, Bagalur."}},
            {"@type": "ListItem", "position": 5, "item": {"@type": "Residence", "name": "Triton Up in The Clouds", "description": "Swiss-themed exclusive villa community near Nandi Hills."}}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]},
    ],
}

html = []
html.append('<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"default"}} -->')
html.append('<div class="wp-block-group alignfull" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">')
html.append('<!-- wp:html -->')
html.append(fonts())
html.append('<style>' + CSS.strip() + '</style>')
html.append('<script type="application/ld+json">' + json.dumps(jsonld, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + '</script>')
html.append('<div class="tg-op" id="tg-op">')

# intro
html.append('<section class="tg-intro" aria-labelledby="projects-title"><div class="tg-wrap"><div class="tg-intro-grid">'
            '<h1 id="projects-title"><span class="tg-mask"><span data-reveal="line">Residential &amp; commercial</span></span><span class="tg-mask"><span data-reveal="line">projects in North Bangalore</span></span></h1>'
            '<div class="tg-lead-col" data-reveal="1"><p class="tg-lead">Luxury villas near Nandi Hills, apartments beside Kempegowda International Airport and commercial addresses at Bagalur. Every Triton Group location is chosen by research before it is designed.</p>'
            '<div class="tg-btns">' + btn('#ongoing', 'Explore projects', 'primary', 'cta_view_projects') + btn('#enquire', 'Schedule a site visit', 'secondary', 'cta_enquire_intro') + '</div></div></div>'
            '<div class="tg-stats">' + stat(15, '', 'Years building in Bengaluru') + stat(10, 'M+', 'Sq ft developed & planned') + stat(1000, '+', 'Homeowners') + '</div></div></section>')

# filter
html.append('<div class="tg-filter"><div class="tg-toolbar" role="toolbar" aria-label="Filter projects">'
            '<div class="tg-count"><span class="tg-count-n" data-result-n>10</span><span class="tg-count-t tg-label"><span>Projects shown</span><span data-result-l aria-live="polite">Entire portfolio</span></span></div>'
            '<div class="tg-chipcols"><div class="tg-chiprow"><span class="tg-label">By stage</span><div class="tg-chips">'
            + chip('all', 'All') + chip('ongoing', 'Ongoing') + chip('upcoming', 'Upcoming') + chip('completed', 'Delivered') +
            '</div></div><div class="tg-chiprow"><span class="tg-label">By type</span><div class="tg-chips">'
            + chip('villas', 'Villas') + chip('apartments', 'Apartments') + chip('commercial', 'Commercial') + '</div></div></div></div></div>')

# ongoing
html.append('<section class="tg-sec tg-ongoing" id="ongoing" data-section aria-labelledby="ongoing-title"><div class="tg-wrap">'
            '<header class="tg-sechead" data-reveal="1"><h2 id="ongoing-title">Now selling in North Bengaluru</h2><p>RERA-registered villas and apartments under construction, positioned for rental demand and long-term appreciation.</p></header>'
            + ''.join(feature(p) for p in ongoing) + '</div></section>')

# upcoming
html.append('<section class="tg-sec tg-upcoming" id="upcoming" data-section aria-labelledby="upcoming-title"><div class="tg-wrap">'
            '<header class="tg-sechead" data-reveal="1"><h2 id="upcoming-title">Next on the corridor</h2><p>Themed villa communities and a commercial landmark, opening for early registration across North Bangalore.</p></header>'
            '<div class="tg-cards">' + ''.join(card(p) for p in upcoming) + '</div></div></section>')

# completed
html.append('<section class="tg-sec tg-completed" id="completed" data-section aria-labelledby="completed-title"><div class="tg-wrap">'
            '<header data-reveal="1"><h2 id="completed-title">Handed over, fully lived in</h2><p>Apartment communities across East Bengaluru and Whitefield, delivered under the Sanvi Group name. The track record behind every Triton project.</p></header>'
            '<ol class="tg-list">' + ''.join(done(p) for p in completed) + '</ol></div></section>')

# empty
html.append('<section class="tg-empty" data-empty hidden><p>No projects match this filter</p><button type="button" data-reset>Show all projects</button></section>')

# locations
html.append('<section class="tg-sec tg-locations" aria-labelledby="locations-title"><div class="tg-wrap"><div class="tg-loc-left">'
            '<h2 id="locations-title" data-reveal="1">Villas, apartments &amp; commercial property in North Bangalore</h2>'
            '<p data-reveal="1">Looking for a gated villa community near Nandi Hills, a 1 BHK apartment near Kempegowda Airport or commercial space near the KIADB Aerospace Park? Find the right Triton Group project for each North Bengaluru location.</p>'
            '<div class="tg-wide" data-reveal="img"><img src="%s" alt="Rooftop lounge with views of Nandi Hills, North Bangalore" loading="lazy" decoding="async" width="1600" height="887"></div></div>' % IMG['uitc']
            + '<div class="tg-loc-list">' + ''.join(loc(l) for l in locations) + '</div></div></section>')

# faq
html.append('<section class="tg-sec tg-faq" aria-labelledby="faq-title"><div class="tg-wrap"><div data-reveal="1"><h2 id="faq-title">Frequently asked questions</h2></div>'
            '<div data-reveal="1"><div class="tg-acc">' + ''.join(faq(i, q, a) for i, (q, a) in enumerate(faqs)) + '</div></div></div></section>')

# enquire
html.append('<section class="tg-sec tg-enquire" id="enquire" aria-labelledby="enquire-title"><div class="tg-wrap">'
            '<div class="tg-col" data-reveal="1"><h2 id="enquire-title">Find the Triton address that fits you</h2></div>'
            '<div class="tg-col" data-reveal="1"><div class="tg-btns">'
            + btn('tel:+919036682626', 'Call +91 90366 82626', 'primary', 'phone_click', lg=True)
            + btn('https://wa.me/919036682626?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Triton%20Group%20projects', 'WhatsApp', 'secondary', 'whatsapp_click', lg=True, extra=' target="_blank" rel="noopener"')
            + '</div><a class="tg-mail" href="mailto:sales@tritongroup.in" data-track="email_click">sales@tritongroup.in</a></div></div></section>')

html.append('</div>')
html.append('<script>' + JS.strip() + '</script>')
html.append('<!-- /wp:html -->')
html.append('</div>')
html.append('<!-- /wp:group -->')

open(OUT, 'w', encoding='utf-8').write('\n'.join(html))
print('wrote', OUT, sum(len(x) for x in html))
