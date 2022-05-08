import React from "react";
import CN from "classnames";
import SCSS from "../location-events.module.scss"
import { useAppDispatch, useAppSelector } from "../../../../core/redux-store/hooks";
import { selectedEvent, setSelectedEvent } from "../../../../core/redux-store/features/discovery/discoverySlice";


export default function EventPanel() {
  const dispatch = useAppDispatch();
  const event = useAppSelector(selectedEvent);

  const section = CN(
    "flex flex-col",
    "overflow-hidden fixed bottom-0 left-0 w-full bg-slate-700",
    event ? "h-screen" : "h-0",
    // animation
    "transition-all duration-150 ease-in-out"
  )
  const panelContentClassName = CN(
    "flex flex-col",
    "bg-gray-200 h-full w-full py-6 px-8 rounded-t-lg",
    "transition-all duration-300 ease-in-out",
  );
  const panelImageGroupClassName = CN("w-full h-auto relative rounded-lg overflow-hidden");
  const panelImageClassName = CN("w-full");

  const closeEventPanel = (element: any) => {
    dispatch(setSelectedEvent(null));
  }

  const openEvents = () => {
    console.log("FUNCTION:openEvents", event);
  }

  return (
    <aside className={section} style={{ zIndex: 2 }} >
      <div className="h-10 bg-none" onClick={(element) => closeEventPanel(element)}></div>
      <div className={panelContentClassName}>
        <button className="ml-auto rounded-md bg-[#2FB9B3] font-bold text-base text-white px-4 py-2 mb-10"
          onClick={closeEventPanel}>close</button>
        {event?.main_image ?
          <div className={panelImageGroupClassName}>
            <img className={panelImageClassName} src={event?.main_image} alt="placeholder" />
          </div>
          : null}

        <div className="mb-4 mt-6">
          <h4 className="text-xl md:text-2xl font-bold mb-4">{event?.information.title}</h4>
          <p className="text-base">{event?.information.description}</p>
        </div>

        <button className="rounded-md bg-[#2FB9B3] font-bold text-base w-full text-white px-6 py-2"
          onClick={() => openEvents()}>Events</button>
      </div>
    </aside>
  )
}