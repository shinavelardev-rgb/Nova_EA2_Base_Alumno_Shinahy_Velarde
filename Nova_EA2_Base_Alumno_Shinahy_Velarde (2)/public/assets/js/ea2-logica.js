const ESTADOS_VALIDOS = new Set([
  'Pendiente',
  'En proceso',
  'Resuelto',
  'Cerrado/Cancelado',
]);

const CATEGORIAS_VALIDAS = new Set(['Accesos', 'Hardware', 'Red', 'Software']);
const EVENTOS_VALIDOS = new Set(['select_service', 'submit_request']);

export function filtrarServicios(lista, categoria) {
  if (!Array.isArray(lista)) return [];
  if (categoria === 'Todas') return [...lista];
  return lista.filter((servicio) => servicio.categoria === categoria);
}

export function validarUrgencia(prioridad, motivo) {
  if (prioridad !== 'alta') return '';
  const texto = typeof motivo === 'string' ? motivo.trim() : '';
  return texto.length >= 15
    ? ''
    : 'Para prioridad alta, explica el motivo con al menos 15 caracteres.';
}

export function cambiarEstado(solicitudes, id, nuevoEstado, actor, auditoria) {
  if (!Array.isArray(solicitudes) || !Array.isArray(auditoria)) return false;
  if (!actor || actor.rol !== 'tecnico') return false;
  if (!ESTADOS_VALIDOS.has(nuevoEstado)) return false;

  const solicitud = solicitudes.find((item) => item.id === id);
  if (!solicitud || solicitud.estado === nuevoEstado) return false;

  const anterior = solicitud.estado;
  const ids = auditoria
    .map((registro) => Number(registro.id))
    .filter((valor) => Number.isSafeInteger(valor) && valor > 0);
  const siguienteId = ids.length ? Math.max(...ids) + 1 : 1;

  solicitud.estado = nuevoEstado;
  auditoria.push({
    id: siguienteId,
    actor_id: actor.id,
    solicitud_id: solicitud.id,
    accion: 'CAMBIO_ESTADO',
    anterior,
    nuevo: nuevoEstado,
    fecha: new Date().toISOString(),
  });
  return true;
}

export function registrarEvento(consentimiento, nombre, servicio, eventos) {
  if (consentimiento !== 'aceptado') return false;
  if (!EVENTOS_VALIDOS.has(nombre)) return false;
  if (!servicio || !Array.isArray(eventos)) return false;

  const serviceId = Number(servicio.id);
  if (!Number.isSafeInteger(serviceId) || serviceId <= 0) return false;
  if (!CATEGORIAS_VALIDAS.has(servicio.categoria)) return false;

  eventos.push({
    event: nombre,
    service_id: String(serviceId),
    categoria: servicio.categoria,
  });
  return true;
}
