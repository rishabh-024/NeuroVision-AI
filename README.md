# 🧠 NeuroVision AI

> An AI-powered medical imaging platform that detects brain tumors from MRI scans using Deep Learning, provides explainable AI visualizations with Grad-CAM, generates medical reports, and maintains prediction history through a modern full-stack architecture.

---

# 📖 Overview

NeuroVision AI is a full-stack AI application designed to assist medical professionals in analyzing brain MRI scans.

The system combines Deep Learning, Explainable AI, REST APIs, and modern web technologies to provide:

* Brain tumor classification
* Explainable AI visualization
* Automated report generation
* Prediction history management
* Modern healthcare dashboard

> **Disclaimer:** This project is intended for educational and research purposes only and should not be used as a substitute for professional medical diagnosis.

---

# ✨ Features

## 🤖 AI-Based Brain Tumor Classification

Detects four MRI classes:

* Glioma
* Meningioma
* Pituitary Tumor
* No Tumor

---

## 🧠 Explainable AI (Grad-CAM)

Generates Grad-CAM heatmaps to highlight image regions influencing the model's prediction, improving transparency and interpretability.

---

## 📊 Medical Report Generation

Automatically generates downloadable PDF reports containing:

* MRI filename
* Predicted tumor class
* Confidence score
* Grad-CAM visualization
* Analysis timestamp

---

## 📚 Prediction History

Stores every prediction inside PostgreSQL, allowing users to:

* View previous analyses
* Download reports
* Access Grad-CAM visualizations
* Track historical predictions

---

## 🌐 REST API

Backend developed with FastAPI providing endpoints for:

* MRI upload
* AI prediction
* Grad-CAM generation
* Prediction history
* Report download

---

## 💻 Modern Frontend

Built using:

* React
* TypeScript
* Tailwind CSS
* Framer Motion

Features:

* Drag & Drop MRI upload
* Real-time analysis
* Interactive dashboard
* Glassmorphism UI
* Responsive design

---

# 🏗️ System Architecture

```text
                React Frontend
                       │
                       ▼
                FastAPI Backend
                       │
      ┌────────────────┼────────────────┐
      ▼                ▼                ▼
 Prediction      Grad-CAM Service   Report Generator
      │                │                │
      └────────────────┼────────────────┘
                       ▼
                 PostgreSQL Database
                       │
                       ▼
          MRI Images • Heatmaps • Reports
```

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Axios

## Backend

* FastAPI
* Python
* Uvicorn
* Pydantic

## AI / Machine Learning

* TensorFlow
* EfficientNetV2B0
* OpenCV
* NumPy
* Pillow
* Grad-CAM

## Database

* PostgreSQL
* SQLAlchemy

## Report Generation

* ReportLab

---

# 🧠 Model Information

| Property       | Value            |
| -------------- | ---------------- |
| Model          | EfficientNetV2B0 |
| Framework      | TensorFlow       |
| Classes        | 4                |
| Input Size     | 224 × 224        |
| Explainability | Grad-CAM         |
| Test Accuracy  | **81.68%**       |

---

# 📂 Project Structure

```text
NeuroVisionAI/
│
├── backend/
│   ├── app.py
│   ├── predictor.py
│   ├── gradcam.py
│   ├── model_loader.py
│   ├── database/
│   ├── uploads/
│   ├── generated/
│   └── reports/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── checkpoints/
│   └── best_model.keras
│
├── dataset/
│
├── requirements.txt
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/rishabh-024/neurovision-ai.git
cd neurovision-ai
```

---

## Backend Setup

```bash
cd backend

pip install -r ../requirements.txt

uvicorn app:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 📡 API Endpoints

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| GET    | `/`        | Health Check        |
| POST   | `/predict` | Predict Brain Tumor |
| POST   | `/gradcam` | Generate Grad-CAM   |
| GET    | `/history` | Prediction History  |

---

# 📈 Future Improvements

* AI-powered clinical insights using LLMs
* Patient management system
* Authentication & authorization
* Cloud deployment
* Docker support
* CI/CD pipeline
* DICOM image support
* Model monitoring
* Multi-user dashboard

---

# 👨‍💻 Author

**Rishabh Giri**

B.Tech – Artificial Intelligence & Machine Learning

* GitHub: https://github.com/rishabh-024/
* LinkedIn: https://www.linkedin.com/in/rishabh-giri-rg024/

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you found this project helpful:

⭐ Star the repository
🍴 Fork it
🧠 Contribute improvements
💬 Share feedback
