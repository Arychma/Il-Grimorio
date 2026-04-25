module.exports = function(eleventyConfig) {
  // Copy static assets to output
  eleventyConfig.addPassthroughCopy("src/downloads");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Allow markdown in nunjucks templates
  eleventyConfig.setTemplateFormats(["njk", "md", "html"]);

  // Add a readable date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-GB", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  // Collections
  eleventyConfig.addCollection("sessions", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/sessions/*.md").reverse();
  });
  eleventyConfig.addCollection("npcs", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/npcs/*.md");
  });
  eleventyConfig.addCollection("locations", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/locations/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
