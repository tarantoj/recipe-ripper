import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Recipe Ripper",
    short_name: "RR",
    description: "Terser recipe viewer",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "192x192 512x512" },
    ],
    share_target: { action: "/recipe", method: "GET", params: { url: "url" } },
  };
}
