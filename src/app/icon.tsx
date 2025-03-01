import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 256,
  height: 256,
};

export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...size}
      >
        <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
        <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
        <path d="m2.1 21.8 6.4-6.3" />
        <path d="m19 5-7 7" />
      </svg>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
