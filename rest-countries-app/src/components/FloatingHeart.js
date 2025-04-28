// components/FloatingHeart.js
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FloatingHeart = ({ x, y, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ y: - 100, opacity: 0, scale: 1.8 }}
      transition={{ duration: 1 }}
      onAnimationComplete={onComplete}
      style={{
        position: "fixed",
        left: x - 15,
        top: y - 15,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <Heart className="text-pink-500 w-8 h-8" fill="currentColor" />
    </motion.div>
  );
};

export default FloatingHeart;
