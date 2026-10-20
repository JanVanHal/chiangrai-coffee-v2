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

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");
  var main = document.getElementById("main");
  var footer = document.querySelector(".site-footer");
  var desktop = window.matchMedia("(min-width: 960px)");

  function setOpen(open) {
    if (!toggle || !panel) return;
    if (open) panel.removeAttribute("hidden");
    else panel.setAttribute("hidden", "");
    panel.inert = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
    root.classList.toggle("nav-open", open);
    if (main) main.inert = open;
    if (footer) footer.inert = open;
    if (header) header.classList.remove("is-hidden");
  }

  function focusables() {
    var items = [toggle];
    if (panel) {
      panel.querySelectorAll("a").forEach(function (a) {
        items.push(a);
      });
    }
    return items;
  }

  if (toggle && panel) {
    panel.inert = true;

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(open);
      if (open) {
        var first = panel.querySelector("a");
        if (first) first.focus();
      }
    });

    panel.addEventListener("click", function (e) {
      if (e.target === panel) setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (!toggle || toggle.getAttribute("aria-expanded") !== "true") return;
      if (!e.target.closest("a")) return;
      setTimeout(function () { setOpen(false); }, 0);
    });

    document.addEventListener("keydown", function (e) {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        toggle.focus();
        return;
      }
      if (e.key !== "Tab") return;
      var items = focusables();
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    var onDesktop = function (e) {
      if (e.matches) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
  }

  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll(".nav-links a[href^='#'], .nav-panel-links a[href^='#']")
  );
  var seen = [];
  var sections = [];
  navAnchors.forEach(function (a) {
    var id = a.getAttribute("href");
    if (seen.indexOf(id) !== -1) return;
    seen.push(id);
    var sec = document.querySelector(id);
    if (sec) sections.push(sec);
  });

  function updateCurrent() {
    if (!sections.length) return;
    var bar = header ? header.getBoundingClientRect().bottom : 80;
    var line = window.scrollY + Math.max(bar, 0) + 36;
    var current = null;
    sections.forEach(function (sec) {
      var top = sec.getBoundingClientRect().top + window.scrollY;
      if (top <= line) current = sec.id;
    });
    navAnchors.forEach(function (a) {
      if (current && a.getAttribute("href") === "#" + current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  updateCurrent();
  window.addEventListener("scroll", updateCurrent, { passive: true });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lastY = window.scrollY;
  var pinNav = false;
  document.addEventListener("click", function (e) {
    if (!e.target.closest("a[href^='#']")) return;
    pinNav = true;
    if (header) header.classList.remove("is-hidden");
    setTimeout(function () {
      pinNav = false;
      lastY = window.scrollY;
    }, 1000);
  });
  if (!reduce && header) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var open = toggle && toggle.getAttribute("aria-expanded") === "true";
      if (pinNav || open || y < 48) header.classList.remove("is-hidden");
      else if (y > lastY + 8) header.classList.add("is-hidden");
      else if (y < lastY - 8) header.classList.remove("is-hidden");
      lastY = y;
    }, { passive: true });
  }

  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px 12% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  }
})();
