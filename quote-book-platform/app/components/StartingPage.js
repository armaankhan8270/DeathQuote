"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "Welcome to Global Book Connect",
    content:
      "Embark on a literary journey that transcends borders. Discover, share, and connect through the power of words.",
    icon: "📚",
  },
  {
    title: "Revolutionary Reading Experience",
    content:
      "Immerse yourself in a world-class platform designed for book enthusiasts, offering unparalleled features and global connectivity.",
    icon: "🌍",
  },
  {
    title: "Unmatched Features",
    content:
      "Experience AI-powered recommendations, real-time global book clubs, and interactive author events that redefine digital reading.",
    icon: "🚀",
  },
  {
    title: "Global Impact",
    content:
      "Join millions in fostering literacy, supporting emerging authors, and promoting cross-cultural understanding through literature.",
    icon: "🤝",
  },
  {
    title: "Impressive Milestones",
    content:
      "10+ Active Users, 10+ Books, 100+ Quotes Shared, 1+ Countries Connected",
    icon: "📊",
  },
  {
    title: "Join the Revolution",
    content:
      "Be part of the world's largest literary community. Your next great read—and lasting connections—await.",
    icon: "🎉",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function WelcomePage() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  const handleGetStarted = () => {
    router.push("/home");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page < slides.length - 1) {
        paginate(1);
      } else {
        setPage([0, -1]);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-violet-600 text-white p-4">
      <div className="max-w-4xl w-full">
        <Alert className="mb-8 bg-white/10 border-white/20">
          <AlertTitle className="text-white">
            Welcome to the future of reading
          </AlertTitle>
          <AlertDescription className="text-white/80">
            Swipe or use arrow keys to navigate. Join us in redefining the
            global literary landscape.
          </AlertDescription>
        </Alert>

        <div className="relative h-[400px] overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm shadow-xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, { offset, velocity }) => {
                setIsDragging(false);
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full flex flex-col items-center justify-center p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-6xl mb-4"
              >
                {slides[page].icon}
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-3xl font-bold mb-4"
              >
                {slides[page].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-lg"
              >
                {slides[page].content}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index, index > page ? 1 : -1])}
              className={`focus:outline-none transition-all duration-300 ${
                index === page
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <Circle
                size={12}
                fill={index === page ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => paginate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            disabled={isDragging}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
            disabled={isDragging}
          >
            <ChevronRight size={24} />
          </button>
          {page === slides.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <button
                onClick={handleGetStarted}
                className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-purple-100 transition-colors duration-300"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
