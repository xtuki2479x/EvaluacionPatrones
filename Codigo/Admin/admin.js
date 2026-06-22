let correoSeleccionado = null;


/* ========================================
   INICIO DEL PANEL
======================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    renderizarServiciosAdmin();
    renderizarConversaciones();
    renderizarOrdenes();

    document
      .querySelectorAll("[data-vista]")
      .forEach((boton) => {
        boton.addEventListener(
          "click",
          cambiarVista
        );
      });

    document
      .getElementById("agregar-servicio")
      .addEventListener(
        "click",
        () => abrirFormularioServicio()
      );

    document
      .getElementById("cerrar-modal-servicio")
      .addEventListener(
        "click",
        cerrarFormularioServicio
      );

    document
      .getElementById("form-servicio")
      .addEventListener(
        "submit",
        guardarServicio
      );

    document
      .getElementById("form-respuesta")
      .addEventListener(
        "submit",
        responderMensaje
      );

    window.addEventListener(
      "storage",
      actualizarDatosExternos
    );

    document.addEventListener(
      "keydown",
      (evento) => {
        if (evento.key === "Escape") {
          cerrarFormularioServicio();
        }
      }
    );
    document
  .getElementById("abrir-vista-usuario")
  .addEventListener(
    "click",
    abrirVistaUsuario
  );

document
  .getElementById("cerrar-vista-usuario")
  .addEventListener(
    "click",
    cerrarVistaUsuario
  );

document
  .getElementById("actualizar-vista-usuario")
  .addEventListener(
    "click",
    actualizarVistaUsuario
  );

document
  .getElementById("vista-usuario-overlay")
  .addEventListener(
    "click",
    (evento) => {
      if (
        evento.target.id ===
        "vista-usuario-overlay"
      ) {
        cerrarVistaUsuario();
      }
    }
  );

document.addEventListener(
  "keydown",
  (evento) => {
    if (evento.key === "Escape") {
      cerrarVistaUsuario();
    }
  }
);
    }
);


/* ========================================
   PESTAÑAS
======================================== */

function cambiarVista(evento) {
  const boton = evento.currentTarget;
  const vista = boton.dataset.vista;

  document
    .querySelectorAll(".admin-tab")
    .forEach((item) => {
      item.classList.toggle(
        "activo",
        item === boton
      );
    });

  document
    .querySelectorAll(".admin-vista")
    .forEach((seccion) => {
      seccion.classList.add("hidden");
    });

  document
    .getElementById(`vista-${vista}`)
    .classList.remove("hidden");

  if (vista === "servicios") {
    renderizarServiciosAdmin();
  }

  if (vista === "mensajes") {
    renderizarConversaciones();

    if (correoSeleccionado) {
      renderizarConversacionSeleccionada();
    }
  }

  if (vista === "ordenes") {
    renderizarOrdenes();
  }
}


/* ========================================
   MOSTRAR SERVICIOS
======================================== */

function renderizarServiciosAdmin() {
  const servicios = getServicios();

  const contenedor = document.getElementById(
    "lista-servicios-admin"
  );

  if (servicios.length === 0) {
    contenedor.innerHTML = `
      <div class="estado-vacio">
        No hay servicios registrados.
      </div>
    `;

    return;
  }

  contenedor.innerHTML = servicios
    .map((servicio) => {
      const premium = servicio.premium
        ? `<span class="badge">Premium</span>`
        : "";

      return `
        <article class="admin-item">

          <img
            class="admin-item__imagen"
            src="${escaparHTML(servicio.imagen || IMG_DEFAULT)}"
            alt="${escaparHTML(servicio.nombre)}"
          >

          <div class="admin-item__informacion">

            <h2>
              ${escaparHTML(servicio.nombre)}
              ${premium}
            </h2>

            <p>
              ${escaparHTML(servicio.categoria)}
            </p>

          </div>

          <strong class="admin-item__precio">
            ${formatoPrecio(servicio.precio)}
          </strong>

          <div class="admin-item__acciones">

            <button
              class="btn btn--secundario"
              type="button"
              data-editar="${servicio.id}"
            >
              Editar
            </button>

            <button
              class="btn btn--peligro"
              type="button"
              data-eliminar="${servicio.id}"
            >
              Eliminar
            </button>

          </div>

        </article>
      `;
    })
    .join("");

  contenedor
    .querySelectorAll("[data-editar]")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        abrirFormularioServicio(
          Number(boton.dataset.editar)
        );
      });
    });

  contenedor
    .querySelectorAll("[data-eliminar]")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        eliminarServicio(
          Number(boton.dataset.eliminar)
        );
      });
    });
}


