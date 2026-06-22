let sesionActual = null;


/* ========================================
   INICIO DEL CHAT
======================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    sesionActual = getSesion();

    comprobarSesion();
    actualizarContadorCarrito();

    const formulario = document.getElementById(
      "form-mensaje"
    );

    const entrada = document.getElementById(
      "mensaje"
    );

    formulario.addEventListener(
      "submit",
      enviarMensaje
    );

    entrada.addEventListener(
      "input",
      actualizarContadorCaracteres
    );

    window.addEventListener(
      "storage",
      (evento) => {
        if (evento.key === KEYS.mensajes) {
          renderizarMensajes();
        }
      }
    );
  }
);


/* ========================================
   COMPROBAR SESIÓN
======================================== */

function comprobarSesion() {
  const aviso = document.getElementById(
    "aviso-sesion"
  );

  const chat = document.getElementById(
    "chat-activo"
  );

  if (!sesionActual) {
    aviso.classList.remove("hidden");
    chat.classList.add("hidden");

    return;
  }

  aviso.classList.add("hidden");
  chat.classList.remove("hidden");

  renderizarMensajes();
}


/* ========================================
   OBTENER MENSAJES DEL USUARIO
======================================== */

function obtenerMensajesUsuario() {
  if (!sesionActual) {
    return [];
  }

  return getMensajes().filter(
    (mensaje) =>
      mensaje.usuarioCorreo ===
      sesionActual.correo
  );
}


/* ========================================
   MOSTRAR MENSAJES
======================================== */

function renderizarMensajes() {
  const contenedor = document.getElementById(
    "lista-mensajes"
  );

  const mensajes =
    obtenerMensajesUsuario();

  if (mensajes.length === 0) {
    contenedor.innerHTML = `
      <div class="chat-sin-mensajes">

        <h2>
          Inicia una conversación
        </h2>

        <p>
          Escribe tu consulta y la
          administradora podrá responderte.
        </p>

      </div>
    `;

    return;
  }

  contenedor.innerHTML = mensajes
    .map((mensaje) => crearMensajeHTML(mensaje))
    .join("");

  contenedor.scrollTop =
    contenedor.scrollHeight;
}


/* ========================================
   CREAR BURBUJA
======================================== */

function crearMensajeHTML(mensaje) {
  const esUsuario =
    mensaje.autor === "usuario";

  const clase = esUsuario
    ? "mensaje--usuario"
    : "mensaje--admin";

  const autor = esUsuario
    ? "Tú"
    : "Administradora";

  const fecha = formatearFechaMensaje(
    mensaje.fecha
  );

  return `
    <article class="mensaje ${clase}">

      <p>
        ${escaparHTML(mensaje.texto)}
      </p>

      <small class="mensaje__datos">
        ${autor} · ${fecha}
      </small>

    </article>
  `;
}


/* ========================================
   ENVIAR MENSAJE
======================================== */

function enviarMensaje(evento) {
  evento.preventDefault();

  if (!sesionActual) {
    mostrarToast(
      "Debes iniciar sesión"
    );

    return;
  }

  const entrada = document.getElementById(
    "mensaje"
  );

  const texto = entrada.value.trim();

  if (!texto) {
    mostrarToast(
      "Escribe un mensaje"
    );

    return;
  }

  const mensajes = getMensajes();

  mensajes.push({
    id: crearId(),
    autor: "usuario",
    texto,
    fecha: new Date().toISOString(),
    usuarioNombre: sesionActual.nombre,
    usuarioCorreo: sesionActual.correo
  });

  guardar(
    KEYS.mensajes,
    mensajes
  );

  entrada.value = "";

  actualizarContadorCaracteres();
  renderizarMensajes();

  mostrarToast(
    "Mensaje enviado"
  );

  /*
    Punto futuro para WebSocket:

    socket.send(JSON.stringify({
      tipo: "mensaje",
      texto: texto
    }));
  */
}


/* ========================================
   CONTADOR DE CARACTERES
======================================== */

function actualizarContadorCaracteres() {
  const entrada = document.getElementById(
    "mensaje"
  );

  const contador = document.getElementById(
    "contador-caracteres"
  );

  contador.textContent =
    `${entrada.value.length} / 500`;
}


/* ========================================
   FORMATEAR FECHA
======================================== */

function formatearFechaMensaje(fecha) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(fecha));
}