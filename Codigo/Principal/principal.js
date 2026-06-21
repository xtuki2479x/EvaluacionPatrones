// ========== INICIO: Observer (EventBus) ==========
const EventBus = {
  _eventos: {},
  subscribe(evento, fn) {
    if (!this._eventos[evento]) this._eventos[evento] = [];
    this._eventos[evento].push(fn);
  },
  publish(evento, data) {
    (this._eventos[evento] || []).forEach(fn => fn(data));
  }
};
// ========== FIN: Observer ==========


// ========== INICIO: Factory Method ==========
class ServicioBase {
  constructor(datos) { Object.assign(this, datos); }
  esPremium() { return this.categoria === 'premium'; }
}
class ServicioLectura   extends ServicioBase {}
class ServicioAstrologia extends ServicioBase {}
class ServicioPremium   extends ServicioBase {}

const ServiceFactory = {
  create(datos) {
    switch (datos.categoria) {
      case 'astrologia': return new ServicioAstrologia(datos);
      case 'premium':    return new ServicioPremium(datos);
      default:           return new ServicioLectura(datos);
    }
  }
};
// ========== FIN: Factory Method ==========


// ========== INICIO: Decorator ==========
class PremiumDecorator {
  constructor(servicio) { this._s = servicio; }
  get id()              { return this._s.id; }
  get nombre()          { return this._s.nombre; }
  get descripcionCorta(){ return this._s.descripcionCorta; }
  get descripcion()     { return this._s.descripcion; }
  get precio()          { return this._s.precio; }
  get imagen()          { return this._s.imagen; }
  get categoria()       { return this._s.categoria; }
  esPremium()           { return true; }
  badgeExtra()          { return '<span class="badge-premium">✦ Exclusivo</span>'; }
}
// ========== FIN: Decorator ==========


