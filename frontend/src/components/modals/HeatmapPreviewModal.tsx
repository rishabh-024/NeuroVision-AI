import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ZoomIn, X } from "lucide-react";

interface HeatmapPreviewModalProps {
  isOpen: boolean;
  imageUrl?: string;
  filename?: string;
  onClose: () => void;
}

export default function HeatmapPreviewModal({
  isOpen,
  imageUrl,
  filename,
  onClose,
}: HeatmapPreviewModalProps) {
  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename ? `${filename}-gradcam.jpg` : "gradcam.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleContentClick}
            className="relative w-full max-w-6xl overflow-hidden rounded-4xl border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <ZoomIn className="h-5 w-5 text-cyan-500" />
                  Grad-CAM Visualization
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  AI attention heatmap for explainable tumor detection.
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-500 transition-all duration-200 hover:bg-white/10 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image */}

            <div className="flex items-center justify-center bg-black/20 p-6">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Grad-CAM Heatmap"
                  className="max-h-[75vh] w-auto rounded-2xl border border-white/10 object-contain shadow-2xl"
                />
              ) : (
                <div className="flex h-100 items-center justify-center text-slate-500">
                  No Heatmap Available
                </div>
              )}
            </div>

            {/* Footer */}

            <div className="flex flex-col gap-3 border-t border-white/10 p-5 md:flex-row md:justify-between md:items-center">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Grad-CAM highlights image regions that contributed most strongly to the model's prediction.
              </div>

              <button
                onClick={handleDownload}
                disabled={!imageUrl}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-medium text-white transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Download Heatmap
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}