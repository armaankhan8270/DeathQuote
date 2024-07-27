"use client";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@/app/context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiUser,
  FiImage,
  FiCheck,
  FiAlertTriangle,
} from "react-icons/fi";

export default function UploadBook() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("user_id", user._id);
    formData.append("desc", desc);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage({ type: "success", content: "Book uploaded successfully!" });
      console.log(response.data);
    } catch (error) {
      setMessage({
        type: "error",
        content: "Error uploading book. Please try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(user);
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepInput
              icon={<FiBook />}
              label="Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepInput
              icon={<FiUser />}
              label="Author"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepInput
              icon={<FiUser />}
              label="desc"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter Description"
            />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <StepFileInput
              icon={<FiImage />}
              label="Cover Image"
              id="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 to-violet-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Upload a Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Previous
              </motion.button>
            )}
            {step < 5 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50"
              >
                {isLoading ? "Uploading..." : "Upload Book"}
              </motion.button>
            )}
          </div>
        </form>
        <AnimatePresence>
          {message.content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-4 p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <p className="flex items-center">
                {message.type === "success" ? (
                  <FiCheck className="mr-2" />
                ) : (
                  <FiAlertTriangle className="mr-2" />
                )}
                {message.content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const StepInput = ({ icon, label, id, value, onChange, placeholder }) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        placeholder={placeholder}
        required
      />
    </div>
  </div>
);

const StepFileInput = ({ icon, label, id, onChange }) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="file"
        id={id}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
      />
    </div>
  </div>
);
