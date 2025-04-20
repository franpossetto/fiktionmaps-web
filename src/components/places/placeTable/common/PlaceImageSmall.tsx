import { useFirebaseStorage } from "@/hooks/shared/useImage/useFirebaseStorage";
import { Place } from "@/types/Place";

interface PlaceImageSmallProps {
  place: Place;
}

export const PlaceImageSmall: React.FC<PlaceImageSmallProps> = ({ place }) => {
  const { url: imageUrl } = useFirebaseStorage(place.screenshot ?? null);


  const imgDivSideStyle = "relative h-8 w-8";
  const imgSideStyle = imageUrl
    ? "absolute h-8 w-auto object-cover rounded-md"
    : "absolute h-8 w-8 bg-gray-200 rounded-md";

  return (
    <>
      <div className="relative">
        <div className={imgDivSideStyle}>
          {imageUrl ? (
            <img className={imgSideStyle} src={imageUrl} alt="" />
          ) : (
            <div className={imgSideStyle}></div>
          )}
        </div>
      </div>
    </>
  );
};
