import FAQ from "components/Header/FAQ";
import "./Header.css";

const Header = () => {
  return (
    <header className="title">
      <h1>MacGrades</h1>
      <div className="subtitle">
        <p>McMaster GPA Calculator</p>
        <FAQ />
      </div>
    </header>
  );
};

export default Header;