// ========== INICIO: Strategy ==========
const ARCANOS = [
  { n:1,  nombre:'El Loco',               natal:'Las personas con este arcano suelen ser libres, curiosas y aventureras, siempre buscando experiencias nuevas. Aunque a veces pueden parecer imprudentes o poco constantes, su esencia es la frescura y la capacidad de abrir caminos.',              anio:'Un año de comienzos y oportunidades inesperadas. Habrá entusiasmo y descubrimientos, pero también riesgos de confusión si no se actúa con responsabilidad.' },
  { n:2,  nombre:'El Mago',               natal:'Personas creativas, ingeniosas y con gran capacidad de manifestar sus ideas. Aunque a veces pueden caer en manipulación o exceso de control, su misión es usar sus talentos con ética.',                                                              anio:'Un ciclo para tomar acción y demostrar habilidades. Se esperan logros y proyectos nuevos, pero también la necesidad de evitar engaños o ilusiones de poder.' },
  { n:3,  nombre:'La Sacerdotisa',         natal:'Personas intuitivas, reservadas y con gran sabiduría interior. A veces pueden ser demasiado pasivas o misteriosas, pero su fuerza está en escuchar su voz interna.',                                                                                anio:'Un año de introspección y revelaciones. Habrá momentos de claridad espiritual, aunque también de dudas y silencios que invitan a reflexionar.' },
  { n:4,  nombre:'La Emperatriz',          natal:'Personas creativas, abundantes y protectoras, con facilidad para nutrir y dar vida a proyectos. A veces pueden caer en la comodidad o la dependencia, pero su esencia es la prosperidad.',                                                          anio:'Un ciclo de crecimiento y expansión. Se esperan frutos en proyectos y relaciones, aunque también el reto de no quedarse en lo superficial.' },
  { n:5,  nombre:'El Emperador',           natal:'Personas ordenadas, disciplinadas y con gran capacidad de liderazgo. A veces pueden ser rígidas o autoritarias, pero buscan dar estabilidad.',                                                                                                      anio:'Un año para organizar y consolidar. Habrá avances en estructuras y proyectos, aunque también el desafío de no caer en la inflexibilidad.' },
  { n:6,  nombre:'El Papa',                natal:'Personas espirituales, sabias y con vocación de enseñanza. Pueden caer en el dogmatismo, pero su misión es transmitir valores y guía.',                                                                                                             anio:'Un ciclo de aprendizaje y conexión espiritual. Se esperan enseñanzas y guía, aunque también la necesidad de cuestionar creencias rígidas.' },
  { n:7,  nombre:'Los Enamorados',         natal:'Personas sensibles, afectivas y con tendencia a vivir entre elecciones importantes. A veces indecisas, pero con gran capacidad de amar.',                                                                                                           anio:'Un año de decisiones cruciales en relaciones y proyectos. Puede traer unión o separación, según cómo se elija.' },
  { n:8,  nombre:'El Carro',               natal:'Personas determinadas, valientes y con gran energía para avanzar. A veces pueden ser impulsivas o agresivas, pero buscan la victoria.',                                                                                                             anio:'Un ciclo de movimiento y logros. Se esperan viajes y conquistas, aunque también el reto de controlar la impulsividad.' },
  { n:9,  nombre:'La Justicia',            natal:'Personas equilibradas, responsables y con gran sentido de la verdad. A veces pueden ser frías o demasiado críticas, pero buscan la justicia.',                                                                                                      anio:'Un año de claridad y decisiones importantes. Habrá responsabilidades que asumir y verdades que enfrentar.' },
  { n:10, nombre:'El Ermitaño',            natal:'Personas reflexivas, sabias y con tendencia a buscar respuestas en sí mismas. A veces pueden aislarse demasiado, pero su luz guía a otros.',                                                                                                        anio:'Un ciclo de introspección y estudio. Habrá momentos de soledad que traerán claridad, aunque también el reto de no desconectarse del mundo.' },
  { n:11, nombre:'La Rueda de la Fortuna', natal:'Personas que viven con cambios constantes, altibajos y oportunidades inesperadas. A veces pueden depender demasiado de la suerte, pero su misión es fluir con los ciclos.',                                                                         anio:'Un año de giros y sorpresas. Habrá oportunidades y desafíos, con la enseñanza de aceptar lo que cambia.' },
  { n:12, nombre:'La Fuerza',              natal:'Personas valientes, compasivas y capaces de dominar sus impulsos con calma. A veces pueden ser inseguras o demasiado controladoras, pero su esencia es la serenidad.',                                                                              anio:'Un ciclo de pruebas y superación. Se espera fortaleza interior, aunque también momentos de duda que invitan a confiar en uno mismo.' },
  { n:13, nombre:'El Colgado',             natal:'Personas que aprenden a ver la vida desde otra perspectiva. A veces pueden sentirse estancadas, pero su misión es transformar a través de la espera.',                                                                                               anio:'Un año de pausa y reflexión. Puede traer sacrificios, pero también nuevas formas de ver y crecer.' },
  { n:14, nombre:'La Muerte',              natal:'Personas que viven procesos de transformación profunda. A veces pueden resistirse al cambio, pero su esencia es el renacimiento.',                                                                                                                   anio:'Un ciclo de cierres y comienzos. Habrá finales dolorosos, pero también oportunidades de renovación.' },
  { n:15, nombre:'La Templanza',           natal:'Personas equilibradas, pacientes y con gran capacidad de armonizar. A veces pueden caer en la pasividad, pero buscan la paz.',                                                                                                                      anio:'Un año de reconciliación y sanación. Habrá momentos de calma, aunque también el reto de enfrentar desequilibrios.' },
  { n:16, nombre:'El Diablo',              natal:'Personas intensas, apasionadas y con gran energía. A veces pueden caer en dependencias o obsesiones, pero su misión es liberarse.',                                                                                                                 anio:'Un ciclo de confrontar miedos y tentaciones. Puede traer pruebas difíciles, pero también la oportunidad de romper cadenas.' },
  { n:17, nombre:'La Torre',               natal:'Personas que viven cambios bruscos y revelaciones. A veces pueden sentir crisis constantes, pero su misión es reconstruir con fuerza.',                                                                                                             anio:'Un año de sacudidas y transformaciones repentinas. Puede traer pérdidas, pero también claridad y reconstrucción.' },
  { n:18, nombre:'La Estrella',            natal:'Personas esperanzadas, inspiradoras y con gran conexión espiritual. A veces pueden caer en ilusiones, pero su esencia es la fe.',                                                                                                                   anio:'Un ciclo de renovación y creatividad. Habrá inspiración y confianza, aunque también el reto de mantener los pies en la tierra.' },
  { n:19, nombre:'La Luna',                natal:'Personas sensibles, intuitivas y conectadas con lo inconsciente. A veces pueden perderse en ilusiones o miedos, pero su misión es encontrar claridad.',                                                                                             anio:'Un año de emociones intensas y revelaciones. Puede traer confusión, pero también despertar intuitivo.' },
  { n:20, nombre:'El Sol',                 natal:'Personas alegres, vitales y optimistas, capaces de transmitir energía positiva. A veces pueden negar las sombras o ser arrogantes, pero su misión es iluminar con autenticidad.',                                                                   anio:'Un ciclo de claridad y logros. Se revelarán verdades, incluso incómodas, pero con avances y éxito.' },
  { n:21, nombre:'El Juicio',              natal:'Personas que viven procesos de despertar y renovación. A veces pueden caer en la negación, pero su misión es asumir un nuevo camino.',                                                                                                              anio:'Un año de decisiones importantes y renacimiento. Habrá claridad, pero también confrontación con errores pasados.' },
  { n:22, nombre:'El Mundo',               natal:'Personas completas, integradoras y con deseo de plenitud. A veces pueden sentir estancamiento, pero su misión es alcanzar la totalidad.',                                                                                                           anio:'Un ciclo de culminación y éxito. Se cierran etapas y se celebran logros, aunque también puede aparecer la sensación de vacío si no se inicia algo nuevo.' },
];

