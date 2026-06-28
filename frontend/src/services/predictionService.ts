import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  heatmap_url?: string;
  report_url?: string;
  created_at?: string;
}

export interface HistoryItem {
  id: number;
  filename: string;
  prediction: string;
  confidence: number;
  heatmap_url?: string;
  report_url?: string;
  created_at: string;
}

class PredictionService {
  async analyzeMRI(
    file: File
  ): Promise<PredictionResponse> {
    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await axios.post<PredictionResponse>(
        `${API_BASE_URL}/gradcam`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  }

  async getHistory(): Promise<
    HistoryItem[]
  > {
    const response =
      await axios.get<HistoryItem[]>(
        `${API_BASE_URL}/history`
      );

    return response.data;
  }

  getHeatmapUrl(
    heatmapUrl?: string
  ): string {
    if (!heatmapUrl) return "";

    return `${API_BASE_URL}${heatmapUrl}`;
  }

  getReportUrl(
    reportUrl?: string
  ): string {
    if (!reportUrl) return "";

    return `${API_BASE_URL}${reportUrl}`;
  }
}

export default new PredictionService();
