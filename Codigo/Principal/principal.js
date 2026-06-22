let servicioActivo = null;


/* ==================================================
   INFORMACIÓN DE LOS 22 ARCANOS MAYORES
================================================== */

const ARCANOS = [
  {
    numero: 1,
    nombre: "El Loco",
    nacimiento: "Las personas con este arcano suelen ser libres, curiosas y aventureras, siempre buscando experiencias nuevas. Aunque a veces pueden parecer imprudentes o poco constantes, su esencia es la frescura y la capacidad de abrir caminos.",
    anual: "Un año de comienzos y oportunidades inesperadas. Habrá entusiasmo y descubrimientos, pero también riesgos de confusión si no se actúa con responsabilidad."
  },
  {
    numero: 2,
    nombre: "El Mago",
    nacimiento: "Personas creativas, ingeniosas y con gran capacidad de manifestar sus ideas. Aunque a veces pueden caer en manipulación o exceso de control, su misión es usar sus talentos con ética.",
    anual: "Un ciclo para tomar acción y demostrar habilidades. Se esperan logros y proyectos nuevos, pero también la necesidad de evitar engaños o ilusiones de poder."
  },
  {
    numero: 3,
    nombre: "La Sacerdotisa",
    nacimiento: "Personas intuitivas, reservadas y con gran sabiduría interior. A veces pueden ser demasiado pasivas o misteriosas, pero su fuerza está en escuchar su voz interna.",
    anual: "Un año de introspección y revelaciones. Habrá momentos de claridad espiritual, aunque también dudas y silencios que invitan a reflexionar."
  },
  {
    numero: 4,
    nombre: "La Emperatriz",
    nacimiento: "Personas creativas, abundantes y protectoras, con facilidad para nutrir y dar vida a proyectos. A veces pueden caer en la comodidad o la dependencia, pero su esencia es la prosperidad.",
    anual: "Un ciclo de crecimiento y expansión. Se esperan frutos en proyectos y relaciones, aunque también el reto de no quedarse en lo superficial."
  },
  {
    numero: 5,
    nombre: "El Emperador",
    nacimiento: "Personas ordenadas, disciplinadas y con gran capacidad de liderazgo. A veces pueden ser rígidas o autoritarias, pero buscan dar estabilidad.",
    anual: "Un año para organizar y consolidar. Habrá avances en estructuras y proyectos, aunque también el desafío de no caer en la inflexibilidad."
  },
  {
    numero: 6,
    nombre: "El Papa",
    nacimiento: "Personas espirituales, sabias y con vocación de enseñanza. Pueden caer en el dogmatismo, pero su misión es transmitir valores y guía.",
    anual: "Un ciclo de aprendizaje y conexión espiritual. Se esperan enseñanzas y guía, aunque también la necesidad de cuestionar creencias rígidas."
  },
  {
    numero: 7,
    nombre: "Los Enamorados",
    nacimiento: "Personas sensibles, afectivas y con tendencia a vivir entre elecciones importantes. A veces indecisas, pero con gran capacidad de amar.",
    anual: "Un año de decisiones cruciales en relaciones y proyectos. Puede traer unión o separación, según cómo se elija."
  },
  {
    numero: 8,
    nombre: "El Carro",
    nacimiento: "Personas determinadas, valientes y con gran energía para avanzar. A veces pueden ser impulsivas o agresivas, pero buscan la victoria.",
    anual: "Un ciclo de movimiento y logros. Se esperan viajes y conquistas, aunque también el reto de controlar la impulsividad."
  },
  {
    numero: 9,
    nombre: "La Justicia",
    nacimiento: "Personas equilibradas, responsables y con gran sentido de la verdad. A veces pueden ser frías o demasiado críticas, pero buscan la justicia.",
    anual: "Un año de claridad y decisiones importantes. Habrá responsabilidades que asumir y verdades que enfrentar."
  },
  {
    numero: 10,
    nombre: "El Ermitaño",
    nacimiento: "Personas reflexivas, sabias y con tendencia a buscar respuestas en sí mismas. A veces pueden aislarse demasiado, pero su luz guía a otros.",
    anual: "Un ciclo de introspección y estudio. Habrá momentos de soledad que traerán claridad, aunque también el reto de no desconectarse del mundo."
  },
  {
    numero: 11,
    nombre: "La Rueda de la Fortuna",
    nacimiento: "Personas que viven con cambios constantes, altibajos y oportunidades inesperadas. A veces pueden depender demasiado de la suerte, pero su misión es fluir con los ciclos.",
    anual: "Un año de giros y sorpresas. Habrá oportunidades y desafíos, con la enseñanza de aceptar lo que cambia."
  },
  {
    numero: 12,
    nombre: "La Fuerza",
    nacimiento: "Personas valientes, compasivas y capaces de dominar sus impulsos con calma. A veces pueden ser inseguras o demasiado controladoras, pero su esencia es la serenidad.",
    anual: "Un ciclo de pruebas y superación. Se espera fortaleza interior, aunque también momentos de duda que invitan a confiar en uno mismo."
  },
  {
    numero: 13,
    nombre: "El Colgado",
    nacimiento: "Personas que aprenden a ver la vida desde otra perspectiva. A veces pueden sentirse estancadas, pero su misión es transformar a través de la espera.",
    anual: "Un año de pausa y reflexión. Puede traer sacrificios, pero también nuevas formas de ver y crecer."
  },
  {
    numero: 14,
    nombre: "La Muerte",
    nacimiento: "Personas que viven procesos de transformación profunda. A veces pueden resistirse al cambio, pero su esencia es el renacimiento.",
    anual: "Un ciclo de cierres y comienzos. Habrá finales difíciles, pero también oportunidades de renovación."
  },
  {
    numero: 15,
    nombre: "La Templanza",
    nacimiento: "Personas equilibradas, pacientes y con gran capacidad de armonizar. A veces pueden caer en la pasividad, pero buscan la paz.",
    anual: "Un año de reconciliación y sanación. Habrá momentos de calma, aunque también el reto de enfrentar desequilibrios."
  },
  {
    numero: 16,
    nombre: "El Diablo",
    nacimiento: "Personas intensas, apasionadas y con gran energía. A veces pueden caer en dependencias u obsesiones, pero su misión es liberarse.",
    anual: "Un ciclo de confrontar miedos y tentaciones. Puede traer pruebas difíciles, pero también la oportunidad de romper cadenas."
  },
  {
    numero: 17,
    nombre: "La Torre",
    nacimiento: "Personas que viven cambios bruscos y revelaciones. A veces pueden sentir crisis constantes, pero su misión es reconstruir con fuerza.",
    anual: "Un año de sacudidas y transformaciones repentinas. Puede traer pérdidas, pero también claridad y reconstrucción."
  },
  {
    numero: 18,
    nombre: "La Estrella",
    nacimiento: "Personas esperanzadas, inspiradoras y con gran conexión espiritual. A veces pueden caer en ilusiones, pero su esencia es la fe.",
    anual: "Un ciclo de renovación y creatividad. Habrá inspiración y confianza, aunque también el reto de mantener los pies en la tierra."
  },
  {
    numero: 19,
    nombre: "La Luna",
    nacimiento: "Personas sensibles, intuitivas y conectadas con lo inconsciente. A veces pueden perderse en ilusiones o miedos, pero su misión es encontrar claridad.",
    anual: "Un año de emociones intensas y revelaciones. Puede traer confusión, pero también despertar intuitivo."
  },
  {
    numero: 20,
    nombre: "El Sol",
    nacimiento: "Personas alegres, vitales y optimistas, capaces de transmitir energía positiva. A veces pueden negar las sombras o ser arrogantes, pero su misión es iluminar con autenticidad.",
    anual: "Un ciclo de claridad y logros. Se revelarán verdades, incluso incómodas, pero con avances y éxito."
  },
  {
    numero: 21,
    nombre: "El Juicio",
    nacimiento: "Personas que viven procesos de despertar y renovación. A veces pueden caer en la negación, pero su misión es asumir un nuevo camino.",
    anual: "Un año de decisiones importantes y renacimiento. Habrá claridad, pero también confrontación con errores pasados."
  },
  {
    numero: 22,
    nombre: "El Mundo",
    nacimiento: "Personas completas, integradoras y con deseo de plenitud. A veces pueden sentir estancamiento, pero su misión es alcanzar la totalidad.",
    anual: "Un ciclo de culminación y éxito. Se cierran etapas y se celebran logros, aunque puede aparecer una sensación de vacío si no se inicia algo nuevo."
  }
];


