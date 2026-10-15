import { servicios, obtenerServicio, renderizarCatalogo } from './catalogo.js';
import { solicitudes, renderizarSolicitudes } from './interaccion.js';
import { filtrarServicios, cambiarEstado, registrarEvento } from './ea2-logica.js';
export const auditoria = [], eventos = [];
let consentimiento = 'sin-decision';
const q = s => document.querySelector(s);
function filtrar() { renderizarCatalogo(filtrarServicios(servicios, q('#filtro-categoria').value)); }
q('#filtro-categoria').addEventListener('change', filtrar);
document.addEventListener('catalogo-listo', filtrar);
function medir(nombre, id) {
  registrarEvento(consentimiento, nombre, obtenerServicio(id), eventos);
  q('#total-eventos').textContent = eventos.length + ' eventos';
}
q('#servicio').addEventListener('change', () => medir('select_service', q('#servicio').value));
document.addEventListener('solicitud-creada', e => {
  const selector = q('#solicitud-gestion');
  if (selector.options[0]?.value === '') selector.replaceChildren();
  selector.add(new Option('SOL-' + String(e.detail.id).padStart(4, '0'), String(e.detail.id)));
  medir('submit_request', e.detail.servicio_id);
});
q('#cambiar-estado').addEventListener('click', () => {
  const rol = q('#actor-demo').value;
  const actor = { id: rol === 'tecnico' ? 2 : 1, rol };
  const cambio = cambiarEstado(solicitudes, Number(q('#solicitud-gestion').value), q('#nuevo-estado').value, actor, auditoria);
  q('#estado-gestion').textContent = cambio ? 'Estado actualizado y auditado en esta práctica.' : 'No se realizó el cambio. Comprueba rol, solicitud y estado; R3 debe estar implementado.';
  renderizarSolicitudes();
  q('#estado-gestion').classList.remove('ea2-actualizada');
  if (cambio) { void q('#estado-gestion').offsetWidth; q('#estado-gestion').classList.add('ea2-actualizada'); }
  q('#lista-auditoria').replaceChildren(...auditoria.map(a => {
    const li = document.createElement('li');
    li.textContent = 'Actor ' + a.actor_id + ' | Solicitud ' + a.solicitud_id + ' | ' + a.accion + ' | ' + a.anterior + ' → ' + a.nuevo + ' | ' + a.fecha;
    return li;
  }));
});
function elegir(v) {
  consentimiento = v;
  q('#estado-consentimiento').textContent = 'Preferencia actual: ' + v + '. Puedes cambiarla en cualquier momento.';
}
q('#aceptar-analitica').addEventListener('click', () => elegir('aceptado'));
q('#rechazar-analitica').addEventListener('click', () => elegir('rechazado'));
