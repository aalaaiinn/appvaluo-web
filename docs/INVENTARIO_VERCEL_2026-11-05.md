# AppValúo · Inventario y plan de optimización de Vercel
**Fecha de revisión:** 5 de noviembre de 2026  
**Equipo:** `team_rHKTfMVrjT02HsL02uWOST1p` · **Plan registrado:** Hobby  
**Ámbito:** AUDITORÍA DE SOLO LECTURA. No incluye bajas, cambios de plan, compras ni despliegues.

## Resumen
Consulta del inventario del equipo mediante API Vercel: **95 proyectos**. La clasificación siguiente es provisional y **se basa solamente en nombres**. No supone que los proyectos de prueba sean seguros de eliminar.

| Grupo | Proyectos | Acción propuesta |
|---|---:|---|
| Portal principal | 9 | Conservar hasta verificar dependencias |
| Soporte / otra versión | 22 | Conservar hasta verificar dependencias |
| Posible prueba | 58 | Revisar antes de archivar |
| Otros negocios | 6 | Conservar hasta verificar dependencias |
| **Total** | **95** | **Sin modificaciones ni borrados** |

## Arquitectura actual identificada
- `appvalúo.com` sirve la página principal desde GitHub Pages (`aalaaiinn/appvaluo-web`), según el CNAME del repositorio y registros DNS consultados.
- Los subdominios de herramientas están registrados/verificados dentro de un mismo equipo Vercel, pero cada app conserva su proyecto y despliegue independiente.
- El dominio raíz también aparece asignado al proyecto `agente-tramites-catastrales` en Vercel. La API de configuración DNS lo señaló como `misconfigured: true` para **Vercel**, porque sus registros A apuntan a GitHub Pages. **No modificar DNS ni mover el dominio** durante esta auditoría: el sitio público funciona por su alojamiento actual.
- Las aplicaciones comerciales en Hobby requieren revisar las políticas de uso comercial antes de planificar nuevos despliegues. No autorizar pagos por defecto.

| Dominio | Proyecto / alojamiento registrado |
|---|---|
| appvalúo.com | Portal en GitHub Pages (DNS A 185.199.108-111.153); también registrado en Vercel junto al agente catastral |
| propiedades.appvalúo.com | appvaluo-propiedades |
| captura.appvalúo.com | appvaluo-captura-v2 |
| escrituracion.appvalúo.com | appvaluo-escrituracion |
| opinion.appvalúo.com | appvaluo-opinion-valor-rapida |
| mapa.appvalúo.com | appvaluo-mapa-dinamico |
| croquis.appvalúo.com | croquis-ia-cad-online |
| catastral.appvalúo.com | agente-tramites-catastrales |
| control.appvalúo.com | appvaluo-control-tramites |
| visual.appvalúo.com | appvaluo-visual-ia (también existe alias vision) |

### Aplicaciones principales (preservar)
- `appvaluo-opinion-valor-rapida` — `prj_UUCrUxjkBgs44SbNiULW6FrnUSnT`
- `appvaluo-escrituracion` — `prj_sFeRWUrxsQmbCWcAYHnwLlIDbgQS`
- `appvaluo-captura-v2` — `prj_AOWpQddkrSSsBZIAc532eQWFJ5Wq`
- `appvaluo-control-tramites` — `prj_XafV3CymutcY26ZdL9RwSgDSX5nn`
- `appvaluo-mapa-dinamico` — `prj_zSMD6KMUQVpDGgpL9jt44kv71TSD`
- `appvaluo-propiedades` — `prj_tbM6tDw81GDk1xfmifpR6jEgkUEC`
- `agente-tramites-catastrales` — `prj_KONEkvNNYAl5kUn63tGzAJ83XwNV`
- `croquis-ia-cad-online` — `prj_tVTJpzOAnPbZYtz7BILhTuY0Xtii`
- `appvaluo-visual-ia` — `prj_JZnCAPaMqRLwzo2GLDUCKk82aDbB`

## Inventario pendiente de validación
### Soporte / otra versión (22)

