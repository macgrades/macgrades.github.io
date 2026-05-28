import { ReactComponent as QuestionMarkIcon } from "assets/question-mark-circled-svgrepo-com.svg";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-container">
      <QuestionMarkIcon width={30} height={30} />
      <div className="faq-tooltip">
        <p>
          GPA is calculated using McMaster's 12-point scale based on your course
          grades and units.
        </p>
        <p>
          Your data stays completely private — all processing is done locally in
          your browser. Nothing is sent to any server.
        </p>
        <p>
          Found an issue? Report it at{" "}
          <a
            href="https://github.com/macgrades/macgrades.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/macgrades/macgrades.github.io
          </a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
