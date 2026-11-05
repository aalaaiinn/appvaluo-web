# Fase 3 · Segunda muestra de proyectos en Vercel
Fecha de revisión: **5 de noviembre de 2026**  
Equipo: `team_rHKTfMVrjT02HsL02uWOST1p`  
Alcance: **solo lectura**. No se han borrado, fusionado, reasignado o desplegado proyectos.

## Diez candidatos examinados
Se consultaron metadatos de proyecto, dominios y recuentos de variables de entorno **sin descifrar valores**.

| Proyecto | ID | Último despliegue observado | Dominio personalizado | Repositorio Git conectado | Variables de entorno registradas |
|---|---|---|---|---|---:|
| `appvaluo-archive-test` | `prj_9fjTS1WTSQ5KdAd3HXJyCtPymeH9` | ERROR | No | No | 0 |
| `appvaluo-archive-test2` | `prj_EpTAkA1sNgxd1cM0EZru4ReyzDeO` | READY | No | No | 0 |
| `schema-test-v124` | `prj_CC759Uh6DWJMCFM1e5OwRtunV7wE` | READY | No | No | 0 |
| `vercel-base64-test` | `prj_TwGy4r6xagwTOOwi0MwshKJHsEY7` | READY | No | No | 0 |
| `croquis-pathdata-test` | `prj_POxeMzTrYmEqFww0qv8BUWYeeuA2` | READY | No | No | 0 |
| `file-path-test` | `prj_38ruoi7AoflpOO8xLiN50pczgVRh` | READY | No | No | 0 |
| `qw-filepath-test` | `prj_Dst5wzQ8NJVg1kHv66Qypk3am1yC` | READY | No | No | 0 |
| `qw-path-test` | `prj_UbHkqv4bH9R5tNXzoXKCajwVuM6z` | READY | No | No | 0 |
| `qw-schema-test` | `prj_YTnrCzsBclPOqdLFEIbaU6BKJK8g` | READY | No | No | 0 |
| `binary-file-test` | `prj_VzF5tP4iTvGX1ApqPeXmctYs5ywL` | READY | No | No | 0 |

**Interpretación limitada:** los diez aparecen sin enlace Git, sin dominio personalizado, con un único dominio predeterminado `*.vercel.app` y sin variables de entorno registradas. Estas señales los hacen **candidatos a evaluación de retirada**, pero **no prueban que estén inactivos ni que sea seguro borrarlos**. Un proyecto `READY` puede recibir visitas por su dirección `*.vercel.app`; una función sin variables puede seguir prestando servicio.

## Información todavía pendiente
1. Datos de solicitudes/tráfico durante un periodo de referencia, incluidos dominios `vercel.app`.
2. Referencias desde otros repositorios, aplicaciones móviles, APIs, QR, códigos embebidos y clientes externos.
3. Cron, integraciones, archivos cargados y servicios persistentes; confirmar todos los puntos de entrada.
4. Existencia de respaldos y plan de reversión.
5. Aprobación expresa antes de cualquier eliminación.

**Límite de herramientas:** la consulta al catálogo de métricas de Vercel respondió `404 Observability Data not found`. No se atribuye tráfico cero a estos proyectos.

## Seguridad de proyectos esenciales
Conservar especialmente `mi-casa-backend`: el frontend de Propiedades lo utiliza como servidor predeterminado para el proxy. No cambiar dominios, credenciales, variables de producción ni el portal principal en GitHub Pages.

## Avance de las pruebas del portal
La rama `feature/portal-central-fase2-20261104` añadió pruebas de Chromium para anchos de **320 px y 360 px**, además de orientación horizontal de **844 × 390 px** y acceso por teclado a los filtros.
- GitHub Actions ejecución **#42092899332**: [consultar resultados](https://github.com/aalaaiinn/appvaluo-web/actions/runs/42092899332).
- **5 pruebas estáticas y 4 pruebas de navegador aprobadas** (9/9).
- El sitio y las APIs externos no se consultan en estas pruebas: se ejecuta una copia del portal localmente. Las pruebas de funcionamiento de las nueve aplicaciones y revisión visual humana siguen pendientes.
- La solicitud de cambios del portal se mantiene **en borrador**. No publicar ni fusionar aún; el PR #13 de Propiedades todavía presenta `Vercel: failure`.

**Conclusión:** revisión y pruebas avanzadas sin gastos, borrados ni despliegues.
