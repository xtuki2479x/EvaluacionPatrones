/* ========================================
   CONFIGURACIÓN GENERAL
======================================== */

const KEYS = {
  servicios: "mee_servicios_v3",
  carrito: "mee_carrito",
  sesion: "mee_sesion",
  mensajes: "mee_mensajes"
};

const IMG_DEFAULT =
  "../Recursos/patronesoterico.png";
  
const IMAGENES_SERVICIOS = {
  1: "imagenlectura.png",
  2: "imagenlectura.png",
  3: "imagenlectura.png",
  4: "imagenlectura.png",
  5: "imagenlectura.png",

  6: "imagenastrologia.png",
  7: "imagenastrologia.png",
  8: "imagenastrologia.png",
  9: "imagenastrologia.png",
  10: "imagenastrologia.png",

  11: "imagenrunas.png",
  12: "imagenrunas.png",
  13: "imagenrunas.png",
  14: "imagenrunas.png",
  15: "imagenrunas.png",

  16: "imagenlimpiezas.png",
  17: "imagenlimpiezas.png",
  18: "imagenlimpiezas.png",
  19: "imagenlimpiezas.png",
  20: "imagenlimpiezas.png",

  21: "imagenamuletos.png",
  22: "imagenamuletos.png",
  23: "imagenamuletos.png",
  24: "imagenamuletos.png",
  25: "imagenamuletos.png"
};

/* ========================================
   SERVICIOS INICIALES
======================================== */

function crearServicioInicial(
  id,
  nombre,
  descripcion,
  precio,
  categoria,
  premium = false
) {
  return {
    id,
    nombre,
    descripcionCorta: descripcion,
    descripcion,
    precio,
    imagen:
      `../Recursos/servicios/${IMAGENES_SERVICIOS[id]}`,
    categoria,
    premium
  };
}