- `mi-casa-inmobiliaria` — `prj_r0VEz8jZjMw0qa4UpCKJDCwsxSiZ`
- `mi-casa-backend` — `prj_cfx1KITYFqfnUXygQGW0KyJU0JIl`
- `appvaluo-video-escrituracion` — `prj_tL7WH7bObfh8LtO8dm4mdEVorWuL`
- `appvaluo-captura-vista` — `prj_p2CA33kmzX83Hbta60DyIFBXr1zq`
- `appvaluo-opinion-valor` — `prj_TdNJAOihzjbSEW0FjEjgKb2BPFYY`
- `appvaluo-ui-modules` — `prj_4PDIJcyBZLSWuBl9qAqRpWPYKNyi`
- `appvaluo-jwks` — `prj_OHLRtDX0quKjN0A2t7EO8HaGJy8R`
- `croquis-ia-cad` — `prj_IPENhrdg3iLHdLV3iNQmeo6kBLAs`
- `mi-casa-auth` — `prj_0VUMETuYt5BRNR4tFPTS8sWpJudm`
- `agente-tramites-catastrales-v8` — `prj_m1wI884FHZ5F7Ovi5xzTqmYo2HwY`
- `agente-avaluo-catastral-web-excel` — `prj_uJ4lZnqcAqUdNsIZlyVlQ6QUmkbU`
- `agente-tramites-catastrales-vercel-final` — `prj_EOOoBmU0zTuu2xOl0PJNH4R1VaPr`
- `agente-avaluo-tramites-vercel` — `prj_UR5gBCTLoh9YmxfcDgOUneEGAJyP`
- `agente-avaluo-catastral-excel-directo` — `prj_bdjOQ8bRhCRw3uxu9ra1shZlkdWv`
- `agente-avaluo-catastral-web-directo` — `prj_3xsoKVWxFoj3gKT6fmPNBDkRwQdQ`
- `agente-avaluo-catastral-vercel-v5` — `prj_sSRMkPSa3SfM39AxS3HBeTxXVK81`
- `agente-avaluo-catastral-web` — `prj_UJnCls3VlEUqL7PORitf1yrIiPTQ`
- `appvaluo-captura-ligera` — `prj_ZpyjyIICyUOmPeGW4K4gw6xLugVV`
- `mi-casa-settings` — `prj_QvAjN8GBxvqbD0OTvfO7cIJfIWJ2`
- `mi-casa-media` — `prj_NsGZDrNTXaryjH3JxTLJTXbZbnmB`
- `mi-casa-inmobiliaria-api` — `prj_r5OVa1WdManlmZ09WvlBTp18V7ew`
- `mi-casa-assets` — `prj_Ig1osaczcb4HFShiiVLTTW1Eb0Dt`

### Posible prueba (58)

