const mockReports = [
  {
    id: 25,
    location: "Downtown Calgary",
    date: "2026-03-10",
    status: "Open",
    severity: "High",
    latitude: 51.0447,
    longitude: -114.0719,
    description: "Large pothole near the intersection causing rough driving conditions.",
    image: "No image uploaded"
  },
  {
    id: 24,
    location: "14 Ave NW",
    date: "2026-03-09",
    status: "Resolved",
    severity: "Low",
    latitude: 51.0645,
    longitude: -114.0892,
    description: "Pothole reported near the bus stop.",
    image: "No image uploaded"
  },
  {
    id: 23,
    location: "Memorial Drive",
    date: "2026-03-08",
    status: "Open",
    severity: "Medium",
    latitude: 51.0534,
    longitude: -114.0195,
    description: "Road damage in the right lane.",
    image: "No image uploaded"
  },
  {
    id: 22,
    location: "Crowchild Trail",
    date: "2026-03-07",
    status: "In Progress",
    severity: "High",
    latitude: 51.0702,
    longitude: -114.1215,
    description: "Multiple potholes reported along the lane.",
    image: "No image uploaded"
  },
  {
    id: 21,
    location: "17 Ave SW",
    date: "2026-03-06",
    status: "Open",
    severity: "Medium",
    latitude: 51.0371,
    longitude: -114.0875,
    description: "Pothole in middle lane causing drivers to swerve.",
    image: "No image uploaded"
  },
  {
    id: 20,
    location: "Centre Street N",
    date: "2026-03-05",
    status: "Resolved",
    severity: "Low",
    latitude: 51.0664,
    longitude: -114.0622,
    description: "Road surface cracked and forming pothole.",
    image: "No image uploaded"
  },
  {
    id: 19,
    location: "MacLeod Trail",
    date: "2026-03-04",
    status: "In Progress",
    severity: "High",
    latitude: 51.0189,
    longitude: -114.0712,
    description: "Pothole near traffic light intersection.",
    image: "No image uploaded"
  },
  {
    id: 18,
    location: "Sarcee Trail NW",
    date: "2026-03-03",
    status: "Open",
    severity: "Medium",
    latitude: 51.0895,
    longitude: -114.1680,
    description: "Deep pothole reported in right lane.",
    image: "No image uploaded"
  },
  {
    id: 17,
    location: "Elbow Drive",
    date: "2026-03-02",
    status: "Resolved",
    severity: "Low",
    latitude: 51.0248,
    longitude: -114.0837,
    description: "Surface erosion causing pothole formation.",
    image: "No image uploaded"
  },
  {
    id: 16,
    location: "Glenmore Trail",
    date: "2026-03-01",
    status: "Open",
    severity: "High",
    latitude: 50.9974,
    longitude: -114.0623,
    description: "Pothole near merge lane.",
    image: "No image uploaded"
  },
  {
    id: 15,
    location: "Shaganappi Trail NW",
    date: "2026-02-28",
    status: "In Progress",
    severity: "Medium",
    latitude: 51.1053,
    longitude: -114.1547,
    description: "Reported pothole causing traffic slowdown.",
    image: "No image uploaded"
  },
  {
    id: 14,
    location: "Bowness Road NW",
    date: "2026-02-27",
    status: "Resolved",
    severity: "Low",
    latitude: 51.0559,
    longitude: -114.1286,
    description: "Small pothole expanding after winter freeze.",
    image: "No image uploaded"
  },
  {
    id: 13,
    location: "Blackfoot Trail",
    date: "2026-02-26",
    status: "Open",
    severity: "High",
    latitude: 51.0181,
    longitude: -114.0432,
    description: "Large pothole reported near exit ramp.",
    image: "No image uploaded"
  },
  {
    id: 12,
    location: "Country Hills Blvd NW",
    date: "2026-02-25",
    status: "Open",
    severity: "Medium",
    latitude: 51.1413,
    longitude: -114.1195,
    description: "Pothole forming near median lane.",
    image: "No image uploaded"
  },
  {
    id: 11,
    location: "Deerfoot Trail",
    date: "2026-02-24",
    status: "In Progress",
    severity: "High",
    latitude: 51.0322,
    longitude: -114.0250,
    description: "Multiple potholes forming along highway shoulder.",
    image: "No image uploaded"
  },
  {
    id: 10,
    location: "4 Street SW",
    date: "2026-02-23",
    status: "Open",
    severity: "Medium",
    latitude: 51.0402,
    longitude: -114.0705,
    description: "Deep pothole reported near crosswalk.",
    image: "No image uploaded"
  },
  {
    id: 9,
    location: "Kensington Road",
    date: "2026-02-22",
    status: "Resolved",
    severity: "Low",
    latitude: 51.0524,
    longitude: -114.0930,
    description: "Reported pothole repaired earlier this week.",
    image: "No image uploaded"
  },
  {
    id: 8,
    location: "Edmonton Trail",
    date: "2026-02-21",
    status: "Open",
    severity: "Medium",
    latitude: 51.0602,
    longitude: -114.0547,
    description: "Pothole near intersection affecting traffic.",
    image: "No image uploaded"
  },
  {
    id: 7,
    location: "Northmount Drive NW",
    date: "2026-02-20",
    status: "In Progress",
    severity: "High",
    latitude: 51.0873,
    longitude: -114.0942,
    description: "Repair crew scheduled for inspection.",
    image: "No image uploaded"
  },
  {
    id: 6,
    location: "16 Ave NW",
    date: "2026-02-19",
    status: "Resolved",
    severity: "Low",
    latitude: 51.0675,
    longitude: -114.1110,
    description: "Reported pothole fixed after inspection.",
    image: "No image uploaded"
  },
  {
    id: 5,
    location: "Seton Boulevard SE",
    date: "2026-02-18",
    status: "Open",
    severity: "Low",
    latitude: 50.8821,
    longitude: -113.9578,
    description: "Pothole forming along residential street.",
    image: "No image uploaded"
  },
  {
    id: 4,
    location: "Stoney Trail NE",
    date: "2026-02-17",
    status: "Open",
    severity: "High",
    latitude: 51.1276,
    longitude: -113.9642,
    description: "Highway pothole reported by multiple drivers.",
    image: "No image uploaded"
  },
  {
    id: 3,
    location: "Signal Hill Drive SW",
    date: "2026-02-16",
    status: "Resolved",
    severity: "Medium",
    latitude: 51.0163,
    longitude: -114.1678,
    description: "Road damage repaired by maintenance crew.",
    image: "No image uploaded"
  },
  {
    id: 2,
    location: "52 Street SE",
    date: "2026-02-15",
    status: "In Progress",
    severity: "Medium",
    latitude: 50.9975,
    longitude: -113.9571,
    description: "Inspection scheduled for pothole repair.",
    image: "No image uploaded"
  },
  {
    id: 1,
    location: "Brentwood Road NW",
    date: "2026-02-14",
    status: "Open",
    severity: "Low",
    latitude: 51.0867,
    longitude: -114.1294,
    description: "New pothole reported near university entrance.",
    image: "No image uploaded"
  }
];

export default mockReports;