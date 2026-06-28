import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Download,
  FileText,
  ImageIcon,
} from "lucide-react";

interface PredictionResultCardProps {
  prediction: string;
  confidence: number;
  heatmapUrl?: string;
  reportUrl?: string;
  createdAt?: string;
}

export default function PredictionResultCard({
  prediction,
  confidence,
  heatmapUrl,
  reportUrl,
  createdAt,
}: PredictionResultCardProps) {
  const confidenceColor =
    confidence >= 90
      ? "text-emerald-500"
      : confidence >= 70
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto mt-8 max-w-5xl px-6"
    >
      <div
        className="
          rounded-[36px]
          border border-white/20
          bg-white/10
          p-8
          backdrop-blur-2xl
          shadow-[0_8px_32px_rgba(31,38,135,0.18)]
        "
      >
        <div className="mb-8">
          <h2
            className="
              flex items-center gap-3
              text-3xl font-bold
              text-slate-900 dark:text-white
            "
          >
            <Brain className="h-8 w-8 text-cyan-500" />
            Analysis Results
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            AI-generated prediction and diagnostic insights.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="
              rounded-3xl
              border border-white/20
              bg-white/5
              p-6
            "
          >
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-cyan-500" />
              <h3 className="font-semibold dark:text-white">
                Prediction
              </h3>
            </div>

            <p
              className="
                mt-4
                text-3xl
                font-bold
                capitalize
                text-slate-900
                dark:text-white
              "
            >
              {prediction}
            </p>
          </div>

          <div
            className="
              rounded-3xl
              border border-white/20
              bg-white/5
              p-6
            "
          >
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-500" />
              <h3 className="font-semibold dark:text-white">
                Confidence
              </h3>
            </div>

            <p
              className={`mt-4 text-3xl font-bold ${confidenceColor}`}
            >
              {confidence.toFixed(2)}%
            </p>
          </div>
        </div>

        {heatmapUrl && (
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-cyan-500" />

              <h3 className="font-semibold dark:text-white">
                Grad-CAM Visualization
              </h3>
            </div>

            <div
              className="
                overflow-hidden
                rounded-3xl
                border border-white/20
              "
            >
              <img
                src={heatmapUrl}
                alt="Grad-CAM"
                className="w-full object-cover"
              />
            </div>
          </div>
        )}

        <div
          className="
            mt-8
            flex flex-wrap
            items-center
            gap-4
          "
        >
          {reportUrl && (
            <a
              href={reportUrl}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center gap-2
                rounded-2xl
                bg-cyan-500
                px-6 py-3
                font-medium text-white
                transition-all duration-300
                hover:scale-105
              "
            >
              <Download className="h-4 w-4" />
              Download Report
            </a>
          )}

          {createdAt && (
            <div
              className="
                flex items-center gap-2
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              <FileText className="h-4 w-4" />
              {createdAt}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