- `appvaluo-pdf-master-smoke` — `prj_29jrzOZ6ObItwoAhg4fjipDhq4RE`
- `appvaluo-opinion-e2e-test` — `prj_JRm0a7HhwMZeNd9qtX4n75D80SKC`
- `croquis-ia-cad-online-v1246` — `prj_KDCQI7oQ90984atHkywVXH076PVr`
- `croquis-ia-cad-online-v1245` — `prj_Epj898o9Q1KlskTcZcs0S0ubLX8I`
- `appvaluo-opinion-valor-schema-probe` — `prj_6HfAHV79aati69q0HnylzYdOQE1G`
- `appvaluo-dynamic-require-test` — `prj_fO3t9AAFBa2eKAW8dDfkFpj0dKjn`
- `appvaluo-dynamic-api-test` — `prj_n1xZmKRyfzO2E3AJX2ELisZJbM77`
- `croquis-ia-cad-online-v1244` — `prj_iHEgC4MoyboFY2Dw3o9lholrbEC3`
- `croquis-ia-cad-online-v1243` — `prj_3ORsIIeS3mmxelt2Mr1DbxTpMgI6`
- `appvaluo-pyhelper-test` — `prj_snjrEZOiqGPeuZu4z6iDVScnvfU1`
- `appvaluo-archive-helper-test` — `prj_98RuPyCamjsCwZC349v650VZKPWD`
- `appvaluo-archive-test2` — `prj_EpTAkA1sNgxd1cM0EZru4ReyzDeO`
- `appvaluo-archive-test` — `prj_9fjTS1WTSQ5KdAd3HXJyCtPymeH9`
- `croquis-ia-cad-online-v1242` — `prj_03S2CLP7zmht9Bve6OXYCT4rakn8`
- `croquis-ia-cad-online-v1241` — `prj_G63uboS5tPhPG8RC9NPmxWUg8NEk`
- `croquis-ia-cad-online-v124` — `prj_F0sYK6vvotObmcdIJlne7U2xZlCf`
- `schema-test-v124` — `prj_CC759Uh6DWJMCFM1e5OwRtunV7wE`
- `appvaluo-pwa-staging-preview` — `prj_27loKUKoa88VQbh6783sCPUuLtSX`
- `croquis-ia-cad-online-v123` — `prj_kU8GQipcu9IFSvPUGDFXnAUSlcRT`
- `appvaluo-v123-schema-probe` — `prj_36SLJ6rbyOqaV0U0jbFenh6TOtVA`
- `croquis-ia-cad-online-v122` — `prj_ACYve5FTrTF3IaiIDkfRn1d562Ko`
- `croquis-ia-cad-v122` — `prj_7cW2VqQbeuQZOmpupRrvAEf78it7`
- `croquis-ia-cad-online-v1221` — `prj_aV6i3yl8DYvKYONLVE0jb8EhznvL`
- `croquis-v122-sandbox-probe` — `prj_Qd0y2jpdzEchoegFcE2CPJ4UbLyu`
- `appvaluo-deploy-schema-test` — `prj_yDpCNzkuT2o7NjtJUtt7X4NntK3f`
- `appvaluo-verificacion` — `prj_7PKniJYWjAzRTOXP7csmNyCQYbT5`
- `vercel-base64-test` — `prj_TwGy4r6xagwTOOwi0MwshKJHsEY7`
- `appvaluo-env-check` — `prj_Jg5lQ6ItUcnlliuUnJtfxdxXXYPX`
- `appvaluo-route-probe` — `prj_wuj2nXAjnNj31jBQ0jFO2MnfJobP`
- `appvaluo-env-file-probe` — `prj_S8yZlAlDg2lZV30scAnGsDr0rZwm`
- `appvaluo-data-probe` — `prj_zQyvNEHmU6NN5q9zv8Ykt15IbTHR`
- `appvaluo-inline-probe` — `prj_VGTQmfCPq6WIC7F3AhIDFw0K3ULY`
- `appvaluo-env2-probe` — `prj_731MFgGgAbGEJG5wQfu6sz0YJfFT`
- `appvaluo-auth-probe` — `prj_d7TXye5lfltvOKbyq3LUFtN8zcPY`
- `appvaluo-rpc-probe` — `prj_e5AKdobC0ZWkJ8A80BnlcyK9gyFW`
- `croquis-pathdata-test` — `prj_POxeMzTrYmEqFww0qv8BUWYeeuA2`
- `croquis-static-schema-test` — `prj_mLY6b2bq4eprC8GMQFGQggvIHUwv`
- `file-path-test` — `prj_38ruoi7AoflpOO8xLiN50pczgVRh`
- `croquis-merge-test` — `prj_78V2nWU1XJBO1yA3fl6Gs57u0Gab`
- `croquis-path-test` — `prj_m6z4vlVam7hr7ggJ9gQWKPNux50K`
- `croquis-ia-cad-schema-test` — `prj_sHsFHVb2O9SI5zoUotZOxEBq6zfV`
- `appvaluo-env-probe` — `prj_MJsvVxv4aoyaxVinhwe7mAx4xubL`
- `appvaluo-trash-probe` — `prj_m4tAJzyiWW2ZeB6Lf95x3O5BZSDB`
- `appvaluo-delete-probe` — `prj_OSQYGif4ynp1qLhVtHDmsiS3l0Zj`
- `ventas-guzman-imagenes-test` — `prj_6h3wXHgF3lBG86TBm9GwXZfWiCJn`
- `vercel-path-data-test` — `prj_wlBUIM4QZAAUpE4aarC5AR7VtJvE`
- `appvaluo-captura-prueba` — `prj_ZNROGIk4wdsG6dPGEiGXsBOyo9fT`
- `qw-filepath-test` — `prj_Dst5wzQ8NJVg1kHv66Qypk3am1yC`
- `qw-path-test` — `prj_UbHkqv4bH9R5tNXzoXKCajwVuM6z`
- `qw-schema-test` — `prj_YTnrCzsBclPOqdLFEIbaU6BKJK8g`
- `micasa-path-upload-test` — `prj_PSwBguBsH9nFIHqRhA5vjASvWtyg`
- `mi-casa-env-schema-test` — `prj_NiTrSIbs6Fdi5dqzz1ImEKfZtqdv`
- `mi-casa-schema-test` — `prj_VBYRId7dSu6dscxP1xbpju6LKi0k`
- `binary-file-test` — `prj_VzF5tP4iTvGX1ApqPeXmctYs5ywL`
- `micasa-storage-bootstrap2` — `prj_KNqRHDPDdozIdvRwTYaj6U3yXSNz`
- `micasa-storage-bootstrap` — `prj_6xiB3Se1rFIVAbJfWtmGLev705rv`
- `catalogo-mi-casa-inmobiliaria-test` — `prj_Kao9DUQoOYuApuf9YjfPpuEnuMx1`
- `catalogo-terramar-test-path` — `prj_UPrgJ2Yx6jnCNsUfghE2iqXBuwwF`

