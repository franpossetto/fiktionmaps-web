import { memo } from "react";
import { ref } from "firebase/storage";
import { useFirebaseStorage } from "@/hooks/shared/useImage/useFirebaseStorage";
import { storage } from "@/config/firebase";

interface FictionImageProps {
  imgUrl: string | null;
}

export const FictionImage = memo(({ imgUrl }: FictionImageProps) => {
  const { url: imageUrl } = useFirebaseStorage(imgUrl);

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