/* ==================================================
   PATRÓN STRATEGY
================================================== */

// ========== INICIO: Strategy ==========

class ArcanoNacimientoStrategy {
  calcular(fecha) {
    const digitos = fecha
      .replaceAll("-", "")
      .split("")
      .map(Number);

    return reducirArcano(digitos);
  }
}

class ArcanoAnualStrategy {
  calcular(fechaNacimiento) {
    const partes = fechaNacimiento.split("-");

    const mes = partes[1];
    const dia = partes[2];
    const anioActual = new Date().getFullYear();

    const digitos = `${dia}${mes}${anioActual}`
      .split("")
      .map(Number);

    return reducirArcano(digitos);
  }
}
class HoroscopoStrategy {
  calcular(fechaNacimiento) {
    return obtenerSigno(fechaNacimiento);
  }
}

const PredictionContext = {
  estrategia: null,

  usar(estrategia) {
    this.estrategia = estrategia;
  },

  calcular(...datos) {
    return this.estrategia.calcular(...datos);
  }
};

// ========== FIN: Strategy ==========


/* ==================================================
   FUNCIONES DE LOS ARCANOS
================================================== */

function reducirArcano(digitos) {
  let resultado = digitos.reduce(
    (total, numero) => total + numero,
    0
  );

  while (resultado > 22) {
    resultado = String(resultado)
      .split("")
      .map(Number)
      .reduce(
        (total, numero) => total + numero,
        0
      );
  }

  return resultado === 0 ? 22 : resultado;
}