const SIGNOS = [
  { nombre:'Capricornio', emoji:'♑', rango:[[12,22],[1,19]] },
  { nombre:'Acuario',     emoji:'♒', rango:[[1,20],[2,18]] },
  { nombre:'Piscis',      emoji:'♓', rango:[[2,19],[3,20]] },
  { nombre:'Aries',       emoji:'♈', rango:[[3,21],[4,19]] },
  { nombre:'Tauro',       emoji:'♉', rango:[[4,20],[5,20]] },
  { nombre:'Géminis',     emoji:'♊', rango:[[5,21],[6,20]] },
  { nombre:'Cáncer',      emoji:'♋', rango:[[6,21],[7,22]] },
  { nombre:'Leo',         emoji:'♌', rango:[[7,23],[8,22]] },
  { nombre:'Virgo',       emoji:'♍', rango:[[8,23],[9,22]] },
  { nombre:'Libra',       emoji:'♎', rango:[[9,23],[10,22]] },
  { nombre:'Escorpio',    emoji:'♏', rango:[[10,23],[11,21]] },
  { nombre:'Sagitario',   emoji:'♐', rango:[[11,22],[12,21]] },
];

class CartaNatalStrategy {
  calcular(fecha) {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const digits = `${dia}${mes}${anio}`.split('').map(Number);
    let suma = digits.reduce((a, b) => a + b, 0);
    while (suma > 22) {
      suma = String(suma).split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return { numero: suma, tipo: 'natal' };
  }
}

class ArcanoAnualStrategy {
  calcular(fecha, anio) {
    const [, mes, dia] = fecha.split('-').map(Number);
    const digits = `${dia}${mes}${anio}`.split('').map(Number);
    let suma = digits.reduce((a, b) => a + b, 0);
    while (suma > 22) {
      suma = String(suma).split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return { numero: suma, tipo: 'anual' };
  }
}

class HoroscopoStrategy {
  calcular(fecha) {
    const [, mes, dia] = fecha.split('-').map(Number);
    const signo = SIGNOS.find(s => {
      const [ini, fin] = s.rango;
      if (ini[0] === fin[0]) return mes === ini[0] && dia >= ini[1] && dia <= fin[1];
      return (mes === ini[0] && dia >= ini[1]) || (mes === fin[0] && dia <= fin[1]);
    });
    return signo || SIGNOS[0];
  }
}

const PredictionContext = {
  _strategy: null,
  setStrategy(s) { this._strategy = s; },
  calcular(...args) { return this._strategy.calcular(...args); }
};
// ========== FIN: Strategy ==========


// ── SERVICIOS POR DEFECTO ──
const SERVICIOS_DEFAULT = [
  { id:1, nombre:'Producto 1', descripcionCorta:'Descripción corta 1', descripcion:'Descripción completa del producto 1. Aquí irá toda la información detallada del servicio.', precio:15000, imagen:'', categoria:'lecturas' },
  { id:2, nombre:'Producto 2', descripcionCorta:'Descripción corta 2', descripcion:'Descripción completa del producto 2. Aquí irá toda la información detallada del servicio.', precio:20000, imagen:'', categoria:'lecturas' },
  { id:3, nombre:'Producto 3', descripcionCorta:'Descripción corta 3', descripcion:'Descripción completa del producto 3. Aquí irá toda la información detallada del servicio.', precio:18000, imagen:'', categoria:'astrologia' },
  { id:4, nombre:'Producto 4', descripcionCorta:'Descripción corta 4', descripcion:'Descripción completa del producto 4. Aquí irá toda la información detallada del servicio.', precio:25000, imagen:'', categoria:'astrologia' },
  { id:5, nombre:'Producto 5', descripcionCorta:'Descripción corta 5', descripcion:'Descripción completa del producto 5. Aquí irá toda la información detallada del servicio.', precio:35000, imagen:'', categoria:'premium' },
];

// ── ESTADO ──
let servicioActivo = null;
let carritoAbierto = false;
let panelAbierto   = false;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  cargarSesion();
  renderCatalogo();
  renderCarritoPanel();
  actualizarBadgeCarrito();
  EventBus.subscribe('carritoActualizado', () => {
    actualizarBadgeCarrito();
    renderCarritoPanel();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') cerrarTodo();
  });
});

