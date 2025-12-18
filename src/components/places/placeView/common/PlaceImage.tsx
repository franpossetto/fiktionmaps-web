import { useFirebaseStorage } from "@/hooks/shared/useImage/useFirebaseStorage";
import { Place } from "../../../../types/Place";

interface PlaceImageProps {
  place: Place;
}

export const PlaceImage: React.FC<PlaceImageProps> = ({ place }) => {
  const { url: imageUrl } = useFirebaseStorage(place.screenshot || null);

  const imgDivSideStyle = place.screenshot
    ? "relative h-36 md:h-96 m-5"
    : "relative px-3";
  const imgSideStyle = place.screenshot
    ? "absolute h-full w-full object-cover"
    : "block h-full w-full object-cover";

  return (
    <div className="relative">
      <div className={imgDivSideStyle}>
        {imageUrl && <img className={imgSideStyle} src={imageUrl} alt="" />}
      </div>
    </div>
  );
};
