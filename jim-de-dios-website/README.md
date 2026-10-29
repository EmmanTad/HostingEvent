# Jim De Dios: Event Host, Magician, DeDios Audio and Lights
Static website, no build step. Open index.html or upload the folder to Netlify, Vercel, GitHub Pages, etc.

Theme: "Velvet Stage" — black stage, crimson velvet, champagne spotlight and ivory; Cormorant Garamond + Jost.

## Editing
- Colors and fonts: the :root block at the top of styles.css.
- Booking form: inquiries are sent through Formspree. The form link is FORM_URL at the top of app.js; inquiries arrive in the email set on your Formspree account.
- Phone number: replace +63 961 219 2189 and tel:+639612192189 in book.html and the footer of every page.
- Client reviews: replace the [bracketed] text in index.html.
- FAQ: copy a `<details class="fq-i">` block in faq.html to add a question; group headings are the `<h2 class="fq-t">` lines. Review the answers (pricing, travel, booking) so they match how you actually work.
- Services photos: the offerings cards on services.html use temporary illustrations (images/svc-*.svg). Drop in real photos and update each `src`.
- Gallery: copy a <figure class="ph" data-cat="weddings"> block in gallery.html and set data-cat to the matching filter id.

## Animation & intro
- Home page opens with a curtains-opening stage intro (about 5 s, click / Enter / Esc / "Skip intro" to skip). It plays on a fresh visit or reload, not when you click Home from another page. Markup: `#intro` in index.html; styles: "intro stage + curtains" in styles.css; logic: top of the "opening stage" block in app.js.
- Other pages open with a quick curtain-parting wipe.
- Every block is animated on scroll. The effect for each is chosen in app.js ("decorate every block"): `set('.selector','up|left|right|zoom|pop|flip|curtain', stagger)`.
- Velvet colors live in the :root block at the top of styles.css.
- Visitors with "reduce motion" turned on in their device settings get a static site with no intro.
- Responsive: layouts adapt at 1600px+ (large desktop), 900px (tablet: slide-out menu), 760px (phone), 380px (small phone) and for short landscape screens. Phones get fewer floating particles; touch screens skip hover-only effects. Every animation is kept on all sizes.
