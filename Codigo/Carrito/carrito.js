/* ========================================
   INICIO DEL CARRITO
======================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    renderizarCarrito();

    EventBus.subscribe(
      "carritoActualizado",
      renderizarCarrito
    );

    document
      .getElementById("finalizar-compra")
      .addEventListener(
        "click",
        finalizarCompra
      );

    document
      .getElementById("cerrar-modal-compra")
      .addEventListener(
        "click",
        cerrarModalCompra
      );

    document
      .getElementById("volver-inicio")
      .addEventListener(
        "click",
        volverAlInicio
      );

    document.addEventListener(
      "keydown",
      (evento) => {
        if (evento.key === "Escape") {
          cerrarModalCompra();
        }
      }
    );
  }
);


/* ========================================
   MOSTRAR CARRITO
======================================== */

function renderizarCarrito() {
  const carrito = getCarrito();

  const contenedor = document.getElementById(
    "lista-carrito"
  );

  const cantidad = document.getElementById(
    "cantidad-carrito"
  );

  const precioTotal = document.getElementById(
    "precio-total"
  );

  const botonFinalizar = document.getElementById(
    "finalizar-compra"
  );

  cantidad.textContent = carrito.length;

  const total = carrito.reduce(
    (suma, item) =>
      suma + Number(item.precio),
    0
  );

  precioTotal.textContent =
    formatoPrecio(total);

  botonFinalizar.disabled =
    carrito.length === 0;

  if (carrito.length === 0) {
    mostrarCarritoVacio(contenedor);
    actualizarContadorCarrito();

    return;
  }

  contenedor.innerHTML = carrito
    .map((item) => crearItemHTML(item))
    .join("");

  contenedor
    .querySelectorAll("[data-eliminar-item]")
    .forEach((boton) => {
      boton.addEventListener(
        "click",
        () => {
          eliminarCarrito(
            boton.dataset.eliminarItem
          );
        }
      );
    });

  actualizarContadorCarrito();
}


/* ========================================
   CREAR PRODUCTO DEL CARRITO
======================================== */

function crearItemHTML(item) {
  const servicio = getServicios().find(
    (producto) =>
      producto.id === item.servicioId
  );

  const imagen =
    servicio?.imagen || IMG_DEFAULT;

  const descripcion =
    servicio?.descripcionCorta ||
    "Servicio de asesoría espiritual.";

  return `
    <article class="carrito-item">

      <img
        class="carrito-item__imagen"
        src="${escaparHTML(imagen)}"
        alt="${escaparHTML(item.nombre)}"
      >

      <div class="carrito-item__informacion">
        <h2 class="carrito-item__nombre">
          ${escaparHTML(item.nombre)}
        </h2>

        <p class="carrito-item__descripcion">
          ${escaparHTML(descripcion)}
        </p>
      </div>

      <strong class="carrito-item__precio">
        ${formatoPrecio(item.precio)}
      </strong>

      <button
        class="carrito-item__eliminar"
        type="button"
        data-eliminar-item="${item.id}"
      >
        Eliminar
      </button>

    </article>
  `;
}


/* ========================================
   CARRITO VACÍO
======================================== */

function mostrarCarritoVacio(contenedor) {
  contenedor.innerHTML = `
    <div class="carrito-vacio">

      <h2>
        Tu carrito está vacío
      </h2>

      <p>
        Explora el catálogo y agrega
        servicios o productos.
      </p>

      <a
        class="btn btn--primario"
        href="../Principal/principal.html"
      >
        Explorar catálogo
      </a>

    </div>
  `;
}


/* ========================================
   FINALIZAR COMPRA
======================================== */

function finalizarCompra() {
  const sesion = getSesion();
  const carrito = getCarrito();

  if (carrito.length === 0) {
    mostrarToast(
      "El carrito está vacío"
    );

    return;
  }

  if (!sesion) {
    mostrarToast(
      "Primero debes iniciar sesión"
    );

    setTimeout(() => {
      window.location.href =
        "../Principal/principal.html";
    }, 1400);

    return;
  }

  const orden = {
    id: crearId(),
    usuario: sesion,
    productos: carrito,
    fecha: new Date().toISOString(),
    estado: "Pendiente"
  };

  const ordenes = leer(
    "mee_ordenes",
    []
  );

  ordenes.push(orden);

  guardar(
    "mee_ordenes",
    ordenes
  );

  guardar(
    KEYS.carrito,
    []
  );

  EventBus.publish(
    "carritoActualizado",
    []
  );

  renderizarCarrito();

  document
    .getElementById("modal-compra")
    .classList.remove("hidden");
}


/* ========================================
   MODAL DE CONFIRMACIÓN
======================================== */

function cerrarModalCompra() {
  document
    .getElementById("modal-compra")
    .classList.add("hidden");
}

function volverAlInicio() {
  window.location.href =
    "../Principal/principal.html";
}