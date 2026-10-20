// FGM RENOV — génération du site (Eleventy 3)
export default function (eleventyConfig) {
  // Fichiers servis tels quels
  for (const p of ["css", "js", "img", "fonts", "favicon.ico", "favicon-96.png", "apple-touch-icon.png",
                   "site.webmanifest", "robots.txt", "merci.html", "mentions-legales.html",
                   "confidentialite.html", "404.html"]) {
    eleventyConfig.addPassthroughCopy(p);
  }
}
export const config = {
  dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
  templateFormats: ["njk"],
};
