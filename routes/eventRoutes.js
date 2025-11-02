import express from "express";
// import Event from "../models/Event.js"; // REMOVED
// import User from "../models/User.js"; // REMOVED

const router = express.Router();

// Mock data list (This is now the single source of truth for all events)
const MOCK_EVENTS = [
  {
    _id: "mock1",
    title: "Winter Beach Cleanup",
    description: "Join us for a comprehensive beach cleanup to remove plastic waste, debris, and other pollutants from our beautiful coastline. This event is part of our ongoing effort to protect marine life and maintain clean beaches for everyone to enjoy.",
    quickDescription: "Help clean up our beautiful coastline and protect marine life from plastic pollution.",
    date: new Date("2024-01-15"),
    time: "9:00 AM - 12:00 PM",
    day: "Saturday",
    location: "Jones Beach, 1 Ocean Pkwy, Wantagh, NY 11793",
    category: "Environmental",
    organizer: "Ocean Conservation Society",
    organizationInfo: {
      name: "Ocean Conservation Society",
      description: "A non-profit organization dedicated to protecting marine ecosystems and promoting sustainable ocean practices.",
      website: "https://oceanconservation.org",
      contactEmail: "info@oceanconservation.org"
    },
    // FIX: city_cleanup changed to city-cleanup
    image: "/images/city-cleanup.webp", 
    maxVolunteers: 30,
    preparationInstructions: "Please arrive 15 minutes early for check-in and safety briefing. The cleanup will involve walking on sand and potentially wet areas, so wear appropriate footwear.",
    requirements: ["Must be 16 years or older", "Ability to walk on sand for 2-3 hours", "Comfortable with physical activity"],
    whatToBring: ["Water bottle", "Sunscreen and hat", "Comfortable walking shoes", "Layers for changing weather"],
    volunteerFeedback: [
      {
        volunteerName: "Sarah Johnson",
        rating: 5,
        comment: "Amazing experience! The organizers were so well-prepared and the impact was immediately visible.",
        date: new Date("2023-12-10")
      }
    ],
    volunteers: [
      { name: "John Smith", email: "john@email.com" },
      { name: "Maria Garcia", email: "maria@email.com" },
      { name: "Robert Johnson", email: "robert@email.com" }
    ]
  },
  {
    _id: "mock2",
    title: "Spring Food Drive",
    description: "Help us collect and organize food donations for local families in need. This event involves sorting donated items, checking expiration dates, and organizing the food bank.",
    quickDescription: "Sort and organize food donations to help feed families in our community.",
    date: new Date("2024-02-20"),
    time: "10:00 AM - 2:00 PM",
    day: "Tuesday",
    location: "Community Food Bank, 123 Main St, Downtown",
    category: "Community Service",
    organizer: "Community Food Bank",
    organizationInfo: {
      name: "Community Food Bank",
      description: "Serving our community for 25 years, we provide food assistance to over 5,000 families monthly.",
      website: "https://communityfoodbank.org",
      contactEmail: "volunteer@communityfoodbank.org"
    },
    // FIX: food bank changed to food-bank
    image: "/images/food-bank.webp",
    maxVolunteers: 25,
    preparationInstructions: "Please wear comfortable clothes and closed-toe shoes. We'll be working in a warehouse environment with some lifting involved.",
    requirements: ["Must be 14 years or older", "Ability to lift up to 25 pounds", "Comfortable standing for extended periods"],
    whatToBring: ["Comfortable work clothes", "Closed-toe shoes", "Water bottle", "Positive attitude!"],
    volunteers: [
      { name: "Sarah Wilson", email: "sarah@email.com" },
      { name: "Michael Brown", email: "michael@email.com" }
    ]
  },
  {
    _id: "mock3",
    title: "Community Garden Planting Day",
    description: "Join us for a hands-on day of planting and maintaining our community garden. Help grow fresh vegetables for local families while learning sustainable gardening practices.",
    quickDescription: "Plant vegetables and help maintain our community garden for local families.",
    date: new Date("2024-03-10"),
    time: "8:00 AM - 12:00 PM",
    day: "Saturday",
    location: "Riverside Community Garden, 456 Garden Ave, Downtown",
    category: "Environmental",
    organizer: "Green Thumbs Community",
    organizationInfo: {
      name: "Green Thumbs Community",
      description: "A local organization promoting urban agriculture and food security through community gardens.",
      website: "https://greenthumbs.org",
      contactEmail: "info@greenthumbs.org"
    },
    // FIX: garden planting changed to garden-planting
    image: "/images/garden-planting.webp", 
    maxVolunteers: 40,
    preparationInstructions: "Come prepared to get your hands dirty! We'll provide all tools and materials. Dress in comfortable work clothes that can get soil on them.",
    requirements: ["Must be 8 years or older (minors need adult supervision)", "Ability to bend and kneel for planting", "Interest in gardening and community service"],
    whatToBring: ["Work gloves (we have some if needed)", "Water bottle", "Sun hat", "Sturdy shoes or boots", "Positive energy!"],
    volunteers: [
      { name: "Lisa Chen", email: "lisa@email.com" },
      { name: "Tom Anderson", email: "tom@email.com" }
    ]
  },
  {
    _id: "mock4",
    title: "Homeless Shelter Meal Service",
    description: "Help serve warm meals to individuals experiencing homelessness. Work alongside our team to prepare, serve, and clean up after dinner service. This is a wonderful opportunity to directly support those in need in our community.",
    quickDescription: "Serve meals and provide support to individuals experiencing homelessness.",
    date: new Date("2024-02-14"),
    time: "5:00 PM - 8:00 PM",
    day: "Wednesday",
    location: "Hope Shelter, 789 Shelter St, Midtown",
    category: "Community Service",
    organizer: "Hope for All Foundation",
    organizationInfo: {
      name: "Hope for All Foundation",
      description: "Providing shelter, meals, and support services to individuals and families experiencing homelessness since 1985.",
      website: "https://hopeforall.org",
      contactEmail: "volunteer@hopeforall.org"
    },
    // PATH IS ALREADY CORRECT
    image: "/images/food-services.webp", 
    maxVolunteers: 15,
    preparationInstructions: "Arrive 30 minutes early for orientation. We'll provide all necessary training on food safety and guest interaction protocols.",
    requirements: ["Must be 18 years or older", "Food safety training provided on-site", "Compassionate and respectful attitude"],
    whatToBring: ["Hair tie (if you have long hair)", "Comfortable non-slip shoes", "Clean apron (we can provide)", "Smiling face and positive attitude"],
    volunteers: [
      { name: "Anna White", email: "anna@email.com" },
      { name: "Chris Taylor", email: "chris@email.com" }
    ]
  },
  {
    _id: "mock5",
    title: "Senior Center Tech Tutoring",
    description: "Share your tech knowledge with seniors who want to learn about smartphones, tablets, and computers. Help them stay connected with family and friends through technology.",
    quickDescription: "Teach seniors basic technology skills to stay connected with loved ones.",
    date: new Date("2024-02-28"),
    time: "10:00 AM - 12:00 PM",
    day: "Wednesday",
    location: "Sunset Senior Center, 321 Elder Ave, Neighborhood",
    category: "Education",
    organizer: "Tech Bridges Initiative",
    organizationInfo: {
      name: "Tech Bridges Initiative",
      description: "Bridging the digital divide by teaching technology skills to underserved communities, with special focus on seniors.",
      website: "https://techbridges.org",
      contactEmail: "info@techbridges.org"
    },
    // FIX: senior tech changed to senior-tech
    image: "/images/senior-tech.webp", 
    maxVolunteers: 20,
    preparationInstructions: "We'll provide training materials. Come with patience and enthusiasm! Many seniors are learning these skills for the first time.",
    requirements: ["Comfortable with smartphones and tablets", "Patient teaching style", "Interest in helping seniors", "Must pass background check"],
    whatToBring: ["Your own device (phone/tablet) to demonstrate", "Notebook for taking notes", "Name tag (we provide)", "Smile and positive attitude"],
    volunteers: [
      { name: "Sophie Martin", email: "sophie@email.com" },
      { name: "Daniel Lee", email: "daniel@email.com" }
    ]
  },
  {
    _id: "mock6",
    title: "Animal Shelter Adoption Fair",
    description: "Help promote pet adoptions at our community fair. Assist with animal handling, event setup, talking to potential adopters, and providing information about our shelter animals.",
    quickDescription: "Help care for and promote adoptable pets at our community adoption fair.",
    date: new Date("2024-03-16"),
    time: "11:00 AM - 4:00 PM",
    day: "Saturday",
    location: "Central Park Pavilion, 100 Park Ave, Downtown",
    category: "Animal Welfare",
    organizer: "Paws & Hearts Rescue",
    organizationInfo: {
      name: "Paws & Hearts Rescue",
      description: "A no-kill shelter dedicated to finding loving homes for abandoned and rescued animals.",
      website: "https://pawsandhearts.org",
      contactEmail: "adopt@pawsandhearts.org"
    },
    // FIX: animal shelter changed to animal-shelter
    image: "/images/animal-shelter.webp", 
    maxVolunteers: 25,
    preparationInstructions: "Wear comfortable clothes suitable for outdoor activities with animals. We'll provide orientation on safe animal handling.",
    requirements: ["Must be 16 years or older", "Comfortable around dogs and cats", "Ability to stand for extended periods", "Love for animals!"],
    whatToBring: ["Comfortable walking shoes", "Weather-appropriate clothing", "Water bottle", "Positive attitude"],
    volunteers: [
      { name: "Emma Wilson", email: "emma@email.com" },
      { name: "Noah Johnson", email: "noah@email.com" }
    ]
  }
];

