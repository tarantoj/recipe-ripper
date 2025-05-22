"use server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { cache } from "react";

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
