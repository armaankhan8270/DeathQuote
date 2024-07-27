"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Image,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const [message, setMessage] = useState({ type: "", content: "" });
  const { login } = useUser();
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", content: "" });

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", content: "Registration successful!" });
        setTimeout(() => {
          login(data.user);
          router.push("/books");
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", content: errorData.error });
      }
    } catch (error) {
      setMessage({
        type: "error",
        content: "An error occurred during registration",
      });
    }
  };

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
              icon={<User />}
              label="Username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              name="username"
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
              icon={<Mail />}
              label="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              name="email"
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
              icon={<Lock />}
              label="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              name="password"
              type="password"
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
              icon={<Image />}
              label="Profile Image"
              id="profileImage"
              onChange={handleChange}
              name="profileImage"
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-violet-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-50"
              >
                Register
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
                  <CheckCircle className="mr-2" />
                ) : (
                  <AlertTriangle className="mr-2" />
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

const StepInput = ({
  icon,
  label,
  id,
  value,
  onChange,
  placeholder,
  name,
  type = "text",
}) => (
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
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        placeholder={placeholder}
        required
      />
    </div>
  </div>
);

const StepFileInput = ({ icon, label, id, onChange, name }) => (
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
        name={name}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
      />
    </div>
  </div>
);
