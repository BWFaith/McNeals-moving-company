/* ===== SETTINGS: edit here ===== */
const CFG = {
  business: "McNeal's Moving & Logistics",
  phone: "931-262-3995",
  ownerEmail: "Mcnealonthemove@gmail.com",
  emailjs: { publicKey: "", serviceId: "", templateId: "" }, // see README step 2
  rate: { 2: 110, 3: 155, 4: 200 }, // hourly price by crew size (2-man rate is from your ads; edit 3 & 4)
  minHours: 2,
  truckFee: 85,
  freeMiles: 15,
  perMile: 2.5,
  longMile: 3,
  stairs: 25,
  tv: 75,
  heavy: 150,
  storage: 60,
  wrap: 40,
  packPct: 0.25,
};
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
document.documentElement.classList.add("js");
const B = document.body,
  PG = B.dataset.page,
  esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
        })[c],
    );
const NAV = [
  ["index", "Home"],
  ["about", "About"],
  ["services", "Services"],
  ["process", "How It Works"],
  ["gallery", "Gallery"],
  ["areas", "Areas"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
];
/* header, banner, cta, footer */
(function () {
  const nav = NAV.map(
    ([p, t]) =>
      `<li><a href="${p}.html" class="${PG === p ? "on" : ""}">${t}</a></li>`,
  ).join("");
  B.insertAdjacentHTML(
    "afterbegin",
    `<header id="hd"><div class="wrap"><a class="logo" href="index.html"><img src="assets/img/logo.jpg" alt="McNeal's Moving & Logistics"></a><nav id="nv"><ul>${nav}<li class="mob"><a href="booking.html" class="btn btn-gold">Get a free quote</a></li></ul></nav><a href="booking.html" class="btn btn-gold hd-cta">Get a free quote</a><button class="burger" aria-label="Menu"><i></i><i></i><i></i></button></div></header>`,
  );
  const t = B.dataset.title;
  if (t)
    $("main").insertAdjacentHTML(
      "afterbegin",
      `<section class="banner"><div class="wrap"><div class="crumb"><a href="index.html">Home</a> / ${esc(t)}</div><h1>${esc(t)}</h1><p>${esc(B.dataset.sub || "")}</p></div></section>`,
    );
  if (PG !== "booking")
    $("main").insertAdjacentHTML(
      "beforeend",
      `<section class="cta"><div class="wrap rv"><h2>Ready when you are. Let's get you moved.</h2><p>Get an instant estimate online, or call us and we'll work out the details together.</p><div class="btns"><a class="btn btn-gold" href="booking.html">Book &amp; get a quote</a><a class="btn btn-line" href="tel:+1${CFG.phone.replace(/\D/g, "")}">Call ${CFG.phone}</a></div></div></section>`,
    );
  B.insertAdjacentHTML(
    "beforeend",
    `<footer><div class="wrap"><div class="gr"><div><a class="logo" href="index.html" style="display:inline-block"><img src="assets/img/logo.jpg" alt="McNeal's logo"></a><p style="margin-top:16px;color:#b9ccbd">Professional residential and commercial movers serving Nashville and Middle Tennessee. Moving people forward.</p></div><div><h4>Company</h4><ul>${NAV.slice(
      0,
      4,
    )
      .map(
        ([p, t]) => `<li><a href="${p}.html">${t}</a></li>`,
      )
      .join(
        "",
      )}</ul></div><div><h4>Explore</h4><ul>${NAV.slice(4)
      .map(
        ([p, t]) => `<li><a href="${p}.html">${t}</a></li>`,
      )
      .join(
        "",
      )}<li><a href="booking.html">Book a move</a></li></ul></div><div><h4>Contact</h4><ul><li><a href="tel:+1${CFG.phone.replace(/\D/g, "")}">${CFG.phone}</a></li><li><a href="mailto:${CFG.ownerEmail}">${CFG.ownerEmail}</a></li><li>Nashville, TN &amp; surrounding areas</li><li><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a></li></ul></div></div><div class="cp"><span>&copy; ${new Date().getFullYear()} ${CFG.business}. All rights reserved.</span><span>Licensed &amp; insured details: add yours here</span></div></div></footer><a class="wa" href="tel:+1${CFG.phone.replace(/\D/g, "")}">Call now</a><div id="lb"><img alt=""></div>`,
  );
  const hd = $("#hd"),
    bg = $(".burger"),
    nv = $("#nv");
  const on = () =>
    hd.classList.toggle("solid", scrollY > 40);
  on();
  addEventListener("scroll", on, { passive: true });
  bg.onclick = () => {
    bg.classList.toggle("x");
    nv.classList.toggle("open");
    B.style.overflow = nv.classList.contains("open")
      ? "hidden"
      : "";
  };
  $$("nav a").forEach((a) =>
    a.addEventListener("click", () => {
      bg.classList.remove("x");
      nv.classList.remove("open");
      B.style.overflow = "";
    }),
  );
  $(".mob").style.cssText = "";
  if (innerWidth > 1060) $(".mob").style.display = "none";
  addEventListener(
    "resize",
    () =>
      ($(".mob").style.display =
        innerWidth > 1060 ? "none" : ""),
  );
})();
/* reveal on scroll (light, no layout shift) */
(function () {
  const io = new IntersectionObserver(
    (e) =>
      e.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add("in");
          io.unobserve(x.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  $$(
    ".card,.rv,.steps li,.tm figure,details,.ba,.gal figure",
  ).forEach((el, i) => {
    if (!el.classList.contains("rv"))
      el.classList.add("rv");
    el.style.setProperty("--d", (i % 4) * 0.08 + "s");
    io.observe(el);
  });
})();
/* counters */
$$("[data-n]").forEach((el) => {
  const n = +el.dataset.n,
    s = el.dataset.s || "";
  new IntersectionObserver((e, o) => {
    if (e[0].isIntersecting) {
      o.disconnect();
      const t0 = performance.now();
      (function f(t) {
        const p = Math.min(1, (t - t0) / 1600);
        el.textContent =
          Math.round(
            n * (1 - Math.pow(1 - p, 3)),
          ).toLocaleString() + s;
        if (p < 1) requestAnimationFrame(f);
      })(t0);
    }
  }).observe(el);
});
/* before/after sliders, gallery filter, lightbox */
$$(".ba").forEach((b) =>
  $("input", b).addEventListener("input", (e) =>
    b.style.setProperty("--p", e.target.value + "%"),
  ),
);
$$(".filters button").forEach(
  (btn) =>
    (btn.onclick = () => {
      $$(".filters button").forEach((x) =>
        x.classList.remove("on"),
      );
      btn.classList.add("on");
      $$(".gal figure").forEach((f) =>
        f.classList.toggle(
          "hide",
          btn.dataset.f !== "all" &&
            f.dataset.c !== btn.dataset.f,
        ),
      );
    }),
);
$$(".gal figure").forEach(
  (f) =>
    (f.onclick = () => {
      $("#lb img").src = $("img", f).src;
      $("#lb").classList.add("on");
    }),
);
$("#lb").onclick = () => $("#lb").classList.remove("on");
addEventListener(
  "keydown",
  (e) =>
    e.key === "Escape" && $("#lb").classList.remove("on"),
);
/* HERO: animated moving-truck scene */
(function () {
  const c = $("#scene");
  if (!c) return;
  const x = c.getContext("2d");
  let W,
    H,
    t = 0,
    vis = true,
    still = matchMedia(
      "(prefers-reduced-motion:reduce)",
    ).matches;
  const mk = (n, a, b, h) => {
    let o = [],
      px = 0;
    for (let i = 0; i < n; i++) {
      const w = a + Math.random() * (b - a);
      o.push({
        x: px,
        w,
        h: h * (0.4 + Math.random()),
        win: Math.random() > 0.4,
      });
      px += w + 6 + Math.random() * 14;
    }
    return { o, tw: px };
  };
  const L = [
    {
      ...mk(28, 50, 100, 230),
      s: 0.25,
      c: "rgba(122,214,60,.10)",
    },
    {
      ...mk(22, 70, 130, 170),
      s: 0.6,
      c: "rgba(217,169,43,.13)",
    },
  ];
  const sp = Array.from({ length: 26 }, () => ({
    x: Math.random(),
    y: Math.random(),
    v: 0.4 + Math.random(),
  }));
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = c.clientWidth;
    H = c.clientHeight;
    c.width = W * d;
    c.height = H * d;
    x.setTransform(d, 0, 0, d, 0, 0);
  }
  size();
  addEventListener("resize", size);
  new IntersectionObserver(
    (e) => (vis = e[0].isIntersecting),
  ).observe(c);
  function rr(a, b, w, h, r, f) {
    x.beginPath();
    x.roundRect(a, b, w, h, r);
    x.fillStyle = f;
    x.fill();
  }
  function truck(px, gy, k) {
    const bob = Math.sin(t * 0.09) * 1.6 * k;
    x.save();
    x.translate(px, gy + bob);
    x.scale(k, k);
    x.fillStyle = "rgba(0,0,0,.35)";
    x.beginPath();
    x.ellipse(110, 2, 150, 9, 0, 0, 7);
    x.fill();
    rr(-40, -150, 230, 120, 8, "#f4f6f2");
    rr(-40, -70, 230, 14, 0, "#1c7a2b");
    rr(-40, -56, 230, 6, 0, "#d9a92b");
    x.fillStyle = "#0a3318";
    x.font = "700 30px Barlow Condensed,sans-serif";
    x.fillText("McNeal's", 8, -100);
    x.fillStyle = "#1c7a2b";
    x.font = "600 15px Barlow,sans-serif";
    x.fillText("MOVING & LOGISTICS", 8, -80);
    rr(196, -112, 78, 82, 10, "#eef2ec");
    x.fillStyle = "#0b2a3a";
    x.beginPath();
    x.moveTo(214, -104);
    x.lineTo(258, -104);
    x.lineTo(270, -72);
    x.lineTo(214, -72);
    x.fill();
    rr(196, -40, 86, 10, 2, "#d9a92b");
    x.fillStyle = "rgba(255,230,140,.35)";
    x.beginPath();
    x.moveTo(282, -44);
    x.lineTo(520, -110);
    x.lineTo(520, 10);
    x.lineTo(282, -30);
    x.fill();
    [20, 214].forEach((wx) => {
      x.save();
      x.translate(wx, -6);
      x.fillStyle = "#111";
      x.beginPath();
      x.arc(0, 0, 24, 0, 7);
      x.fill();
      x.fillStyle = "#cfd6cf";
      x.beginPath();
      x.arc(0, 0, 12, 0, 7);
      x.fill();
      x.rotate(t * 0.35);
      x.strokeStyle = "#555";
      x.lineWidth = 3;
      for (let i = 0; i < 4; i++) {
        x.rotate(Math.PI / 2);
        x.beginPath();
        x.moveTo(0, 0);
        x.lineTo(11, 0);
        x.stroke();
      }
      x.restore();
    });
    x.restore();
  }
  function draw() {
    if (vis || still) {
      x.clearRect(0, 0, W, H);
      const gy = H - 34;
      L.forEach((l, i) => {
        const off = (t * l.s * 1.4) % l.tw,
          base = gy - (i ? 0 : 30);
        x.fillStyle = l.c;
        for (
          let rep = -1;
          rep < Math.ceil(W / l.tw) + 2;
          rep++
        )
          l.o.forEach((b) => {
            const bx = b.x - off + rep * l.tw;
            if (bx > W || bx + b.w < 0) return;
            x.fillRect(bx, base - b.h, b.w, b.h);
            if (b.win) {
              x.fillStyle = "rgba(255,215,110,.35)";
              for (let r = 14; r < b.h - 10; r += 26)
                for (let q = 8; q < b.w - 8; q += 20)
                  if (((r * q + b.x) | 0) % 5 < 2)
                    x.fillRect(
                      bx + q,
                      base - b.h + r,
                      7,
                      10,
                    );
              x.fillStyle = l.c;
            }
          });
      });
      x.fillStyle = "#0a1d10";
      x.fillRect(0, gy, W, H - gy);
      x.fillStyle = "#d9a92b";
      x.fillRect(0, gy, W, 3);
      x.fillStyle = "rgba(255,255,255,.6)";
      for (let i = -1; i < W / 90 + 2; i++)
        x.fillRect(i * 90 - ((t * 7) % 90), gy + 20, 48, 4);
      x.fillStyle = "rgba(255,255,255,.35)";
      sp.forEach((p) => {
        const px = (((p.x * W - t * 14 * p.v) % W) + W) % W;
        x.fillRect(px, gy - 170 * p.y - 20, 60 * p.v, 1.5);
      });
      const k = Math.max(0.5, Math.min(1.05, W / 1150));
      truck(
        Math.min(W * 0.5, W - 300 * k - 20) -
          80 * k +
          (W < 700 ? -60 : 0),
        gy + 4,
        k,
      );
      if (!still) t++;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
/* QUOTE CALCULATOR + EMAIL */
const money = (n) => "$" + Math.round(n).toLocaleString();
let LAST = null;
function calc() {
  const f = $("#qf");
  if (!f) return;
  const g = (n) => f.elements[n],
    crew = +f.querySelector("[name=crew]:checked").value,
    svc = g("service").value,
    mi = +g("miles").value;
  let hrs = Math.max(
    CFG.minHours,
    Math.round(
      +g("size").selectedOptions[0].dataset.h *
        (crew === 2 ? 1 : crew === 3 ? 0.8 : 0.65) *
        2,
    ) / 2,
  );
  if (svc === "commercial")
    hrs = Math.round(hrs * 1.1 * 2) / 2;
  const rows = [
    [
      `Labor: ${crew}-man crew, ~${hrs} hrs @ ${money(CFG.rate[crew])}/hr`,
      hrs * CFG.rate[crew],
    ],
  ];
  const labor = hrs * CFG.rate[crew];
  if (svc !== "labor")
    rows.push(["Truck & equipment", CFG.truckFee]);
  const pm = svc === "long" ? CFG.longMile : CFG.perMile;
  if (mi > CFG.freeMiles)
    rows.push([
      `Travel (${mi - CFG.freeMiles} extra miles)`,
      (mi - CFG.freeMiles) * pm,
    ]);
  if (g("packing").checked)
    rows.push(["Packing service", labor * CFG.packPct]);
  if (g("wrap").checked)
    rows.push(["Furniture wrap & disassembly", CFG.wrap]);
  if (g("heavy").checked)
    rows.push(["Heavy / specialty item", CFG.heavy]);
  if (g("storage").checked)
    rows.push(["Storage unit pickup", CFG.storage]);
  if (+g("stairs").value > 0)
    rows.push([
      `Stairs (${g("stairs").value} flights)`,
      g("stairs").value * CFG.stairs,
    ]);
  if (+g("tv").value > 0)
    rows.push([
      `TV mounting x${g("tv").value}`,
      g("tv").value * CFG.tv,
    ]);
  const tot = rows.reduce((a, r) => a + r[1], 0);
  $("#sl").innerHTML = rows
    .map(
      (r) =>
        `<li><span>${esc(r[0])}</span><b>${money(r[1])}</b></li>`,
    )
    .join("");
  $("#tt").textContent = money(tot);
  $("#rg").textContent =
    `Typical range ${money(tot * 0.92)} to ${money(tot * 1.08)}`;
  $("#mv").textContent = mi + " mi";
  LAST = {
    rows,
    tot,
    hrs,
    crew,
    svc: g("service").selectedOptions[0].text,
    size: g("size").selectedOptions[0].text,
    miles: mi,
  };
}
const qf = $("#qf");
if (qf) {
  qf.addEventListener("input", calc);
  calc();
  const d = $("#bf [name=date]");
  if (d) d.min = new Date().toISOString().slice(0, 10);
}
async function sendBoth(p) {
  const E = CFG.emailjs;
  if (
    !E.publicKey ||
    !E.serviceId ||
    !E.templateId ||
    !window.emailjs
  ) {
    location.href = `mailto:${CFG.ownerEmail}?cc=${encodeURIComponent(p.email)}&subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.text)}`;
    return "mailto";
  }
  emailjs.init({ publicKey: E.publicKey });
  const base = {
    subject: p.subject,
    message: p.text,
    reply_to: p.email,
  };
  await emailjs.send(E.serviceId, E.templateId, {
    ...base,
    to_email: p.email,
    to_name: p.name,
  }); // copy to client
  await emailjs.send(E.serviceId, E.templateId, {
    ...base,
    to_email: CFG.ownerEmail,
    to_name: CFG.business,
  }); // copy to owner
  return "sent";
}
function wire(form, build, done) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const btn = $("button[type=submit]", form),
      m = $(".msg", form);
    btn.disabled = true;
    btn.textContent = "Sending...";
    m.textContent = "";
    try {
      const p = build(new FormData(form)),
        r = await sendBoth(p);
      done(p, r);
    } catch (err) {
      console.error(err);
      m.className = "msg err";
      m.textContent =
        "We could not send that. Please try again or call " +
        CFG.phone +
        ".";
      btn.disabled = false;
      btn.textContent = "Try again";
    }
  });
}
const bf = $("#bf");
if (bf)
  wire(
    bf,
    (d) => {
      calc();
      const ref =
          "MML-" +
          new Date()
            .toISOString()
            .slice(2, 10)
            .replace(/-/g, "") +
          "-" +
          Math.floor(100 + Math.random() * 900),
        q = LAST;
      const text = `${CFG.business} - Booking request ${ref}\n\nCustomer: ${d.get("name")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone")}\nPreferred date: ${d.get("date")} (${d.get("time")})\nMoving from: ${d.get("from")}\nMoving to: ${d.get("to")}\n\nService: ${q.svc}\nSize: ${q.size}\nCrew: ${q.crew} movers, about ${q.hrs} hours\nDistance: ${q.miles} miles\n\nQUOTE BREAKDOWN\n${q.rows.map((r) => `- ${r[0]}: ${money(r[1])}`).join("\n")}\n\nEstimated total: ${money(q.tot)} (range ${money(q.tot * 0.92)} - ${money(q.tot * 1.08)})\n\nNotes: ${d.get("notes") || "None"}\n\nThis is an estimate. We will confirm your final price and time by phone or email. Questions? Call ${CFG.phone}.`;
      return {
        name: d.get("name"),
        email: d.get("email"),
        subject: `Your moving quote ${ref} - ${CFG.business}`,
        text,
        ref,
        tot: q.tot,
      };
    },
    (p, r) => {
      bf.closest(".form").innerHTML =
        `<div class="ok"><h2>Booking request received</h2><p>Reference <b>${p.ref}</b>. Estimated total <b>${money(p.tot)}</b>.</p><p style="margin-top:10px">${r === "sent" ? `A copy of your quote was emailed to <b>${esc(p.email)}</b>. We will contact you shortly to confirm.` : "Your email app should have opened with the quote ready to send. Press send to finish. Or call us at " + CFG.phone + "."}</p></div>`;
      scrollTo({
        top: $(".form").offsetTop - 120,
        behavior: "smooth",
      });
    },
  );
const cf = $("#cf");
if (cf)
  wire(
    cf,
    (d) => ({
      name: d.get("name"),
      email: d.get("email"),
      subject: "New message: " + d.get("subject"),
      text: `From: ${d.get("name")} (${d.get("email")}, ${d.get("phone")})\n\n${d.get("message")}\n\nWe will reply as soon as possible. Call ${CFG.phone} for urgent requests.`,
    }),
    (p, r) => {
      cf.innerHTML = `<div class="ok"><h2>Message sent</h2><p>${r === "sent" ? "Thanks, we will reply shortly." : "Your email app opened. Press send to finish."}</p></div>`;
    },
  );
