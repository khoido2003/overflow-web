"use client";

import { useUploadThing } from "@/lib/uploadthing/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { ImageUpload } from "@/components/uploads/image-upload";
import { generateRandomFileName } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const EditAvatar = () => {
  const session = useSession();
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  // Hook from uploadthing/react
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      toast("Upload profile picture successfully!");
      router.push("/profile");
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
    headers: {
      Authorization: `Bearer ${session.data?.user.token}`,
    },
  });

  // Upload the image, in here we wil have a function generate random name file so when we store it to the bucket, the image will have different name
  const handleImageSubmit = async (croppedImage: Blob) => {
    setIsSubmit(true);
    const file = new File([croppedImage], generateRandomFileName(".png"), {
      type: "image/png",
    });

    // Send the image to  server
    await startUpload([file]);

    setIsSubmit(false);
    setUploadProgress(0);

    router.push("/profile");
  };

  return (
    <Dialog open={isSubmit}>
      <div className="flex flex-col gap-6">
        <ImageUpload onSubmit={handleImageSubmit} />
      </div>

      <DialogContent className="flex w-full flex-col gap-4 py-12">
        <DialogHeader>
          <DialogTitle className="mb-4 flex items-center justify-center gap-4">
            <span className="text-xs sm:text-sm">
              Your image is uploading. This may take a moment.
            </span>

            <Loader2 className="h-4 w-4 animate-spin" />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Progress value={uploadProgress} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatar;
