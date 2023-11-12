// FictionInfo.tsx
import React, { useEffect, useState } from "react";
import { storage } from "../../config/firebase";
import { ref, getDownloadURL, StorageReference } from "firebase/storage";
import { Fiction } from "../../types/Fiction";
import { Scene } from "../../types/Scene";

interface FictionInfoProps {
  fiction: Fiction;
  scene: Scene;
}

const FictionInfo: React.FC<FictionInfoProps> = ({ fiction, scene }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchImage = () => {
      let sceneImg = scene.screenShot;
      console.log(sceneImg)
      if (sceneImg == null) {
        sceneImg = fiction.imgUrl.replace("/img/", ""); 
      }
      const imageRef: StorageReference = ref(storage, sceneImg);

      getDownloadURL(ref(imageRef))
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {

        });
    };

    fetchImage();
  }, [scene.screenShot, fiction.imgUrl]);

  const handleError = (e: any) => {
    e.target.onerror = null;
    e.target.src = "src/assets/fm_v.png";
  };

  const imageStyle = {
    height: "7rem", 
    width: scene.screenShot ? "11rem" : "auto", 
    objectFit: scene.screenShot ? 'cover' as const : 'contain' as const,
    backgroundColor: "black"
  };

  return (
    <div className="h-auto w-[420px]" >
      <div className="px-1 flex flex-row">
        <img
          src={imageUrl}
          alt=""
          style={imageStyle}
          onError={handleError}
        />
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="px-2 text-[15px] text-slate-900">
              {fiction.name} - {fiction.type}
            </h2>
            <h1 className="text-[15px] px-3 font-semibold mb-1 text-slate-900">
              {scene.name}
            </h1>
            <p className="px-3 text-slate-700">{scene.description}</p>
          </div>
          <a
            className="px-3 text-black underline underline-offset-2 text-xs"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              scene.location.formattedAddress
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {scene.location.formattedAddress}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FictionInfo;
