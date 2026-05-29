import { ReactComponent as QuestionMarkIcon } from "assets/question-mark-circled-svgrepo-com.svg";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-container">
      <button type="button" className="faq-trigger" aria-label="FAQ">
        <QuestionMarkIcon
          aria-hidden="true"
          focusable="false"
          width={30}
          height={30}
        />
      </button>
      <div className="faq-tooltip" role="tooltip">
        <div className="faq-section">
          <h3>How does it work?</h3>
          <p>
            GPA is calculated based on your graded course grades and units (i.e.
            A+ to F, not T, MT, COM, W, etc.), as outlined{" "}
            <a
              href="https://registrar.mcmaster.ca/exams-grades/grades/#tab-20"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            . The 4.0 scale GPA is calculated using the same process, but with
            the conversion table provided{" "}
            <a
              href="https://registrar.mcmaster.ca/exams-grades/grades/#tab-10"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>
        <div className="faq-section">
          <h3>Is my data private?</h3>
          <p>
            Your data stays completely private. All processing of your
            transcript is done locally in your browser. The code is open source
            and available for review{" "}
            <a
              href="https://github.com/macgrades/macgrades.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>
        <div className="faq-section">
          <h3>Something not working?</h3>
          <p>
            Submit an issue at{" "}
            <a
              href="https://github.com/macgrades/macgrades.github.io/issues/new?template=bug_report.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