### Otros negocios (6)

- `minisuper-catalogo` — `prj_CVgfcrA5VzvaqAEfy9LboLonRgL5`
- `del-nayar-catalogo` — `prj_ZSOcM6VkJ0PhtaiWTjXxe9kTunsB`
- `ventas-guzman-catalogo` — `prj_ZIVAbIvB2NT3VLkYz7HEwk9uGaOn`
- `formatrack-entrenador` — `prj_FVDzpooroAkj4sXLLGUYR1myklau`
- `queens-wings-catalogo` — `prj_IT3a9ZkyphFi12cOcaCjEZIKNokv`
- `catalogo-terramar` — `prj_6XfVDdGhgduo8MAvzGrODy5RNyj2`


## Criterios obligatorios antes de cualquier baja
1. Confirmar **dominios asignados**, redirecciones, referencias desde `appvalúo.com`, enlaces externos y uso real.
2. Revisar últimas fechas de despliegue, tráfico, variables de entorno, crons, almacenamiento, webhook, repositorios y datos persistentes.
3. Revisar dependencias de `mi-casa-backend`, autenticación, API, medios, catastro, Captura, Propiedades y Mapa Dinámico. Un backend puede carecer de dominio visible y ser crítico.
4. Hacer respaldo comprobado de ajustes y rutas antes de preparar una baja.
5. Solicitar aprobación separada y específica **por cada proyecto** que se proponga eliminar. La clasificación `Posible prueba` no es autorización de borrado.
6. Mantener actualizados enlaces y módulos centrales; no cambiar registros, precios, usuarios, facturación ni aplicaciones fuera del alcance.

## Puertas de publicación
- **Portal principal:** mantener PR de `aalaaiinn/appvaluo-web` como borrador hasta pruebas visuales móvil/PC, enlaces, accesibilidad y aprobación.
- **Propiedades:** conservar PR #13 pendiente mientras no haya comprobación positiva del desbloqueo, pruebas y vigencia del código. Nunca forzar despliegues ni crear despliegues manuales repetidos.
- **Resto de aplicaciones:** no ejecutar cambios ni disparar nuevos despliegues durante la consolidación del portal.
- **Costos:** mantener plan actual hasta revisar cumplimiento y consumo. El número de proyectos no equivale a una suscripción por proyecto. El costo real de ejecución y los límites deben revisarse por uso.

**Resultado de la auditoría:** clasificación preliminar completada, sin eliminar, fusionar ni desplegar nada.


## Auditoría ampliada: dominios y dependencias
**Revisión:** 5 de noviembre de 2026, segunda pasada, solo lectura.

### Nueve accesos AppValúo: DNS confirmado, navegación pendiente
La API de Vercel informó `misconfigured: false`, `configuredBy: CNAME`, sin conflictos y con desafío HTTP-01 aceptado para **cada uno** de estos subdominios:

