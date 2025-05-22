import { RecipeIngredients } from "@/components/recipe-ingredients";
import { Badge } from "@/components/ui/badge";
import { fetchRecipe } from "@/lib/fetch-recipe";
import { notFound } from "next/navigation";
import type { Recipe } from "schema-dts";
import { unescape } from "@/lib/unescape";
import { kvCache } from "@/lib/request-cache";
import type { Metadata } from "next";
import { TimeBadge } from "@/components/time-badge";
import { cache } from "react";

export const runtime = "edge";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{
    url: string;
    text: string;
    title: string;
  }>;
}): Promise<Metadata> => {
  const { url, text, title } = await searchParams;

  if (!url && !text && !title) return notFound();

  const recipe = await kvCache(fetchRecipe)(url ?? text ?? title);

  return {
    title: typeof recipe?.name === "string" ? recipe.name : undefined,
    description:
      typeof recipe?.description === "string" ? recipe.description : undefined,
  };
};

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

  if (!url && !text && !title) return notFound();

  const recipe = await cache(kvCache(fetchRecipe))(url ?? text ?? title);

  if (!recipe) return notFound();

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
            <TimeBadge time={recipe.cookTime} />
          )}
        </div>
      </div>

      <RecipeIngredients recipeIngredient={recipe?.recipeIngredient} />

      {/* Instructions Section */}
      <div className="p-6 rounded-lg shadow-xs">
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

      <pre>
        <code>{JSON.stringify(recipe, undefined, 2)}</code>
      </pre>
    </div>
  );
};

export default Recipe;
