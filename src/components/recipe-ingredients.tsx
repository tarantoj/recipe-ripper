import type { Recipe, Text, Role } from "schema-dts";
import { unescape } from "@/lib/unescape";

const isArray = (
  recipeIngredient: Recipe["recipeIngredient"],
): recipeIngredient is (Text | Role<Text, "recipeIngredient">)[] =>
  Array.isArray(recipeIngredient);

export const RecipeIngredients = ({
  recipeIngredient,
}: Pick<Recipe, "recipeIngredient">) => {
  if (isArray(recipeIngredient)) {
    return (
      <div className="p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-2">
          {recipeIngredient.map(
            (ingredient, index) =>
              typeof ingredient === "string" && (
                <li key={index}>{unescape(ingredient)}</li>
              ),
          )}
        </ul>
      </div>
    );
  }
};
