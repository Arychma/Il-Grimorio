// 1. IMPORTAZIONE DEL PLUGIN (In cima, fuori dal modulo)
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  // ─── PLUGINS & SHORTCODES ────────────────────────────────────────────────
  // Attiva il plugin di navigazione
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // ─── NUOVO SHORTCODE NAVLINK (POTENZIATO) ────────────────────────────────
    eleventyConfig.addShortcode("navLink", function(collections, key) {
    const allPages = collections.all;
    
    // DEBUG: Questo scriverà nei log di GitHub Actions quante pagine vede lo snippet
    console.log(`[DEBUG] navLink sta cercando "${key}" tra ${allPages.length} pagine totali.`);

    const targetPage = allPages.find(item => {
      return (
        (item.data.eleventyNavigation && item.data.eleventyNavigation.key === key) ||
        (item.data.title === key) ||
        (item.fileSlug === key)
      );
    });

    if (targetPage) {
      const text = targetPage.data.eleventyNavigation?.title || targetPage.data.title || key;
      return `<a href="${targetPage.url}">${text}</a>`;
    }

    return `<span style="color:red; font-weight:bold;">[Link Mancante: ${key}]</span>`;
  });

  // ─── STATIC ASSETS ───────────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/comunicazioni/downloads");

  // ─── TEMPLATE FORMATS ────────────────────────────────────────────────────
  eleventyConfig.setTemplateFormats(["njk", "md", "html"]);

  
  // ─── FILTERS ─────────────────────────────────────────────────────────────
  
  // Trasforma le date in formato italiano
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("it-IT", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  // Filtra le collezioni per tag (quello nuovo che abbiamo creato)
  eleventyConfig.addFilter("filterByTag", function(collection, tag) {
    if (!tag) return collection;
    return collection.filter(item => {
      const tags = item.data.tags;
      if (Array.isArray(tags)) {
        return tags.includes(tag);
      }
      return tags === tag;
    });
  });

// ─── GLOBAL COLLECTIONS ──────────────────────────────────────────────────

  // Blog
  eleventyConfig.addCollection("blog", function(api) {
    return api.getFilteredByGlob("src/comunicazioni/blog/*.{md,njk}").reverse();
  });

  // Newsletter
  eleventyConfig.addCollection("newsletter", function(api) {
    return api.getFilteredByGlob("src/comunicazioni/newsletter/*.{md,njk}").reverse();
  });

  // Ambientazioni
  eleventyConfig.addCollection("ambientazioni", function(api) {
    return api.getFilteredByGlob("src/ambientazioni/*/*.{md,njk}");
  });

  // Jolly
  eleventyConfig.addCollection("jolly", function(api) {
    return api.getFilteredByGlob("src/jolly/*.{md,njk}").reverse();
  });

// ─── CONFIGURAZIONE SISTEMI (D&D, GURPS, ecc.) ──────────────────────────
const sistemi = ["dnd55e", "gurps"];
const categorieArchivio = ["personaggi", "luoghi", "regole", "oggetti"];

sistemi.forEach(sistema => {
  const prefix = sistema.replace('55e', 'dnd'); // trasforma dnd55e in dnd per coerenza link

  // Genera automaticamente: dnd-personaggi, gurps-personaggi, ecc.
  categorieArchivio.forEach(cat => {
    eleventyConfig.addCollection(`${prefix}-${cat}`, api => {
      return api.getFilteredByGlob(`src/sistemi/${sistema}/archivio/${cat}/*.{md,njk}`);
    });
  });

  // Collezioni speciali per sistema
  eleventyConfig.addCollection(`${prefix}-avventure`, api => 
    api.getFilteredByGlob(`src/sistemi/${sistema}/avventure/*/*.{md,njk}`)
  );
  eleventyConfig.addCollection(`${prefix}-sessioni`, api => 
    api.getFilteredByGlob(`src/sistemi/${sistema}/avventure/*/sessioni/*.{md,njk}`).reverse()
  );
  eleventyConfig.addCollection(`${prefix}-guida`, api => 
    api.getFilteredByGlob(`src/sistemi/${sistema}/guida/**/*.{md,njk}`)
  );
});

// ─── AMBIENTAZIONI (SISTEMA DINAMICO) ──────────────────────────────────────
// Questa collezione prende QUALSIASI cosa stia dentro src/ambientazioni/
// Non dovrai mai più toccare eleventy.js per le nuove ambientazioni.
eleventyConfig.addCollection("ambientazioni", function(api) {
  return api.getFilteredByGlob("src/ambientazioni/**/*.{md,njk}");
});

// ─── COLLEZIONI GLOBALI (BLOG, NEWSLETTER, ecc.) ──────────────────────────
const globali = ["blog", "newsletter", "jolly"];
globali.forEach(tipo => {
  eleventyConfig.addCollection(tipo, api => {
    return api.getFilteredByGlob(`src/comunicazioni/${tipo}/*.{md,njk}`).reverse();
  });
});
  // ─── OUTPUT ──────────────────────────────────────────────────────────────
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};