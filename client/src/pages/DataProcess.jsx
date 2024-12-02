import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Trash } from "@phosphor-icons/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchInvoices } from "../redux/reducers/invoicesReducer";
import { errorToast, successToast } from "../utils/toasts";
import { fetchCustomers } from "../redux/reducers/customersReducer";
import { fetchProducts } from "../redux/reducers/productsReducer";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";

const DataProcess = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

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

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const sendForProcessing = async () => {
    if (files.length === 0) {
      errorToast("Please select files to process.");
      return;
    }

    const formData = new FormData();
    files.forEach((fileObj) => {
      formData.append("files", fileObj.file);
    });

    try {
      setProcessing(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/process`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      if (response?.data?.error) {
        errorToast(
          response.data.error ||
            "File processing failed. Try a different file or try again later."
        );
        return;
      }
      dispatch(fetchInvoices(response.data.data.invoices));
      dispatch(fetchCustomers(response.data.data.customers));
      dispatch(fetchProducts(response.data.data.products));
      navigate("/data/tabs");
      successToast("Files processed successfully!");
    } catch (error) {
      errorToast(
        error?.response?.data?.msg ||
          "File processing failed. Try a different file or try again later."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Loading Overlay */}
      {processing && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-75 z-40 flex flex-col">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#3A643B"
            color="white"
          />
          <p className="z-50 text-white text-lg">Processing your file(s)...</p>
          <p className="text-lg text-white max-sm:px-5 text-center my-2">
            Hold tight. It usually takes 2-4 mins to extact all the data.
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg w-full h-full">
        <div className="flex w-full h-[90%] max-md:flex-col max-md:gap-4">
          <div
            {...getRootProps()}
            className="flex-1 p-6 border-2 border-dashed border-primaryColor rounded-lg bg-white flex flex-col items-center justify-center cursor-pointer animate-slight-right"
          >
            <input {...getInputProps()} />
            <p className="text-primaryColor font-semibold text-center">
              Drag & drop files here, or click to select files
            </p>
            <p className="text-sm text-gray-500 mt-2">
              (Supports PDFs, Images, and Excel files)
            </p>
          </div>

          <div className="ml-4 max-md:ml-0 flex-1 p-4 bg-white rounded-lg max-h-full overflow-auto animate-slight-left">
            <h3 className="text-lg font-semibold mb-4">Selected Files:</h3>
            {files.length === 0 ? (
              <p className="text-gray-500">No files selected</p>
            ) : (
              <ul className="space-y-3">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-gray-50 p-3 rounded shadow flex-col"
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

        <button
          className={`mt-4 p-3 text-white font-semibold rounded ${
            processing
              ? "bg-gray-500"
              : "bg-primaryColor hover:bg-primaryColor/90 transition-all duration-200 ease-linear"
          }`}
          disabled={processing}
          onClick={sendForProcessing}
        >
          {processing ? "Processing..." : "Process Files"}
        </button>
      </div>
    </div>
  );
};

export default DataProcess;
