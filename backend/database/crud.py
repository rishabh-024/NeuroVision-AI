from .database import SessionLocal
from .models import PredictionLog


def save_prediction(
    filename,
    prediction,
    confidence,
    heatmap_url
):

    db = SessionLocal()

    try:

        record = PredictionLog(
            filename=filename,
            prediction=prediction,
            confidence=confidence,
            heatmap_url=heatmap_url
        )

        db.add(record)

        db.commit()

        db.refresh(record)

        return record

    finally:

        db.close()


def get_predictions():

    db = SessionLocal()

    try:

        return (
            db.query(PredictionLog)
            .order_by(PredictionLog.id.desc())
            .all()
        )

    finally:

        db.close()


def get_prediction_by_id(prediction_id):

    db = SessionLocal()

    try:

        return (
            db.query(PredictionLog)
            .filter(
                PredictionLog.id == prediction_id
            )
            .first()
        )

    finally:

        db.close()