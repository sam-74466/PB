# Pawarbuildkon website

Static site (HTML, CSS, JavaScript, Three.js, GSAP). No build step and no server code.

## Before you go live (5 minutes)
1. **Domain:** the files assume `https://pawarbuildkon.com`. Change it everywhere with
   `grep -rl "https://pawarbuildkon.com" . | xargs sed -i 's#https://pawarbuildkon.com#https://YOURDOMAIN#g'`
2. **Settings:** edit `js/config.js` (public values only). Set `gaId` for Google Analytics 4 and `formEndpoint` for your form service (for example a Formspree form URL). With no `formEndpoint`, the form opens WhatsApp with the message filled in.
3. **Business links:** the five buttons use the URLs in `js/config.js`.
4. **Legal pages:** `privacy.html` and `terms.html` are drafts. Have a lawyer review them before launch.

## Deploy on GitHub Pages
1. Push this folder to a GitHub repository (the files must be at the repository root).
2. Settings > Pages > deploy from branch `main`, folder `/ (root)`.
3. Add your custom domain, then tick **Enforce HTTPS**. Add a `CNAME` file containing your domain.
4. Submit `https://YOURDOMAIN/sitemap.xml` in Google Search Console.

GitHub Pages cannot send custom HTTP headers. The security headers in `_headers` work on Netlify and Cloudflare Pages. The page-level Content Security Policy in each HTML file works everywhere.

## Security and privacy notes
- No API keys or secrets are in the code. Only public values live in `js/config.js`. Never commit `.env` files (they are git-ignored).
- All scripts and fonts are self-hosted, so the site makes no third-party requests until a visitor accepts analytics.
- Analytics only loads after the visitor accepts the cookie banner, and cookies use `SameSite=None; Secure`.
- Form spam protection: hidden honeypot field, minimum fill time, one submission per minute, link limit, length limits.

## Checks
- `python3 tools/check_links.py` finds broken local links.
- After deploying, run Lighthouse in Chrome DevTools (Mobile) and fix anything it flags.
