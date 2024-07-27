"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "../../context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, CheckCircle, AlertTriangle } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", content: "" });
  const { login } = useUser();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", content: "" });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        formData
      );

      if (response.status === 200) {
        setMessage({ type: "success", content: "Login successful!" });
        setTimeout(() => {
          login(response.data.user);
          router.push("/books");
        }, 2000);
      } else {
        setMessage({ type: "error", content: response.data.error });
      }
    } catch (error) {
      setMessage({ type: "error", content: "Invalid email or password" });
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
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <StepInput
              icon={<Mail />}
              label="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              name="email"
            />
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
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
            >
              Login
            </motion.button>
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
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
        placeholder={placeholder}
        required
      />
    </div>
  </div>
);
