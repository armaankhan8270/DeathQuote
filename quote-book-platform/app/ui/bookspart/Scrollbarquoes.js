import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";

const ScrollableQuotes = ({ quotes }) => {
  const scrollRef = useRef(null);

  const [{ scrollY }, setScrollY] = useSpring(() => ({ scrollY: 0 }));

  const handleScroll = () => {
    setScrollY({ scrollY: scrollRef.current.scrollTop });
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      style={{
        height: "400px",
        overflow: "auto",
      }}
    >
      {quotes.map((quote, index) => (
        <animated.div
          key={index}
          style={{
            transform: scrollY.to(
              (y) => `translateY(${y * 0.2}px) scale(${1 - y * 0.001})`
            ),
            opacity: scrollY.to((y) => 1 - y * 0.002),
          }}
        >
          <div className="bg-white rounded-lg p-4 shadow-md m-4">
            <p>{quote.text}</p>
          </div>
        </animated.div>
      ))}
    </div>
  );
};

export default ScrollableQuotes;
