import { API_UPLOATHING } from "@/constants/fetch-request";
import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

// Link to the bucket on Uploadthing
export const UploadButton = generateUploadButton({
  url: `${API_UPLOATHING}`,
});

export const UploadDropzone = generateUploadDropzone({
  url: `${API_UPLOATHING}`,
});

export const { uploadFiles, useUploadThing } = generateReactHelpers({
  url: `${API_UPLOATHING}`,
});

////////////////////////////////////////////////////////////

// Create the image before crop it
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

// Crop the image that just created
export const getCroppedImg = async (
  imageSrc: string,
  crop: any,
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Failed to get canvas context");

  // The canvas size is set to ensure there’s enough space to accommodate the entire image while maintaining its aspect ratio. The translate operations center the image on the canvas. The image is then drawn onto the canvas.
  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  // The canvas is translated to the center of the safe area, then translated back to the original image position. The image is then drawn onto the canvas, ensuring that it maintains its aspect ratio. The translate operations are applied in reverse order to achieve this.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Draw the image onto the canvas.
  ctx.drawImage(image, 0, 0);

  // retrieves the image data from the canvas.
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // The canvas size is set to match the dimensions of the desired cropped area.
  canvas.width = crop.width;
  canvas.height = crop.height;

  // The image data is drawn back onto the resized canvas, positioning it according to the cropping coordinates.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width / 2 - crop.x),
    Math.round(0 - safeArea / 2 + image.height / 2 - crop.y),
  );

  // The toBlob method converts the canvas content to a Blob object, which can then be used for uploading or further processing.
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    }, "image/jpeg");
  });
};
