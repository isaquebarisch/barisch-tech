/* =========================================================
   Barisch Technologies — shared behavior
   Runs on every page. Each feature checks if its target
   exists before doing anything, so pages that don't have
   a meter or a form silently skip that block.
   ========================================================= */

(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- assinatura: medir a própria página (só na home) --- */
  function paint(el, value, decimals) {
    if (!el) return;
    if (reduce) { el.textContent = value.toFixed(decimals); return; }
    var start = performance.now(), dur = 900;
    (function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (value * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  var meter = document.getElementById("meter");
  if (meter) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        var nav = performance.getEntriesByType("navigation")[0];
        var secs = nav
          ? (nav.domContentLoadedEventEnd - nav.startTime) / 1000
          : (performance.now() / 1000);
        if (!isFinite(secs) || secs <= 0) secs = performance.now() / 1000;

        var reqs = performance.getEntriesByType("resource").length + 1;
        var nodes = document.getElementsByTagName("*").length;

        paint(document.getElementById("m-time"), secs, 2);
        paint(document.getElementById("m-req"), reqs, 0);
        paint(document.getElementById("m-dom"), nodes, 0);
      }, 60);
    });
  }

  /* --- revelar seções no scroll --- */
  var targets = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* --- formulário de briefing --- */
  var form = document.getElementById("briefing");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var v = function (id) {
        var el = document.getElementById(id);
        return el ? (el.value || "").trim() : "";
      };
      var assunto = "Novo briefing — " + (v("f-empresa") || v("f-nome"));
      var linhas = [
        "Nome: " + v("f-nome"),
        "Empresa: " + (v("f-empresa") || "—"),
        "E-mail: " + v("f-email"),
        "Telefone: " + (v("f-telefone") || "—"),
        "Tipo de projeto: " + (document.getElementById("f-tipo") || { value: "" }).value,
        "Orçamento estimado: " + ((document.getElementById("f-orcamento") || { value: "" }).value || "—"),
        "Prazo desejado: " + (v("f-prazo") || "—"),
        "",
        v("f-msg")
      ];
      var corpo = linhas.join("\n");
      window.location.href =
        "mailto:contato@barischtech.com.br" +
        "?subject=" + encodeURIComponent(assunto) +
        "&body=" + encodeURIComponent(corpo);
    });
  }
})();
