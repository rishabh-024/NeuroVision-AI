import numpy as np

from PIL import Image

from tensorflow.keras.applications.efficientnet_v2 import preprocess_input

from model_loader import model


CLASS_NAMES = [
    "glioma",
    "meningioma",
    "notumor",
    "pituitary"
]


def predict_image(image_path):

    img = Image.open(image_path)

    img = img.convert("RGB")

    img = img.resize((224, 224))

    img_array = np.array(img)

    img_array = np.expand_dims(
        img_array,
        axis=0
    )

    img_array = preprocess_input(img_array)

    preds = model.predict(
        img_array,
        verbose=0
    )

    class_index = np.argmax(preds)

    confidence = float(
        np.max(preds)
    )

    if confidence >= 0.90:
        level = "high"

    elif confidence >= 0.70:
        level = "medium"

    else:
        level = "low"

    return {
        "prediction": CLASS_NAMES[class_index],
        "confidence": round(confidence * 100, 2),
        "confidence_level": level
    }