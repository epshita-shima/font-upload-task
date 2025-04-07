import { useState } from "react";
import "./App.css";
import FontList from "./components/FontList";
import swal from "sweetalert";
import CreateFontGroup from "./components/CreateFontGroup";
function App() {
  const [dragActive, setDragActive] = useState(false);
  const [fontFile, setFontFile] = useState([]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".ttf")) {
      setFontFile((prevFiles) => [
        ...prevFiles,
        { file, name: file.name.split("-")[0] },
      ]);
    } else {
      swal("Sorry!", "Please upload a valid font file (.ttf)", "warning");
    }
  };
  const handleFileSelectDrag = (file) => {
    if (file && file.name.endsWith(".ttf")) {
      setFontFile((prevFiles) => [
        ...prevFiles,
        { file, name: file.name.split("-")[0] },
      ]);
    } else {
      swal("Sorry!", "Please upload a valid font file (.ttf)", "warning");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && isValidFont(file)) {
      onFileSelect(file);
      handleFileSelectDrag(file);
    } else {
      swal("Sorry!", "Please upload a valid font file (.ttf)", "warning");
    }
  };

  const isValidFont = (file) => {
    const validExtensions = ["ttf"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  const onFileSelect = (file) => {
    console.log("Selected file: ", file);
  };

  const handleRemoveFile = (fileName) => {
    setFontFile(fontFile.filter((file) => file.name !== fileName));
  };

  return (
    <div>
      <div
        className={`flex justify-center items-center border-2 border-dashed border-gray-200 p-6 text-center cursor-pointer h-[70vh] ${
          dragActive ? "bg-blue-100" : "bg-gray-100"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".ttf"
          onChange={handleFileSelect}
          hidden
          id="font-upload"
        />
        <label htmlFor="font-upload">
          {dragActive ? (
            <p className="text-blue-500 font-semibold">
              Drop the font file here...
            </p>
          ) : (
            <p className="text-gray-600">
              <span className="text-blue-400 font-medium">Click to upload</span>{" "}
              or drag and drop <br /> Only TTF File Allowed
            </p>
          )}
        </label>
      </div>

      <FontList
        fontFile={fontFile}
        handleRemoveFile={handleRemoveFile}
      ></FontList>

<CreateFontGroup fontFile={fontFile}></CreateFontGroup>

    </div>
  );
}

export default App;
