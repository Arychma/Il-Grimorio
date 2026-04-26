// 1. IMPORTAZIONE DEL PLUGIN (In cima, fuori dal modulo)
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  // ─── PLUGINS & SHORTCODES ────────────────────────────────────────────────
  // Attiva il plugin di navigazione
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Shortcode personalizzato per linkare i file tramite la "key" del frontmatter
  eleventyConfig.addShortcode("navLink", function(collections, key) {
    const allPages = collections.all;
    const targetPage = allPages.find(item => item.data.eleventyNavigation && item.data.eleventyNavigation.key === key);
    
    if (targetPage) {
      return `<a href="${targetPage.url}">${targetPage.data.eleventyNavigation.title || targetPage.data.title}</a>`;
    }
    
    // Messaggio di errore visibile se sbagli a scrivere la key
    return `<span style="color:red;">Link Errato: Key "${key}" non trovata</span>`;
  });

  // ─── STATIC ASSETS ───────────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/comunicazioni/downloads");

  // ─── TEMPLATE FORMATS ────────────────────────────────────────────────────
  eleventyConfig.setTemplateFormats(["njk", "md", "html"]);

  // ─── FILTERS ─────────────────────────────────────────────────────────────
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("it-IT", {
      year: "numeric", month: "long", day: "numeric"
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