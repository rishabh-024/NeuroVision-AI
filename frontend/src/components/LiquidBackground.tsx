import { motion } from "framer-motion";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Background Layer */}
      <div
        className="
          absolute inset-0
          bg-slate-50
          dark:bg-[#050816]
          transition-colors duration-500
        "
      />

      {/* Orb 1 */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-40 -left-20
          h-112 w-md
          rounded-full
          bg-cyan-400/20
          blur-[120px]
        "
      />

      {/* Orb 2 */}
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-32 -top-40
          h-128 w-lg
          rounded-full
          bg-blue-500/20
          blur-[140px]
        "
      />

      {/* Orb 3 */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 140, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-40 left-[30%]
          h-96 w-[24rem]
          rounded-full
          bg-violet-500/20
          blur-[120px]
        "
      />

      {/* Glass Noise Layer */}
      <div
        className="
          absolute inset-0
          backdrop-blur-[100px]
        "
      />
    </div>
  );
}
