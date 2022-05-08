import { ProminentLocation } from "../../../../core/redux-store/features/api/mock-data/simplemaps-locations";
import CN from "classnames";
import SCSS from "../locations-event.module.scss";
import { Suspense, useEffect } from "react";
import Spinner from "../../../../core/spinner/spinner";
import { LocationEvent } from "../../../../core/redux-store/features/api/mock-data/events";

type LocationEventCardsType = {
  events: LocationEvent[],
  handleEventCardClick: (event: LocationEvent) => void,
}

export default function LocationEventCards({ events, handleEventCardClick }: LocationEventCardsType) {

  const buttonClassName = CN(SCSS["prominent-location--button"], "flex flex-col md:flex-row justify-center items-center bg-gray-100 relative w-full p-4 overflow-hidden rounded-md");
  const eventCardsGroupClassName = CN("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 md:my-6");

  const handleClick = (place: LocationEvent) => handleEventCardClick(place);

  useEffect(() => {
    console.log("COMPONENT:LocationEventCards", events)
  }, [])

  return (
    <div className={eventCardsGroupClassName}>
      {
        (events) && events.map((loc: LocationEvent, index: number) => {
          return (
            <Suspense key={loc.admin_name + index + loc.lat} fallback={<Spinner />}>
              <button onClick={() => handleClick(loc)} key={`${loc.lat}_${loc.lng}`}
                data-component={`Location Card Component`} className={buttonClassName}
                aria-label={`Background image of ${loc.admin_name}.`}>

                {
                  loc.main_image ?
                    <div className="w-full h-20 md:w-3/12 md:h-full relative rounded-md overflow-hidden mb-2 md:mb-0">
                      <img className="h-auto w-full md:w-auto md:h-full" src={loc.main_image} alt={"Event image."} />
                    </div> : null
                }

                <div className="w-full px-4">
                  <p className={"text-base md:text-md font-bold text-black md:text-left"} style={{ zIndex: 1 }}>
                    {loc.information.title}
                  </p>
                  <p className="text-sm md:text-base font-normal mt-1 md:text-left">
                    {loc.information.description}
                  </p>
                </div>

              </button>
            </Suspense>
          )
        })
      }
    </div>
  )
}