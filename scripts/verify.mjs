import {
  readFileSync,
  readdirSync,
  existsSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { load } from "cheerio";
const root = resolve("out");
const errors = [];
const lines = [];
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}
for (const file of [
  "index.html",
  "ai/index.html",
  "ai/weekly/index.html",
  "about/index.html",
  "privacy/index.html",
  "methodology/index.html",
  "404.html",
  "CNAME",
  ".nojekyll",
  "rss.xml",
  "sitemap.xml",
  "robots.txt",
  "brand/schicane-gold-wordmark.png",
  "brand/schicane-gold-symbol.png",
  "fonts/raleway-variable.ttf",
  "fonts/raleway-OFL.txt",
  "favicon.ico",
  "brand/favicon-s.svg",
  "brand/favicon-s-32.png",
  "brand/favicon-s-180.png",
])
  if (!existsSync(join(root, file))) errors.push(`Missing ${file}`);
if (readFileSync(join(root, "CNAME"), "utf8").trim() !== "schicane.com")
  errors.push("Custom domain changed");
const html = walk(root).filter((f) => f.endsWith(".html"));
for (const file of walk(join(root, "brand/headings"))) {
  const svg = load(readFileSync(file, "utf8"), { xmlMode: true });
  svg("path[d]").each((_, path) => {
    if (/NaN|Infinity/i.test(svg(path).attr("d") ?? ""))
      errors.push(`Invalid heading path coordinates: ${file}`);
  });
}
if (walk(root).some((file) => /ethnocentric.*\.(otf|ttf|woff2?)$/i.test(file)))
  errors.push("The desktop-only Ethnocentric font must not be distributed");
const home = load(readFileSync(join(root, "index.html"), "utf8"));
for (const id of ["f1-study", "projects", "about", "contact"]) {
  if (!home(`[id="${id}"]`).length) errors.push(`Home missing section: ${id}`);
}
if (home(".project-row").length !== 16)
  errors.push(
    "Home must render all 16 populated project entries without JavaScript",
  );
if (!home("input[type=search]").length) errors.push("Project search missing");
if (!home("#theme-toggle").length || !home("#theme-init").length)
  errors.push("Theme switch or pre-paint preference initialization missing");
for (const name of ["schicane-gold-wordmark.png", "schicane-gold-symbol.png"]) {
  const png = readFileSync(join(root, "brand", name));
  if (![4, 6].includes(png[25]))
    errors.push(`${name}: expected the owner's transparent PNG`);
}
if (
  home(".f1-view-buttons button").length !== 4 ||
  !home(".f1-scrub input[type=range]").length
)
  errors.push("Car study is missing its manual viewing controls");
if (!home(".f1-fallback").length)
  errors.push("Car study requires a static fallback");
if (!home("a[href='mailto:saarushjaiswal@gmail.com']").length)
  errors.push("Contact email missing");
if (home("footer").text().includes("©"))
  errors.push("Unrequested copyright line");
if (home("form").length || home("iframe").length)
  errors.push("Unexpected form or third-party embed");
if (!home("title").text().includes("Aarush Jaiswal"))
  errors.push("Home title must identify the portfolio owner");
for (const file of html) {
  const $ = load(readFileSync(file, "utf8"));
  const pathname = file
    .slice(root.length)
    .replaceAll("\\", "/")
    .replace(/index\.html$/, "");
  if ($("h1").length !== 1) errors.push(`${pathname}: expected one H1`);
  if (!$("title").text() || !$('meta[name="description"]').attr("content"))
    errors.push(`${pathname}: missing metadata`);
  if (!$('html[lang="en"]').length || !$("main").length)
    errors.push(`${pathname}: missing language or main landmark`);
  if (
    pathname != "/404.html" &&
    pathname != "/404/" &&
    pathname != "/_not-found/" &&
    !$('link[rel="canonical"]')
      .attr("href")
      ?.startsWith("https://schicane.com/")
  )
    errors.push(`${pathname}: missing canonical`);
  $("a[href],img[src],script[src],link[href],image[href],source[srcset]").each(
    (_, el) => {
      const value =
        $(el).attr("href") ?? $(el).attr("src") ?? $(el).attr("srcset");
      if (!value || value.startsWith("http:")) {
        errors.push(`${pathname}: insecure/empty URL ${value}`);
        return;
      }
      if (!value.startsWith("/") && !value.startsWith("#")) return;
      const url = new URL(value, "https://schicane.com" + pathname);
      let target = join(root, decodeURIComponent(url.pathname));
      if (url.pathname.endsWith("/")) target = join(target, "index.html");
      if (!existsSync(target)) {
        errors.push(`${pathname}: broken link ${value}`);
        return;
      }
      if (url.hash && target.endsWith(".html")) {
        const doc = load(readFileSync(target, "utf8"));
        if (
          !doc("[id]")
            .toArray()
            .some(
              (e) =>
                doc(e).attr("id") === decodeURIComponent(url.hash.slice(1)),
            )
        )
          errors.push(`${pathname}: missing anchor ${value}`);
      }
    },
  );
  lines.push(`PASS ${pathname}`);
}
const rss = load(readFileSync(join(root, "rss.xml"), "utf8"), {
  xmlMode: true,
});
if (!rss("rss channel").length) errors.push("Invalid RSS");
for (const item of rss("item link").toArray()) {
  const route = new URL(rss(item).text()).pathname;
  if (!existsSync(join(root, route, "index.html")))
    errors.push(`RSS missing article ${route}`);
}
const report = {
  checkedAt: new Date().toISOString(),
  pages: html.length,
  status: errors.length ? "failed" : "passed",
  routes: lines,
  errors,
};
mkdirSync("logs", { recursive: true });
writeFileSync("logs/verification.json", JSON.stringify(report, null, 2));
console.log(lines.join("\n"));
console.log(`[verify] ${html.length} pages, ${errors.length} errors`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
