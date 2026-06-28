from pathlib import Path
from tensorflow.keras.models import load_model

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "checkpoints" / "best_model.keras"

model = load_model(MODEL_PATH)
print("Model loaded Successfully")