// ── SERVICIOS ──
function getServicios() {
  const guardados = localStorage.getItem('mee_servicios');
  if (guardados) return JSON.parse(guardados);
  localStorage.setItem('mee_servicios', JSON.stringify(SERVICIOS_DEFAULT));
  return SERVICIOS_DEFAULT;
}

// ── CATÁLOGO ──
function renderCatalogo() {
  const servicios = getServicios();
  const categorias = { lecturas: [], astrologia: [], premium: [] };

  servicios.forEach(datos => {
    let s = ServiceFactory.create(datos);
    if (s.esPremium()) s = new PremiumDecorator(s);
    if (categorias[datos.categoria] !== undefined) categorias[datos.categoria].push(s);
  });

  renderCarrusel('carrusel-lecturas',   categorias.lecturas);
  renderCarrusel('carrusel-astrologia', categorias.astrologia);
  renderCarrusel('carrusel-premium',    categorias.premium);
}

function renderCarrusel(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!items.length) {
    el.innerHTML = '<p class="text-suave" style="padding:1rem;font-size:.85rem">Sin servicios en esta categoría.</p>';
    return;
  }
  el.innerHTML = items.map(s => tarjetaHTML(s)).join('');
}

function tarjetaHTML(s) {
  const imgContenido = s.imagen
    ? `<img src="${s.imagen}" alt="${s.nombre}" />`
    : `<span style="font-size:.75rem;color:var(--texto-suave)">Sin imagen</span>`;

  const badgePremium = s.esPremium()
    ? `<span class="tarjeta__badge-premium badge-premium">✦</span>` : '';

  return `
    <div class="tarjeta" onclick="abrirPanel(${s.id})" role="button" tabindex="0"
         onkeydown="if(event.key==='Enter')abrirPanel(${s.id})">
      <div class="tarjeta__imagen">${imgContenido}</div>
      ${badgePremium}
      <div class="tarjeta__info">
        <p class="tarjeta__nombre">${s.nombre}</p>
        <p class="tarjeta__precio">${formatPrecio(s.precio)}</p>
      </div>
    </div>`;
}

