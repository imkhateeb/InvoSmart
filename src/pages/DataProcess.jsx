import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Trash } from "@phosphor-icons/react";
import axios from "axios";

const DataProcess = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState(null);

  // Handle files added via drag-and-drop or file input
  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  // Configure react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: true,
  });

  // Remove a file from the list
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Send files to GEMINI API
  const sendToGemini = async () => {
    if (files.length === 0) {
      alert("Please select at least one file to process.");
      return;
    }

    const formData = new FormData();
    files.forEach((fileObj, index) => {
      console.log(fileObj); // Debugging: Check each file object
      formData.append(`file_${index}`, fileObj.file); // Append each file
    });

    try {
      setProcessing(true);
      const response = await axios.post(
        "https://gemini-api-endpoint.example.com/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer YOUR_API_KEY`, // Add your GEMINI API Key
          },
        }
      );
      setResponse(response.data); // Save the API response
      alert("Files processed successfully!");
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Failed to process files. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-lg w-full h-full">
      <div className="flex w-full h-[90%] max-md:flex-col max-md:gap-4">
        {/* Left Side: Drag-and-Drop or Select Files */}
        <div
          {...getRootProps()}
          className="flex-1 p-6 border-2 border-dashed border-primaryColor rounded-lg bg-white flex flex-col items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-primaryColor font-semibold text-center">
            Drag & drop files here, or click to select files
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (Supports PDFs, Images, and Excel files)
          </p>
        </div>

        {/* Right Side: Display Selected Files */}
        <div className="ml-4 max-md:ml-0 flex-1 p-4 bg-white rounded-lg max-h-full overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Selected Files:</h3>
          {files.length === 0 ? (
            <p className="text-gray-500">No files selected</p>
          ) : (
            <ul className="space-y-3">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded shadow flex-col"
                >
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {file.type} - {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div />
                    <button
                      className="ml-4 text-red-500 hover:underline"
                      onClick={() => removeFile(index)}
                    >
                      <Trash size={32} weight="fill" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        className={`mt-4 p-3 text-white font-semibold rounded ${
          processing
            ? "bg-gray-500"
            : "bg-primaryColor hover:bg-primaryColor/90 transition-all duration-200 ease-linear"
        }`}
        disabled={processing}
        onClick={sendToGemini}
      >
        {processing ? "Processing..." : "Process Files"}
      </button>
    </div>
  );
};

export default DataProcess;
