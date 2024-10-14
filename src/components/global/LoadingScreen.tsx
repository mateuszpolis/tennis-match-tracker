import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed w-full h-full flex flex-col justify-center items-center bg-white-500">
      <motion.div
        className="tennis-ball"
        style={{
          fontSize: "5rem",
          display: "inline-block",
        }}
        animate={{
          y: [0, -50, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        🎾
      </motion.div>
      <h2 className="text-5xl font-bold font-display uppercase text-primary mb-[40vh]">Loading...</h2>
      <div></div>
    </div>
  );
};

export default LoadingScreen;