// ── PANEL DETALLE (izquierdo) ──
function abrirPanel(id) {
  const servicios = getServicios();
  const datos = servicios.find(s => s.id === id);
  if (!datos) return;

  let s = ServiceFactory.create(datos);
  if (s.esPremium()) s = new PremiumDecorator(s);
  servicioActivo = s;

  const imgEl = document.getElementById('panel-imagen');
  imgEl.innerHTML = s.imagen
    ? `<img src="${s.imagen}" alt="${s.nombre}" style="width:100%;height:100%;object-fit:cover">`
    : `<span style="font-size:.8rem;color:var(--texto-suave)">Sin imagen</span>`;

  document.getElementById('panel-categoria').textContent  = s.categoria;
  document.getElementById('panel-nombre').textContent     = s.nombre;
  document.getElementById('panel-precio').textContent     = formatPrecio(s.precio);
  document.getElementById('panel-descripcion').textContent = s.descripcion;
  document.getElementById('panel-accion').innerHTML =
    `<button class="btn btn--primario btn--bloque" onclick="agregarAlCarrito(${s.id})">Agregar al carrito</button>`;

  document.getElementById('panel-detalle').classList.remove('hidden');
  document.getElementById('overlay').classList.add('activo');
  panelAbierto = true;
}

function cerrarPanel() {
  document.getElementById('panel-detalle').classList.add('hidden');
  if (!carritoAbierto) document.getElementById('overlay').classList.remove('activo');
  panelAbierto = false;
}

// ── CARRITO PANEL (derecho) ──
function toggleCarrito() {
  const panel = document.getElementById('panel-carrito');
  carritoAbierto = !carritoAbierto;
  panel.classList.toggle('hidden', !carritoAbierto);
  document.getElementById('overlay').classList.toggle('activo', carritoAbierto || panelAbierto);
  if (carritoAbierto) renderCarritoPanel();
}

function renderCarritoPanel() {
  const items = getCarrito();
  const contenedor = document.getElementById('carrito-items');
  const totalEl    = document.getElementById('carrito-total-precio');
  if (!contenedor) return;

  if (!items.length) {
    contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    totalEl.textContent = '$0';
    return;
  }

  contenedor.innerHTML = items.map(item => `
    <div class="carrito-item">
      <span class="carrito-item__nombre">${item.nombre}</span>
      <span class="carrito-item__precio">${formatPrecio(item.precio)}</span>
      <button class="carrito-item__eliminar" onclick="eliminarDelCarrito(${item.id})">✕</button>
    </div>`).join('');

  const total = items.reduce((a, b) => a + b.precio, 0);
  totalEl.textContent = formatPrecio(total);
}

function agregarAlCarrito(id) {
  const servicios = getServicios();
  const s = servicios.find(x => x.id === id);
  if (!s) return;
  const carrito = getCarrito();
  carrito.push({ id: s.id, nombre: s.nombre, precio: s.precio });
  localStorage.setItem('mee_carrito', JSON.stringify(carrito));
  EventBus.publish('carritoActualizado', carrito);
  mostrarToast(`${s.nombre} agregado al carrito`, 'exito');
}