/* ========================================
   FORMULARIO DE SERVICIOS
======================================== */

function abrirFormularioServicio(
  idServicio = null
) {
  const formulario = document.getElementById(
    "form-servicio"
  );

  formulario.reset();

  const servicio = idServicio
    ? getServicios().find(
        (item) => item.id === idServicio
      )
    : null;

  document.getElementById(
    "titulo-modal-servicio"
  ).textContent = servicio
    ? "Editar servicio"
    : "Agregar servicio";

  document.getElementById(
    "servicio-id"
  ).value = servicio?.id || "";

  document.getElementById(
    "servicio-nombre"
  ).value = servicio?.nombre || "";

  document.getElementById(
    "servicio-descripcion-corta"
  ).value =
    servicio?.descripcionCorta || "";

  document.getElementById(
    "servicio-descripcion"
  ).value =
    servicio?.descripcion || "";

  document.getElementById(
    "servicio-precio"
  ).value =
    servicio?.precio || "";

  document.getElementById(
    "servicio-categoria"
  ).value =
    servicio?.categoria || "lecturas";

  document.getElementById(
    "servicio-imagen"
  ).value =
    servicio?.imagen || "";

  document.getElementById(
    "servicio-premium"
  ).checked =
    Boolean(servicio?.premium);

  document
    .getElementById("modal-servicio")
    .classList.remove("hidden");
}

function cerrarFormularioServicio() {
  document
    .getElementById("modal-servicio")
    .classList.add("hidden");
}


/* ========================================
   GUARDAR SERVICIO
======================================== */

function guardarServicio(evento) {
  evento.preventDefault();

  const idExistente = Number(
    document.getElementById(
      "servicio-id"
    ).value
  );

  const servicio = {
    id: idExistente || Date.now(),

    nombre: document
      .getElementById("servicio-nombre")
      .value
      .trim(),

    descripcionCorta: document
      .getElementById(
        "servicio-descripcion-corta"
      )
      .value
      .trim(),

    descripcion: document
      .getElementById(
        "servicio-descripcion"
      )
      .value
      .trim(),

    precio: Number(
      document.getElementById(
        "servicio-precio"
      ).value
    ),

    imagen:
      document
        .getElementById("servicio-imagen")
        .value
        .trim() || IMG_DEFAULT,

    categoria: document
      .getElementById(
        "servicio-categoria"
      )
      .value,

    premium: document
      .getElementById(
        "servicio-premium"
      )
      .checked
  };

  const servicios = getServicios();

  const posicion = servicios.findIndex(
    (item) => item.id === idExistente
  );

  if (posicion >= 0) {
    servicios.splice(
      posicion,
      1,
      servicio
    );
  } else {
    servicios.push(servicio);
  }

  guardar(
    KEYS.servicios,
    servicios
  );

  cerrarFormularioServicio();
  renderizarServiciosAdmin();

  mostrarToast(
    idExistente
      ? "Servicio actualizado"
      : "Servicio agregado"
  );
}


/* ========================================
   ELIMINAR SERVICIO
======================================== */

function eliminarServicio(idServicio) {
  const servicio = getServicios().find(
    (item) => item.id === idServicio
  );

  if (!servicio) {
    return;
  }

  const confirmar = window.confirm(
    `¿Eliminar "${servicio.nombre}"?`
  );

  if (!confirmar) {
    return;
  }

  const serviciosActualizados =
    getServicios().filter(
      (item) =>
        item.id !== idServicio
    );

  guardar(
    KEYS.servicios,
    serviciosActualizados
  );

  renderizarServiciosAdmin();

  mostrarToast(
    "Servicio eliminado"
  );
}


/* ========================================
   CONVERSACIONES
======================================== */

