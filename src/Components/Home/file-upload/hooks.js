import { getCourses } from "gpa-calculator/courseParser";
import { parsePDFtoTextLines } from "gpa-calculator/pdf";
import { useState, useCallback, useContext, useRef } from "react";
import { CourseListContext } from "../../../contexts/CourseListContext";

export const useFileUpload = () => {
  const fileRef = useRef();
  const [currentFile, setCurrentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [, setCourses] = useContext(CourseListContext);

  if (errorMessage) {
    fileRef.current.value = null;
  }

  const handleFileUpload = (e) => {
    e.preventDefault();

    const file = currentFile;
    setErrorMessage("");

    if (!file) {
      return false;
    }

    if (file.type !== "application/pdf") {
      setErrorMessage("File is not a PDF");
      return;
    }
    const MAX_FILE_SIZE = 1024 ** 2; // 1MB
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File is too large (1 MB max)");
      return;
    }

    setLoading(true);
    parsePDFtoTextLines(file)
      .then((lines) => {
        const courses = getCourses(lines);
        if (courses.length === 0) {
          setErrorMessage("No courses found in transcript");
          setLoading(false);
        } else {
          courses.forEach((course) => {
            course.id = crypto.randomUUID();
          });
          setCourses((prevCourses) => [...prevCourses, ...courses]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Unknown Error");
        setLoading(false);
      });
    fileRef.current.value = null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    handleSetFile(file);
  };

  const handleSetFile = (file) => {
    setCurrentFile(file);
    setErrorMessage("");
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    handleFileUpload(e);
    setCurrentFile(null);
  };

  const handleFileClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  return {
    currentFile,
    setCurrentFile: handleSetFile,
    fileRef,
    loading,
    errorMessage,
    handleFileChange,
    handleFileClick,
    handleSubmitBtn,
  };
};

export const useDragAndDrop = (onDropCallback) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onDropCallback(Array.from(e.dataTransfer.files)[0]);
      }
    },
    [onDropCallback],
  );

  return {
    dragActive,
    handleDrag,
    handleDrop,
  };
};

const uploadURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://macgradesweb.azurewebsites.net/api/upload";
  }
  return "http://localhost:7071/api/upload";
};

const errorURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://macgradesweb.azurewebsites.net/api/log-error";
  }
  return "http://localhost:7071/api/log-error";
};
