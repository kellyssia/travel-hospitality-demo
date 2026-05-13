// Kerzner — Travel & Hospitality brand config
window.BRAND_CONFIG = {
  demoKey: "KERZNER",
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
    destination: {
      title: "Where would you like to escape to?",
      prompt: "Choose your destination"
    },
    budget: {
      title: "What's your nightly budget?",
      prompt: "Slide to set the rate",
      perNight: "per night"
    }
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
    min: 500,
    max: 50000,
    step: 100,
    initial: 3000,
    currency: "$",
    tiers: [
      { max: 1500,     name: "Suite" },
      { max: 3500,     name: "Signature Suite" },
      { max: 8000,     name: "Regal Suite" },
      { max: 25000,    name: "Royal Suite" },
      { max: Infinity, name: "Royal Mansion" }
    ]
  }
};