const SERVICIOS_DEFAULT = [
  // LECTURAS
  crearServicioInicial(
    1,
    "Lectura general",
    "Lectura para conocer las energías presentes en tu vida.",
    15000,
    "lecturas"
  ),
  crearServicioInicial(
    2,
    "Lectura del amor",
    "Orientación sobre relaciones, sentimientos y vínculos.",
    18000,
    "lecturas"
  ),
  crearServicioInicial(
    3,
    "Lectura de tres cartas",
    "Una mirada al pasado, presente y posible futuro.",
    12000,
    "lecturas"
  ),
  crearServicioInicial(
    4,
    "Lectura de decisiones",
    "Orientación para comprender diferentes alternativas.",
    17000,
    "lecturas"
  ),
  crearServicioInicial(
    5,
    "Lectura profunda",
    "Lectura ampliada para explorar una situación personal.",
    25000,
    "lecturas",
    true
  ),

  // ASTROLOGÍA
  crearServicioInicial(
    6,
    "Carta natal completa",
    "Interpretación general de tu mapa astrológico.",
    28000,
    "astrologia"
  ),
  crearServicioInicial(
    7,
    "Revolución solar",
    "Análisis de las tendencias de tu nuevo ciclo anual.",
    26000,
    "astrologia"
  ),
  crearServicioInicial(
    8,
    "Sinastría de pareja",
    "Comparación astrológica entre dos personas.",
    32000,
    "astrologia",
    true
  ),
  crearServicioInicial(
    9,
    "Tránsitos actuales",
    "Revisión de las influencias astrológicas del momento.",
    22000,
    "astrologia"
  ),
  crearServicioInicial(
    10,
    "Guía lunar mensual",
    "Orientación basada en las fases y ciclos de la Luna.",
    14000,
    "astrologia"
  ),

  // RUNAS
  crearServicioInicial(
    11,
    "Lectura general de runas",
    "Consulta general mediante símbolos rúnicos.",
    14000,
    "runas"
  ),
  crearServicioInicial(
    12,
    "Runa del día",
    "Una runa para orientar la energía de tu jornada.",
    7000,
    "runas"
  ),
  crearServicioInicial(
    13,
    "Runas para el amor",
    "Orientación rúnica sobre relaciones y emociones.",
    15000,
    "runas"
  ),
  crearServicioInicial(
    14,
    "Runas para el trabajo",
    "Lectura enfocada en proyectos y decisiones laborales.",
    15000,
    "runas"
  ),
  crearServicioInicial(
    15,
    "Lectura rúnica anual",
    "Interpretación de las energías para tu ciclo anual.",
    24000,
    "runas",
    true
  ),

  // LIMPIEZAS
  crearServicioInicial(
    16,
    "Limpieza energética personal",
    "Servicio simbólico para renovar la energía personal.",
    20000,
    "limpiezas"
  ),
  crearServicioInicial(
    17,
    "Limpieza para el hogar",
    "Orientación para armonizar la energía de un espacio.",
    26000,
    "limpiezas"
  ),
  crearServicioInicial(
    18,
    "Limpieza con velas",
    "Ritual simbólico realizado mediante velas.",
    18000,
    "limpiezas"
  ),
  crearServicioInicial(
    19,
    "Limpieza de bloqueos",
    "Servicio orientado a trabajar cargas y estancamientos.",
    23000,
    "limpiezas"
  ),
  crearServicioInicial(
    20,
    "Protección energética",
    "Ritual simbólico de limpieza y protección personal.",
    28000,
    "limpiezas",
    true
  ),

  // AMULETOS Y PRODUCTOS
  crearServicioInicial(
    21,
    "Pulsera de protección",
    "Pulsera ficticia elaborada con piedras protectoras.",
    10000,
    "amuletos"
  ),
  crearServicioInicial(
    22,
    "Amuleto lunar",
    "Colgante ficticio inspirado en las fases de la Luna.",
    12000,
    "amuletos"
  ),
  crearServicioInicial(
    23,
    "Kit de cuarzos",
    "Conjunto ficticio de cuarzos para uso decorativo.",
    16000,
    "amuletos"
  ),
  crearServicioInicial(
    24,
    "Vela ritual",
    "Vela aromática ficticia para momentos de reflexión.",
    8000,
    "amuletos"
  ),
  crearServicioInicial(
    25,
    "Bolsa de protección",
    "Pequeño amuleto ficticio preparado con elementos simbólicos.",
    14000,
    "amuletos",
    true
  )
];

/* ========================================
   PATRÓN OBSERVER
======================================== */

// ========== INICIO: Observer ==========

const EventBus = {
  eventos: {},

  subscribe(nombreEvento, funcion) {
    if (!this.eventos[nombreEvento]) {
      this.eventos[nombreEvento] = [];
    }

    this.eventos[nombreEvento].push(funcion);
  },

  publish(nombreEvento, datos) {
    const funciones =
      this.eventos[nombreEvento] || [];

    funciones.forEach((funcion) => {
      funcion(datos);
    });
  }
};

// ========== FIN: Observer ==========


/* ========================================
   PATRÓN FACTORY METHOD
======================================== */

// ========== INICIO: Factory Method ==========

class Servicio {
  constructor(datos) {
    Object.assign(this, datos);
  }
}

class ServicioLectura extends Servicio {
  constructor(datos) {
    super(datos);
    this.tipo = "Lectura";
  }
}

class ServicioAstrologia extends Servicio {
  constructor(datos) {
    super(datos);
    this.tipo = "Astrología";
  }
}

class ServicioRunas extends Servicio {
  constructor(datos) {
    super(datos);
    this.tipo = "Runas";
  }
}

class ServicioLimpieza extends Servicio {
  constructor(datos) {
    super(datos);
    this.tipo = "Limpieza energética";
  }
}

class ProductoAmuleto extends Servicio {
  constructor(datos) {
    super(datos);
    this.tipo = "Producto";
  }
}

const ServiceFactory = {
  create(datos) {
    switch (datos.categoria) {
      case "astrologia":
        return new ServicioAstrologia(datos);

      case "runas":
        return new ServicioRunas(datos);

      case "limpiezas":
        return new ServicioLimpieza(datos);

      case "amuletos":
        return new ProductoAmuleto(datos);

      case "lecturas":
      default:
        return new ServicioLectura(datos);
    }
  }
};

