import { useEffect, useMemo, useState } from "react";

import {
  Download,
  FileText,
  Search,
  Calendar,
  RefreshCw,
} from "lucide-react";

import predictionService from "../services/predictionService";
import type { HistoryItem } from "../services/predictionService";

export default function ReportsPage() {
  const [reports, setReports] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
    console.log("History:", history);
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);

      const history =
        await predictionService.getHistory();

      const reportsOnly = history
        .filter((item) => item.report_url)
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );

      setReports(reportsOnly);
    } catch (err) {
      console.error(err);
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = useMemo(() => {
    return reports.filter((item) =>
      item.filename
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [reports, search]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-3xl border border-white/20 bg-white/10 px-8 py-6 backdrop-blur-xl dark:text-white">
          Loading reports...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-900 dark:text-white">
              <FileText className="h-10 w-10 text-cyan-500" />
              Medical Reports
            </h1>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Access and download generated medical analysis reports.
            </p>
          </div>

          <button
            onClick={loadReports}
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

        {/* Stats */}

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-4xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl">
            <p className="text-sm text-slate-500">
              Total Reports
            </p>

            <h2 className="mt-2 text-3xl font-bold text-cyan-500">
              {reports.length}
            </h2>
          </div>

          <div className="rounded-4xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl">
            <p className="text-sm text-slate-500">
              Available Downloads
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-500">
              {reports.length}
            </h2>
          </div>
        </div>

        {/* Search */}

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
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

        {filteredReports.length === 0 && (
          <div className="rounded-4xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-2xl">
            <FileText className="mx-auto mb-4 h-14 w-14 text-cyan-500" />

            <h2 className="text-2xl font-semibold dark:text-white">
              No Reports Available
            </h2>

            <p className="mt-2 text-slate-500">
              Analyze MRI scans to generate reports.
            </p>
          </div>
        )}

        {/* Reports List */}

        <div className="grid gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
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
                    {report.filename}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-6">

                    <div>
                      <p className="text-sm text-slate-500">
                        Prediction
                      </p>

                      <p className="font-semibold capitalize text-cyan-500">
                        {report.prediction}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Confidence
                      </p>

                      <p className="font-semibold text-emerald-500">
                        {report.confidence.toFixed(2)}%
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Generated
                      </p>

                      <p className="flex items-center gap-2 dark:text-white">
                        <Calendar className="h-4 w-4" />
                        {new Date(
                          report.created_at
                        ).toLocaleString()}
                      </p>
                    </div>

                  </div>
                </div>

                <div>
                  <a
                    href={predictionService.getReportUrl(
                      report.report_url
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
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}