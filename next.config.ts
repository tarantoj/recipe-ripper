import type { NextConfig } from "next";

const config = async () => {
  const nextConfig: NextConfig = {
    /* config options here */
  };

  return nextConfig;
};

export default config;
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
