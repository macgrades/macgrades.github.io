import { CourseListProvider } from "../../contexts/CourseListContext";
import CourseList from "./CourseList";
import FileUpload from "./FileUpload";
import CourseInput from "./CourseInput";
import GpaDisplay from "./GpaDisplay";

import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <CourseListProvider>
        <div className="home-content">
          <div className="left">
            <div className="left-top">
              <GpaDisplay />
            </div>
            <div className="left-bottom">
              <CourseInput />
            </div>
            <div className="left-bottom">
              <FileUpload />
            </div>
          </div>
          <div className="right">
            <CourseList />
          </div>
        </div>
      </CourseListProvider>
    </div>
  );
};

export default Home;
