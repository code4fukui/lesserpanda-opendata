import { PNG } from "https://code4fukui.github.io/PNG/PNG.js";
import { JPEG } from "https://code4fukui.github.io/JPEG/JPEG.js";

export const png2jpg = (png, quality = 90) => {
  try {
    const img = PNG.decode(png);
    return JPEG.encode(img, quality);
  } catch (e) {
    return png; // already jpg?
  }
};
