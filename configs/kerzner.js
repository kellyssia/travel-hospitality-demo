// Kerzner — Travel & Hospitality brand config
window.BRAND_CONFIG = {
  demoKey: "KERZNER",
  relayUrl: "wss://travel-hospitality-relay.onrender.com/ws",
  brand: {
    name: "Kerzner",
    tagline: "One Guest. Every Sanctuary.",
    headline: "Beyond Loyalty. Recognition."
  },
  theme: {
    bg: "#0E1B2C",
    surface: "#16263B",
    accent: "#C9A961",
    text: "#F0E9DD",
    textMuted: "#9AA4B0"
  },
  stepLabels: {
    destination: { title: "Where would you like to escape to?", prompt: "Choose your destination" },
    budget:      { title: "What's your nightly budget?",        prompt: "Slide to set the rate", perNight: "per night" },
    guests:      { title: "How many guests?",                    prompt: "Staying with you" },
    occasion:    { title: "What's the occasion?",                prompt: "Pick the moment we're creating" },
    register:    { title: "Your details",                         prompt: "We'll tailor everything to you", submit: "Complete" }
  },
  destinations: [
    { value: "Atlantis The Royal",      sublabel: "Dubai, UAE",   image: "./versions/kerzner/locations/atlantis-the-royal.jpg" },
    { value: "Atlantis The Palm",       sublabel: "Dubai, UAE",   image: "./versions/kerzner/locations/atlantis-the-palm.jpg" },
    { value: "One&Only Royal Mirage",   sublabel: "Dubai, UAE",   image: "./versions/kerzner/locations/one-and-only-royal-mirage.jpg" },
    { value: "One&Only Reethi Rah",     sublabel: "Maldives",     image: "./versions/kerzner/locations/one-and-only-reethi-rah.jpg" },
    { value: "Atlantis Paradise Island",sublabel: "Bahamas",      image: "./versions/kerzner/locations/atlantis-paradise-island.jpg" },
    { value: "SIRO One Za'abeel",       sublabel: "Dubai, UAE",   image: "./versions/kerzner/locations/siro-one-zaabeel.jpg" },
    { value: "Bab Al Shams",            sublabel: "Dubai, UAE",   image: "./versions/kerzner/locations/bab-al-shams.jpg" },
    { value: "One&Only Cape Town",      sublabel: "South Africa", image: "./versions/kerzner/locations/one-and-only-cape-town.jpg" },
    { value: "Mazagan Beach & Golf",    sublabel: "Morocco",      image: "./versions/kerzner/locations/mazagan-beach-golf.jpg" }
  ],
  budget: {
    min: 500, max: 50000, step: 100, initial: 3000, currency: "$",
    tiers: [
      { max: 1500,     name: "Suite" },
      { max: 3500,     name: "Signature Suite" },
      { max: 8000,     name: "Regal Suite" },
      { max: 25000,    name: "Royal Suite" },
      { max: Infinity, name: "Royal Mansion" }
    ]
  },
  guestOptions: [
    { value: 1,    label: "1",  description: "guest" },
    { value: 2,    label: "2",  description: "guests" },
    { value: 3,    label: "3",  description: "guests" },
    { value: 4,    label: "4",  description: "guests" },
    { value: "5+", label: "5+", description: "guests" }
  ],
  occasions: [
    { value: "Anniversary",      sublabel: "A celebration", image: "./versions/kerzner/types/anniversary.jpg" },
    { value: "Honeymoon",        sublabel: "Just married",  image: "./versions/kerzner/types/honeymoon.jpg" },
    { value: "Family holiday",   sublabel: "All together",  image: "./versions/kerzner/types/family-holiday.jpg" },
    { value: "Wellness retreat", sublabel: "Body and mind", image: "./versions/kerzner/types/wellness-retreat.jpg" },
    { value: "Business trip",    sublabel: "Work, refined", image: "./versions/kerzner/types/business-trip.jpg" }
  ]
};
