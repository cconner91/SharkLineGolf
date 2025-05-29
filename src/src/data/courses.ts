
import { Course } from "@/types/golf";

export const courses: Course[] = [
  {
    id: "pebble-beach",
    name: "Pebble Beach Golf Links",
    location: {
      address: "1700 17-Mile Drive",
      city: "Pebble Beach",
      state: "CA",
      country: "USA",
      coordinates: {
        latitude: 36.5674,
        longitude: -121.9487
      }
    },
    scorecard: {
      totalHoles: 18,
      totalPar: 72,
      totalYardage: 6828,
      holes: [
        { number: 1, par: 4, yardage: { "Champion": 377, "Regular": 345, "Forward": 325 }, handicap: 11 },
        { number: 2, par: 5, yardage: { "Champion": 502, "Regular": 467, "Forward": 440 }, handicap: 15 },
        { number: 3, par: 4, yardage: { "Champion": 388, "Regular": 353, "Forward": 325 }, handicap: 9 },
        { number: 4, par: 4, yardage: { "Champion": 331, "Regular": 309, "Forward": 285 }, handicap: 13 },
        { number: 5, par: 3, yardage: { "Champion": 188, "Regular": 170, "Forward": 150 }, handicap: 17 },
        { number: 6, par: 5, yardage: { "Champion": 523, "Regular": 490, "Forward": 460 }, handicap: 5 },
        { number: 7, par: 3, yardage: { "Champion": 106, "Regular": 95, "Forward": 85 }, handicap: 18 },
        { number: 8, par: 4, yardage: { "Champion": 418, "Regular": 395, "Forward": 365 }, handicap: 3 },
        { number: 9, par: 4, yardage: { "Champion": 466, "Regular": 435, "Forward": 405 }, handicap: 1 },
        { number: 10, par: 4, yardage: { "Champion": 446, "Regular": 420, "Forward": 390 }, handicap: 6 },
        { number: 11, par: 4, yardage: { "Champion": 380, "Regular": 350, "Forward": 320 }, handicap: 12 },
        { number: 12, par: 3, yardage: { "Champion": 202, "Regular": 185, "Forward": 165 }, handicap: 16 },
        { number: 13, par: 4, yardage: { "Champion": 392, "Regular": 365, "Forward": 335 }, handicap: 8 },
        { number: 14, par: 5, yardage: { "Champion": 580, "Regular": 540, "Forward": 510 }, handicap: 2 },
        { number: 15, par: 4, yardage: { "Champion": 396, "Regular": 370, "Forward": 340 }, handicap: 10 },
        { number: 16, par: 4, yardage: { "Champion": 402, "Regular": 375, "Forward": 345 }, handicap: 14 },
        { number: 17, par: 3, yardage: { "Champion": 178, "Regular": 160, "Forward": 140 }, handicap: 4 },
        { number: 18, par: 5, yardage: { "Champion": 543, "Regular": 510, "Forward": 480 }, handicap: 7 }
      ]
    },
    rating: 75.5,
    slope: 144,
    teeBoxes: [
      { name: "Champion", color: "Black", totalYardage: 6828, rating: 75.5, slope: 144 },
      { name: "Regular", color: "Blue", totalYardage: 6394, rating: 73.2, slope: 140 },
      { name: "Forward", color: "Red", totalYardage: 5944, rating: 70.8, slope: 135 }
    ]
  },
  {
    id: "augusta-national",
    name: "Augusta National Golf Club",
    location: {
      address: "2604 Washington Road",
      city: "Augusta",
      state: "GA",
      country: "USA",
      coordinates: {
        latitude: 33.5030,
        longitude: -82.0197
      }
    },
    scorecard: {
      totalHoles: 18,
      totalPar: 72,
      totalYardage: 7475,
      holes: [
        { number: 1, par: 4, yardage: { "Championship": 445, "Member": 420, "Forward": 395 }, handicap: 10 },
        { number: 2, par: 5, yardage: { "Championship": 575, "Member": 540, "Forward": 505 }, handicap: 16 },
        { number: 3, par: 4, yardage: { "Championship": 350, "Member": 330, "Forward": 310 }, handicap: 18 },
        { number: 4, par: 3, yardage: { "Championship": 240, "Member": 220, "Forward": 200 }, handicap: 12 },
        { number: 5, par: 4, yardage: { "Championship": 495, "Member": 470, "Forward": 445 }, handicap: 6 },
        { number: 6, par: 3, yardage: { "Championship": 180, "Member": 165, "Forward": 150 }, handicap: 14 },
        { number: 7, par: 4, yardage: { "Championship": 450, "Member": 425, "Forward": 400 }, handicap: 2 },
        { number: 8, par: 5, yardage: { "Championship": 570, "Member": 535, "Forward": 500 }, handicap: 8 },
        { number: 9, par: 4, yardage: { "Championship": 460, "Member": 435, "Forward": 410 }, handicap: 4 },
        { number: 10, par: 4, yardage: { "Championship": 495, "Member": 470, "Forward": 445 }, handicap: 1 },
        { number: 11, par: 4, yardage: { "Championship": 520, "Member": 495, "Forward": 470 }, handicap: 3 },
        { number: 12, par: 3, yardage: { "Championship": 155, "Member": 140, "Forward": 125 }, handicap: 15 },
        { number: 13, par: 5, yardage: { "Championship": 510, "Member": 485, "Forward": 460 }, handicap: 9 },
        { number: 14, par: 4, yardage: { "Championship": 440, "Member": 415, "Forward": 390 }, handicap: 11 },
        { number: 15, par: 5, yardage: { "Championship": 550, "Member": 525, "Forward": 500 }, handicap: 5 },
        { number: 16, par: 3, yardage: { "Championship": 170, "Member": 155, "Forward": 140 }, handicap: 13 },
        { number: 17, par: 4, yardage: { "Championship": 440, "Member": 415, "Forward": 390 }, handicap: 7 },
        { number: 18, par: 4, yardage: { "Championship": 465, "Member": 440, "Forward": 415 }, handicap: 17 }
      ]
    },
    rating: 76.2,
    slope: 148,
    teeBoxes: [
      { name: "Championship", color: "Green", totalYardage: 7475, rating: 76.2, slope: 148 },
      { name: "Member", color: "White", totalYardage: 7035, rating: 74.1, slope: 145 },
      { name: "Forward", color: "Gold", totalYardage: 6585, rating: 71.8, slope: 140 }
    ]
  },
  {
    id: "torrey-pines-south",
    name: "Torrey Pines Golf Course (South)",
    location: {
      address: "11480 N Torrey Pines Road",
      city: "La Jolla",
      state: "CA",
      country: "USA",
      coordinates: {
        latitude: 32.8928,
        longitude: -117.2504
      }
    },
    scorecard: {
      totalHoles: 18,
      totalPar: 72,
      totalYardage: 7698,
      holes: [
        { number: 1, par: 4, yardage: { "Championship": 452, "Regular": 425, "Forward": 385 }, handicap: 7 },
        { number: 2, par: 4, yardage: { "Championship": 389, "Regular": 365, "Forward": 330 }, handicap: 15 },
        { number: 3, par: 3, yardage: { "Championship": 198, "Regular": 180, "Forward": 155 }, handicap: 13 },
        { number: 4, par: 5, yardage: { "Championship": 610, "Regular": 575, "Forward": 520 }, handicap: 3 },
        { number: 5, par: 4, yardage: { "Championship": 453, "Regular": 425, "Forward": 385 }, handicap: 5 },
        { number: 6, par: 5, yardage: { "Championship": 616, "Regular": 580, "Forward": 525 }, handicap: 1 },
        { number: 7, par: 4, yardage: { "Championship": 454, "Regular": 425, "Forward": 385 }, handicap: 9 },
        { number: 8, par: 3, yardage: { "Championship": 177, "Regular": 160, "Forward": 135 }, handicap: 17 },
        { number: 9, par: 4, yardage: { "Championship": 472, "Regular": 445, "Forward": 405 }, handicap: 11 },
        { number: 10, par: 4, yardage: { "Championship": 436, "Regular": 410, "Forward": 370 }, handicap: 14 },
        { number: 11, par: 3, yardage: { "Championship": 221, "Regular": 200, "Forward": 175 }, handicap: 12 },
        { number: 12, par: 5, yardage: { "Championship": 504, "Regular": 475, "Forward": 435 }, handicap: 8 },
        { number: 13, par: 4, yardage: { "Championship": 478, "Regular": 450, "Forward": 410 }, handicap: 2 },
        { number: 14, par: 4, yardage: { "Championship": 443, "Regular": 415, "Forward": 375 }, handicap: 10 },
        { number: 15, par: 4, yardage: { "Championship": 470, "Regular": 440, "Forward": 400 }, handicap: 4 },
        { number: 16, par: 3, yardage: { "Championship": 227, "Regular": 205, "Forward": 180 }, handicap: 16 },
        { number: 17, par: 4, yardage: { "Championship": 444, "Regular": 415, "Forward": 375 }, handicap: 6 },
        { number: 18, par: 5, yardage: { "Championship": 570, "Regular": 535, "Forward": 485 }, handicap: 18 }
      ]
    },
    rating: 77.4,
    slope: 151,
    teeBoxes: [
      { name: "Championship", color: "Black", totalYardage: 7698, rating: 77.4, slope: 151 },
      { name: "Regular", color: "Blue", totalYardage: 7230, rating: 75.2, slope: 147 },
      { name: "Forward", color: "White", totalYardage: 6555, rating: 72.1, slope: 142 }
    ]
  }
];
