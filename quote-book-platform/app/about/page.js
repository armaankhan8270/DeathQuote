"use client";
import React from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-950 to-blue-900 text-gray-100">
      <header className="b text-white py-12 shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            About Us
          </h1>
          <p className="text-lg mt-4">
            Discover our mission, meet our team, and get in touch with us.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <section className="mb-20">
          <h2 className="text-4xl font-semibold text-amber-500 text-center mb-8">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-gray-300">
            At Global Book Connect, our mission is to unite book lovers from
            around the globe. We strive to create a vibrant platform where
            readers can discover, share, and discuss their favorite books and
            quotes. Our aim is to foster a thriving community of passionate
            readers and provide a space for insightful conversations about
            literature.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-semibold text-amber-500 text-center mb-8">
            Our Team
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="relative w-80 h-80 mb-8 md:mb-0 md:w-1/3 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
              <img
                src="https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our Team"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <p className="text-lg leading-relaxed text-gray-300">
                Our team is a diverse group of individuals passionate about
                enhancing the reading experience. From talented developers to
                dedicated community managers, each team member contributes their
                unique skills and enthusiasm to make Global Book Connect a
                premier destination for book enthusiasts. Together, we are
                committed to delivering a platform that inspires and connects
                readers worldwide.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-semibold text-amber-500 text-center mb-8">
            Contact Us
          </h2>
          <p className="text-lg text-center mb-6 text-gray-300">
            We value your feedback and are here to assist you. Reach out to us
            through the following channels:
          </p>
          <div className="flex flex-col items-center">
            <ul className="space-y-4 mb-6">
              <li className="flex items-center space-x-4 text-gray-300 text-lg">
                <FaEnvelope className="text-purple-500 text-2xl" />
                <a
                  href="mailto:support@globalbookconnect.com"
                  className="hover:underline"
                >
                  karmankkhan@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-4 text-gray-300 text-lg">
                <FaPhone className="text-purple-500 text-2xl" />
                +91 8433639534
              </li>
              <li className="flex items-center space-x-4 text-gray-300 text-lg">
                <FaMapMarkerAlt className="text-purple-500 text-2xl" />
                Taloja Navi Mumbai, Maharashtra, India
              </li>
            </ul>
            <p className="text-gray-400 text-lg">
              Alternatively, you can fill out our{" "}
              <a href="/contact" className="text-purple-500 hover:underline">
                contact form
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; 2024 Global Book Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
