// src/services/golfCourseAPI.ts
import localCourses from "@/data/courses.json";

const API_KEY = import.Authorization: Key YHIW3PYA7MDSKP7UCTELVKR7MI;
const BASE_URL = "https://api.golfcourseapi.com"; 

interface Course {
  id: string;
  name: string;
  city?: string;
  state?: string;
  country?: string;
  holes?: number;
  par?: number;
  yardage?: number;
  tees?: { name: string; yardage: number }[];
}

function cacheCourse(course: Course) {
  localStorage.setItem(`course-${course.id}`, JSON.stringify(course));
}

function getCachedCourse(id: string): Course | null {
  const cached = localStorage.getItem(`course-${id}`);
  return cached ? JSON.parse(cached) : null;
}

export async function fetchCourseByName(name: string): Promise<Course | null> {
  // Try local cache first
  const cachedCourses = Object.keys(localStorage)
    .filter((k) => k.startsWith("course-"))
    .map((k) => JSON.parse(localStorage.getItem(k)!));
  const existing = cachedCourses.find((c) =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );
  if (existing) return existing;

  // Try local fallback
  const localMatch = (localCourses as Course[]).find((c) =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );
  if (localMatch) return localMatch;

  // Fallback: call external API
  try {
    const res = await fetch(
      `${BASE_URL}/courses?name=${encodeURIComponent(name)}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch course");
    const data = await res.json();

    const course = data?.[0]; // assuming API returns an array
    if (course) cacheCourse(course);
    return course || null;
  } catch (err) {
    console.error("API fetch error:", err);
    return null;
  }
}
