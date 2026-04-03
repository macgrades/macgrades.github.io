import { useFileUpload, useDragAndDrop } from "./file-upload/hooks";
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
    loading,
    currentFile,
    setCurrentFile,
  } = useFileUpload();

  const { handleDrag, handleDrop, dragActive } = useDragAndDrop(setCurrentFile);

  const trimmedFileName = currentFile?.name
    ? trimFileName(currentFile.name)
    : null;

  return (
    <Card id="file-upload">
      <div style={{ marginRight: "auto" }}>
        <h3 style={{ marginRight: "auto", paddingBottom: "0.5em" }}>
          Upload Transcript
        </h3>
        <p
          style={{ lineHeight: "1.2em", color: "var(--secondary-text-color)" }}
        >
          Import your unofficial transcript PDF to automatically calculate your
          GPA
        </p>
      </div>
      <form onDragEnter={handleDrag}>
        <input
          ref={fileRef}
          type="file"
          id="transcriptFile"
          name="pdfFile"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div
          className={`drop-zone ${dragActive ? "drag-active" : ""}`}
          onClick={handleFileClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <span className="drop-zone-text">
            <UploadIcon width={20} height={20} />
            Select File
          </span>
          <DropZoneLabel
            currentFileName={trimmedFileName}
            errorMessage={errorMessage}
          />
        </div>
        <button className="primary" onClick={handleSubmitBtn}>
          {loading ? <>Loading...</> : <>Submit & Parse</>}
        </button>
      </form>
    </Card>
  );
}

const DropZoneLabel = ({ currentFileName, errorMessage }) => {
  if (errorMessage) {
    return (
      <div>
        <span className="error">{errorMessage}</span>
      </div>
    );
  }
  if (currentFileName) {
    return (
      <span style={{ color: "var(--secondary-text-color)" }}>
        Selected File: {currentFileName}
      </span>
    );
  }
};

const trimFileName = (fileName) => {
  const nameParts = fileName.split(".");
  nameParts.pop(); // Remove the extension
  const nameWithoutExt = nameParts.join(".");
  if (nameWithoutExt.length > 15) {
    return (
      nameWithoutExt.substring(0, 15) +
      ".." +
      fileName.substring(fileName.length - 4)
    );
  }
  return fileName;
};
