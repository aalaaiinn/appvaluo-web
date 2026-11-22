# PROMPT MAESTRO DE INTEGRACIÓN WEB — ACADEMIA APPVALÚO

## Función
Actúa como equipo senior de diseño de producto, frontend, accesibilidad, seguridad, documentación y publicación web. Integra en el portal oficial de AppValúo una sección editorial llamada «Academia AppValúo — Biblioteca Técnica de Valuación», sin romper las aplicaciones existentes ni modificar su autenticación, datos, pagos o dominio.

## Repositorio y objetivo
Inspecciona primero el proyecto real que sirve `https://xn--appvalo-c2a.com/` y conserva su navegación, diseño de marca y compatibilidad móvil. Para la integración de referencia se identificó `aalaaiinn/appvaluo-web`, basado en HTML, CSS y JavaScript. Comprueba que sigue siendo el origen efectivo antes de liberar.

## Publicaciones obligatorias — archivos independientes
1. **Edición regional de referencia Nayarit (93 páginas)**: `biblioteca/manual_regional_nayarit_2026.pdf`. Describir como edición técnica de referencia cuya adaptación normativa exclusiva de Nayarit está en desarrollo, sin afirmar que es una compilación normativa vigente.
2. **Fundamentos para la Tasación — México y Latinoamérica (121 páginas)**: `biblioteca/tratado_mexico_latinoamerica_2026.pdf`. Describir como edición técnica en revisión normativa, no como tratado oficialmente certificado para todos los países.

Ambos documentos se incorporan íntegros: conservar todas sus páginas, ilustraciones, texto seleccionable, formularios, navegación e índices; no mezclarlos ni renombrar uno para representar erróneamente su contenido.

## Arquitectura de información
- En el portal principal, agregar enlace visible «Academia» en la navegación, junto a «Aplicaciones», y un bloque editorial de acceso a las dos publicaciones antes de la sección de servicios empresariales.
- Crear página dedicada `academia.html` accesible sin iniciar sesión, con título, subtítulo, explicación de alcances, dos tarjetas de libro, portada real de cada PDF y botones «Leer en línea» y «Descargar PDF».
- Enlazar PDF desde el mismo dominio con rutas estables `/biblioteca/...`, sin servicios privados como dependencia del usuario final.
- Mostrar advertencias metodológicas sobre vigencia y alcance. Nunca usar las ilustraciones IA como evidencia de mercado.

## Diseño visual
Identidad premium moderna y futurista: azul marino profundo, líneas turquesa/cian técnicas, detalles dorados moderados, logo corporativo de AppValúo, retícula arquitectónica, tarjetas con profundidad, buena jerarquía, bordes redondeados, contraste WCAG AA y espacio negativo generoso. Evitar saturación, brillos excesivos y decoraciones que resten legibilidad.

## Funcionalidad
- Buscador local por título, región y conceptos.
- Filtros Todos / Nayarit / México y LATAM.
- Lector PDF bajo demanda; cerrar con Escape; enlace alternativo para abrir en pestaña.
- Descarga directa con nombre claro, archivos optimizados sin perder contenido ni enlaces.
- Detectar errores 404 y mostrar estado honesto en lugar de dejar botones rotos.
- Diseño responsive 360, 390, 768, 1024, 1440 px; teclado, `aria` y `prefers-reduced-motion`.
- SEO: `title`, metadescripción, canonical, sitemap, breadcrumbs si corresponden, etiquetas de idioma.
- No requerir servicios de pago, credenciales privadas ni bibliotecas JS pesadas.

## Implementación y seguridad
Leer primero el HTML y CSS existentes. Crear rama feature y PR para revisar, nunca sobrescribir el portal ni desplegar en producción sin QA. Mantener las aplicaciones funcionales y no tocar bases de datos, tokens ni env vars.

## Pruebas de aceptación
1. Ambos PDF descargan con HTTP 200, Content-Type `application/pdf` y tamaño correcto.
2. Número de páginas: 93 y 121; enlaces internos e índice preservados.
3. El enlace «Academia» abre la página desde el portal principal, navegación completa, regreso funciona.
4. Tarjetas muestran portadas correctas; buscador y filtros funcionan.
5. Lector PDF abre y cierra correctamente; sin 404 ni dependencias de Google Drive privado.
6. Visualización revisada en móvil, tableta, escritorio, pantalla clara/oscura cuando aplique.
7. Texto, CSS y JS sin errores; navegación por teclado y foco visible.
8. Canonical y sitemap actualizados.
9. Verificar PR/Preview antes de fusionar; conservar rollback.

## Entregables
Código de sitio actualizado, PDFs versionados en el repositorio o almacenamiento público bajo el dominio, portadas optimizadas, informe QA, enlace de PR de revisión y URL final únicamente cuando se confirme despliegue. No declarar publicada una versión que sólo esté en revisión.
