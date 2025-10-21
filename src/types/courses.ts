export interface Hole {
  par: number;
  yardage: number;
  handicap: number;
}

export interface Tee {
  name: string;
  courseRating: number;
  slopeRating: number;
  bogeyRating: number;
  totalYards: number;
  totalMeters: number;
  numberOfHoles: number;
  parTotal: number;
  frontCourseRating: number;
  frontSlopeRating: number;
  frontBogeyRating: number;
  backCourseRating: number;
  backSlopeRating: number;
  backBogeyRating: number;
  holes: Hole[];
}

export interface Course {
  id: number;
  name: string;
  clubName: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  tees: Tee[];
}
