import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filtrarServicios,
  validarUrgencia,
  cambiarEstado,
  registrarEvento,
} from '../public/assets/js/ea2-logica.js';

test('R1 filtra por coincidencia exacta sin mutar la fuente', () => {
  const fuente = [
    { id: 1, categoria: 'Red' },
    { id: 2, categoria: 'Hardware' },
  ];
  const todas = filtrarServicios(fuente, 'Todas');
  assert.deepEqual(todas, fuente);
  assert.notStrictEqual(todas, fuente);
  assert.deepEqual(filtrarServicios(fuente, 'Red'), [fuente[0]]);
  assert.deepEqual(filtrarServicios(fuente, 'Software'), []);
});

test('R2 exige 15 caracteres útiles solo para alta', () => {
  assert.match(validarUrgencia('alta', '12345678901234'), /15 caracteres/);
  assert.equal(validarUrgencia('alta', ' 123456789012345 '), '');
  assert.equal(validarUrgencia('media', ''), '');
  assert.equal(validarUrgencia('baja', 'x'), '');
});

test('R3 cambia estado y agrega una auditoría exacta', () => {
  const solicitudes = [{ id: 4, estado: 'Pendiente' }];
  const auditoria = [];
  assert.equal(
    cambiarEstado(solicitudes, 4, 'Resuelto', { id: 2, rol: 'tecnico' }, auditoria),
    true,
  );
  assert.equal(solicitudes[0].estado, 'Resuelto');
  assert.equal(auditoria.length, 1);
  assert.deepEqual(Object.keys(auditoria[0]).sort(), [
    'accion', 'actor_id', 'anterior', 'fecha', 'id', 'nuevo', 'solicitud_id',
  ]);
  assert.equal(auditoria[0].accion, 'CAMBIO_ESTADO');
  assert.match(auditoria[0].fecha, /^\d{4}-\d{2}-\d{2}T/);
});

test('R3 rechaza cambios inválidos sin modificar datos', () => {
  const solicitudes = [{ id: 4, estado: 'Pendiente' }];
  const auditoria = [];
  assert.equal(cambiarEstado(solicitudes, 4, 'Resuelto', { id: 1, rol: 'solicitante' }, auditoria), false);
  assert.equal(cambiarEstado(solicitudes, 99, 'Resuelto', { id: 2, rol: 'tecnico' }, auditoria), false);
  assert.equal(cambiarEstado(solicitudes, 4, 'Desconocido', { id: 2, rol: 'tecnico' }, auditoria), false);
  assert.equal(cambiarEstado(solicitudes, 4, 'Pendiente', { id: 2, rol: 'tecnico' }, auditoria), false);
  assert.equal(solicitudes[0].estado, 'Pendiente');
  assert.equal(auditoria.length, 0);
});

test('R4 registra únicamente eventos anónimos válidos con aceptación', () => {
  const eventos = [];
  const servicio = { id: 8, categoria: 'Hardware', nombre: 'No debe copiarse' };
  assert.equal(registrarEvento('aceptado', 'select_service', servicio, eventos), true);
  assert.deepEqual(eventos, [{ event: 'select_service', service_id: '8', categoria: 'Hardware' }]);
  assert.equal(registrarEvento('aceptado', 'otro_evento', servicio, eventos), false);
  assert.equal(registrarEvento('aceptado', 'submit_request', { id: 0, categoria: 'Hardware' }, eventos), false);
  assert.equal(registrarEvento('rechazado', 'submit_request', servicio, eventos), false);
  assert.equal(eventos.length, 1);
});
