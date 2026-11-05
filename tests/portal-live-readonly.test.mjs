/**
 * Comprobación pública, de solo lectura, para el ecosistema AppValúo.
 * Máximo una consulta GET por destino (más redirecciones del portal raíz).
 * Sin autenticación, cookies, mutaciones, APIs privadas ni despliegues.
 * HTTP 2xx / 3xx / 401 / 403 = responde, NO funcionalidad interna verificada.
 * HTTP 404 / 429 / 5xx y errores de red = incidencia o bloqueo por investigar.
 */
import test from "node:test";
import assert from "node:assert/strict";

const root = "https://xn--appvalo-c2a.com";
const sites = [
  ["Portal principal", root + "/", true],
  ["Propiedades", "https://propiedades.xn--appvalo-c2a.com/"],
  ["Captura", "https://captura.xn--appvalo-c2a.com/"],
  ["Escrituración", "https://escrituracion.xn--appvalo-c2a.com/"],
  ["Opinión de Valor", "https://opinion.xn--appvalo-c2a.com/"],
  ["Mapa Dinámico", "https://mapa.xn--appvalo-c2a.com/"],
  ["Croquis IA CAD", "https://croquis.xn--appvalo-c2a.com/"],
  ["Agente Catastral", "https://catastral.xn--appvalo-c2a.com/nuevo-tramite"],
  ["Control de Trámites", "https://control.xn--appvalo-c2a.com/"],
  ["IA Visión", "https://visual.xn--appvalo-c2a.com/login"],
];

for (const [name, url, isPortal] of sites) {
  test("GET público: " + name, { timeout: 18000 }, async () => {
    const response = await fetch(url, {
      method: "GET",
      redirect: isPortal ? "follow" : "manual",
      signal: AbortSignal.timeout(13000),
      headers: {
        "Accept": "text/html,application/xhtml+xml",
        "Cache-Control": "no-cache",
        "User-Agent": "AppValuo-ReadOnly-HealthCheck/1.0",
      },
    });
    const status = response.status;
    const origin = new URL(response.url).origin;
    console.log(name + ": HTTP " + status + " desde " + origin);
    if (isPortal) {
      assert.equal(status, 200, "La portada debe servir HTTP 200");
      const text = await response.text();
      assert.ok(text.includes('id="portal-search-input"'), "Buscador del portal ausente");
      assert.ok(text.includes("captura.appvalúo.com"), "La novena tarjeta Captura no se sirvió");
      assert.equal((text.match(/class="branch-card branch-/g) || []).length, 9,
        "Se esperaban nueve tarjetas en el HTML publicado");
    } else {
      if (status >= 300 && status < 400) {
        const location = response.headers.get("location");
        if (location) {
          const destination = new URL(location, url);
          // No seguir el redirect: solo informar el dominio, nunca consultar otro sitio.
          console.log("Redirección sin seguir hacia " + destination.origin);
        }
      }
      assert.ok(
        (status >= 200 && status < 400) || status === 401 || status === 403,
        "El destino no respondió con estado navegable; revisar HTTP " + status,
      );
      await response.body?.cancel();
    }
  });
}
