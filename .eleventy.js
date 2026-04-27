// 1. IMPORTAZIONE DEL PLUGIN (In cima, fuori dal modulo)
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  // ─── PLUGINS & SHORTCODES ────────────────────────────────────────────────
  // Attiva il plugin di navigazione
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // ─── NUOVO SHORTCODE NAVLINK (POTENZIATO) ────────────────────────────────
    eleventyConfig.addShortcode("navLink", function(collections, key) {
    // Cerchiamo in TUTTI i file che Eleventy ha caricato
    const allPages = collections.all;

    const targetPage = allPages.find(item => {
      // Cerchiamo la corrispondenza in 3 posti diversi:
      return (
        (item.data.eleventyNavigation && item.data.eleventyNavigation.key === key) || // 1. La chiave di navigazione
        (item.data.title === key) ||                                                  // 2. Il titolo esatto
        (item.fileSlug === key)                                                       // 3. Il nome del file (senza .md)
      );
    });

    if (targetPage) {
      // Se lo trova, prendiamo il titolo migliore disponibile
      const text = targetPage.data.eleventyNavigation?.title || targetPage.data.title || key;
      return `<a href="${targetPage.url}">${text}</a>`;
    }

    // Se arriviamo qui, il file non è proprio nel database di Eleventy
    console.log(`[ERRORE GRIMORIO] Non trovo nulla per la chiave: ${key}`);
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
    return api.getFilteredByGlob("src/comunicazioni/blog/*.md").reverse();
  });

  // Newsletter
  eleventyConfig.addCollection("newsletter", function(api) {
    return api.getFilteredByGlob("src/comunicazioni/newsletter/*.md").reverse();
  });

  // Ambientazioni
  eleventyConfig.addCollection("ambientazioni", function(api) {
    return api.getFilteredByGlob("src/ambientazioni/*/*.md");
  });

  // Jolly
  eleventyConfig.addCollection("jolly", function(api) {
    return api.getFilteredByGlob("src/jolly/*.md").reverse();
  });

  // ─── SISTEMI: D&D 5.5e ───────────────────────────────────────────────────
  eleventyConfig.addCollection("dnd55e_avventure", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/avventure/*/index.md");
  });
  eleventyConfig.addCollection("dnd55e_sessioni", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/avventure/*/sessioni/*.md").reverse();
  });
  eleventyConfig.addCollection("dnd55e_personaggi", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/archivio/personaggi/*.md");
  });
  eleventyConfig.addCollection("dnd55e_luoghi", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/archivio/luoghi/*.md");
  });
  eleventyConfig.addCollection("dnd55e_regole", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/archivio/regole/*.md");
  });
  eleventyConfig.addCollection("dnd55e_oggetti", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/archivio/oggetti/*.md");
  });
  eleventyConfig.addCollection("dnd55e_guida", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/guida/*.md");
  });

  // ─── SISTEMI: GURPS ──────────────────────────────────────────────────────
  eleventyConfig.addCollection("gurps_avventure", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/avventure/*/index.md");
  });
  eleventyConfig.addCollection("gurps_sessioni", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/avventure/*/sessioni/*.md").reverse();
  });
  eleventyConfig.addCollection("gurps_personaggi", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/archivio/personaggi/*.md");
  });
  eleventyConfig.addCollection("gurps_luoghi", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/archivio/luoghi/*.md");
  });
  eleventyConfig.addCollection("gurps_regole", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/archivio/regole/*.md");
  });
  eleventyConfig.addCollection("gurps_oggetti", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/archivio/oggetti/*.md");
  });
  eleventyConfig.addCollection("gurps_guida", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/guida/*.md");
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