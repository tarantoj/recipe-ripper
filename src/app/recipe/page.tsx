import { Badge } from "@/components/ui/badge";
import parse from "node-html-parser";
import type { Graph, Thing, Recipe } from "schema-dts";

export const runtime = "edge";

const unescape = (val: string) =>
  val
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "\'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");

const Recipe = async ({
  searchParams,
}: {
  searchParams: Promise<{
    url: string;
    text: string;
    title: string;
  }>;
}) => {
  const { url, text, title } = await searchParams;
  console.log({ url, text, title });

  const test = url ?? text ?? title;

  const res = await fetch(test);
  const html = await res.text();

  const root = parse(html);
  const jsonLd = root.querySelectorAll("script[type='application/ld+json']");

  const recipe = jsonLd
    .map(({ rawText }) => JSON.parse(rawText) as Thing | Graph)
    .flatMap((x) =>
      typeof x === "object" && "@graph" in x ? x["@graph"] : [x],
    )
    .find(
      (x) => typeof x === "object" && "@type" in x && x["@type"] === "Recipe",
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Recipe Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">
          {unescape(recipe?.name?.toString() ?? "")}
        </h1>
        <div className="flex gap-4">
          {recipe?.recipeYield && (
            <Badge variant="secondary">
              {Array.isArray(recipe?.recipeYield)
                ? recipe.recipeYield[0]
                : recipe.recipeYield}
            </Badge>
          )}
          {recipe?.cookTime && typeof recipe.cookTime === "string" && (
            <Badge variant="secondary">{recipe.cookTime}</Badge>
          )}
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-2">
          {(Array.isArray(recipe?.recipeIngredient)
            ? recipe.recipeIngredient
            : []
          ).map(
            (x, index) =>
              typeof x === "string" && <li key={index}>{unescape(x)}</li>,
          )}
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal pl-6 space-y-4">
          {(Array.isArray(recipe?.recipeInstructions)
            ? recipe.recipeInstructions
            : []
          )?.map((x, index) =>
            typeof x === "object" &&
            "@type" in x &&
            x["@type"] === "HowToStep" ? (
              <li key={index}>{unescape(x.text)}</li>
            ) : typeof x === "string" ? (
              <li key={index}>{unescape(x)}</li>
            ) : null,
          )}
        </ol>
      </div>
    </div>
  );
};

export default Recipe;
