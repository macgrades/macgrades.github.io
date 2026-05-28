import { useState, createContext } from "react";

export const CourseListContext = createContext();

export const CourseListProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  return (
    <CourseListContext.Provider value={[courses, setCourses]}>
      {children}
    </CourseListContext.Provider>
  );
};

