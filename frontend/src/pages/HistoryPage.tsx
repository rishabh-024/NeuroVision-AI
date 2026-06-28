import { useEffect, useMemo, useState } from "react";

import {
  Calendar,
  Download,
  Eye,
  FileImage,
  History,
  RefreshCw,
  Search,
  Brain,
  Activity,
} from "lucide-react";

import predictionService from "../services/predictionService";
import type { HistoryItem } from "../services/predictionService";
import HeatmapPreviewModal from "../components/modals/HeatmapPreviewModal";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedHeatmap, setSelectedHeatmap] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await predictionService.getHistory();

      const sortedData = [...data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

      setHistory(sortedData);
    } catch (err) {
      console.error(err);
      setError("Failed to load analysis history.");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      (item.filename ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [history, search]);

  const tumorDetectedCount = history.filter(
    (item) => (item.prediction ?? "").toLowerCase() !== "notumor"
  ).length;

  const noTumorCount = history.filter(
    (item) => (item.prediction ?? "").toLowerCase() === "notumor"
  ).length;

  const getPredictionColor = (
    prediction?: string
  ) => {
    const value = (prediction ?? "").toLowerCase();

    switch (value) {
      case "glioma":
        return "text-red-500";

      case "meningioma":
        return "text-orange-500";

      case "pituitary":
        return "text-purple-500";

      case "notumor":
        return "text-emerald-500";

      default:
        return "text-cyan-500";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-3xl border border-white/20 bg-white/10 px-8 py-6 backdrop-blur-xl dark:text-white">
          Loading analysis history...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-900 dark:text-white">
              <History className="h-10 w-10 text-cyan-500" />
              Analysis History
            </h1>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Review all previously analyzed MRI scans and generated reports.
            </p>
          </div>

          <button
            onClick={loadHistory}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-cyan-500
              px-5
              py-3
              font-medium
              text-white
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Statistics */}

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-4xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-cyan-500" />
              <h3 className="font-semibold dark:text-white">
                Total Analyses
              </h3>
            </div>

            <p className="mt-4 text-3xl font-bold text-cyan-500">
              {history.length}
            </p>
          </div>

          <div className="rounded-4xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-red-500" />
              <h3 className="font-semibold dark:text-white">
                Tumors Detected
              </h3>
            </div>

            <p className="mt-4 text-3xl font-bold text-red-500">
              {tumorDetectedCount}
            </p>
          </div>

          <div className="rounded-4xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <FileImage className="h-6 w-6 text-emerald-500" />
              <h3 className="font-semibold dark:text-white">
                No Tumor Cases
              </h3>
            </div>

            <p className="mt-4 text-3xl font-bold text-emerald-500">
              {noTumorCount}
            </p>
          </div>
        </div>

        {/* Search */}

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search MRI filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-3xl
                border
                border-white/20
                bg-white/10
                py-4
                pl-12
                pr-4
                backdrop-blur-xl
                outline-none
                dark:text-white
              "
            />
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-8 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-500">
            {error}
          </div>
        )}

        {/* Empty State */}

        {!loading && filteredHistory.length === 0 && (
          <div className="rounded-4xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-2xl">
            <FileImage className="mx-auto mb-4 h-14 w-14 text-cyan-500" />

            <h2 className="text-2xl font-semibold dark:text-white">
              No Analysis Found
            </h2>

            <p className="mt-2 text-slate-500">
              Upload and analyze your first MRI scan.
            </p>
          </div>
        )}

        {/* History List */}

        <div className="grid gap-6">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="
                rounded-4xl
                border
                border-white/20
                bg-white/10
                p-6
                backdrop-blur-2xl
                shadow-[0_8px_32px_rgba(31,38,135,0.18)]
              "
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {item.filename ?? "Unnamed Scan"}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-6">
                    <div>
                      <p className="text-sm text-slate-500">
                        Prediction
                      </p>

                      <p
                        className={`font-semibold capitalize ${getPredictionColor(
                          item.prediction ?? ""
                        )}`}
                      >
                        {item.prediction ?? ""}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Confidence
                      </p>

                      <p className="font-semibold text-emerald-500">
                        {(item.confidence ?? 0).toFixed(2)}%
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Date
                      </p>

                      <p className="flex items-center gap-2 font-medium dark:text-white">
                        <Calendar className="h-4 w-4" />
                        {new Date(
                          item.created_at
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {item.heatmap_url && (
                    <button
                      type="button"
                      onClick={() => { setSelectedHeatmap(
                        predictionService.getHeatmapUrl(
                        item.heatmap_url
                      ));
                      setIsPreviewOpen(true);
                    }}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:scale-105 dark:text-white"
                    >
                      <Eye className="h-4 w-4" />
                      View Heatmap
                    </button>
                  )}

                  {item.report_url && (
                    <a
                      href={predictionService.getReportUrl(
                        item.report_url
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-2xl
                        bg-cyan-500
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition-all
                        duration-300
                        hover:scale-105
                      "
                    >
                      <Download className="h-4 w-4" />
                      Download Report
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
      <HeatmapPreviewModal
        isOpen={isPreviewOpen}
        imageUrl={selectedHeatmap ?? undefined}
        filename="heatmap"
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedHeatmap(null);
        }}
      />
    </main>
  );
}