function eliminarDelCarrito(id) {
  let carrito = getCarrito();
  const idx = carrito.findIndex(x => x.id === id);
  if (idx !== -1) carrito.splice(idx, 1);
  localStorage.setItem('mee_carrito', JSON.stringify(carrito));
  EventBus.publish('carritoActualizado', carrito);
}

function getCarrito() {
  return JSON.parse(localStorage.getItem('mee_carrito') || '[]');
}

function actualizarBadgeCarrito() {
  const badge = document.getElementById('carrito-badge');
  const n = getCarrito().length;
  badge.textContent = n;
  badge.classList.toggle('visible', n > 0);
}

// ── CARRUSEL FLECHAS ──
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-flecha');
  if (!btn) return;
  const dir    = btn.dataset.dir;
  const target = btn.dataset.target;
  const el     = document.getElementById(target);
  if (!el) return;
  el.scrollBy({ left: dir === 'der' ? 220 : -220, behavior: 'smooth' });
});

// ── OVERLAY Y ESCAPE ──
function cerrarTodo() {
  cerrarPanel();
  if (carritoAbierto) toggleCarrito();
  cerrarModal('modal-login');
  cerrarModal('modal-registro');
}

// ── AUTH (simulado) ──
function cargarSesion() {
  const sesion = JSON.parse(localStorage.getItem('mee_sesion') || 'null');
  const authBtns = document.getElementById('auth-buttons');
  const authUser = document.getElementById('auth-usuario');

  if (sesion) {
    authBtns.classList.add('hidden');
    authUser.classList.remove('hidden');
    document.getElementById('usuario-nombre').textContent = sesion.nombre;
    const badge = document.getElementById('usuario-badge');
    badge.textContent = sesion.rol;
    badge.className = `badge-rol badge-rol--${sesion.rol}`;
  } else {
    authBtns.classList.remove('hidden');
    authUser.classList.add('hidden');
  }
}

function iniciarSesion() {
  const usuario = document.getElementById('login-usuario').value.trim();
  const pass    = document.getElementById('login-pass').value.trim();
  if (!usuario || !pass) { mostrarToast('Completa los campos', 'error'); return; }
  const sesion = { nombre: usuario, rol: 'usuario' };
  localStorage.setItem('mee_sesion', JSON.stringify(sesion));
  cerrarModal('modal-login');
  cargarSesion();
  mostrarToast(`Bienvenida, ${usuario}`, 'exito');
}

function registrar() {
  const nombre = document.getElementById('reg-nombre').value.trim();
  const email  = document.getElementById('reg-email').value.trim();
  const pass   = document.getElementById('reg-pass').value.trim();
  if (!nombre || !email || !pass) { mostrarToast('Completa todos los campos', 'error'); return; }
  const sesion = { nombre, rol: 'usuario' };
  localStorage.setItem('mee_sesion', JSON.stringify(sesion));
  cerrarModal('modal-registro');
  cargarSesion();
  mostrarToast(`Cuenta creada. Bienvenida, ${nombre}`, 'exito');
}

function cerrarSesion() {
  localStorage.removeItem('mee_sesion');
  cargarSesion();
  mostrarToast('Sesión cerrada');
}

function abrirLogin()   { document.getElementById('modal-login').classList.remove('hidden'); }
function abrirRegistro(){ document.getElementById('modal-registro').classList.remove('hidden'); }

function cerrarModal(id) {
  document.getElementById(id)?.classList.add('hidden');
}

function switchModal(cerrar, abrir) {
  cerrarModal(cerrar);
  document.getElementById(abrir).classList.remove('hidden');
}