function buscarArcano(numero) {
  return ARCANOS.find(
    (arcano) => arcano.numero === numero
  );
}


/* ==================================================
   SIGNOS
================================================== */

function obtenerSigno(fechaNacimiento) {
  const partes = fechaNacimiento
    .split("-")
    .map(Number);

  const mes = partes[1];
  const dia = partes[2];
  const fechaNumerica = mes * 100 + dia;

  if (fechaNumerica >= 321 && fechaNumerica <= 419) {
    return "Aries";
  }

  if (fechaNumerica >= 420 && fechaNumerica <= 520) {
    return "Tauro";
  }

  if (fechaNumerica >= 521 && fechaNumerica <= 620) {
    return "Géminis";
  }

  if (fechaNumerica >= 621 && fechaNumerica <= 722) {
    return "Cáncer";
  }

  if (fechaNumerica >= 723 && fechaNumerica <= 822) {
    return "Leo";
  }

  if (fechaNumerica >= 823 && fechaNumerica <= 922) {
    return "Virgo";
  }

  if (fechaNumerica >= 923 && fechaNumerica <= 1022) {
    return "Libra";
  }

  if (fechaNumerica >= 1023 && fechaNumerica <= 1121) {
    return "Escorpio";
  }

  if (fechaNumerica >= 1122 && fechaNumerica <= 1221) {
    return "Sagitario";
  }

  if (fechaNumerica >= 1222 || fechaNumerica <= 119) {
    return "Capricornio";
  }

  if (fechaNumerica >= 120 && fechaNumerica <= 218) {
    return "Acuario";
  }

  return "Piscis";
}


/* ==================================================
   HORÓSCOPO DIARIO LOCAL
================================================== */

const ENERGIA_SIGNOS = {
  Aries:
    "Tu energía te impulsa a comenzar algo nuevo.",
  Tauro:
    "La estabilidad será importante para mantener tu equilibrio.",
  Géminis:
    "Una conversación puede entregarte una perspectiva diferente.",
  Cáncer:
    "Tu intuición estará especialmente presente.",
  Leo:
    "Es un buen momento para mostrar tus capacidades.",
  Virgo:
    "El orden te ayudará a recuperar claridad.",
  Libra:
    "Busca equilibrio antes de tomar una decisión.",
  Escorpio:
    "Una emoción profunda puede mostrarte algo que habías evitado.",
  Sagitario:
    "La curiosidad puede conducirte hacia una oportunidad.",
  Capricornio:
    "La constancia dará mejores resultados que la prisa.",
  Acuario:
    "Una idea diferente puede ayudarte a resolver un problema.",
  Piscis:
    "Tu sensibilidad puede convertirse en una fuente de inspiración."
};

const CONSEJOS_DIARIOS = [
  "Avanza con calma y escucha lo que realmente necesitas.",
  "Evita tomar decisiones impulsivas y observa primero la situación.",
  "Dedica tiempo a una actividad que te permita recuperar energía.",
  "Una pequeña acción puede producir un cambio importante.",
  "Confía en tu intuición, pero acompáñala con reflexión.",
  "No intentes controlar todo; permite que algunas respuestas aparezcan.",
  "Expresa con sinceridad aquello que has estado guardando."
];

