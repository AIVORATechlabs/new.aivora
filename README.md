# AiVORA Techlabs — website

Static multi-page site. No build step required to deploy: upload the folder to any web host or static service and it works.

## Pages

| File | Purpose |
|---|---|
| `index.php` | Home |
| `about.php` | About Us |
| `services.php` | Services overview (all five) |
| `erp-implementation.php` | ERP Implementation |
| `custom-software-development.php` | Custom Software Development |
| `ai-custom-software.php` | AI Custom Software |
| `it-consulting.php` | IT Consulting |
| `iso-certification-support.php` | ISO Certification Support (also the "ISO Certification" nav item) |
| `faq.php` | FAQ, grouped by topic |
| `contact.php` | Contact form and details |
| `privacy-policy.php` / `terms-conditions.php` | Legal |
| `sitemap.xml`, `robots.txt` | Search engine files |

Shared assets: `assets/css/style.css` and `assets/js/main.js` — one stylesheet and one script for the whole site, so a change to the header, footer or colours applies everywhere.

## Before it goes live

**1. Metrics (Impact section, home and about pages)**
The four figures are deliberately blank. Search for `EDITABLE METRICS` and replace the `—` inside each `<span class="mx-val">`:

```html
<span class="mx-val" data-metric="experience">—</span>   <!-- e.g. 8+   -->
```

**2. Enquiry forms**
Every form (contact page, home popup, home page and service pages) validates in the browser, then posts to `enquiry-submit.php`, which checks reCAPTCHA v3 and saves the entry to Google Forms. The shared code is under `send every enquiry to Google Forms` in `assets/js/main.js`; the Google Form `entry.*` IDs and the reCAPTCHA secret key live in `enquiry-submit.php`. Service links pass `?service=` so the contact dropdown arrives pre-selected.

**3. Legal pages**
Both are written to match this site accurately, but have them reviewed against the data protection law applicable to your operations before publishing.

**4. Domain**
Canonical URLs, Open Graph tags, JSON-LD and `sitemap.xml` use `https://www.aivoratechlabs.com/`. If the live domain differs, find-and-replace across the PHP files.

Shared header, menu and footer are in `includes/`, so edit them once there.

## Notes

- Type: Manrope (headings) + Inter (body) from Google Fonts.
- Every visual is inline SVG drawn for this site — no stock photos, no third-party logo files.
- Accessibility: skip links, visible focus rings, ARIA on menus, tabs and accordions, keyboard navigation in the industry selector, and `prefers-reduced-motion` respected throughout.
- SEO: one H1 per page, semantic headings, unique titles and descriptions, canonical tags, Open Graph, breadcrumbs, and JSON-LD (Organization on home, Service on each service page, FAQPage on the FAQ, ContactPage on contact).
- Verified with no JavaScript errors and no horizontal overflow at 390px and 1440px on all twelve pages.
- Platform names (Odoo, Zoho, Microsoft Dynamics, Monday.com, Zodopt, VNETIX) appear as plain wordmarks framed as "platforms we work across" — no partnership, certification or client claims anywhere on the site.
