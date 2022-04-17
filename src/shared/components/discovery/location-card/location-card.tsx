import { ProminentLocation } from "../../../../core/redux-store/features/api/mock-data/simplemaps-locations";
import CN from "classnames";
import SCSS from "../discovery.module.scss";

type LocationCardType = {
  location: ProminentLocation,
  handleCardClick: (id: ProminentLocation) => void,
  showcase: "province" | "city",
}

export default function LocationCard({ location, handleCardClick, showcase }: LocationCardType) {

  const prominentButtonClassName = CN(SCSS["prominent-location--button"], "flex justify-center items-center bg-gray-100 relative w-full h-40 overflow-hidden mb-6 rounded-md");
  const backgroundImageClassName = CN(SCSS["prominent-location--background-image"], "absolute w-full");
  const prominentTextClassName = CN("text-xl md:text-2xl font-extrabold text-white absolute bottom-4 left-4");

  const handleClick = (id: ProminentLocation) => {
    handleCardClick(id);
  };

  return (
    <button onClick={() => handleClick(location)} key={`${location.lat}_${location.lng}`}
      data-component={`Location Card Component`} className={prominentButtonClassName}>
      <img className={backgroundImageClassName} src={location.bg_image}
        alt={`Background image of ${location.admin_name}.`} />
      <p className={prominentTextClassName} style={{ zIndex: 1 }}>
        { showcase === "province" && location.admin_name }
        { showcase === "city" && location.city }
      </p>
    </button>
  )
}