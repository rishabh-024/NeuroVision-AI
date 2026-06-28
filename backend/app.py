from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from predictor import predict_image
from gradcam import generate_gradcam
from database import engine, Base
from database.crud import save_prediction, get_predictions
from database.schemas import PredictionResponse
from fastapi.staticfiles import StaticFiles
from reports.report_generator import generate_report
from fastapi.staticfiles import StaticFiles

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Brain Tumor Detector API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def health():

    return {
        "status": "running"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    try: 
        allowed_extensions = (
            ".jpg",
            ".jpeg",
            ".png"
        )

        filename = file.filename or ""
        extension = os.path.splitext(filename)[1].lower()

        if extension not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only JPG, JPEG, and PNG files are allowed."
            )

        save_path = f"uploads/{file.filename}"

        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        result = predict_image(save_path)
        return result
    
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


@app.post("/gradcam")
async def gradcam(
    file: UploadFile = File(...)
):

    save_path = f"uploads/{file.filename}"

    with open(
        save_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = generate_gradcam(
        save_path
    )

    save_prediction(
        filename=file.filename,
        prediction=result["prediction"],
        confidence=result["confidence"],
        heatmap_url=result["heatmap_url"]
    )

    pdf_path = generate_report(
        filename=file.filename,
        prediction=result["prediction"],
        confidence=result["confidence"],
        heatmap_url=f"generated/{file.filename}"
    )

    result["report_url"] = (
        f"/{pdf_path}"
    )

    return result


@app.get(
    "/history",
    response_model=list[PredictionResponse]
)
def history():

    return get_predictions()


app.mount(
    "/generated",
    StaticFiles(directory="generated"),
    name="generated"
)

app.mount(
    "/reports",
    StaticFiles(directory="reports"),
    name="reports"
)