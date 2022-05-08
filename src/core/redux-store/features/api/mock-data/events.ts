
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

export interface LocationEvent {
  city: string;
  lat: string;
  lng: string;
  country: string;
  admin_name: string; // province
  address: EventAddress;
  information: EventInformation;
  main_image: string | null;
  image: string[];
}

export function attachImages(events: LocationEvent[]): LocationEvent[] {
  let ev: LocationEvent[] = []
  
  events.forEach((location: LocationEvent) => {
    location.main_image = RandomiseImages();
    location.image = location.image.map((img: string, i: number) => {
      return RandomiseImages()
    })
    ev.push(location)
  });

  console.log("FUNCTION:attachImages:ev", ev);
  return ev
}

function RandomiseImages(): string {
  const images = [
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-1.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-2.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-3.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-4.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-5.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-6.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-7.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-8.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-9.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-10.jpg`,
    `${process.env.PUBLIC_URL}/assets/image/random/unsplash-random-11.jpg`,
  ]

  // Get random number
  const randomIndex = Math.floor(Math.random() * images.length);
  // Return a random image
  return images[randomIndex]
}

export const LocationEvents: LocationEvent[] = [
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
    main_image: null,
    image: ["", "", "", "", ""],
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
    main_image: null,
    image: ["", "", "", "", ""],
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
    main_image: null,
    image: ["", "", "", "", ""],
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
      event_type: "private",
      event_time: Number(new Date().getTime()) + 3000000000 // adds a 2 months and a few days, give or take
    },
    main_image: null,
    image: ["", "", "", "", ""],
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
    main_image: null,
    image: ["", "", "", "", ""],
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
    main_image: null,
    image: ["", "", "", "", ""],
  },
]