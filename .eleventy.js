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

  // ─── SISTEMI: D&D 5.5e ───────────────────────────────────────────────────
  eleventyConfig.addCollection("dnd-avventure", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/avventure/*/*.{md,njk}");
  });
  eleventyConfig.addCollection("dnd-sessioni", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/avventure/*/sessioni/*.{md,njk}").reverse();
  });
  eleventyConfig.addCollection("dnd-personaggi", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/archivio/personaggi/*.{md,njk}");
  });
  eleventyConfig.addCollection("dnd-luoghi", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/archivio/luoghi/*.{md,njk}");
  });
  eleventyConfig.addCollection("dnd-regole", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/archivio/regole/*.{md,njk}");
  });
  eleventyConfig.addCollection("dnd-oggetti", function(api) {
    return api.getFilteredByGlob("src/sistemi/dnd55e/archivio/oggetti/*.{md,njk}");
  });
  eleventyConfig.addCollection("dnd-guida", function(collectionApi) {
  return collectionApi.getFilteredByGlob("src/sistemi/dnd55e/guida/*.{md,njk}");
});

  // ─── SISTEMI: GURPS ──────────────────────────────────────────────────────
  eleventyConfig.addCollection("gurps-avventure", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/avventure/*/*.{md,njk}");
  });
  eleventyConfig.addCollection("gurps-sessioni", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/avventure/*/sessioni/*.{md,njk}").reverse();
  });
  eleventyConfig.addCollection("gurps-personaggi", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/archivio/personaggi/*.{md,njk}");
  });
  eleventyConfig.addCollection("gurps-luoghi", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/archivio/luoghi/*.{md,njk}");
  });
  eleventyConfig.addCollection("gurps-regole", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/archivio/regole/*.{md,njk}");
  });
  eleventyConfig.addCollection("gurps-oggetti", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/archivio/oggetti/*.{md,njk}");
  });
  eleventyConfig.addCollection("gurps-guida", function(api) {
    return api.getFilteredByGlob("src/sistemi/gurps/guida/*.{md,njk}");
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