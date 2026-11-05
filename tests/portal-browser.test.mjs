/**
 * Pruebas reales de Chromium para el portal, servido solo desde localhost.
 * Ejecutar: npm install --no-save --no-package-lock playwright@1.56.1
 *           npx playwright install --with-deps chromium
 *           node --test tests/portal-browser.test.mjs
 * No consulta APIs de las aplicaciones ni ejecuta despliegues.
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const screenshots = resolve(root, "artifacts");
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".svg": "image/svg+xml", ".ico": "image/x-icon",
};
let browser;
let server;
let baseUrl;

before(async () => {
  await mkdir(screenshots, { recursive: true });
  server = createServer(async (req, res) => {
    if (req.method !== "GET") { res.writeHead(405).end(); return; }
    try {
      const raw = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const pathname = raw.endsWith("/") ? raw + "index.html" : raw;
      const absolute = resolve(root, "." + pathname);
      if (!absolute.startsWith(root + sep)) { res.writeHead(403).end(); return; }
      const body = await readFile(absolute);
      res.writeHead(200, {
        "Content-Type": mime[extname(absolute)] || "application/octet-stream",
        "Cache-Control": "no-store",
      }).end(body);
    } catch (_) {
      res.writeHead(404).end("Archivo no encontrado");
    }
  });
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  baseUrl = "http://127.0.0.1:" + server.address().port + "/";
  browser = await chromium.launch({ headless: true });
});

after(async () => {
  await browser?.close();
  if (server) await new Promise((done) => server.close(done));
});

// Solo se sirven archivos locales; se bloquean conexiones de la web a terceros.
async function openPortal(viewport, isMobile = false) {
  const context = await browser.newContext({
    viewport, isMobile, hasTouch: isMobile,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await context.route("**/*", (route) => {
    if (route.request().url().startsWith(baseUrl)) return route.continue();
    return route.abort();
  });
  const page = await context.newPage();
  const jsErrors = [];
  page.on("pageerror", (err) => jsErrors.push(String(err)));
  await page.goto(baseUrl, { waitUntil: "load" });
  return { context, page, jsErrors };
}

async function checkCommon(page, jsErrors) {
  assert.equal(await page.locator("#portal-grid a.branch-card").count(), 9);
  assert.equal(await page.locator("#portal-grid .branch-wrap").count(), 9);
  assert.equal(await page.locator("#portal-grid .branch-share").count(), 9);
  assert.equal(await page.locator("#portal-counter").innerText(), "9 herramientas disponibles");
  const loaded = await page.locator("#portal-grid img").evaluateAll((imgs) =>
    imgs.every((img) => img.complete && img.naturalWidth > 0));
  assert.ok(loaded, "Las nueve imágenes deben cargar correctamente");
  const sizes = await page.evaluate(() => ({
    width: innerWidth, document: document.documentElement.scrollWidth,
  }));
  assert.ok(sizes.document <= sizes.width + 2, "Desbordamiento horizontal: " + JSON.stringify(sizes));
  assert.deepEqual(jsErrors, [], "Errores JS en el portal: " + jsErrors.join("; "));
}

test("Chromium escritorio: tarjetas, filtros, búsqueda y captura de pantalla", async () => {
  const { context, page, jsErrors } = await openPortal({ width: 1440, height: 900 });
  try {
    await checkCommon(page, jsErrors);
    await page.locator("#ramas-appvaluo").screenshot({ path: resolve(screenshots, "portal-escritorio.png") });
    await page.locator('.portal-filter[data-filter="valuacion"]').click();
    assert.equal(await page.locator("#portal-grid .branch-wrap:visible").count(), 5);
    await page.locator('.portal-filter[data-filter="diseno"]').click();
    assert.equal(await page.locator("#portal-grid .branch-wrap:visible").count(), 2);
    await page.locator('.portal-filter[data-filter="all"]').click();
    await page.locator("#portal-search-input").fill("captura");
    assert.equal(await page.locator("#portal-grid .branch-wrap:visible").count(), 1);
    await page.locator("#portal-search-input").fill("término desconocido 123");
    assert.equal(await page.locator("#portal-grid .branch-wrap:visible").count(), 0);
    assert.ok(await page.locator("#portal-empty").isVisible());
    await page.locator("#portal-search-input").fill("");
    assert.equal(await page.locator("#portal-grid .branch-wrap:visible").count(), 9);
    assert.deepEqual(jsErrors, []);
  } finally {
    await context.close();
  }
});

test("Chromium móvil: menú, búsqueda, tarjetas y sin desplazamiento lateral", async () => {
  const { context, page, jsErrors } = await openPortal({ width: 390, height: 844 }, true);
  try {
    await checkCommon(page, jsErrors);
    const menu = page.locator("#menuBtn");
    await menu.click();
    assert.equal(await menu.getAttribute("aria-expanded"), "true");
    await page.locator('#mainNav a[href="#ramas-appvaluo"]').click();
    assert.equal(await menu.getAttribute("aria-expanded"), "false");
    await page.locator("#ramas-appvaluo").screenshot({ path: resolve(screenshots, "portal-movil.png") });
    await page.locator("#portal-search-input").fill("opinión");
    assert.equal(await page.locator("#portal-grid .branch-wrap:visible").count(), 1);
    await page.locator("#portal-search-input").fill("");
    await page.locator('.portal-filter[data-filter="inmobiliario"]').click();
    assert.equal(await page.locator("#portal-grid .branch-wrap:visible").count(), 2);
    assert.deepEqual(jsErrors, []);
  } finally {
    await context.close();
  }
});

test("Chromium tableta: interfaz adaptable sin desbordamiento", async () => {
  const { context, page, jsErrors } = await openPortal({ width: 768, height: 1024 }, true);
  try {
    await checkCommon(page, jsErrors);
  } finally {
    await context.close();
  }
});
