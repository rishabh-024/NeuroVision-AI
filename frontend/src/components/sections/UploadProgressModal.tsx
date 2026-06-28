import { motion, AnimatePresence } from "framer-motion";

import {
  Brain,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

interface UploadProgressModalProps {
  isOpen: boolean;
  currentStep: string;
  completed: boolean;
}

export default function UploadProgressModal({
  isOpen,
  currentStep,
  completed,
}: UploadProgressModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed
            inset-0
            z-100

            flex
            items-center
            justify-center

            bg-black/40

            px-6

            backdrop-blur-md
          "
        >
          <motion.div
            initial={{
              scale: 0.95,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              w-full
              max-w-md

              rounded-4xl

              border
              border-white/20

              bg-white/10

              p-8

              backdrop-blur-2xl

              shadow-[0_8px_32px_rgba(31,38,135,0.25)]
            "
          >
            <div
              className="
                flex
                flex-col
                items-center
                text-center
              "
            >
              {!completed ? (
                <>
                  <div
                    className="
                      mb-6

                      flex
                      h-20
                      w-20
                      items-center
                      justify-center

                      rounded-full

                      bg-cyan-500/20
                    "
                  >
                    <Loader2
                      className="
                        h-10
                        w-10

                        animate-spin

                        text-cyan-500
                      "
                    />
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold

                      text-slate-900
                      dark:text-white
                    "
                  >
                    Processing MRI
                  </h2>

                  <p
                    className="
                      mt-3

                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    Please wait while our
                    AI system analyzes the
                    uploaded MRI scan.
                  </p>
                </>
              ) : (
                <>
                  <div
                    className="
                      mb-6

                      flex
                      h-20
                      w-20
                      items-center
                      justify-center

                      rounded-full

                      bg-emerald-500/20
                    "
                  >
                    <CheckCircle2
                      className="
                        h-10
                        w-10

                        text-emerald-500
                      "
                    />
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold

                      text-slate-900
                      dark:text-white
                    "
                  >
                    Analysis Complete
                  </h2>

                  <p
                    className="
                      mt-3

                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    Prediction, Grad-CAM,
                    and report generation
                    completed successfully.
                  </p>
                </>
              )}

              <div
                className="
                  mt-8
                  w-full
                "
              >
                <div
                  className="
                    mb-4

                    flex
                    items-center
                    gap-3
                  "
                >
                  <Brain
                    className="
                      h-5
                      w-5
                      text-cyan-500
                    "
                  />

                  <span
                    className="
                      text-sm

                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    {currentStep}
                  </span>
                </div>

                {!completed && (
                  <div
                    className="
                      h-2
                      overflow-hidden

                      rounded-full

                      bg-white/10
                    "
                  >
                    <motion.div
                      animate={{
                        x: [
                          "-100%",
                          "100%",
                        ],
                      }}
                      transition={{
                        repeat:
                          Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                      className="
                        h-full
                        w-1/2

                        bg-cyan-500
                      "
                    />
                  </div>
                )}
              </div>

              <div
                className="
                  mt-8

                  flex
                  items-center
                  gap-2

                  text-xs

                  text-slate-500
                  dark:text-slate-400
                "
              >
                <Sparkles
                  className="
                    h-4
                    w-4
                  "
                />

                Powered by EfficientNetV2B0
                + Grad-CAM
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}