import { useState } from "react";

import HeroSection from "../components/sections/HeroSection";
import SystemStatusCards from "../components/sections/SystemStatusCards";
import MRIUploadCard from "../components/sections/MRIUploadCard";
import AnalysisActionPanel from "../components/sections/AnalysisActionPanel";
import UploadProgressModal from "../components/sections/UploadProgressModal";
import PredictionResultCard from "../components/sections/PredictionResultCard";
import type { PredictionResponse } from "../services/predictionService"
import predictionService from "../services/predictionService";

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState("Ready");

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      setPrediction(null);
      setCompleted(false);
      setShowModal(true);
      setIsAnalyzing(true);

      setCurrentStep("Uploading MRI Scan...");

      const result = await predictionService.analyzeMRI(selectedFile);

      setCurrentStep("Generating Grad-CAM...");
      setCurrentStep("Creating Medical Report...");
      setCurrentStep("Analysis Complete");

      setPrediction(result);

      setCompleted(true);

      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setShowModal(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="relative min-h-screen pb-20">
      <HeroSection />

      <section className="mx-auto max-w-7xl px-6">
        <SystemStatusCards />

        <div className="mt-10 rounded-[40px] border border-white/15 bg-white/10 p-6 backdrop-blur-3xl shadow-[0_8px_32px_rgba(31,38,135,0.18)] md:p-8">
          <MRIUploadCard onFileChange={setSelectedFile} />

          <AnalysisActionPanel
            hasFile={Boolean(selectedFile)}
            isAnalyzing={isAnalyzing}
            onAnalyze={handleAnalyze}
          />
        </div>

        {prediction && (
          <PredictionResultCard
            prediction={prediction.prediction}
            confidence={prediction.confidence}
            heatmapUrl={
              prediction.heatmap_url
                ? predictionService.getHeatmapUrl(
                    prediction.heatmap_url
                  )
                : undefined
            }
            reportUrl={
              prediction.report_url
                ? predictionService.getReportUrl(
                    prediction.report_url
                  )
                : undefined
            }
            createdAt={new Date().toLocaleString()}
          />
          )
        }
      </section>

      <UploadProgressModal
        isOpen={showModal}
        completed={completed}
        currentStep={currentStep}
      />
    </main>
  );
}