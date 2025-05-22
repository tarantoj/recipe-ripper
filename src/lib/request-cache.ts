import { getRequestContext } from "@cloudflare/next-on-pages";

type AsyncFunc<T extends unknown[], U> = (...args: T) => Promise<U>;

const createKey = async (...params: unknown[]) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(params));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(hash).toString("hex");
};

export function kvCache<T extends unknown[], U>(
  fn: AsyncFunc<T, U>,
  options: KVNamespacePutOptions = { expirationTtl: 60 * 60 },
): (...params: T) => Promise<U> {
  if (!fn.name) throw new TypeError("Function does not have a name");
  return async function (...params) {
    const key = await createKey(params);

    const cachedResponse =
      await getRequestContext().env.RECIPE_CACHE.getWithMetadata(key);

    if (cachedResponse.value) return JSON.parse(cachedResponse.value) as U;
    else {
      const actualResponse = await fn(...params);

      getRequestContext().ctx.waitUntil(
        getRequestContext().env.RECIPE_CACHE.put(
          key,
          JSON.stringify(actualResponse),
          options,
        ),
      );

      return actualResponse;
    }
  };
}
