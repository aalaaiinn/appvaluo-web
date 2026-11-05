# AppValúo · Fase 4: puerta de publicación controlada

**Fecha de revisión:** 5 de noviembre de 2026
**Alcance:** portal principal `appvalúo.com`, independiente de las aplicaciones desplegadas en Vercel.
**Estado:** listo para revisión final; **no autorizado todavía para fusionar ni publicar**.

## Confirmaciones de código y diseño
- Pull request: https://github.com/aalaaiinn/appvaluo-web/pull/1 (borrador).
- GitHub Actions (última ejecución aprobada antes de esta documentación): https://github.com/aalaaiinn/appvaluo-web/actions/runs/42092899332
- **9/9 pruebas aprobadas:** cinco pruebas con Node.js y cuatro en Chromium (1440, 768, 390, 360, 320 píxeles y móvil horizontal).
- Las pruebas comprueban presencia de nueve tarjetas, enlaces, imágenes, filtros, buscador, menú móvil, teclado, errores JavaScript y desbordamiento horizontal.
- Se descargaron y examinaron las capturas reales del workflow:
  - https://github.com/aalaaiinn/appvaluo-web/actions/runs/42092899332/artifacts/13446365758
  - **Escritorio:** tarjetas alineadas en tres columnas; títulos, imágenes y acciones legibles.
  - **Móvil:** tarjetas en una columna; textos, botones y nota final completos; sin encimamientos de los elementos del catálogo.
  - **Detalle estético pendiente:** la tarjeta Captura usa una imagen publicitaria más vertical que las otras ocho. El formato actual es funcional, pero la imagen podrá sustituirse por una versión fiel y cuadrada de la propia aplicación cuando esté validada. No inventar pantallas ni reemplazar con material ajeno.
- La sección de precios en `index.html` quedó intacta respecto a la versión pública anterior.
- El dominio raíz sigue sirviendo el portal anterior desde GitHub Pages con **ocho accesos**. El noveno acceso (Captura) está solo en el PR.

## Comprobación de las nueve aplicaciones existentes
La API de Vercel identificó que las nueve aplicaciones principales conservan un último despliegue con estado **READY**:
- `appvaluo-opinion-valor-rapida`
- `appvaluo-captura-v2`
- `appvaluo-propiedades`
- `appvaluo-visual-ia`
- `croquis-ia-cad-online`
- `appvaluo-escrituracion`
- `appvaluo-control-tramites`
- `agente-tramites-catastrales`
- `appvaluo-mapa-dinamico`

La configuración DNS de los nueve subdominios está validada en Vercel. **READY y DNS correcto no confirman inicio de sesión, funciones internas ni permiso para desplegar de nuevo**. El navegador externo no logró abrir las aplicaciones para comprobarlas y sus resultados **no son evidencia de caída de servicio**. Es necesario revisarlas con navegador real y credenciales propias antes de dar por terminado el lanzamiento.

## Dependencias e inventario de limpieza
- Inventario de partida: 95 proyectos en el equipo Vercel. Ninguno se ha borrado.
- Diez candidatos adicionales se examinaron sin revelar secretos: sin dominio personalizado, sin Git visible y sin variables de entorno registradas.
- Búsqueda en el código GitHub indexado del usuario: `mi-casa-backend.vercel.app` tiene referencias en **dos repositorios relevantes**, incluyendo frontend y backend de Propiedades. **Conservar `mi-casa-backend`**.
- Las referencias buscadas de varios dominios `*.vercel.app` de pruebas no tuvieron coincidencias en la búsqueda de código GitHub, pero esto **no garantiza ausencia de clientes o consumo externo**.
- No se pudo recuperar el tráfico de Vercel: el catálogo de observabilidad devuelve 404. Antes de archivar o eliminar cualquier proyecto, verificar consumo y referencias por otra vía, respaldos y autorización específica.

## Procedimiento de publicación del portal (independiente de Vercel)
1. **Antes de fusionar:** revisión visual y aprobación del diseño, comprobación manual de los destinos de nueve tarjetas y confirmación de que precios/contacto son correctos.
2. Conservar SHA actual de `main`, capturas del portal anterior y URL del PR para reversión.
3. Si se aprueba, fusionar el PR **una sola vez** a `main` en `aalaaiinn/appvaluo-web`. No iniciar un despliegue manual adicional. GitHub Pages publicará automáticamente el contenido de `main` según su configuración vigente.
4. Verificar `https://appvalúo.com/` y `https://xn--appvalo-c2a.com/`: portada, nueve accesos, filtro/buscador, imágenes y enlaces de compartir.
5. Verificar móviles, páginas de precio y contacto, navegabilidad y URLs; registrar resultado. Si falla algo, revertir el commit/merge de forma controlada en GitHub Pages. **No tocar DNS**.
6. Esta publicación del portal **NO fusiona PR #13 de Propiedades, no despliega aplicaciones Vercel y no mueve bases de datos ni autenticación**.

## Puerta independiente para Propiedades
- PR #13 de `aalaaiinn/appvaluo-propiedades-frontend`: abierto; su commit HEAD tiene `Vercel: failure` vinculado con la restricción de despliegues de la cuenta.
- **No fusionar PR #13 ni iniciar una publicación en Vercel mientras persista el bloqueo**.
- Una vez habilitado, verificar checks y pruebas, y realizar un único despliegue de producción de Propiedades según el procedimiento previamente aprobado.

## Restricciones de costo y seguridad
- No contratar plan Pro, no comprar componentes y no cambiar el plan de Vercel sin autorización.
- No eliminar ningún proyecto basándose solo en su nombre, antigüedad o estado `READY`.
- Mantener cada aplicación independiente de la web pública.
- No presentar las capturas del portal como capturas de las aplicaciones internas: muestran exclusivamente el catálogo.

**Estado final de la fase:** pruebas del catálogo completadas; revisión visual preliminar completada; pendiente revisión manual de destinos y autorización para publicar exclusivamente el portal principal.
