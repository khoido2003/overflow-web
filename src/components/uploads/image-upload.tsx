"use client";

import { AcceptProp, useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/uploadthing/utils";

// In this component, we will use 2 library to handle upload and crop images:

// react-dropzone
// react-easy-crop

interface ImageUploadProps {
  onSubmit: (file: Blob) => void;
}

export const ImageUpload = ({ onSubmit }: ImageUploadProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,

    // Only allow these types of image
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    } as AcceptProp,
  });

  const handleSubmit = async () => {
    if (imageSrc && croppedAreaPixels) {
      //

      // we will crop the image by ourself with this function by receive the image from user and the position that user want to crop
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

      onSubmit(croppedImage);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* <h1 className="text-2xl font-bold">Upload your image</h1> */}

      {/* Drag/Drop zone to upload the image from local machine */}
      <div
        {...getRootProps()}
        className="mb-4 cursor-pointer border-2 border-dashed border-gray-300 p-10 text-center"
      >
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {imageSrc && (
        <>
          <div className="relative mb-4 h-96 w-full">
            {/* This will show the image crop config  */}
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Adjust the zoom level of the crop image */}
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="mb-4 w-full"
          />

          {/* Upload the button to bucket in Uploadthing */}
          <button
            onClick={handleSubmit}
            className="rounded bg-primary px-4 py-2 text-white"
          >
            Crop & Upload
          </button>
        </>
      )}
    </div>
  );
};