function generarHoroscopoDiario(signo) {
  const hoy = new Date();

  const claveFecha =
    hoy.getFullYear() +
    hoy.getMonth() +
    hoy.getDate();

  const claveSigno = signo
    .split("")
    .reduce(
      (total, letra) =>
        total + letra.charCodeAt(0),
      0
    );

  const posicion =
    (claveFecha + claveSigno) %
    CONSEJOS_DIARIOS.length;

  return `
    ${ENERGIA_SIGNOS[signo]}
    ${CONSEJOS_DIARIOS[posicion]}
  `;
}


/* ==================================================
   INICIO
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogo();
  actualizarSesion();
  actualizarContadorCarrito();

  EventBus.subscribe(
    "carritoActualizado",
    actualizarContadorCarrito
  );

  document
    .querySelectorAll(".flecha")
    .forEach((boton) => {
      boton.addEventListener(
        "click",
        moverCarrusel
      );
    });

  document
    .querySelectorAll("[data-cerrar]")
    .forEach((boton) => {
      boton.addEventListener(
        "click",
        cerrarDetalle
      );
    });

  document
    .querySelector("[data-cerrar-modal]")
    .addEventListener(
      "click",
      cerrarModalSesion
    );

  document
    .getElementById("btn-sesion")
    .addEventListener(
      "click",
      manejarSesion
    );

  document
    .getElementById("form-sesion")
    .addEventListener(
      "submit",
      iniciarSesion
    );

  document
    .querySelectorAll("[data-calcular]")
    .forEach((boton) => {
      boton.addEventListener(
        "click",
        calcularHerramienta
      );
    });

  document
    .querySelectorAll("[data-plan]")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        seleccionarPlan(
          boton.dataset.plan
        );
      });
    });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      cerrarDetalle();
      cerrarModalSesion();
    }
  });
});


/* ==================================================
   CATÁLOGO
================================================== */

function renderizarCatalogo() {
  const servicios = getServicios()
    .map(decorarServicio);

  const categorias = [
    "lecturas",
    "astrologia",
    "runas",
    "limpiezas",
    "amuletos"
  ];

  categorias.forEach((categoria) => {
    const serviciosCategoria =
      servicios.filter(
        (servicio) =>
          servicio.categoria === categoria
      );

    renderizarCategoria(
      categoria,
      serviciosCategoria
    );
  });
}

function renderizarCategoria(id, servicios) {
  const contenedor =
    document.getElementById(id);

  if (servicios.length === 0) {
    contenedor.innerHTML = `
      <div class="estado-vacio">
        No hay servicios en esta categoría.
      </div>
    `;

    return;
  }

  contenedor.innerHTML = servicios
    .map((servicio) => {
      const etiquetaPremium =
        servicio.premium
          ? `<span class="badge">Premium</span>`
          : "";

      return `
        <button
          class="tarjeta"
          data-servicio-id="${servicio.id}"
          type="button"
        >
          <img
            src="${escaparHTML(servicio.imagen || IMG_DEFAULT)}"
            alt="${escaparHTML(servicio.nombre)}"
          >

          <div class="tarjeta__cuerpo">
            ${etiquetaPremium}

            <h3>
              ${escaparHTML(servicio.nombre)}
            </h3>

            <strong>
              ${formatoPrecio(servicio.precio)}
            </strong>
          </div>
        </button>
      `;
    })
    .join("");

  contenedor
    .querySelectorAll("[data-servicio-id]")
    .forEach((tarjeta) => {
      tarjeta.addEventListener("click", () => {
        abrirDetalle(
          Number(tarjeta.dataset.servicioId)
        );
      });
    });
}

function moverCarrusel(evento) {
  const boton = evento.currentTarget;

  const carrusel = document.getElementById(
    boton.dataset.carrusel
  );

  const direccion = Number(
    boton.dataset.dir
  );

  carrusel.scrollBy({
    left: direccion * 280,
    behavior: "smooth"
  });
}


/* ==================================================
   PANEL DE DETALLE
================================================== */

function abrirDetalle(idServicio) {
  servicioActivo = getServicios().find(
    (servicio) => servicio.id === idServicio
  );

  if (!servicioActivo) {
    return;
  }

  document.getElementById(
    "detalle-imagen"
  ).src =
    servicioActivo.imagen || IMG_DEFAULT;

  document.getElementById(
    "detalle-categoria"
  ).textContent =
    servicioActivo.categoria;

  document.getElementById(
    "detalle-nombre"
  ).textContent =
    servicioActivo.nombre;

  document.getElementById(
    "detalle-precio"
  ).textContent =
    formatoPrecio(servicioActivo.precio);

  document.getElementById(
    "detalle-descripcion"
  ).textContent =
    servicioActivo.descripcion;

  document.getElementById(
    "detalle-agregar"
  ).onclick = () => {
    agregarCarrito(servicioActivo.id);
  };

  document
    .getElementById("detalle")
    .classList.add("abierto");

  document
    .getElementById("overlay")
    .classList.add("activo");
}

