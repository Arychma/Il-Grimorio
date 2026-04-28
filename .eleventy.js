const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  // ─── PLUGINS & SHORTCODES ────────────────────────────────────────────────
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addShortcode("navLink", function(collections, key) {
    const allPages = collections.all;
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
    return `<span style="color:orange; font-weight:bold;">[Link non trovato: ${key}]</span>`;
  });

  // ─── STATIC ASSETS ───────────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/comunicazioni/downloads");

  // ─── TEMPLATE FORMATS ────────────────────────────────────────────────────
  eleventyConfig.setTemplateFormats(["njk", "md", "html"]);

  // ─── FILTERS ─────────────────────────────────────────────────────────────
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("it-IT", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  eleventyConfig.addFilter("filterByTag", function(collection, tag) {
    if (!tag) return collection;
    return collection.filter(item => {
      const tags = item.data.tags || [];
      return typeof tags === "string" ? tags === tag : tags.includes(tag);
    });
  });

  // ─── COLLEZIONI ──────────────────────────────────────────────────────────
  const sistemi = ["dnd55e", "gurps"];
  const categorieArchivio = ["personaggi", "luoghi", "regole", "oggetti", "miscellanea"];
  const prefissi = { dnd55e: "dnd", gurps: "gurps" };

  sistemi.forEach(sistema => {
    const prefix = prefissi[sistema] ?? sistema;

    categorieArchivio.forEach(cat => {
      eleventyConfig.addCollection(`${prefix}-${cat}`, api =>
        api.getFilteredByGlob(`src/sistemi/${sistema}/archivio/${cat}/*.{md,njk}`)
          .filter(page => !page.data.draft)
      );
    });

    eleventyConfig.addCollection(`${prefix}-avventure`, api =>
      api.getFilteredByGlob(`src/sistemi/${sistema}/avventure/*/*.{md,njk}`)
        .filter(page => !page.data.draft)
    );

    eleventyConfig.addCollection(`${prefix}-sessioni`, api =>
      api.getFilteredByGlob(`src/sistemi/${sistema}/avventure/*/sessioni/*.{md,njk}`)
        .reverse()
        .filter(page => !page.data.draft)
    );

    eleventyConfig.addCollection(`${prefix}-guida`, api =>
      api.getFilteredByGlob(`src/sistemi/${sistema}/guida/**/*.{md,njk}`)
        .filter(page => !page.data.draft)
    );
  });

  eleventyConfig.addCollection("ambientazioni", api =>
    api.getFilteredByGlob("src/ambientazioni/**/*.{md,njk}")
      .filter(page => !page.data.draft)
  );

  ["blog", "newsletter", "jolly"].forEach(tipo => {
    eleventyConfig.addCollection(tipo, api =>
      api.getFilteredByGlob(`src/comunicazioni/${tipo}/*.{md,njk}`)
        .reverse()
        .filter(page => !page.data.draft)
    );
  });

  // ─── TRASFORMAZIONE AUTOMATICA WIKILINKS ─────────────────────────────────
  // Nota: usiamo una funzione normale (non arrow function) per mantenere il contesto 'this'
  eleventyConfig.addTransform("wikiLinks", function(content) {
    // Applichiamo la trasformazione solo ai file HTML
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      
      // In Eleventy 2.x, le collezioni si recuperano così all'interno delle trasformazioni
      // Se this.ctx non è disponibile, usiamo le collezioni globali di eleventyConfig
      // ma il modo più sicuro è cercarle nell'istanza corrente.
      const collections = this.page ? this.page.collections : null;

      // Se per qualche motivo le collezioni sono ancora irraggiungibili, 
      // usiamo un metodo alternativo sicuro per non bloccare la build
      if (!content.includes("[[")) return content;

      return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, key, label) => {
        const cleanKey = key.trim();
        const displayLabel = label ? label.trim() : null;

        // Cerca nelle collezioni globali (all)
        // Usiamo un filtro di fallback se collections è undefined
        const allPages = eleventyConfig.collections ? eleventyConfig.collections.all : [];
        
        // Se non riusciamo a mappare 'all' qui, dobbiamo usare un approccio diverso:
        // Ma proviamo prima la via standard di Eleventy 2:
        const targetPage = (collections?.all || []).find(item => {
          return (
            (item.data.eleventyNavigation && item.data.eleventyNavigation.key === cleanKey) ||
            (item.data.title === cleanKey) ||
            (item.fileSlug === cleanKey)
          );
        });

        if (targetPage) {
          const text = displayLabel || targetPage.data.eleventyNavigation?.title || targetPage.data.title || cleanKey;
          return `<a href="${targetPage.url}" class="wikilink">${text}</a>`;
        }

        return `<span style="color:orange; font-weight:bold;" title="Pagina non trovata">[Link non trovato: ${cleanKey}]</span>`;
      });
    }
    return content;
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