// ========== FIN: Factory Method ==========


/* ========================================
   PATRÓN DECORATOR
======================================== */

// ========== INICIO: Decorator ==========

class PremiumDecorator {
  constructor(servicio) {
    Object.assign(this, servicio);

    this.premium = true;
    this.nombre = `${servicio.nombre} Premium`;
  }
}

function decorarServicio(datos) {
  const servicio =
    ServiceFactory.create(datos);

  if (datos.premium) {
    return new PremiumDecorator(servicio);
  }

  return servicio;
}

// ========== FIN: Decorator ==========


/* ========================================
   FUNCIONES DE LOCALSTORAGE
======================================== */

function leer(clave, valorPorDefecto) {
  try {
    const contenido =
      localStorage.getItem(clave);

    if (contenido === null) {
      return valorPorDefecto;
    }

    return JSON.parse(contenido);
  } catch (error) {
    console.error(
      "No fue posible leer localStorage:",
      error
    );

    return valorPorDefecto;
  }
}

function guardar(clave, valor) {
  localStorage.setItem(
    clave,
    JSON.stringify(valor)
  );
}


/* ========================================
   SERVICIOS
======================================== */

function getServicios() {
  const serviciosGuardados = leer(
    KEYS.servicios,
    null
  );

  if (serviciosGuardados) {
    return serviciosGuardados;
  }

  guardar(
    KEYS.servicios,
    SERVICIOS_DEFAULT
  );

  return SERVICIOS_DEFAULT;
}


/* ========================================
   CARRITO
======================================== */

function getCarrito() {
  return leer(KEYS.carrito, []);
}

function crearId() {
  const fecha = Date.now();

  const numeroAleatorio = Math.random()
    .toString(16)
    .slice(2);

  return `${fecha}-${numeroAleatorio}`;
}

function agregarCarrito(idServicio) {
  const servicio = getServicios().find(
    (item) => item.id === idServicio
  );

  if (!servicio) {
    return;
  }

  const carrito = getCarrito();

  carrito.push({
    id: crearId(),
    servicioId: servicio.id,
    nombre: servicio.nombre,
    precio: Number(servicio.precio)
  });

  guardar(KEYS.carrito, carrito);

  EventBus.publish(
    "carritoActualizado",
    carrito
  );

  mostrarToast(
    "Servicio agregado al carrito"
  );
}

function eliminarCarrito(idItem) {
  const carritoActualizado =
    getCarrito().filter(
      (item) => item.id !== idItem
    );

  guardar(
    KEYS.carrito,
    carritoActualizado
  );

  EventBus.publish(
    "carritoActualizado",
    carritoActualizado
  );
}


/* ========================================
   SESIÓN Y MENSAJES
======================================== */

function getSesion() {
  return leer(KEYS.sesion, null);
}

function getMensajes() {
  return leer(KEYS.mensajes, []);
}


/* ========================================
   UTILIDADES
======================================== */

function formatoPrecio(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(valor);
}

function escaparHTML(texto = "") {
  const elemento =
    document.createElement("div");

  elemento.textContent = texto;

  return elemento.innerHTML;
}

function mostrarToast(mensaje) {
  const contenedor =
    document.getElementById(
      "toast-container"
    );

  if (!contenedor) {
    return;
  }

  const toast =
    document.createElement("div");

  toast.className = "toast";
  toast.textContent = mensaje;

  contenedor.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2800);
}


/* ========================================
   CONTADOR DEL CARRITO
======================================== */

function actualizarContadorCarrito() {
  const cantidad =
    getCarrito().length;

  document
    .querySelectorAll("[data-cart-count]")
    .forEach((contador) => {
      contador.textContent = cantidad;

      contador.classList.toggle(
        "hidden",
        cantidad === 0
      );
    });
}

document.addEventListener(
  "DOMContentLoaded",
  actualizarContadorCarrito
);

window.addEventListener(
  "storage",
  actualizarContadorCarrito
);