function cerrarDetalle() {
  document
    .getElementById("detalle")
    .classList.remove("abierto");

  document
    .getElementById("overlay")
    .classList.remove("activo");
}


/* ==================================================
   SESIÓN
================================================== */

function manejarSesion() {
  if (getSesion()) {
    localStorage.removeItem(KEYS.sesion);

    actualizarSesion();
    mostrarToast("Sesión cerrada");

    return;
  }

  document
    .getElementById("modal-sesion")
    .classList.remove("hidden");
}

function cerrarModalSesion() {
  document
    .getElementById("modal-sesion")
    .classList.add("hidden");
}

function iniciarSesion(evento) {
  evento.preventDefault();

  const nombre = document
    .getElementById("nombre")
    .value
    .trim();

  const correo = document
    .getElementById("correo")
    .value
    .trim();

  guardar(KEYS.sesion, {
    nombre,
    correo,
    rol: "usuario"
  });

  cerrarModalSesion();
  actualizarSesion();

  mostrarToast(
    "Sesión iniciada correctamente"
  );
}

function actualizarSesion() {
  const sesion = getSesion();

  const boton =
    document.getElementById(
      "btn-sesion"
    );

  boton.textContent = sesion
    ? `Salir (${sesion.nombre})`
    : "Iniciar sesión";
}


/* ==================================================
   CÁLCULOS
================================================== */

function calcularHerramienta(evento) {
  const tipo =
    evento.currentTarget.dataset.calcular;

  if (tipo === "natal") {
    calcularArcanoNacimiento();
  }

  if (tipo === "anual") {
    calcularArcanoAnual();
  }

  if (tipo === "signo") {
    calcularHoroscopo();
  }
}

function calcularArcanoNacimiento() {
  const fecha = document
    .getElementById("fecha-natal")
    .value;

  if (!fecha) {
    mostrarToast(
      "Ingresa tu fecha de nacimiento"
    );

    return;
  }

  PredictionContext.usar(
    new ArcanoNacimientoStrategy()
  );

  const numero =
    PredictionContext.calcular(fecha);

  const arcano = buscarArcano(numero);

  document.getElementById(
    "resultado-natal"
  ).innerHTML = `
    <strong>
      Arcano ${arcano.numero}: ${arcano.nombre}
    </strong>

    <p>
      ${arcano.nacimiento}
    </p>
  `;
}

function calcularArcanoAnual() {
  const fecha = document
    .getElementById("fecha-anual")
    .value;

  if (!fecha) {
    mostrarToast(
      "Ingresa tu fecha de nacimiento"
    );

    return;
  }

  const anioActual = new Date().getFullYear();

  PredictionContext.usar(
    new ArcanoAnualStrategy()
  );

  const numero =
    PredictionContext.calcular(fecha);

  const arcano = buscarArcano(numero);

  document.getElementById(
    "resultado-anual"
  ).innerHTML = `
    <strong>
      Arcano de ${anioActual}:
      ${arcano.numero} - ${arcano.nombre}
    </strong>

    <p>
      ${arcano.anual}
    </p>
  `;
}

function calcularHoroscopo() {
  const fecha = document
    .getElementById("fecha-signo")
    .value;

  if (!fecha) {
    mostrarToast(
      "Ingresa tu fecha de nacimiento"
    );

    return;
  }

  PredictionContext.usar(
    new HoroscopoStrategy()
  );

  const signo =
    PredictionContext.calcular(fecha);

  const horoscopo =
    generarHoroscopoDiario(signo);

  document.getElementById(
    "resultado-signo"
  ).innerHTML = `
    <strong>
      Tu signo es ${signo}
    </strong>

    <p>
      ${horoscopo}
    </p>
  `;
}


/* ==================================================
   PLANES
================================================== */

function seleccionarPlan(nombrePlan) {
  if (!getSesion()) {
    document
      .getElementById("modal-sesion")
      .classList.remove("hidden");

    mostrarToast(
      "Primero debes iniciar sesión"
    );

    return;
  }

  mostrarToast(
    `${nombrePlan} seleccionado. La administradora te contactará.`
  );
}