function obtenerConversaciones() {
  const mensajes = getMensajes();
  const ordenes = leer("mee_ordenes", []);
  const conversaciones = {};

  mensajes.forEach((mensaje) => {
    const correo = mensaje.usuarioCorreo;

    if (!correo) {
      return;
    }

    if (!conversaciones[correo]) {
      conversaciones[correo] = {
        correo,
        nombre:
          mensaje.usuarioNombre || "Usuario",
        mensajes: []
      };
    }

    conversaciones[correo].mensajes.push(
      mensaje
    );
  });

  // También incorpora usuarios que solamente
  // han realizado una compra.
  ordenes.forEach((orden) => {
    const correo = orden.usuario?.correo;

    if (!correo) {
      return;
    }

    if (!conversaciones[correo]) {
      conversaciones[correo] = {
        correo,
        nombre:
          orden.usuario.nombre || "Usuario",
        mensajes: []
      };
    }
  });

  return Object.values(conversaciones)
    .sort((a, b) => {
      const ultimoA = a.mensajes.at(-1);
      const ultimoB = b.mensajes.at(-1);

      const fechaA = ultimoA
        ? new Date(ultimoA.fecha)
        : new Date(0);

      const fechaB = ultimoB
        ? new Date(ultimoB.fecha)
        : new Date(0);

      return fechaB - fechaA;
    });
}

function renderizarConversaciones() {
  const conversaciones =
    obtenerConversaciones();

  const contenedor = document.getElementById(
    "lista-conversaciones"
  );

  if (conversaciones.length === 0) {
    contenedor.innerHTML = `
      <div class="estado-vacio">
        No hay conversaciones.
      </div>
    `;

    return;
  }

  contenedor.innerHTML = conversaciones
    .map((conversacion) => {
      const ultimoMensaje =
        conversacion.mensajes.at(-1);

      const activo =
        correoSeleccionado ===
        conversacion.correo
          ? "activo"
          : "";

      return `
        <button
          class="conversacion-item ${activo}"
          type="button"
          data-correo="${encodeURIComponent(
            conversacion.correo
          )}"
        >

          <strong>
            ${escaparHTML(conversacion.nombre)}
          </strong>

        <span>
        ${escaparHTML(
            ultimoMensaje?.texto ||
            "Orden pendiente de contacto"
        )}
        </span>

        </button>
      `;
    })
    .join("");

  contenedor
    .querySelectorAll("[data-correo]")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        correoSeleccionado =
          decodeURIComponent(
            boton.dataset.correo
          );

        renderizarConversaciones();
        renderizarConversacionSeleccionada();
      });
    });
}


/* ========================================
   CONVERSACIÓN SELECCIONADA
======================================== */

function renderizarConversacionSeleccionada() {
  const conversaciones =
    obtenerConversaciones();

  const conversacion =
    conversaciones.find(
      (item) =>
        item.correo === correoSeleccionado
    );

  if (!conversacion) {
    return;
  }

  document.getElementById(
    "nombre-conversacion"
  ).textContent =
    conversacion.nombre;

  document.getElementById(
    "correo-conversacion"
  ).textContent =
    conversacion.correo;

  const contenedor = document.getElementById(
    "mensajes-admin"
  );

if (conversacion.mensajes.length === 0) {
  contenedor.innerHTML = `
    <div class="estado-vacio">
      Todavía no existen mensajes.
      Puedes iniciar la conversación
      escribiendo una respuesta.
    </div>
  `;
} else {
  contenedor.innerHTML =
    conversacion.mensajes
      .map((mensaje) =>
        crearMensajeAdminHTML(mensaje)
      )
      .join("");
}

  contenedor.scrollTop =
    contenedor.scrollHeight;

  document
    .getElementById("form-respuesta")
    .classList.remove("hidden");
}

function crearMensajeAdminHTML(mensaje) {
  const esAdmin =
    mensaje.autor === "admin";

  const clase = esAdmin
    ? "mensaje-admin--admin"
    : "mensaje-admin--usuario";

  const autor = esAdmin
    ? "Administradora"
    : mensaje.usuarioNombre || "Usuario";

  const fecha = formatearFechaAdmin(
    mensaje.fecha
  );

  return `
    <article class="mensaje-admin ${clase}">

      <p>
        ${escaparHTML(mensaje.texto)}
      </p>

      <small>
        ${escaparHTML(autor)} · ${fecha}
      </small>

    </article>
  `;
}


/* ========================================
   RESPONDER MENSAJE
======================================== */

