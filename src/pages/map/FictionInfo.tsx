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
      const a = fiction.imgUrl.replace("/img/", "");
      const imageRef: StorageReference = ref(storage, a);

      getDownloadURL(ref(imageRef))
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              break;
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        });
    };

    fetchImage();
  }, []);

  return (
    <div className="h-auto w-[450px]">
      <div className="px-1 flex flex-row">
        <img
          src={imageUrl}
          alt=""
          className="h-44 w-auto"
          style={{ backgroundColor: "black" }}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = "src/assets/fm_v.png";
          }}
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="px-2 text-slate-900">
              {fiction.name} - {fiction.type}
            </h1>
            <h1 className="text-lg px-3 font-semibold mb-1 text-slate-900">
              {scene.name}{" "}
            </h1>
            <p className="px-3 text-slate-700">{scene.description} </p>
          </div>
          <a
            className="px-3 text-black underline underline-offset-2 text-xs text"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              scene.location.formatted_address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {scene.location.formatted_address}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FictionInfo;
