import { getRequestContext } from "@cloudflare/next-on-pages";
import { cache } from "react";

type AsyncFunc<T extends unknown[], U> = (...args: T) => Promise<U>;

const createKey = async (...params: unknown[]) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(params));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(hash).toString("hex");
};

export function kvCache<T extends unknown[], U>(
  fn: AsyncFunc<T, U>,
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
          { expirationTtl: 60 * 60 },
        ),
      );

      return actualResponse;
    }
  };
}

export const requestCache = cache(
  async <T>(fn: () => Promise<T>, key: string) => {
    const existingKV =
      await getRequestContext().env.RECIPE_CACHE.getWithMetadata(key);

    const existing = JSON.parse(existingKV.value ?? "null") as T | null;
    const existingMetadata = JSON.parse(
      (existingKV.metadata as string) ?? "null",
    ) as { expiry?: number } | null;

    const refresh = async () => {
      const fresh = await fn();
      if (!fresh) return;

      getRequestContext().env.RECIPE_CACHE.put(key, JSON.stringify(fresh), {
        metadata: JSON.stringify({
          expiry: Date.now() + 1000 * 60 * 60 * 24 * 7 * 31, // One month
        }),
      });

      return fresh;
    };

    if (existing && existingMetadata?.expiry) {
      if (existingMetadata.expiry < Date.now()) {
        refresh();
      }
      return existing;
    } else {
      return await refresh();
    }
  },
);
