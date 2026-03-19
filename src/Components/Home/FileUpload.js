import { useFileUpload } from "./file-upload/hooks";
import Card from "./Card";
import "./FileUpload.css";
import { ReactComponent as UploadIcon } from "../../assets/upload-file-2-svgrepo-com.svg";

export default function FileUpload() {
  const {
    fileRef,
    handleFileChange,
    handleSubmitBtn,
    handleFileClick,
    errorMessage,
    selectedFileName,
    loading,
  } = useFileUpload();

  return (
    <Card id="file-upload">
      <div style={{ marginRight: "auto" }}>
        <h3 style={{ "margin-right": "auto", paddingBottom: "0.5em" }}>
          Upload Transcript
        </h3>
        <p
          style={{ lineHeight: "1.2em", color: "var(--secondary-text-color)" }}
        >
          Import your unofficial transcript PDF to automatically calculate your
          GPA
        </p>
      </div>
      <form>
        <input
          ref={fileRef}
          type="file"
          id="transcriptFile"
          name="pdfFile"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="drop-zone" onClick={handleFileClick}>
          <UploadIcon width={20} height={20} />
          <div>
            {selectedFileName || errorMessage ? (
              <>
                Selected File:{" "}
                <span>
                  {" "}
                  {errorMessage ? (
                    <span style={{ color: "red" }}>{errorMessage}</span>
                  ) : (
                    selectedFileName
                  )}{" "}
                </span>
              </>
            ) : (
              "Select File"
            )}
          </div>
        </div>
        <button className="primary" onClick={handleSubmitBtn}>
          {loading ? <>Loading...</> : <>Submit & Parse</>}
        </button>
      </form>
    </Card>
  );
}