| Subdominio | DNS Vercel | Aplicación |
|---|---|---|
| `captura.appvalúo.com` | Correcto | Captura |
| `propiedades.appvalúo.com` | Correcto | Propiedades |
| `escrituracion.appvalúo.com` | Correcto | Escrituración |
| `opinion.appvalúo.com` | Correcto | Opinión de Valor |
| `mapa.appvalúo.com` | Correcto | Mapa Dinámico |
| `croquis.appvalúo.com` | Correcto | Croquis IA CAD |
| `catastral.appvalúo.com` | Correcto | Agente Catastral |
| `control.appvalúo.com` | Correcto | Control de Trámites |
| `visual.appvalúo.com` | Correcto | IA Visión |

**Límite de la revisión:** `misconfigured: false` confirma la configuración DNS desde Vercel, **no** garantiza que el login, API ni cada pantalla funcione correctamente. El explorador público devolvió errores al intentar abrir subdominios: no se consideran pruebas de funcionalidad aprobadas. La raíz `appvalúo.com` sí respondió sirviendo la versión pública anterior de GitHub Pages, sin la tarjeta Captura aún.

### Muestra de proyectos de soporte y pruebas (14 examinados)
Los estados reflejan solo el despliegue informado por la API, no el tráfico real ni la existencia de dependencias. No se ha eliminado ningún proyecto.

| Proyecto | Último despliegue observado | Riesgo preliminar / decisión |
|---|---|---|
| `mi-casa-backend` | READY / producción | **CRÍTICO: conservar**. El frontend de Propiedades utiliza este host como API por defecto |
| `mi-casa-inmobiliaria` | READY / sin target | Revisar rutas antiguas y referencias antes de tocar |
| `mi-casa-auth` | ERROR / producción | No eliminar: revisar si existe autenticación asociada |
| `mi-casa-media` | READY / producción | No eliminar: investigar uso de imágenes y medios |
| `mi-casa-assets` | READY / producción | No eliminar: investigar archivos y activos |
| `appvaluo-pwa-staging-preview` | READY / producción | Posible entorno de prueba: revisar dependencias |
| `appvaluo-verificacion` | READY / producción | Posible prueba: revisar uso |
| `appvaluo-env-check` | READY / producción | Posible prueba: revisar uso |
| `appvaluo-data-probe` | READY / sin target | Posible prueba: revisar uso |
| `appvaluo-pdf-master-smoke` | READY / producción | Posible prueba PDF: revisar uso |
| `croquis-ia-cad-online-v1246` | READY / producción | Posible versión histórica: comparar con Croquis activo |
| `croquis-ia-cad-online-v1245` | READY / producción | Posible versión histórica: comparar con Croquis activo |
| `micasa-storage-bootstrap` | READY / producción | Posible inicializador: revisar si aún es necesario |
| `appvaluo-opinion-e2e-test` | READY / producción | Posible prueba: revisar uso |

**Evidencia concreta de dependencia:** archivo `api/proxy.js` del repositorio `aalaaiinn/appvaluo-propiedades-frontend`, rama `main`:

```js
const DEFAULT_BACKEND_URL='https://mi-casa-backend.vercel.app';
function backendUrl(){
  return String(process.env.BACKEND_URL||DEFAULT_BACKEND_URL).trim().replace(/\/+$/,'');
}
```

El host puede ser reemplazado por una variable `BACKEND_URL` en producción; su valor no se ha consultado porque debe mantenerse confidencial. Hasta verificar su configuración, **conservar `mi-casa-backend`**.

### Estado de publicación de Propiedades
- PR #13 de `aalaaiinn/appvaluo-propiedades-frontend`: **abierto y no fusionado**, `mergeable: true`.
- Commit HEAD observado: `e64afb2474316a24350e10f2aafc9bb310cb114e`.
- GitHub status: `Vercel: failure`, con referencia `https://vercel.com/knowledge/why-is-my-account-deployment-blocked`.
- No se encontraron GitHub Actions asociados al HEAD consultado.
- La versión previa `READY` de producción es `adc35ea65d5fe646d6ee84a752d30b114d680572`, diferente del PR.
- **No fusionar, no crear nuevos despliegues y no afirmar que el bloqueo se levantó**.

### Próxima puerta de auditoría
Aún falta revisar el tráfico/referencias y el uso de dominios `.vercel.app` de los candidatos, además de las variables y servicios dependientes **sin exponer secretos**. No reducir la lista de 95 todavía. Los nueve accesos DNS correctos pueden ser validados visualmente una vez que el navegador permita abrir cada pantalla.
