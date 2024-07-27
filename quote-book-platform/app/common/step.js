import React from "react";
import { FaUserPlus, FaBook, FaQuoteRight, FaComments } from "react-icons/fa";

const StepsPage = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl mb-4 text-blue-500" />,
      title: "Create an Account",
      description:
        "Sign up for a free account to start sharing and discovering book quotes.",
    },
    {
      icon: <FaBook className="text-4xl mb-4 text-green-500" />,
      title: "Add or Find Books",
      description:
        "Add your favorite books to our database or search for existing ones.",
    },
    {
      icon: <FaQuoteRight className="text-4xl mb-4 text-yellow-500" />,
      title: "Share Quotes",
      description: "Post memorable quotes from the books you've read and love.",
    },
    {
      icon: <FaComments className="text-4xl mb-4 text-purple-500" />,
      title: "Engage with the Community",
      description:
        "Like, comment on, and discuss quotes shared by other book lovers.",
    },
  ];

  return (
    <div className="container mx-auto py-8 bg-gradient-to-r from-slate-950 to-blue-950">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        How It Works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            {step.icon}
            <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsPage;
