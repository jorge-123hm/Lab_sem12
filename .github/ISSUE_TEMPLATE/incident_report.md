name: Reporte de Incidencia 
about: Utilice esta plantilla para registrar interrupciones o degradaciones en producción. 
title: '[INCIDENTE] <Título corto del problema>' 
labels: 'status: triage' 
assignees: '' --- 
 
## 1. Información General 
* **Servicio / Módulo Afectado:**  
* **Entorno:** [Producción / Staging] 
* **Hora de Detección:** YYYY-MM-DD HH:MM UTC 
* **Severidad Estimada:** [P1 - Crítico / P2 - Alto / P3 - Medio / P4 - Bajo] 
 
## 2. Descripción del Síntoma 
Describa el comportamiento observado desde la perspectiva del usuario o del sistema de 
monitorización. 
 
## 3. Evidencias Técnicas y Logs 
Pegue las trazas de error, códigos HTTP, capturas o métricas relevantes: 
```text 
<Insertar logs aquí> 
``` 
 
## 4. Pasos para Reproducir 
1.  
2.  
3.  
 
## 5. Acciones de Contención Propuestas 
* [ ] Aislar componente afectado 
* [ ] Aplicar rollback de release 
* [ ] Modificar variables de entorno / parches de emergencia