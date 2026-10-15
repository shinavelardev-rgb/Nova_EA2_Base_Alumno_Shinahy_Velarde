# Retos EA2
Base heredada: HTML, CSS, JSON, catálogo, formulario, ayuda y solicitudes en memoria de la semana 5.
Integración nueva provista: controles y listeners de ea2-ui.js. No acredita puntos por sí misma.
Implementa cuatro funciones en public/assets/js/ea2-logica.js y la animación en public/assets/css/ea2.css.

R1 (3 puntos): filtrarServicios(lista,categoria) devuelve una nueva lista sin mutar la fuente.
Todas incluye todo; la categoría debe coincidir exactamente; sin resultados, devolver [].
La vista ya muestra un mensaje de vacío. El selector del formulario conserva los cinco servicios.

R2 (3 puntos): validarUrgencia(prioridad,motivo) devuelve mensaje para alta con menos de 15
caracteres después de trim; devuelve cadena vacía en el resto de casos. No basta contar espacios.
El formulario ya coloca mensaje/foco y conserva la prevención de envíos duplicados.

R3 (4 puntos): cambiarEstado(solicitudes,id,nuevoEstado,actor,auditoria) solo permite actor.rol
tecnico; admite Pendiente, En proceso, Resuelto, Cerrado/Cancelado. Cualquier transición entre
estados diferentes es válida en este ejercicio. ID ausente, rol diferente, estado desconocido
o estado repetido devuelve false, sin modificar solicitudes ni auditoría. Éxito cambia el estado,
devuelve true y añade exactamente un registro con id correlativo, actor_id, solicitud_id,
accion CAMBIO_ESTADO, anterior, nuevo y fecha ISO. Todo vive en memoria. Esto NO es autenticación.
Añade a .ea2-actualizada una animación breve de confirmación y desactiva su movimiento con
prefers-reduced-motion: reduce; conserva el texto visible.

R4 (3 puntos): registrarEvento(consentimiento,nombre,servicio,eventos) devuelve false sin añadir
si no hay aceptado, si evento no es select_service o submit_request, o si servicio es inválido.
Servicio válido: id entero positivo seguro y categoria Accesos, Hardware, Red o Software.
En éxito devuelve true y agrega SOLO {event:nombre, service_id:String(servicio.id), categoria}.
No copie correo, nombre, descripción ni el objeto servicio completo. Un evento por llamada válida.
Los listeners entregados emiten solo una llamada por elección/envío válido. Cambiar a rechazado
detiene nuevos eventos; no borra el historial anterior. Recargar elimina toda la demo y la preferencia.
No se instala GA4/GTM real ni se hace tráfico analítico externo.

R5 (2 puntos): pruebas reales, rama release/ea2, PR, Preview y producción con SHA trazable.
Usa el dominio gratuito disponible. No se exige dominio comprado ni cuenta de Supabase.
Si la plataforma externa falla, registra la incidencia y entrega evidencia local para revisión docente.
La consigna DOCX contiene la rúbrica y las cinco preguntas teóricas (5 puntos).
