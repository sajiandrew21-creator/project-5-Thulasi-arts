/* ===== Data (kept inline so a single static deploy works) ===== */
const PORTFOLIO = [
  { tag: "Memorial", title: "For Ammachi",   desc: "A 16×20\" graphite portrait commissioned by the Menon family, drawn from a single 1972 photograph.", img: "assets/portfolio-1.jpg" },
  { tag: "Wedding",  title: "Aanya & Rohan", desc: "Couple commission gifted on the morning of their Bangalore wedding — now hanging above their mantle.", img: "assets/portfolio-2.jpg" },
  { tag: "Botanical",title: "Tender Bloom",  desc: "A delicate floral study in graphite, commissioned as a wedding anniversary gift.", img: "assets/portfolio-3.jpg" },
];

const GALLERY = [
  { src: "assets/gallery-1.jpeg", title: "Portrait Study",      caption: "Graphite figure sketch" },
  { src: "assets/artist-sketch.jpg", title: "Artist Sketching", caption: "Hand-drawn portrait study" },
  { src: "assets/gallery-2.jpeg",   title: "Portrait Study",    caption: "Sketch commission" },
  { src: "assets/gallery-5.jpeg",   title: "Portrait Study",    caption: "Pencil portrait" },
  { src: "assets/gallery-3.jpeg",   title: "Portrait Study",    caption: "Graphite sketch" },
  { src: "assets/gallery-6.jpeg",   title: "Portrait Study",    caption: "Artistic composition" },
];

const SERVICES = [
  { icon: "✦", title: "Single Portrait",     price: "from ₹2,500", desc: "A timeless graphite portrait of one subject on premium cotton paper.", features: ["A4 / A3 sizes", "2–3 reference photos", "5–7 day delivery"] },
  { icon: "❀", title: "Family Portrait",     price: "from ₹6,500", desc: "Group composition with up to five subjects.",                          features: ["Up to 5 subjects", "Custom composition", "Frame-ready"] },
  { icon: "♡", title: "Couple Commission",   price: "from ₹4,200", desc: "Romantic dual portraits — anniversaries, weddings, engagements.",     features: ["Personalised quote", "Signed by artist", "Gift wrapping"] },
  { icon: "❋", title: "Pet Portrait",        price: "from ₹3,200", desc: "Lifelike studies of beloved companions.",                              features: ["Pencil or charcoal", "From your photos", "Memorial option"] },
  { icon: "✧", title: "Botanical & Object",  price: "from ₹2,000", desc: "Delicate still-life sketches of florals and meaningful objects.",     features: ["Heirloom illustration", "Wedding florals", "Bespoke gifts"] },
  { icon: "✿", title: "Custom Commission",   price: "by quote",    desc: "Have something different in mind? Let's design a one-of-a-kind piece.", features: ["Free consultation", "Sketch preview", "Worldwide shipping"] },
];

const REVIEWS = [
  { name: "Aarya Menon",      text: "Thulasi captured my late grandmother's smile with breathtaking tenderness. A truly heartfelt artist.", rating: 5 },
  { name: "Daniel Roberts",   text: "Commissioned a couple portrait for our first anniversary. The detail in the eyes is astonishing.",    rating: 5 },
  { name: "Priya Suresh",     text: "Beautiful pet portrait of our golden retriever. Delivery was earlier than promised.",                  rating: 5 },
  { name: "Hannah Williams",  text: "Gifted my parents a family sketch for their 30th anniversary. The most meaningful gift I've given.",  rating: 5 },
];

/* ===== Render helpers ===== */
const $ = (sel, root = document) => root.querySelector(sel);

function renderPortfolio() {
  $("#portfolioGrid").innerHTML = PORTFOLIO.map(p => `
    <article class="card reveal">
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <div class="card-body">
        <span class="card-tag">${p.tag}</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.desc}</p>
      </div>
    </article>`).join("");
}

function renderGallery() {
  $("#galleryGrid").innerHTML = GALLERY.map((g, i) => `
    <button class="gallery-item reveal" data-index="${i}" aria-label="Open ${g.title}">
      <img src="${g.src}" alt="${g.title}" loading="lazy" />
      <div class="gallery-caption"><strong>${g.title}</strong><br /><small>${g.caption}</small></div>
    </button>`).join("");
}

function renderServices() {
  $("#servicesGrid").innerHTML = SERVICES.map(s => `
    <div class="service reveal">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p class="price">${s.price}</p>
      <p>${s.desc}</p>
      <ul>${s.features.map(f => `<li>✓ ${f}</li>`).join("")}</ul>
    </div>`).join("");
}

function renderReviews() {
  $("#reviewsGrid").innerHTML = REVIEWS.map(r => `
    <figure class="review reveal">
      <div class="stars">${"★".repeat(r.rating)}</div>
      <blockquote>“${r.text}”</blockquote>
      <figcaption><span class="avatar">${r.name[0]}</span>
        <div><strong>${r.name}</strong><br /><small class="muted">Verified commission</small></div>
      </figcaption>
    </figure>`).join("");
}

/* ===== Header scroll state + mobile menu ===== */
function initHeader() {
  const header = $("#siteHeader");
  const toggle = $("#menuToggle");
  const mobile = $("#mobileNav");
  const setScrolled = () => header.classList.toggle("scrolled", window.scrollY > 30);
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });
  toggle.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  mobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mobile.classList.remove("open"); toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
  }));
}

/* ===== Reveal-on-scroll using IntersectionObserver ===== */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ===== Lightbox (gallery) ===== */
function initLightbox() {
  const box = $("#lightbox"), img = $("#lightboxImg"), cap = $("#lightboxCap");
  const open = (i) => { const g = GALLERY[i]; img.src = g.src; img.alt = g.title; cap.textContent = `${g.title} — ${g.caption}`; box.hidden = false; };
  const close = () => { box.hidden = true; img.src = ""; };
  $("#galleryGrid").addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-item"); if (btn) open(Number(btn.dataset.index));
  });
  $("#lightboxClose").addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* ===== Contact form (no backend — simulated) ===== */
function initForm() {
  const form = $("#contactForm"), status = $("#formStatus"), btn = $("#submitBtn");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    btn.disabled = true; status.textContent = "Sending…";
    setTimeout(() => {
      status.textContent = "Thank you — I'll be in touch ✦";
      form.reset(); btn.disabled = false;
      setTimeout(() => (status.textContent = ""), 4000);
    }, 900);
  });
}

/* ===== Boot ===== */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  renderPortfolio(); renderGallery(); renderServices(); renderReviews();
  initHeader(); initReveal(); initLightbox(); initForm();
});