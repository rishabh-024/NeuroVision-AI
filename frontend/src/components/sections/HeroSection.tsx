import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  ShieldCheck,
} from "lucide-react";

const STATS = [
  {
    id: 1,
    label: "Model Accuracy",
    value: "81.68%",
    icon: Activity,
  },
  {
    id: 2,
    label: "Tumor Classes",
    value: "4 Types",
    icon: Brain,
  },
  {
    id: 3,
    label: "AI Explainability",
    value: "Grad-CAM",
    icon: ShieldCheck,
  },
];

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-36 pb-24">
      <div className="grid w-full items-center gap-16 lg:grid-cols-2">
        {/* Content Section */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 backdrop-blur-xl">
            AI-Powered Brain Tumor Analysis
          </div>

          <h1 className="text-5xl font-black leading-tight text-slate-900 dark:text-white md:text-7xl">
            Advanced MRI
            <span className="block bg-linear-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Detection Platform
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Upload MRI scans, detect tumors using deep learning,
            visualize decision regions through Grad-CAM,
            and generate professional diagnostic reports.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              className="
                group
                flex
                items-center
                gap-2
                rounded-2xl
                bg-cyan-500
                px-6
                py-4
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Analyze MRI

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>

            <button
              className="
                rounded-2xl
                border
                border-white/20
                bg-white/10
                px-6
                py-4
                font-medium
                backdrop-blur-xl
                transition-all
                duration-300
                hover:bg-white/20
                dark:text-white
              "
            >
              View Analysis History
            </button>
          </div>
        </motion.div>

        {/* Dashboard Preview */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            rounded-[36px]
            border
            border-white/20
            bg-white/10
            p-6
            backdrop-blur-2xl
            shadow-[0_8px_32px_rgba(31,38,135,0.18)]
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold dark:text-white">
                Platform Overview
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                AI Performance Metrics
              </p>
            </div>

            <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-500">
              Online
            </div>
          </div>

          <div className="space-y-4">
            {STATS.map(
              ({
                id,
                label,
                value,
                icon: Icon,
              }) => (
                <div
                  key={id}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                  "
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-cyan-500/20 p-3">
                      <Icon className="h-5 w-5 text-cyan-500" />
                    </div>

                    <span className="text-slate-700 dark:text-slate-300">
                      {label}
                    </span>
                  </div>

                  <span className="font-bold text-slate-900 dark:text-white">
                    {value}
                  </span>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
