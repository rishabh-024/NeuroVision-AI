import { motion } from "framer-motion";
import { BrainCircuit, Loader2, Sparkles } from "lucide-react";

interface AnalysisActionPanelProps {
  isAnalyzing: boolean;
  hasFile: boolean;
  onAnalyze: () => void;
}

export default function AnalysisActionPanel({
  isAnalyzing,
  hasFile,
  onAnalyze,
}: AnalysisActionPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto mt-8 max-w-5xl px-6"
    >
      <div
        className="
          rounded-4xl
          border border-white/20
          bg-white/10
          p-6
          backdrop-blur-2xl
          shadow-[0_8px_32px_rgba(31,38,135,0.18)]
        "
      >
        <div
          className="
            flex flex-col gap-6
            lg:flex-row lg:items-center lg:justify-between
          "
        >
          <div>
            <h3
              className="
                flex items-center gap-2
                text-xl font-semibold
                text-slate-900 dark:text-white
              "
            >
              <BrainCircuit className="h-5 w-5 text-cyan-500" />
              AI Analysis Engine
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Generate prediction, Grad-CAM visualization, and diagnostic
              report.
            </p>
          </div>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={!hasFile || isAnalyzing}
            className="
              flex items-center justify-center gap-3
              rounded-2xl
              bg-cyan-500
              px-8 py-4
              font-semibold text-white
              transition-all duration-300
              hover:scale-105
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Analyze MRI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