// ── CÁLCULO CARTAS ──
function calcularNatal() {
  const fecha = document.getElementById('fecha-natal').value;
  if (!fecha) { mostrarToast('Ingresa tu fecha de nacimiento', 'error'); return; }
  PredictionContext.setStrategy(new CartaNatalStrategy());
  const { numero } = PredictionContext.calcular(fecha);
  const arcano = ARCANOS[numero - 1];
  const el = document.getElementById('resultado-natal');
  el.innerHTML = `
    <p class="carta-resultado__arcano">Arcano ${numero} — ${arcano.nombre}</p>
    <p class="carta-resultado__numero">Arcano de nacimiento</p>
    <p class="carta-resultado__desc">${arcano.natal}</p>`;
  el.classList.remove('hidden');
}

function calcularAnual() {
  const fecha = document.getElementById('fecha-anual').value;
  const anio  = document.getElementById('anio-anual').value.trim();
  if (!fecha || !anio) { mostrarToast('Ingresa fecha y año', 'error'); return; }
  PredictionContext.setStrategy(new ArcanoAnualStrategy());
  const { numero } = PredictionContext.calcular(fecha, anio);
  const arcano = ARCANOS[numero - 1];
  const el = document.getElementById('resultado-anual');
  el.innerHTML = `
    <p class="carta-resultado__arcano">Arcano ${numero} — ${arcano.nombre}</p>
    <p class="carta-resultado__numero">Arcano del año ${anio}</p>
    <p class="carta-resultado__desc">${arcano.anio}</p>`;
  el.classList.remove('hidden');
}

async function calcularHoroscopo() {
  const fecha = document.getElementById('fecha-horoscopo').value;
  if (!fecha) { mostrarToast('Ingresa tu fecha de nacimiento', 'error'); return; }

  PredictionContext.setStrategy(new HoroscopoStrategy());
  const signo = PredictionContext.calcular(fecha);
  const el = document.getElementById('resultado-horoscopo');

  el.innerHTML = `
    <p class="horoscopo-signo">${signo.emoji} ${signo.nombre}</p>
    <p class="horoscopo-cargando">Buscando horóscopo del día...</p>`;
  el.classList.remove('hidden');

  // Punto de integración: reemplazar con API real de horóscopo
  // Ej: https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=Aries&day=TODAY
  try {
    const slugs = { Capricornio:'capricorn',Acuario:'aquarius',Piscis:'pisces',Aries:'aries',Tauro:'taurus',Géminis:'gemini',Cáncer:'cancer',Leo:'leo',Virgo:'virgo',Libra:'libra',Escorpio:'scorpio',Sagitario:'sagittarius' };
    const res  = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${slugs[signo.nombre]}&day=TODAY`);
    const json = await res.json();
    const texto = json?.data?.horoscope_data || 'No se pudo obtener el horóscopo hoy.';
    el.innerHTML = `
      <p class="horoscopo-signo">${signo.emoji} ${signo.nombre}</p>
      <p class="carta-resultado__desc">${texto}</p>`;
  } catch {
    el.innerHTML = `
      <p class="horoscopo-signo">${signo.emoji} ${signo.nombre}</p>
      <p class="carta-resultado__desc">No se pudo conectar con el servicio de horóscopo. Intenta más tarde.</p>`;
  }
}

// ── TOAST ──
function mostrarToast(msg, tipo = 'info') {
  const cont = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast--${tipo}`;
  t.textContent = msg;
  cont.appendChild(t);
  setTimeout(() => {
    t.classList.add('saliendo');
    t.addEventListener('animationend', () => t.remove());
  }, 3000);
}

// ── UTILS ──
function formatPrecio(n) {
  return '$' + Number(n).toLocaleString('es-CL');
}

function suscribirse(plan) {
  const sesion = JSON.parse(localStorage.getItem('mee_sesion') || 'null');
  if (!sesion) { abrirLogin(); mostrarToast('Inicia sesión para suscribirte', 'error'); return; }
  mostrarToast(`Te suscribiste al ${plan}. La administradora te contactará pronto.`, 'exito');
}