/* ============================================================
   Vértice Racing — formulario de alta (demostración)
   Valida en cliente y muestra confirmación. No envía datos.
   Para conectarlo a un backend, sustituye el bloque marcado
   por un fetch() a tu endpoint.
   ============================================================ */

(function () {
  "use strict";

  var form = document.getElementById("registroForm");
  if (!form) return;

  var msg = document.getElementById("formMessage");

  function setError(name, visible) {
    var el = form.querySelector('[data-error-for="' + name + '"]');
    var field = form.querySelector("#" + name);
    if (el) el.hidden = !visible;
    if (field) field.setAttribute("aria-invalid", visible ? "true" : "false");
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var nombre = form.nombre.value.trim();
    var email = form.email.value.trim();
    var consent = form.consent.checked;
    var ok = true;

    if (nombre.length < 2) { setError("nombre", true); ok = false; } else setError("nombre", false);
    if (!validEmail(email)) { setError("email", true); ok = false; } else setError("email", false);
    if (!consent) { setError("consent", true); ok = false; } else setError("consent", false);

    if (!ok) {
      var first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    /* ---- Aquí iría tu envío real ----
       fetch("/api/registro", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ nombre: nombre, email: email })
       }).then(...)
    ----------------------------------- */

    form.reset();
    if (msg) {
      msg.hidden = false;
      msg.textContent =
        "¡Listo! (Demostración) Gracias, " + nombre + ". Aquí se confirmaría el alta real.";
    }
  });

  form.addEventListener("input", function (e) {
    var id = e.target.id;
    if (id && form.querySelector('[data-error-for="' + id + '"]')) setError(id, false);
  });
})();
