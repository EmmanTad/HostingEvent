# Jim De Dios: Event Host, Magician, DeDios Audio and Lights
Static website, no build step. Open index.html or upload the folder to Netlify, Vercel, GitHub Pages, etc.

Theme: "Velvet Stage" — black stage, crimson velvet, champagne spotlight and ivory; Cormorant Garamond + Jost.

## Editing
- Colors and fonts: the :root block at the top of styles.css.
- Booking email: set EMAIL at the top of app.js.
- Phone number: replace [+63 900 000 0000] and tel:+639000000000 in book.html and the footer of every page.
- Client reviews: replace the [bracketed] text in index.html.
- FAQ: copy a `<details class="fq-i">` block in faq.html to add a question; group headings are the `<h2 class="fq-t">` lines. Review the answers (pricing, travel, booking) so they match how you actually work.
- Gallery: copy a <figure class="ph" data-cat="weddings"> block in gallery.html and set data-cat to the matching filter id.

## Animation & intro
- Home page opens with a curtains-opening stage intro (about 5 s, click / Enter / Esc / "Skip intro" to skip). It plays on a fresh visit or reload, not when you click Home from another page. Markup: `#intro` in index.html; styles: "intro stage + curtains" in styles.css; logic: top of the "opening stage" block in app.js.
- Other pages open with a quick curtain-parting wipe.
- Every block is animated on scroll. The effect for each is chosen in app.js ("decorate every block"): `set('.selector','up|left|right|zoom|pop|flip|curtain', stagger)`.
- Velvet colors live in the :root block at the top of styles.css.
- Visitors with "reduce motion" turned on in their device settings get a static site with no intro.
- Responsive: layouts adapt at 1600px+ (large desktop), 900px (tablet: slide-out menu), 760px (phone), 380px (small phone) and for short landscape screens. Phones get fewer floating particles; touch screens skip hover-only effects. Every animation is kept on all sizes.

## Mobile app
**Option A, installable app (PWA, easiest).** Upload this folder to HTTPS hosting (Netlify, Vercel, GitHub Pages). On the phone open the site: Android Chrome > menu > "Install app"; iPhone Safari > Share > "Add to Home Screen". It gets its own icon, opens full screen and works offline.
**Option B, real Android app (APK/AAB for Play Store).** Needs Node + Android Studio. Run `npm install` then `npm run android`, then Build > Build APK in Android Studio. Change appId in capacitor.config.json first.
