import FAQ from "components/Header/FAQ";
import "./Header.css";

const Header = () => {
  return (
    <header className="banner">
      <div className="title">
        <h1>MacGrades</h1>
        <p>McMaster GPA Calculator</p>
      </div>
      <FAQ />
    </header>
  );
};

export default Header;
