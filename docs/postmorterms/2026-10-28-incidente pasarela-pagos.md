# Informe Retrospectivo de Incidencia (Blameless Post-Mortem) 
 
## Datos Resumen 
* **Título del Incidente:** HTTP 504 Gateway Timeout en API de Pagos por Fuga en Pool DB 
* **Fecha:** 28 de Octubre de 2026 
* **Incident Commander:** [Nombre del Alumno] 
* **Severidad:** P1 - Crítico 
* **Tiempo Total de Inactividad (Downtime):** 35 minutos 
* **MTTD (Tiempo de Detección):** 2 minutos 
* **MTTR (Tiempo de Resolución):** 33 minutos 
 
## Impacto en el Negocio 
Se rechazaron aproximadamente 450 transacciones comerciales durante la ventana de crisis, 
representando una pérdida estimada de $18,500 USD en volumen transaccional no procesado. No 
existió compromiso de confidencialidad ni fuga de datos sensibles. 
 
## Cronología de los Hechos (UTC) 
* **09:30 AM:** Se despliega el release v2.4.1 a producción conteniendo cambios en el módulo de 
facturación. 
* **10:00 AM:** Inician las alertas automáticas por incremento de errores HTTP 504. 
* **10:02 AM:** Se registra el Issue #1 y el Incident Commander asume el mando de la respuesta. 
* **10:10 AM:** El equipo de desarrollo identifica la causa raíz en las trazas del pool de 
conexiones. 
* **10:20 AM:** Se publica la rama hotfix/issue-1-fix-db-connection-leak y se abre el PR. 
* **10:30 AM:** Se aprueba el PR, se realiza el despliegue de emergencia y se verifica la 
normalización del servicio. 
* **10:35 AM:** Cierre formal del incidente tras validar la tasa de éxito en el 100% de los 
pagos. 
 
## Análisis de Causa Raíz (Los 5 Porqués) 
1. ¿Por qué falló la pasarela de pagos? Porque los hilos de ejecución quedaron bloqueados 
esperando conexiones de base de datos. 
2. ¿Por qué no había conexiones disponibles? Porque el pool de 50 conexiones se agotó en menos 
de 30 minutos. 
3. ¿Por qué se agotó el pool? Porque el código nuevo de facturación no cerraba las conexiones 
tras ejecutar las consultas. 
4. ¿Por qué el código no cerraba las conexiones? Porque faltaba la cláusula de liberación 
explícita en el bloque de manejo de excepciones. 
5. ¿Por qué se aprobó ese código para producción? Porque las pruebas automatizadas del pipeline 
de CI no incluían un test de carga ni verificación de fugas de conexiones (connection leak 
detection). 
UNIVERSIDAD TECNOLÓGICA DEL PERÚ | HERRAMIENTAS DE DESARROLLO (S12 - S23) 
## Filosofía Blameless y Lecciones Aprendidas 
* **Lo que funcionó bien:** La detección mediante alertas automáticas acortó el MTTD a solo 2 
minutos. El flujo de ramas hotfix/* permitió aislar la corrección sin contaminar el código. 
* **Lo que falló:** El pipeline de integración continua no detectó la falta de liberación de 
recursos. 
* **Donde tuvimos suerte:** La infraestructura contaba con capacidad para duplicar el pool de 
conexiones en caliente sin reiniciar la instancia completa de la base de datos. 
## Acciones Preventivas y Correctivas (Action Items) 
| Acción de Mejora | Tipo | Responsable | Fecha Límite | 
| Implementar linter estático en CI | Prevención | Pedro Huaynalaya | 2026-11-05 | 
| Pruebas de carga con k6 en staging | Proceso | Pedro Huaynalaya | 2026-11-12 | 
| Alerta proactiva si pool DB > 80% | Mitigación | Pedro Huaynalaya | 2026-11-02 | 