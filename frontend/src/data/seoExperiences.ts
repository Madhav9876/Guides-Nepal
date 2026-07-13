export interface Review {
  id: number;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  content: string;
}

export interface Guide {
  id: string;
  name: string;
  image: string;
  role: string;
  bio: string;
  languages: string[];
  rating: number;
  reviews: number;
}

export interface SeoExperienceData {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: number;
  heroImage: string;
  images: string[];
  secondaryImage?: string;
  mapImage?: string;
  author: {
    name: string;
    role: string;
    image: string;
    email: string;
    responseRate: number;
    responseTime: string;
    languages: string[];
    joined: string;
  };
  guides?: Guide[];
  intro: string;
  description: string;
  locationDescription?: string;
  whatIncluded?: string;
  whatNotIncluded?: string;
  tourStructure: {
    title: string;
    steps: { name: string; label: string }[];
  };
  highlights: {
    title: string;
    description: string;
    items: string[];
  };
  amenities: string[];
  houseRules: string[];
  space?: {
    roomType: string;
    beds: number;
    bathrooms: number;
    propertyType: string;
  };
  safety?: {
    items: string[];
  };
  cancellation?: string;
  reviews: Review[];
  similarListings: { title: string; image: string; price: number; rating: number; location: string }[];
}

export const seoExperiences: Record<string, SeoExperienceData> = {
  'amsterdam-highlights': {
    id: 'amsterdam-highlights',
    title: 'Highlights & Hidden Gems Of Amsterdam',
    subtitle: 'City Highlight Tours',
    location: 'Amsterdam, Netherlands',
    rating: 4.9,
    reviewsCount: 124,
    price: 45,
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Amsterdam%20canal%20hidden%20gem%20bike&image_size=landscape_16_9',
    secondaryImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Amsterdam%20locals%20eating%20cheese&image_size=landscape_16_9',
    mapImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=amsterdam%20city%20map%20vector%20simple&image_size=landscape_16_9',
    images: [
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Amsterdam%20canal%20hidden%20gem%20bike&image_size=landscape_16_9',
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Amsterdam%20street%20flower%20market&image_size=landscape_16_9',
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Amsterdam%20cozy%20cafe%20interior&image_size=landscape_16_9',
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Amsterdam%20museum%20district&image_size=landscape_16_9',
    ],
    author: {
      name: 'Anne Betancourt',
      role: 'Senior Local Guide',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=dutch%20guide%20woman%20smiling&image_size=square',
      email: 'anne.b@guides-nepal.com',
      responseRate: 100,
      responseTime: 'within an hour',
      languages: ['English', 'Dutch', 'German'],
      joined: 'May 2018'
    },
    guides: [
      { 
        id: 'anne',
        name: 'Anne', 
        role: 'Main Guide', 
        image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=dutch%20guide%20woman%20smiling&image_size=square',
        bio: 'Passionate about Amsterdam history and architecture. I love showing guests the hidden courtyards.',
        languages: ['English', 'Dutch', 'German'],
        rating: 4.98,
        reviews: 124
      },
      { 
        id: 'mark',
        name: 'Mark', 
        role: 'Co-host', 
        image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=dutch%20man%20guide%20young&image_size=square',
        bio: 'Local foodie and night owl. I know the best spots for bitterballen and craft beer.',
        languages: ['English', 'Dutch'],
        rating: 4.92,
        reviews: 86
      },
      { 
        id: 'sophie',
        name: 'Sophie', 
        role: 'Food Expert', 
        image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=woman%20chef%20portrait&image_size=square',
        bio: 'Culinary arts graduate who loves exploring the multicultural food scene of the city.',
        languages: ['English', 'French', 'Spanish'],
        rating: 4.95,
        reviews: 92
      },
      { 
        id: 'lars',
        name: 'Lars', 
        role: 'History Buff', 
        image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=older%20man%20glasses%20portrait&image_size=square',
        bio: 'Retired history teacher specializing in the Golden Age and WWII history of Amsterdam.',
        languages: ['English', 'German'],
        rating: 5.0,
        reviews: 156
      },
    ],
    intro: "Discover the secret side of Amsterdam that tourists often miss. We'll navigate through narrow alleys, visit hidden courtyards (Hofjes), and taste the best local treats.",
    description: "Located in the heart of Amsterdam, our experience offers a unique perspective on the city. Walking distance to major landmarks but tucked away in a quiet neighborhood. You will explore shared spaces and hidden gems that define the local lifestyle. Please respect the local culture and house rules during our tour. \n\nWe will start our journey in the Jordaan district, exploring its labyrinth of narrow streets and canals. Then, we'll head to the Pijp, a vibrant neighborhood known for its multicultural atmosphere and the famous Albert Cuyp Market. Along the way, I'll share stories about the city's history, architecture, and daily life. You'll get to taste some traditional Dutch snacks, like herring and stroopwafels, and learn about the local food culture.",
    locationDescription: "We will meet in the Jordaan district, near the Anne Frank House. This historic neighborhood is famous for its beautiful canals and narrow streets. From there, we will walk towards the Nine Streets area, a shopping district with many unique boutiques and cafes. We will end the tour in the Pijp, a lively neighborhood with many bars and restaurants. \n\nThe exact meeting point will be sent to you after booking. Please make sure to arrive 15 minutes early.",
    whatIncluded: "The price includes the guide fee, food tasting (3 snacks), and a small souvenir. Transport costs are not included as we will be walking.",
    whatNotIncluded: "Drinks (unless specified), gratuities, and hotel pickup/drop-off are not included.",
    space: {
      roomType: 'Private tour',
      beds: 0,
      bathrooms: 1,
      propertyType: 'Walking Tour'
    },
    tourStructure: {
      title: 'Tour Structure',
      steps: [
        { name: 'Jordaan', label: 'Start Point' },
        { name: 'Canals', label: 'Exploration' },
        { name: 'De Pijp', label: 'Food Stop' }
      ]
    },
    highlights: {
      title: 'Experience Highlights',
      description: 'When walking the streets of Amsterdam, we follow a route designed to show you the authentic lifestyle of the locals.',
      items: [
        "Central location visit",
        "Free local snacks included",
        "Private group experience",
        "Shared cultural stories",
        "Non-smoking walking route"
      ]
    },
    amenities: [
      "Local Guide - Expert knowledge",
      "Food Tasting - 3 local snacks",
      "Drinks Included - Water bottle",
      "Photography - Tips & spots",
      "Entrance Fees - Hidden churches",
      "Transport - Walking tour",
      "Small Group - Max 6 people",
      "Instant Confirmation",
      "Wifi - Portable hotspot",
      "Heating - Indoor stops",
      "First Aid Kit - Guide carries one"
    ],
    houseRules: [
      "No smoking during the tour",
      "No parties or loud events",
      "Respect local residents",
      "Arrive 15 mins before start",
      "Comfortable walking shoes required"
    ],
    safety: {
      items: [
        "Committed to enhanced cleaning process",
        "Social distancing guidelines in place",
        "Guides wear masks when required",
        "Sanitizer provided"
      ]
    },
    cancellation: "Free cancellation for 48 hours. Cancel before 24 hours of the start date for a partial refund.",
    reviews: [
      {
        id: 1,
        author: "Sarah Jenkins",
        avatar: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=woman%20avatar%20smiling&image_size=square",
        date: "October 2023",
        rating: 5,
        content: "Great location and amazing guide! Anne was very helpful and showed us parts of the city we would never have found on our own. Very clean and organized tour. The hidden courtyards were absolutely magical, and the history Anne shared brought them to life. \n\nWe also stopped at a small local bakery that I would have walked right past. The apple pie there was the best I've ever had! Highly recommend this tour for anyone wanting to see the real Amsterdam."
      },
      {
        id: 2,
        author: "Michael Chen",
        avatar: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=man%20avatar%20glasses&image_size=square",
        date: "September 2023",
        rating: 5,
        content: "Would stay again! The experience was authentic and the food stops were delicious. Highly recommended. \n\nThe guide was knowledgeable not just about the food, but about the cultural significance of each dish. We tried herring, stroopwafel, and bitterballen. Everything was fresh and tasty. It was a great way to spend an afternoon."
      },
      {
        id: 3,
        author: "Emma Wilson",
        avatar: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=woman%20avatar%20blonde&image_size=square",
        date: "August 2023",
        rating: 4,
        content: "Very informative. A bit of noise at night in the busy areas, but that's Amsterdam! Host was wonderful. \n\nShe gave us great tips for the rest of our trip, including restaurant recommendations and how to use the public transport system efficiently. The group size was small, which made it feel very personal."
      }
    ],
    similarListings: [
      { title: "7 Biggest Red Light District Myths", image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=amsterdam%20red%20light%20street&image_size=landscape_4_3", price: 30, rating: 4.8, location: "Amsterdam" },
      { title: "7 Ways to Live Like a Local in Amsterdam", image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=amsterdam%20bike%20local&image_size=landscape_4_3", price: 25, rating: 4.9, location: "Amsterdam" },
      { title: "Museums and Gems: How to Avoid Crowds", image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=rijksmuseum%20interior&image_size=landscape_4_3", price: 40, rating: 4.7, location: "Amsterdam" }
    ]
  },
  'bangkok-food': {
    id: 'bangkok-food',
    title: 'A Taste Of Bangkok: Street Food Tour',
    subtitle: 'Food Tours',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviewsCount: 312,
    price: 45,
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Bangkok%20street%20food%20night%20market&image_size=landscape_16_9',
    images: [
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Bangkok%20street%20food%20night%20market&image_size=landscape_16_9',
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=pad%20thai%20cooking&image_size=landscape_16_9'
    ],
    author: {
      name: 'Somsak',
      role: 'Local Food Expert',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=thai%20man%20guide%20smiling&image_size=square',
      email: 'somsak@guides-nepal.com',
      responseRate: 98,
      responseTime: 'within a few hours',
      languages: ['English', 'Thai'],
      joined: 'Jan 2019'
    },
    intro: "Bangkok is the street food capital of the world. Join me for a culinary adventure.",
    description: "Explore the vibrant street food scene of Bangkok. We visit hidden stalls and famous vendors.",
    tourStructure: {
      title: 'Food Journey',
      steps: [
        { name: 'Chinatown', label: 'Appetizers' },
        { name: 'Flower Market', label: 'Snacks' },
        { name: 'Old City', label: 'Main Course' }
      ]
    },
    highlights: {
      title: 'What we will taste',
      description: 'Prepare your taste buds for an explosion of flavors.',
      items: [
        "Michelin-recommended Guay Jub",
        "Authentic Pad Thai",
        "Spicy Tom Yum Goong",
        "Mango Sticky Rice",
        "Local ordering tips"
      ]
    },
    amenities: ["Food Included", "Drinks", "Transport", "Guide"],
    houseRules: ["Notify of allergies", "Wear comfortable shoes"],
    reviews: [],
    similarListings: []
  },
  'bangkok-highlights': {
    id: 'bangkok-highlights',
    title: 'Highlights & Hidden Gems Of Bangkok',
    subtitle: 'City Highlight Tours',
    location: 'Bangkok, Thailand',
    rating: 4.8,
    reviewsCount: 540,
    price: 55,
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Bangkok%20Grand%20Palace&image_size=landscape_16_9',
    images: [
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Bangkok%20Grand%20Palace&image_size=landscape_16_9',
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Wat%20Arun%20sunset&image_size=landscape_16_9'
    ],
    author: {
      name: 'Noy',
      role: 'Certified City Guide',
      image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=thai%20woman%20guide%20traditional%20dress&image_size=square',
      email: 'noy@guides-nepal.com',
      responseRate: 100,
      responseTime: 'within an hour',
      languages: ['English', 'Thai'],
      joined: 'Mar 2020'
    },
    guides: [
      {
        id: 'noy',
        name: 'Noy',
        role: 'History Expert',
        image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=thai%20woman%20guide%20traditional%20dress&image_size=square',
        bio: 'Specializing in Royal history and Buddhist philosophy.',
        languages: ['English', 'Thai'],
        rating: 4.85,
        reviews: 320
      },
      {
        id: 'chai',
        name: 'Chai',
        role: 'Local Insider',
        image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=thai%20man%20casual%20shirt&image_size=square',
        bio: 'I show you the Bangkok that guidebooks miss - the canals and local communities.',
        languages: ['English', 'Thai'],
        rating: 4.8,
        reviews: 220
      }
    ],
    intro: "Experience the contrast of old and new Bangkok.",
    description: "Marvel at glittering temples and explore quiet canals.",
    tourStructure: {
      title: 'City Route',
      steps: [
        { name: 'Grand Palace', label: 'History' },
        { name: 'Wat Pho', label: 'Culture' },
        { name: 'Canals', label: 'Local Life' }
      ]
    },
    highlights: {
      title: 'Tour Highlights',
      description: 'Beyond the main sights, I will show you the hidden corners.',
      items: [
        "Reclining Buddha",
        "Longtail boat ride",
        "Wat Arun",
        "Amulet market",
        "River lunch"
      ]
    },
    amenities: ["Tickets Included", "Boat Ride", "Lunch", "Guide"],
    houseRules: ["Dress modestly for temples", "No flash photography inside"],
    reviews: [],
    similarListings: []
  }
};
