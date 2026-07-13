import { allGuides } from './guidesData';
import { RichExperienceData } from './types';

// For backward compatibility within this file
export const commonGuides = allGuides;

export const bhaktapurRichData: RichExperienceData[] = [
  {
    id: 1,
    slug: 'bhaktapur-heritage-walk',
    title: "Bhaktapur Heritage Walk",
    heroImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=bhaktapur%20durbar%20square%20golden%20gate&image_size=landscape_16_9",
    host: {
      name: "Krishna",
      image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=nepali%20man%20guide%20dhaka%20topi&image_size=square",
      type: "Heritage Expert"
    },
    guides: [
        { ...commonGuides[0], name: "Krishna", role: "Heritage Expert" },
        commonGuides[1],
        commonGuides[2]
    ],
    description: "Step back in time in the 'City of Devotees'. Walk through medieval streets, admire the 55-Window Palace, and discover the Golden Gate.",
    tourStructure: {
      steps: [
        { name: "Durbar Sq.", label: "Royal Palace" },
        { name: "Taumadhi", label: "Nyatapola Temple" },
        { name: "Dattatreya", label: "Oldest Square" }
      ]
    },
    exploration: {
      title: "How we explore the city",
      description: "A leisurely walk through the brick-paved streets of this open-air museum.",
      points: [
        "Marveling at the 55-Window Palace",
        "Entering the Golden Gate",
        "Climbing the steps of Nyatapola Temple",
        "Watching woodcarvers at work"
      ]
    },
    atmosphere: "Timeless and awe-inspiring. The history here is palpable.",
    hiddenGems: "A hidden courtyard where they dry pottery in the sun.",
    city: "Bhaktapur",
    price: 35,
    duration: "3 hours",
    type: "City Highlight",
    rating: 4.9,
    reviews: 245
  },
  {
    id: 2,
    slug: 'pottery-making-class',
    title: "Pottery Making Class",
    heroImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=bhaktapur%20pottery%20square%20making&image_size=landscape_16_9",
    host: {
      name: "Radha",
      image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=nepali%20woman%20guide%20smiling&image_size=square",
      type: "Artisan Guide"
    },
    guides: [
        { ...commonGuides[1], name: "Radha", role: "Artisan Guide" },
        commonGuides[2],
        commonGuides[3]
    ],
    description: "Get your hands dirty! Learn the ancient art of pottery in Bhaktapur's famous Pottery Square from a master craftsman.",
    tourStructure: {
      steps: [
        { name: "Square", label: "Observation" },
        { name: "Wheel", label: "Throwing Clay" },
        { name: "Drying", label: "Finishing" }
      ]
    },
    exploration: {
      title: "How we explore the craft",
      description: "A hands-on workshop right in the heart of Pottery Square.",
      points: [
        "Touring the Pottery Square",
        "Learning to spin the traditional wheel",
        "Shaping your own clay pot",
        "Understanding the firing process"
      ]
    },
    atmosphere: "Creative and fun. Don't be afraid to make a mess!",
    hiddenGems: "The family stories of potters who have been here for generations.",
    city: "Bhaktapur",
    price: 30,
    duration: "2 hours",
    type: "Workshop",
    rating: 4.8,
    reviews: 134
  },
  {
    id: 3,
    slug: 'taste-juju-dhau',
    title: "Taste Juju Dhau (King Curd)",
    heroImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=juju%20dhau%20bhaktapur%20yogurt&image_size=landscape_16_9",
    host: {
      name: "Prakash",
      image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=nepali%20guide%20man%20beard&image_size=square",
      type: "Foodie Guide"
    },
    guides: [
        { ...commonGuides[2], name: "Prakash", role: "Foodie Guide" },
        commonGuides[0],
        commonGuides[1]
    ],
    description: "You can't leave Bhaktapur without trying the King of Yogurt. Discover the secrets behind this creamy, delicious dessert.",
    tourStructure: {
      steps: [
        { name: "Shop", label: "Tasting" },
        { name: "Kitchen", label: "Making Process" },
        { name: "Cafe", label: "Relax" }
      ]
    },
    exploration: {
      title: "How we explore the flavor",
      description: "A short and sweet tour focused on Bhaktapur's culinary pride.",
      points: [
        "Visiting the most famous curd shop",
        "Tasting fresh Juju Dhau in clay pots",
        "Learning why it's called 'King Curd'",
        "Pairing it with local snacks"
      ]
    },
    atmosphere: "Delicious and refreshing.",
    hiddenGems: "A small shop that still uses the ancient recipe.",
    city: "Bhaktapur",
    price: 15,
    duration: "1 hour",
    type: "Food Tour",
    rating: 5.0,
    reviews: 320
  },
  {
    id: 4,
    slug: 'changu-narayan-hike',
    title: "Changu Narayan Temple Hike",
    heroImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=changu%20narayan%20temple%20nepal&image_size=landscape_16_9",
    host: {
      name: "Laxmi",
      image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=nepali%20woman%20guide%20glasses&image_size=square",
      type: "Nature Guide"
    },
    guides: [
        { ...commonGuides[3], name: "Laxmi", role: "Nature Guide" },
        commonGuides[0],
        commonGuides[2]
    ],
    description: "Hike through pine forests and villages to reach the oldest temple in Nepal, Changu Narayan, a UNESCO World Heritage site.",
    tourStructure: {
      steps: [
        { name: "Telkot", label: "Start Hike" },
        { name: "Forest", label: "Nature Walk" },
        { name: "Temple", label: "Changu Narayan" }
      ]
    },
    exploration: {
      title: "How we explore the trail",
      description: "A scenic hike offering views of the valley and the Himalayas.",
      points: [
        "Walking along the ridge from Telkot",
        "Seeing traditional village life",
        "Exploring the ancient stone sculptures",
        "Enjoying a local lunch with a view"
      ]
    },
    atmosphere: "Peaceful and historic. A perfect mix of nature and culture.",
    hiddenGems: "The Changu Narayan Museum, often overlooked by visitors.",
    city: "Bhaktapur",
    price: 40,
    duration: "4 hours",
    type: "Hiking",
    rating: 4.9,
    reviews: 180
  },
  {
    id: 5,
    slug: 'bhaktapur-night-tour',
    title: "Bhaktapur Night Tour",
    heroImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=bhaktapur%20night%20lights&image_size=landscape_16_9",
    host: {
      name: "Krishna",
      image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=nepali%20man%20guide%20dhaka%20topi&image_size=square",
      type: "Night Guide"
    },
    guides: [
        { ...commonGuides[0], name: "Krishna", role: "Night Guide" },
        commonGuides[1],
        commonGuides[3]
    ],
    description: "Experience the magic of Bhaktapur after dark. The temples are beautifully lit, and the streets are quiet and atmospheric.",
    tourStructure: {
      steps: [
        { name: "Sunset", label: "Golden Hour" },
        { name: "Walk", label: "Night Stroll" },
        { name: "Dinner", label: "Local Feast" }
      ]
    },
    exploration: {
      title: "How we explore the night",
      description: "A magical evening walk when the day-trippers have left.",
      points: [
        "Seeing the Nyatapola Temple illuminated",
        "Listening to local evening prayers",
        "Enjoying a quiet dinner in a heritage home",
        "Stargazing from a quiet square"
      ]
    },
    atmosphere: "Romantic and mystical.",
    hiddenGems: "A local group singing traditional devotional songs (Bhajans).",
    city: "Bhaktapur",
    price: 45,
    duration: "3 hours",
    type: "Night Tour",
    rating: 4.8,
    reviews: 95
  },
  {
    id: 6,
    slug: 'thangka-painting-workshop-bhaktapur',
    title: "Thangka Painting Workshop",
    heroImage: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=thangka%20painting%20bhaktapur&image_size=landscape_16_9",
    host: {
      name: "Radha",
      image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=nepali%20woman%20guide%20smiling&image_size=square",
      type: "Art Guide"
    },
    guides: [
        { ...commonGuides[1], name: "Radha", role: "Art Guide" },
        commonGuides[2],
        commonGuides[0]
    ],
    description: "Learn the intricate art of Thangka painting from a master artist. A spiritual and artistic experience.",
    tourStructure: {
      steps: [
        { name: "School", label: "Introduction" },
        { name: "Sketch", label: "Drawing" },
        { name: "Paint", label: "Coloring" }
      ]
    },
    exploration: {
      title: "How we explore the art",
      description: "A meditative session learning Buddhist art.",
      points: [
        "Understanding the history of Thangka",
        "Learning the grid system of drawing",
        "Using natural mineral pigments",
        "Taking home your own artwork"
      ]
    },
    atmosphere: "Calm and focused.",
    hiddenGems: "The artist's personal collection of antique Thangkas.",
    city: "Bhaktapur",
    price: 50,
    duration: "3 hours",
    type: "Workshop",
    rating: 5.0,
    reviews: 70
  }
];
