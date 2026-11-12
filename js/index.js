/* ============================================================
   Vértice Racing — plantilla web
   JavaScript sin dependencias. Todo se pinta desde demo-data.js
   ============================================================ */

(function () {
  "use strict";

  var DATA = window.RACING_DATA || null;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  var currentYear = new Date().getFullYear();

  /* ---------- 1. Año y datos del equipo ---------- */
  function paintStatic() {
    $$("[data-year]").forEach(function (el) { el.textContent = currentYear; });
    if (!DATA) return;
    $$("[data-chassis]").forEach(function (el) { el.textContent = DATA.team.chassis; });
    $$("[data-power-unit]").forEach(function (el) { el.textContent = DATA.team.powerUnit; });
    $$("[data-team-principal]").forEach(function (el) { el.textContent = DATA.team.principal; });
  }

  /* ---------- 2. Menú ---------- */
  function initNav() {
    var toggle = $("#navToggle");
    var links = $("#navLinks");
    var header = $("#siteHeader");

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    var onScroll = function () {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
      var bar = $("#scrollProgress");
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ")";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 3. Navegación interna sin hash en la URL ---------- */
  function initSmoothLinks() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", location.pathname);
    });
  }

  /* ---------- 4. Enlace activo ---------- */
  function initActiveLink() {
    var links = $$('#navLinks a[href^="#"]');
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var a = map[en.target.id];
          if (!a) return;
          links.forEach(function (l) { l.classList.remove("is-current"); });
          a.classList.add("is-current");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }

  /* ---------- 5. Reveals ---------- */
  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;

    var check = function () {
      var limit = (window.innerHeight || 800) * 0.94;
      items.forEach(function (el) {
        if (el.classList.contains("is-visible")) return;
        var r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > -40) el.classList.add("is-visible");
      });
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("load", check);
    /* red de seguridad: nada queda oculto si algo falla */
    window.setTimeout(function () {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }, 3000);
  }

  /* ---------- 6. Contadores ---------- */
  function initCounters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;

    var run = function (el) {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      var end = parseFloat(el.getAttribute("data-count")) || 0;
      var start = performance.now();
      var dur = 1100;
      var step = function (now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased).toLocaleString("es-ES");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    var check = function () {
      var limit = (window.innerHeight || 800) * 0.92;
      nums.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) run(el);
      });
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.setTimeout(function () { nums.forEach(run); }, 3000);
  }

  /* ---------- 7. Temporadas: pestañas y paneles ---------- */
  function renderSeasons() {
    if (!DATA) return;
    var tabsEl = $("#seasonTabs");
    var panelsEl = $("#seasonPanels");
    var body = $("#seasonsBody");

    var rows = DATA.seasons.slice().sort(function (a, b) { return b.year - a.year; });
    var activeYear = rows[0] ? rows[0].year : currentYear;

    if (tabsEl) {
      tabsEl.innerHTML = rows
        .map(function (s) {
          var on = s.year === activeYear;
          return (
            '<button class="tab' + (on ? " is-active" : "") + '" role="tab" aria-selected="' + on +
            '" aria-controls="t' + s.year + '" id="tab' + s.year + '">' + s.year + "</button>"
          );
        })
        .join("");
    }

    if (panelsEl) {
      panelsEl.innerHTML = rows
        .map(function (s) {
          var note = s.note || {};
          var on = s.year === activeYear;
          var title = note.title || s.year + " · " + s.chassis;
          var paras = (note.body || [])
            .map(function (p) { return "<p>" + esc(p) + "</p>"; })
            .join("");
          var facts = [
            ["Posición", s.pos != null ? s.pos + "º" : "—"],
            ["Puntos", s.points != null ? s.points : "—"],
            ["Podios", s.podiums != null ? s.podiums : "—"],
            ["Chasis", s.chassis],
          ]
            .map(function (f) {
              return "<li><span>" + esc(f[0]) + "</span><strong>" + esc(f[1]) + "</strong></li>";
            })
            .join("");

          return (
            '<article class="tab-panel' + (on ? " is-active" : "") + '" id="t' + s.year +
            '" role="tabpanel" aria-labelledby="tab' + s.year + '"' + (on ? "" : " hidden") +
            '><div class="panel-grid"><div><h3>' + esc(title) + "</h3>" + paras +
            '</div><ul class="panel-facts">' + facts + "</ul></div></article>"
          );
        })
        .join("");
    }

    if (body) {
      body.innerHTML = rows
        .map(function (s, i) {
          return (
            "<tr" + (i >= 4 ? ' data-extra="1"' : "") + "><td>" + s.year + "</td><td>" + esc(s.drivers) +
            "</td><td>" + esc(s.chassis) + "</td><td>" + (s.pos != null ? s.pos + "º" : "—") +
            "</td><td>" + (s.podiums != null ? s.podiums : "—") + "</td><td>" +
            (s.points != null ? s.points : "—") + "</td></tr>"
          );
        })
        .join("");
    }

    var more = $("#seasonsMore");
    if (more) {
      var extra = rows.length - 4;
      more.hidden = extra <= 0;
      if (extra > 0) {
        more.textContent = "Ver todas las temporadas (" + rows.length + ")";
        more.setAttribute("aria-expanded", "false");
        if (body) body.classList.remove("is-expanded");
      }
    }
  }

  function initTabs() {
    var tabsEl = $("#seasonTabs");
    if (!tabsEl) return;

    tabsEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".tab");
      if (!btn) return;
      var id = btn.getAttribute("aria-controls");

      $$(".tab", tabsEl).forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      $$(".tab-panel").forEach(function (p) {
        var on = p.id === id;
        p.classList.toggle("is-active", on);
        if (on) p.removeAttribute("hidden");
        else p.setAttribute("hidden", "");
      });
    });

    tabsEl.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var tabs = $$(".tab", tabsEl);
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      var next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      next.click();
    });
  }

  function initMoreRows() {
    var btn = $("#seasonsMore");
    var body = $("#seasonsBody");
    if (!btn || !body) return;
    btn.addEventListener("click", function () {
      var open = body.classList.toggle("is-expanded");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open
        ? "Ver menos temporadas"
        : "Ver todas las temporadas (" + (DATA ? DATA.seasons.length : "") + ")";
    });
  }

  /* ---------- 8. Gráfico de puntos ---------- */
  function renderChart() {
    var el = $("#pointsChart");
    if (!el || !DATA) return;

    var rows = DATA.seasons.slice().sort(function (a, b) { return a.year - b.year; });
    var max = Math.max.apply(null, rows.map(function (s) { return s.points || 0; })) || 1;

    el.innerHTML = rows
      .map(function (s) {
        var h = Math.max(3, Math.round(((s.points || 0) / max) * 100));
        return (
          '<div class="chart-col"><span class="chart-val">' + (s.points || 0) + "</span>" +
          '<div class="chart-bar" style="height:' + h + '%"></div>' +
          '<span class="chart-year">' + s.year + "</span></div>"
        );
      })
      .join("");
  }

  /* ---------- 9. Panel de datos de piloto ---------- */
  function paintDrivers() {
    if (!DATA || !DATA.drivers) return;
    $$("[data-driver]").forEach(function (card) {
      var key = card.getAttribute("data-driver");
      var d = DATA.drivers[key];
      if (!d) return;
      var set = function (sel, val) {
        var el = $(sel, card);
        if (el) el.textContent = val;
      };
      set("[data-h-pos]", d.pos);
      set("[data-h-pts]", d.pts);
      set("[data-h-pod]", d.pod);
      set("[data-h-win]", d.win);
      set("[data-h-pole]", d.pole);
      set("[data-h-fast]", d.fast);
      set("[data-h-best]", d.best);
      set("[data-h-ret]", d.ret);
    });
  }

  /* ---------- 10. Carrusel de historia ---------- */
  function initTimeline() {
    var track = $(".timeline");
    var prev = $("#tlPrev");
    var next = $("#tlNext");
    if (!track || (!prev && !next)) return;

    var step = function () {
      var item = track.querySelector("li");
      return item ? item.getBoundingClientRect().width + 24 : 320;
    };

    if (prev) prev.addEventListener("click", function () { track.scrollLeft -= step(); });
    if (next) next.addEventListener("click", function () { track.scrollLeft += step(); });
  }

  /* ---------- 11. Volver arriba ---------- */
  function initToTop() {
    var btn = $("#toTop");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener(
      "scroll",
      function () { btn.classList.toggle("is-visible", window.scrollY > 600); },
      { passive: true }
    );
  }

  /* ---------- 12. Última actualización ---------- */
  function initUpdated() {
    var el = $("#ultima-actualización");
    if (!el) return;
    var now = new Date();
    el.textContent = "Última actualización: " + now.toLocaleDateString("es-ES", {
      day: "2-digit", month: "long", year: "numeric",
    });
  }

  /* ---------- arranque ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    paintStatic();
    initNav();
    initSmoothLinks();
    initActiveLink();
    initReveals();
    initCounters();
    renderSeasons();
    initTabs();
    initMoreRows();
    renderChart();
    paintDrivers();
    initTimeline();
    initToTop();
    initUpdated();
  });
})();
