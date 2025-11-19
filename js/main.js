// ===== Scroll suave para enlaces internos =====
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');

    if (targetId && targetId !== '#') {
      event.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== Validación básica del formulario de reserva =====
const formReserva = document.querySelector('.form-reserva');

if (formReserva) {
  formReserva.addEventListener('submit', event => {
    event.preventDefault(); // evitamos que recargue la página

    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const telefono = document.querySelector('#telefono');
    const fechaLlegada = document.querySelector('#fecha-llegada');
    const fechaSalida = document.querySelector('#fecha-salida');

    let errores = [];

    if (!nombre.value.trim()) errores.push('Ingresa tu nombre.');
    if (!email.value.trim()) errores.push('Ingresa tu correo.');
    if (!telefono.value.trim()) errores.push('Ingresa tu teléfono.');
    if (!fechaLlegada.value) errores.push('Selecciona la fecha de llegada.');
    if (!fechaSalida.value) errores.push('Selecciona la fecha de salida.');

    const fechaL = new Date(fechaLlegada.value);
    const fechaS = new Date(fechaSalida.value);

    if (fechaLlegada.value && fechaSalida.value && fechaS <= fechaL) {
      errores.push('La fecha de salida debe ser posterior a la de llegada.');
    }

    // Mostrar errores o mensaje de éxito
    let contenedorMensajes = document.querySelector('#mensajes-form');

    if (!contenedorMensajes) {
      contenedorMensajes = document.createElement('div');
      contenedorMensajes.id = 'mensajes-form';
      formReserva.parentNode.insertBefore(contenedorMensajes, formReserva);
    }

    if (errores.length > 0) {
      contenedorMensajes.className = 'alerta alerta-error';
      contenedorMensajes.innerHTML = errores.map(e => `<p>${e}</p>`).join('');
    } else {
      contenedorMensajes.className = 'alerta alerta-ok';
      contenedorMensajes.innerHTML = '<p>Solicitud enviada correctamente. Te contactaremos para confirmar la reserva.</p>';
      formReserva.reset();
    }
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".section").forEach((s) => observer.observe(s));

