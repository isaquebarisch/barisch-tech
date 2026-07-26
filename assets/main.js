/* =========================================================
   Barisch Technologies — shared behavior
   Runs on every page. Each feature checks if its target
   exists before doing anything, so pages that don't have
   a form silently skip that block.
   ========================================================= */

(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        "mailto:isaquebarisch@gmail.com" +
        "?subject=" + encodeURIComponent(assunto) +
        "&body=" + encodeURIComponent(corpo);
    });
  }
})();
