import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [dragActive, setDragActive] = useState(false);

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
    } else {
      alert("Please upload a valid font file (.ttf, .otf, .woff, .woff2)");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && isValidFont(file)) {
      onFileSelect(file);
    } else {
      alert("Please upload a valid font file (.ttf)");
    }
  };

  const isValidFont = (file) => {
    const validExtensions = ["ttf"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };
  return (
   <div>
     <div
    className={`border-2 border-dashed border-gray-200 p-6 text-center cursor-pointer h-[70vh] ${
      dragActive ? "bg-blue-100" : "bg-gray-100"
    }`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >
    <input type="file" accept=".ttf,.otf,.woff,.woff2" onChange={handleFileSelect} hidden id="font-upload" />
    <label htmlFor="font-upload">
      {dragActive ? (
        <p className="text-blue-500 font-semibold">Drop the font file here...</p>
      ) : (
        <p className="text-gray-600"><span className='text-blue-400 font-medium'>Click to upload</span> or drag and drop <br></br> Only TTF File Allowed
        </p>
      )}
    </label>
  </div>
   </div>
  )
}

export default App
