// Shop name: set once on <html data-shop-name="...">.
(function () {
  var root = document.documentElement;
  var SHOP_NAME = root.dataset.shopName || "[Your Café Name]";

  document.querySelectorAll("[data-shop-name]").forEach(function (el) {
    if (el !== root) el.textContent = SHOP_NAME;
  });

  document.title = SHOP_NAME + " | Coffee in Chiang Rai";

  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", document.title);

  var ogSite = document.querySelector('meta[property="og:site_name"]');
  if (ogSite) ogSite.setAttribute("content", SHOP_NAME);

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  function setOpen(open) {
    if (!toggle || !links) return;
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (toggle.contains(e.target) || links.contains(e.target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    var desktop = window.matchMedia("(min-width: 800px)");
    var onDesktop = function (e) {
      if (e.matches) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
  }

  var navAnchors = links ? Array.prototype.slice.call(links.querySelectorAll("a")) : [];
  var sections = navAnchors.map(function (a) {
    return document.querySelector(a.getAttribute("href"));
  }).filter(Boolean);

  function updateCurrent() {
    if (!sections.length) return;
    var marker = window.scrollY + (document.querySelector(".site-header") || { offsetHeight: 0 }).offsetHeight + 32;
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= marker) current = sec.id;
    });
    navAnchors.forEach(function (a) {
      if (current && a.getAttribute("href") === "#" + current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  updateCurrent();
  window.addEventListener("scroll", updateCurrent, { passive: true });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("js");
    var revealables = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    revealables.forEach(function (el) {
      io.observe(el);
    });
  }
})();