// Always return the mock list for GET /api/events
router.get("/", (req, res) => {
  res.json(MOCK_EVENTS);
});

// Mock handler for GET /api/events/:id
router.get("/:id", (req, res) => {
  const event = MOCK_EVENTS.find(e => e._id === req.params.id);
  if (event) {
    // Return a deep copy to simulate database data structure
    res.json({...event});
  } else {
    res.status(404).json({ error: "Mock event not found" });
  }
});

// Mock handler for POST /api/events (Create event)
router.post("/", (req, res) => {
  // NOTE: Newly created events will not persist or show up in the list
  // because we are using a constant MOCK_EVENTS array.
  const newEvent = {
    _id: "new-mock-" + Date.now(),
    ...req.body,
    volunteers: [],
    volunteerFeedback: [],
  };
  // In a real app, you would push this to the DB. Here, we just return it.
  res.status(201).json(newEvent);
});

// Mock handler for POST /api/events/:id/join
router.post("/:id/join", (req, res) => {
  const eventId = req.params.id;
  const event = MOCK_EVENTS.find(e => e._id === eventId);
  
  if (!event) {
    return res.status(404).json({ error: "Mock event not found" });
  }

  // Simulate joining (this change is NOT persistent)
  // Check if user is already a mock volunteer (simplified check)
  if (!event.volunteers.some(v => v.name === "Mock User")) {
    event.volunteers.push({ name: "Mock User", email: "mock@user.com" });
  }

  res.json({ message: "Joined mock event successfully" });
});

export default router;
