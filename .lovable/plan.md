# Plan

## 1. Rebrand to "Tailored Sweet Treats"

- Update name in nav, hero, about, footer (`src/routes/index.tsx`)
- Update page title, meta description, og tags (`src/routes/__root.tsx`)
- Update Instagram footer link → `https://www.instagram.com/tailoredsweettreats/`
- Update sitemap

## 2. Sharpen the positioning: sugar cookies only, DMV local

Right now the copy is a bit generic. Tightening it around your actual niche:

- **Hero tagline** → something like *"Hand-decorated custom sugar cookies — made in the DMV for weddings, birthdays, and every celebration in between."*
- **Meta title/description** → include "custom sugar cookies" and "DMV / Northern Virginia" for local SEO (people searching "custom sugar cookies Virginia" or "sugar cookies near me")
- **About section** → mention it's a home-based Virginia business serving the DMV (DC, Maryland, Virginia)
- **Footer** → add a small "Serving the DMV — Northern Virginia, Washington DC & Maryland" line
- **JSON-LD LocalBusiness schema** → helps Google understand you're a local bakery in Virginia (boosts Maps / local search visibility)
- Anywhere copy currently says "cookies" generically → tighten to "sugar cookies" so there's no confusion about chocolate chip, macarons, etc.

**A couple of quick questions for local SEO** (feel free to skip any):
- Which city/county in Virginia should I list? (e.g. Fairfax, Loudoun, Arlington) — helps you show up in "near me" searches
- Do you deliver, or is it pickup only? Any delivery radius?
- Contact email you actually want listed? (currently placeholder)

## 3. Restructure the gallery for 25+ photos

- Switch featured-hero layout → uniform responsive grid (2 cols mobile → 3 tablet → 4 desktop)
- Keep the 5 category filters (Weddings, Birthdays, Baby Showers, Corporate, Holidays)
- "Load more" button, 12 photos at a time
- Click any tile → lightbox with caption + arrow-key navigation
- Section heading tweaked to something like *"A few favorite sugar cookie designs"*

## 4. Photo intake workflow (once you send them)

For each photo:
1. Save to `src/assets/gallery/` with kebab-case name (e.g. `wedding-gold-monogram-01.jpg`)
2. Assign to one of the 5 categories based on your notes
3. Write descriptive alt text (e.g. *"Ivory and gold monogram sugar cookies for a Virginia wedding"* — good for image SEO too)
4. Add your caption if provided

**When sending photos, include:**
- Category per batch ("next 8 are birthdays")
- Optional captions
- Which one should replace the hero banner at the top of the homepage

## 5. What I'm NOT changing

- Warm cream/stone/bronze palette, Playfair + Inter fonts
- Casual copy tone
- Quote form fields

## Technical notes

- Gallery data stays as a typed array in `src/routes/index.tsx` (no CMS needed yet). Can migrate to Lovable Cloud later if you want to self-edit.
- If total photo weight goes over ~5 MB, I'll move them to the Lovable CDN so the site stays fast.
- LocalBusiness JSON-LD goes in the root route head.
- Lightbox = small custom component, no new dependency.

## Order of operations

1. You approve this plan (+ answer the local SEO questions if you can)
2. I do the rebrand, positioning tightening, and gallery restructure — you'll see placeholders in the new layout
3. You send photos in batches — I slot them in
