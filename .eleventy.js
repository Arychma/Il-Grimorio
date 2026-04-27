// 1. IMPORTAZIONE DEL PLUGIN (In cima, fuori dal modulo)
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  // ─── PLUGINS & SHORTCODES ────────────────────────────────────────────────
  // Attiva il plugin di navigazione
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // ─── NUOVO SHORTCODE NAVLINK (POTENZIATO) ────────────────────────────────
    eleventyConfig.addShortcode("navLink", function(collections, key) {
  // Cerca in tutte le pagine caricate dal sito
  const allPages = collections.all;

  const targetPage = allPages.find(item => {
    return (
      (item.data.eleventyNavigation && item.data.eleventyNavigation.key === key) || 
      (item.data.title === key) || 
      (item.fileSlug === key)
    );
  });

  if (targetPage) {
    // Sceglie il testo migliore: Titolo Navigation > Titolo Pagina > Chiave
    const text = targetPage.data.eleventyNavigation?.title || targetPage.data.title || key;
    return `<a href="${targetPage.url}">${text}</a>`;
  }

  // Fallback visibile per il debug
  return `<span style="color:orange; font-weight:bold;">[Link non trovato: ${key}]</span>`;
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
    const tags = item.data.tags || [];
    // Gestisce sia tag singoli che liste di tag
    return typeof tags === "string" ? tags === tag : tags.includes(tag);
  });
});

// 1. Definiamo i sistemi e le sottocartelle dell'archivio
const sistemi = ["dnd55e", "gurps"];
const categorieArchivio = ["personaggi", "luoghi", "regole", "oggetti"];
const prefissi = { dnd55e: "dnd", gurps: "gurps" };

sistemi.forEach(sistema => {
  const prefix = prefissi[sistema] ?? sistema;
  // ...
});

  // --- ARCHIVIO (Personaggi, Luoghi, ecc.) ---
  categorieArchivio.forEach(cat => {
    eleventyConfig.addCollection(`${prefix}-${cat}`, api => {
      return api.getFilteredByGlob(`src/sistemi/${sistema}/archivio/${cat}/*.{md,njk}`);
    });
  });

  // --- COLLEZIONI SPECIALI ---
  // Avventure
  eleventyConfig.addCollection(`${prefix}-avventure`, api => 
    api.getFilteredByGlob(`src/sistemi/${sistema}/avventure/*/*.{md,njk}`)
  );
  
  // Sessioni (Rovesciate per vedere l'ultima per prima)
  eleventyConfig.addCollection(`${prefix}-sessioni`, api => 
    api.getFilteredByGlob(`src/sistemi/${sistema}/avventure/*/sessioni/*.{md,njk}`).reverse()
  );

  // Guida
  eleventyConfig.addCollection(`${prefix}-guida`, api => 
    api.getFilteredByGlob(`src/sistemi/${sistema}/guida/**/*.{md,njk}`)
  );
});

// --- AMBIENTAZIONI ---
eleventyConfig.addCollection("ambientazioni", api => {
  return api.getFilteredByGlob("src/ambientazioni/**/*.{md,njk}");
});

// --- BLOG & NEWSLETTER ---
["blog", "newsletter", "jolly"].forEach(tipo => {
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