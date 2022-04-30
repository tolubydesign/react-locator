
type EventType = "public" | "private";

type EventInformation = {
  title: string,
  description: string,
  event_type: EventType,
  event_time: number // adds a 2 months and a few days, give or take
};

type EventAddress = {
  street: string;
  suburb: string;
};

export interface Event {
  city: string;
  lat: string;
  lng: string;
  country: string;
  admin_name: string; // province
  address: EventAddress;
  information: EventInformation;
  bg_image: string | null;
}

export const Events: any[] = [
  {
    city: "Johannesburg",
    lat: "-26.2044",
    lng: "28.0416",
    country: "South Africa",
    admin_name: "Gauteng",
    address: {
      street: "",
      suburb: "",
    },
    information: {
      title: "Event Title (1)",
      description: "Event Description (1)",
      event_type: "private",
      event_time: Number(new Date().getTime()) + 3000000000 // adds a 2 months and a few days, give or take
    },
    bg_image: null,
  },
  {
    city: "Vereeniging",
    lat: "-26.6736",
    lng: "27.9319",
    country: "South Africa",
    admin_name: "Gauteng",
    address: {
      street: "",
      suburb: "",
    },
    information: {
      title: "Event Title (2)",
      description: "Event Description (2)",
      event_type: "public",
      event_time: Number(new Date().getTime()) + 3000000000 // adds a 2 months and a few days, give or take
    },
    bg_image: null,
  },
  {
    city: "Vereeniging",
    lat: "-26.6736",
    lng: "27.9319",
    country: "South Africa",
    admin_name: "Gauteng",
    address: {
      street: "",
      suburb: "",
    },
    information: {
      title: "Event Title (3)",
      description: "Event Description (3)",
      event_type: "public",
      event_time: Number(new Date().getTime()) + 3000000000 // adds a 2 months and a few days, give or take
    },
    bg_image: null,
  },
  {
    city: "Sandton",
    lat: "-26.1070",
    lng: "28.0517",
    country: "South Africa",
    admin_name: "Gauteng",
    address: {
      street: "",
      suburb: "",
    },
    information: {
      title: "Event Title (4)",
      description: "Event Description (4)",
      event_type: "public",
      event_time: Number(new Date().getTime()) + 3000000000 // adds a 2 months and a few days, give or take
    },
    bg_image: null,
  },
  {
    city: "Pretoria",
    lat: "-25.7464",
    lng: "28.1881",
    country: "South Africa",
    admin_name: "Gauteng",
    address: {
      street: "",
      suburb: "",
    },
    information: {
      title: "Event Title (5)",
      description: "Event Description (5)",
      event_type: "public",
      event_time: Number(new Date().getTime()) + 3000000000 // adds a 2 months and a few days, give or take
    },
    bg_image: null,
  },
  {
    city: "Springs",
    lat: "-26.2547",
    lng: "28.4428",
    country: "South Africa",
    admin_name: "Gauteng",
    address: {
      street: "",
      suburb: "",
    },
    information: {
      title: "Event Title (6)",
      description: "Event Description (6)",
      event_type: "public",
      event_time: Number(new Date().getTime()) + 3000000000 // adds a 2 months and a few days, give or take
    },
    bg_image: null,
  },
]