import parse from "node-html-parser";
import type { Graph, Thing } from "schema-dts";

export const fetchRecipe = async (url: string) => {
  const res = await fetch(url);
  const html = await res.text();

  const root = parse(html);
  const jsonLd = root.querySelectorAll("script[type='application/ld+json']");

  return jsonLd
    .map(({ rawText }) => JSON.parse(rawText) as Thing | Graph)
    .flatMap((x) =>
      typeof x === "object" && "@graph" in x ? x["@graph"] : [x],
    )
    .find(
      (x) => typeof x === "object" && "@type" in x && x["@type"] === "Recipe",
    );
};
