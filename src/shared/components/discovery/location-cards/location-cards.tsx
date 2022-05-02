import { ProminentLocation } from "../../../../core/redux-store/features/api/mock-data/simplemaps-locations";
import CN from "classnames";
import SCSS from "../discovery.module.scss";
import { Suspense } from "react";
import Spinner from "../../../../core/spinner/spinner";

type LocationCardsType = {
  locations: ProminentLocation[],
  handleCardClick: (id: ProminentLocation) => void,
  showcase: "province" | "city",
}

export default function LocationCards({ locations, handleCardClick, showcase }: LocationCardsType) {

  const prominentButtonClassName = CN(SCSS["prominent-location--button"], "flex justify-center items-center bg-gray-100 relative w-full h-40 md:h-44 overflow-hidden rounded-md");
  const backgroundImageClassName = CN(SCSS["prominent-location--background-image"], "absolute w-full");
  const prominentTextClassName = CN("text-xl md:text-2xl font-extrabold text-white absolute bottom-4 left-4");
  const locationsGroupClassName = CN("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4");
  // const locationsGroupClassName = CN("flex justify-center items-center flex-col md:flex-row flex-wrap");

  const handleClick = (place: ProminentLocation) => handleCardClick(place)

  return (
    <div className={locationsGroupClassName}>
      {
        (locations) && locations.map((loc: ProminentLocation, index: number) => {
          return (
            <Suspense key={loc.admin_name + index + loc.lat} fallback={<Spinner />}>
              {/* card */}
              <button onClick={() => handleClick(loc)} key={`${loc.lat}_${loc.lng}`}
                data-component={`Location Card Component`} className={prominentButtonClassName}
                aria-label={`Background image of ${loc.admin_name}.`}
                style={{ backgroundImage: `url(${loc.bg_image})` }}>
                {/* <img className={backgroundImageClassName} src={loc.bg_image}
                  alt={`Background image of ${loc.admin_name}.`} /> */}
                <p className={prominentTextClassName} style={{ zIndex: 1 }}>
                  {showcase === "province" && loc.admin_name}
                  {showcase === "city" && loc.city}
                </p>
              </button>
            </Suspense>
          )
        })
      }
    </div>
  )
}