# Registro de pruebas EA2

Los casos funcionales R1–R4 se verificaron con `npm test` y los casos visuales deben
confirmarse en el navegador antes de publicar el enlace final.

| ID | Acción | Esperado | Resultado real | Estado | Evidencia |
|---|---|---|---|---|---|
| P01 | Todas y luego Red | 5 y 1 tarjetas; fuente y selector intactos | Verificado por función y revisión del listener | Aprobado | `npm test`, R1 |
| P02 | Filtro por categoría sin coincidencia en prueba de función | Lista vacía y mensaje en vista | `filtrarServicios` devuelve `[]`; la vista usa el mensaje de catálogo | Aprobado | `npm test`, R1 |
| P03 | Alta y motivo de 14 caracteres o espacios | Error y foco; ninguna solicitud | La función devuelve error; el listener existente muestra error y enfoca el motivo | Aprobado | `npm test`, R2 |
| P04 | Alta con motivo 15; media con motivo vacío | Ambos válidos; una fila por envío | La función acepta ambos casos; el listener conserva el bloqueo de duplicados | Aprobado | `npm test`, R2 |
| P05 | Solicitante intenta cambiar estado | Ningún cambio ni auditoría | Devuelve `false` sin modificar solicitud ni auditoría | Aprobado | `npm test`, R3 |
| P06 | Técnico cambia y repite estado | Una auditoría con anterior/nuevo; repetido no añade | Primer cambio correcto; repetido rechazado; una auditoría | Aprobado | `npm test`, R3 |
| P07 | Sin decisión/rechazar y enviar válido | Solicitud funciona sin nuevos eventos | `registrarEvento` rechaza sin añadir; el formulario no depende de la medición | Aprobado | `npm test`, R4 |
| P08 | Aceptar, elegir y enviar válido | Un evento por acción, solo tres claves | Evento válido con `event`, `service_id` textual y `categoria` | Aprobado | `npm test`, R4 |
| P09 | Revocar y volver a elegir | No crece historial; no se borra lo anterior | El consentimiento distinto de aceptado bloquea eventos y conserva historial | Aprobado | `npm test`, R4 |
| P10 | 320, 768, 1440 px, teclado y zoom 200 % | Contenido operable, sin recorte de página | Pendiente de comprobación manual en navegador | Pendiente | Captura propia requerida |
| P11 | Reducir movimiento y cambiar estado | Confirmación visible sin animación | CSS incluye `prefers-reduced-motion: reduce`, falta comprobar visualmente | Pendiente | Captura propia requerida |
| P12 | Preview/producción y SHA | Versión correspondiente y URLs accesibles | Pendiente de configurar repo, PR y despliegues | Pendiente | Enlaces y SHA requeridos |
