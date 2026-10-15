# Continuidad del modelo conceptual
Referencia de aprendizaje de semana 4, no nueva tarea calificada del EA2.
La arquitectura prevista contiene cinco entidades; la implementación EA2 es una demo parcial en memoria.

| Entidad | Claves y atributos esenciales |
|---|---|
| Usuario | usuario_id PK, nombre, correo, rol, activo |
| Servicio | servicio_id PK, nombre, descripcion, categoria, prioridad |
| Solicitud | solicitud_id PK, usuario_id FK, servicio_id FK, prioridad, descripcion, estado, fecha |
| Actualizacion | actualizacion_id PK, solicitud_id FK, usuario_id FK, anterior, nuevo, comentario, fecha |
| Auditoria | auditoria_id PK, usuario_id FK actor, entidad, entidad_id, accion, anterior, nuevo, fecha |

Relaciones: Usuario 1:N Solicitud; Servicio 1:N Solicitud; Solicitud 1:N Actualizacion;
Usuario 1:N Actualizacion; Usuario 1:N Auditoria. Para eventos de solicitudes,
entidad_id identifica la solicitud auditada. Una implementación futura puede usar una FK específica.
Solo el técnico cambia estado; cada cambio real del modelo genera actualización y auditoría.
En EA2 se evalúa únicamente cambio de estado y un registro de auditoría; no se exige una
segunda colección Actualizacion ni migración SQL. No hay autenticación real.

En la demo: Servicio se carga desde JSON; Solicitud es un arreglo de interaccion.js;
actor {id,rol} es elegido en un selector; Auditoria se almacena en ea2-ui.js.
No todas las columnas del modelo conceptual existen en la demo. Nombre/correo son datos ficticios.
Recargar elimina solicitudes, auditoría y eventos. Las reglas del navegador son manipulables.
En un sistema real se requieren identidad verificada, autorización de servidor y almacenamiento.
El contenido de una auditoría ayuda a investigar; no prueba por sí solo una autorización.
