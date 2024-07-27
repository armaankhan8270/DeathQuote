import { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

const Head = () => {
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBookCount((prev) => (prev < 1000 ? prev + 1 : prev));
    }, 20);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <Head>
          <title>LitQuest - Embark on Your Literary Adventure</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-white mb-6">
              Welcome to LitQuest
            </h1>
            <p className="text-xl text-white mb-12">
              Embark on a journey through literature like never before
            </p>
          </motion.div>

          <div className="flex justify-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-xl shadow-lg"
            >
              Start Your Adventure
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-filter backdrop-blur-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Interactive Lessons
              </h3>
              <p>
                Dive deep into literary masterpieces with our engaging,
                interactive lessons.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-filter backdrop-blur-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Community Discussions
              </h3>
              <p>
                Join a vibrant community of book lovers and share your insights.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-filter backdrop-blur-lg"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Personalized Journey
              </h3>
              <p>
                Tailor your literary adventure with AI-powered recommendations.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 text-center text-white"
          >
            <p className="text-3xl font-bold mb-4">
              Join {bookCount}+ readers on their quest
            </p>
            <p className="text-xl">Discover new worlds, one page at a time</p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Head;