function responderMensaje(evento) {
  evento.preventDefault();

  if (!correoSeleccionado) {
    mostrarToast(
      "Selecciona una conversación"
    );

    return;
  }

  const entrada = document.getElementById(
    "respuesta-admin"
  );

  const texto = entrada.value.trim();

  if (!texto) {
    return;
  }

  const conversaciones =
    obtenerConversaciones();

  const conversacion =
    conversaciones.find(
      (item) =>
        item.correo === correoSeleccionado
    );

  const mensajes = getMensajes();

  mensajes.push({
    id: crearId(),
    autor: "admin",
    texto,
    fecha: new Date().toISOString(),
    usuarioNombre:
      conversacion?.nombre || "Usuario",
    usuarioCorreo: correoSeleccionado
  });

  guardar(
    KEYS.mensajes,
    mensajes
  );

  entrada.value = "";

  renderizarConversaciones();
  renderizarConversacionSeleccionada();

  mostrarToast(
    "Respuesta enviada"
  );
}


/* ========================================
   ÓRDENES
======================================== */

function renderizarOrdenes() {
  const ordenes = leer(
    "mee_ordenes",
    []
  );

  const contenedor = document.getElementById(
    "lista-ordenes"
  );

  if (ordenes.length === 0) {
    contenedor.innerHTML = `
      <div class="estado-vacio">
        Todavía no hay órdenes registradas.
      </div>
    `;

    return;
  }

  contenedor.innerHTML = ordenes
    .slice()
    .reverse()
    .map((orden) => {
      const productos = orden.productos
        .map((producto) => producto.nombre)
        .join(", ");

      const total = orden.productos.reduce(
        (suma, producto) =>
          suma + Number(producto.precio),
        0
      );

      return `
        <article class="orden-item">

          <div>
            <h2>
              ${escaparHTML(orden.usuario.nombre)}
            </h2>

            <p>
              ${escaparHTML(orden.usuario.correo)}
            </p>
          </div>

          <p class="orden-item__productos">
            ${escaparHTML(productos)}
          </p>

          <strong class="orden-item__total">
            ${formatoPrecio(total)}
          </strong>

          <span class="orden-item__estado">
            ${escaparHTML(
              orden.estado || "Pendiente"
            )}
          </span>

          <button
            class="btn btn--primario"
            type="button"
            data-contactar-correo="${encodeURIComponent(
              orden.usuario.correo
            )}"
          >
            Contactar
          </button>

        </article>
      `;
    })
    .join("");

  contenedor
    .querySelectorAll("[data-contactar-correo]")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        contactarUsuario(
          decodeURIComponent(
            boton.dataset.contactarCorreo
          )
        );
      });
    });
}

function contactarUsuario(correo) {
  correoSeleccionado = correo;

  const botonMensajes =
    document.querySelector(
      '[data-vista="mensajes"]'
    );

  botonMensajes.click();

  renderizarConversaciones();
  renderizarConversacionSeleccionada();
}

/* ========================================
   ACTUALIZACIONES ENTRE PESTAÑAS
======================================== */

function actualizarDatosExternos(evento) {
  if (evento.key === KEYS.mensajes) {
    renderizarConversaciones();

    if (correoSeleccionado) {
      renderizarConversacionSeleccionada();
    }
  }

  if (evento.key === KEYS.servicios) {
    renderizarServiciosAdmin();
  }

  if (evento.key === "mee_ordenes") {
    renderizarOrdenes();
  }
}


/* ========================================
   FORMATO DE FECHA
======================================== */

function formatearFechaAdmin(fecha) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(fecha));
}

/* ========================================
   VISTA PREVIA DEL USUARIO
======================================== */

function abrirVistaUsuario() {
  actualizarVistaUsuario();

  document
    .getElementById("vista-usuario-overlay")
    .classList.add("abierto");

  document.body.style.overflow = "hidden";
}

function cerrarVistaUsuario() {
  document
    .getElementById("vista-usuario-overlay")
    .classList.remove("abierto");

  document.body.style.overflow = "";
}

function actualizarVistaUsuario() {
  const iframe = document.getElementById(
    "iframe-vista-usuario"
  );

  if (iframe.contentWindow) {
    iframe.contentWindow.location.reload();
  }
}