/**
 * Verificación del portal central sin dependencias, red ni despliegues.
 * Ejecutar desde la raíz: node --test tests/portal-static.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../estilos.css", import.meta.url), "utf8");
const cname = readFileSync(new URL("../CNAME", import.meta.url), "utf8").trim();

// Los atributos de los enlaces pueden variar de orden (por ejemplo, Mapa abre nueva pestaña).
const cards = [...html.matchAll(/<a class="branch-card (branch-[a-z-]+)"([^>]*)>/g)]
  .map((match) => {
    const close = html.indexOf("</a>", match.index);
    assert.ok(close > match.index, "Cada tarjeta debe tener cierre");
    const attrs = match[2];
    const getAttr = (name) => attrs.match(new RegExp(name + '="([^"]*)"'))?.[1] ?? "";
    return {
      className: match[1],
      categories: getAttr("data-categories"),
      href: getAttr("href"),
      label: getAttr("aria-label"),
      text: html.slice(match.index, close).replace(/<[^>]*>/g, " ").replace(/\s+/g, " "),
    };
  });

test("El portal incluye nueve herramientas únicas con direcciones profesionales", () => {
  assert.equal(cards.length, 9);
  assert.equal(new Set(cards.map((card) => card.href)).size, cards.length);
  assert.equal(new Set(cards.map((card) => card.className)).size, cards.length);
  for (const card of cards) {
    const url = new URL(card.href);
    assert.equal(url.protocol, "https:");
    assert.ok(url.hostname.endsWith(".xn--appvalo-c2a.com"), card.href);
    assert.ok(card.label.startsWith("Abrir AppValúo"), card.label);
    assert.ok(card.categories.trim().length > 0);
    assert.ok(!card.href.includes(".vercel.app"));
  }
  assert.ok(cards.some((card) => card.className === "branch-captura" && card.href === "https://captura.appvalúo.com/"));
});

test("La navegación del sitio conserva la estructura y dominio principal", () => {
  assert.equal(cname, "xn--appvalo-c2a.com");
  for (const id of ["ramas-appvaluo", "muestras", "precios", "contacto", "portal-grid", "portal-counter", "portal-empty"]) {
    assert.ok(html.includes(`id="${id}"`), `Se requiere #${id}`);
  }
  assert.ok(html.includes('role="search"'));
  assert.ok(html.includes('aria-controls="portal-grid"'));
  assert.ok(html.includes('aria-live="polite"'));
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes("#portal-grid .branch-wrap[hidden]"));
  assert.ok(css.includes("@media (max-width: 560px)"));
});

test("El buscador y los filtros operan sin consultar servidores", () => {
  const inlineScript = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
  assert.ok(inlineScript, "Script de página faltante");
  // Se comprueba la sintaxis del script completo.
  new Function(inlineScript);
  const start = inlineScript.indexOf("// Filtros ligeros del portal");
  const end = inlineScript.indexOf('document.getElementById("year")', start);
  assert.ok(start >= 0 && end > start, "Script de filtros incompleto");
  const filterScript = inlineScript.slice(start, end);

  const search = { value: "", listeners: {}, addEventListener(name, fn) { this.listeners[name] = fn; } };
  const buttons = ["all", "valuacion", "inmobiliario", "gestion", "diseno"].map((filter) => ({
    dataset: { filter }, listeners: {}, attributes: {},
    classList: { toggle() {} },
    addEventListener(name, fn) { this.listeners[name] = fn; },
    setAttribute(key, val) { this.attributes[key] = val; },
  }));
  const wraps = cards.map((card) => ({
    hidden: false,
    querySelector() { return { dataset: { categories: card.categories }, textContent: card.text }; },
  }));
  const counter = { textContent: "" };
  const empty = { hidden: true };
  const nodes = { "portal-search-input": search, "portal-counter": counter, "portal-empty": empty };
  const mockDocument = {
    getElementById(id) { return nodes[id] ?? null; },
    querySelectorAll(selector) {
      if (selector === ".portal-filter") return buttons;
      if (selector === "#portal-grid .branch-wrap") return wraps;
      throw new Error(`Unexpected selector: ${selector}`);
    },
  };
  new Function("document", filterScript)(mockDocument);
  assert.equal(counter.textContent, "9 herramientas disponibles");
  for (const [category, count] of [["valuacion", 5], ["inmobiliario", 2], ["gestion", 4], ["diseno", 2], ["all", 9]]) {
    buttons.find((button) => button.dataset.filter === category).listeners.click();
    assert.equal(wraps.filter((wrap) => !wrap.hidden).length, count, category);
  }
  search.value = "captura";
  search.listeners.input();
  assert.equal(wraps.filter((wrap) => !wrap.hidden).length, 1);
  assert.equal(counter.textContent, "1 herramienta disponible");
  search.value = "término inexistente";
  search.listeners.input();
  assert.equal(wraps.filter((wrap) => !wrap.hidden).length, 0);
  assert.equal(empty.hidden, false);
  search.value = "opinion";
  search.listeners.input();
  assert.equal(wraps.filter((wrap) => !wrap.hidden).length, 1, "Búsqueda sin acentos");
});

test("Los nueve accesos mantienen la ruta, imagen y nombre accesible correctos", () => {
  const expected = new Map([
    ["branch-opinion", "https://opinion.appvalúo.com/"],
    ["branch-captura", "https://captura.appvalúo.com/"],
    ["branch-properties", "https://propiedades.appvalúo.com/"],
    ["branch-visual", "https://visual.appvalúo.com/login"],
    ["branch-croquis", "https://croquis.appvalúo.com/"],
    ["branch-escrituracion", "https://escrituracion.appvalúo.com/"],
    ["branch-tramites", "https://control.appvalúo.com/"],
    ["branch-catastral", "https://catastral.appvalúo.com/nuevo-tramite"],
    ["branch-map", "https://mapa.appvalúo.com/"],
  ]);
  assert.equal(cards.length, expected.size);
  for (const card of cards) {
    assert.equal(card.href, expected.get(card.className), `Enlace incorrecto: ${card.className}`);
    const cardStart = html.indexOf(`<a class="branch-card ${card.className}"`);
    assert.ok(cardStart >= 0, `Falta tarjeta ${card.className}`);
    const cardEnd = html.indexOf("</a>", cardStart);
    const markup = html.slice(cardStart, cardEnd);
    const imageSrc = markup.match(/<img\b[^>]*\bsrc="([^"]+)"/)?.[1];
    const imageAlt = markup.match(/<img\b[^>]*\balt="([^"]+)"/)?.[1];
    assert.ok(imageSrc && !imageSrc.startsWith("http"), `Imagen local ausente: ${card.className}`);
    assert.ok(existsSync(new URL("../" + imageSrc, import.meta.url)), `Archivo inexistente: ${imageSrc}`);
    assert.ok(imageAlt?.trim(), `Texto alternativo ausente: ${card.className}`);
  }
});
