import React from "react";
import { Course } from "../types/courses";

interface Props {
  courses: Course[];
  onSelect: (course: Course) => void;
}

const CourseSelector: React.FC<Props> = ({ courses, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(courses[+e.target.value])}>
      {courses.map((c, idx) => (
        <option key={c.id} value={idx}>
          {c.course_name}
        </option>
      ))}
    </select>
  );
};

export default CourseSelector;
