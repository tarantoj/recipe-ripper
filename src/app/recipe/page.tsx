import parse from "node-html-parser";
import type { Graph, Thing, Recipe } from "schema-dts";

// const RecipInstructions = ({
//   recipeInstructions,
// }: {
//   recipeInstructions: Recipe["recipeInstructions"];
// }) => {
//   if (Array.isArray(recipeInstructions) && recipeInstructions) {
//   }
// };

const Recipe = async ({
  searchParams,
}: {
  searchParams: Promise<{
    url: string;
  }>;
}) => {
  const { url } = await searchParams;

  const res = await fetch(url);
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
    <article>
      <header>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {recipe?.name?.toString() ?? ""}
        </h1>
        <small className="text-sm font-medium leading-none">
          {recipe?.description?.toString() ?? ""}
        </small>
      </header>
      <section>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Ingredients
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          {(Array.isArray(recipe?.recipeIngredient)
            ? recipe.recipeIngredient
            : []
          ).map(
            (x, index) => typeof x === "string" && <li key={index}>{x}</li>,
          )}
        </ul>
      </section>
      <section>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Instructions
        </h2>
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
          {(Array.isArray(recipe?.recipeInstructions)
            ? recipe.recipeInstructions
            : []
          )?.map((x, index) =>
            typeof x === "object" &&
            "@type" in x &&
            x["@type"] === "HowToStep" ? (
              <li key={index}>{x.text}</li>
            ) : null,
          )}
        </ol>
      </section>
    </article>
  );
};

export default Recipe;
