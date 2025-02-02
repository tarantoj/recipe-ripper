import { KVNamespace } from "@cloudflare/workers-types/experimental";

interface CloudflareEnv {
  __NEXT_ON_PAGES__KV_SUSPENSE_CACHE: KVNamespace;
}
