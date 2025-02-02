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
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "48x48 72x72 96x96 128x128 256x256 512x512",
        purpose: "any",
      },
    ],
    share_target: { action: "/recipe", method: "GET", params: { url: "url" } },
  };
}
