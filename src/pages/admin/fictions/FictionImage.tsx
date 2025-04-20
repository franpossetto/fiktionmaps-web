import { memo } from "react";
import { ref } from "firebase/storage";
import { storage } from "../../../config/firebase";
import { useFirebaseStorage } from "@/hooks/shared/useImage/useFirebaseStorage";

interface FictionImageProps {
  imgUrl: string | null;
}

export const FictionImage = memo(({ imgUrl }: FictionImageProps) => {
  const imageRef = imgUrl ? ref(storage, imgUrl) : null;
  const { url: imageUrl } = useFirebaseStorage(imageRef);

  return (
    <img
      src={imageUrl || "src/assets/fm_v.png"}
      alt=""
      className="h-14 w-auto"
      style={{ backgroundColor: "black" }}
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = "src/assets/fm_v.png";
      }}
    />
  );
});
