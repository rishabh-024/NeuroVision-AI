from model_loader import model

import os
import cv2
import numpy as np
import tensorflow as tf

from PIL import Image
from numpy.typing import NDArray
from tensorflow.keras.applications.efficientnet_v2 import preprocess_input

LAST_CONV_LAYER = "top_conv"

CLASS_NAMES = [
    "glioma",
    "meningioma",
    "notumor",
    "pituitary"
]


def generate_gradcam(image_path):
    """
    Generate Grad-CAM heatmap and overlay image.

    Args:
        image_path (str): Path of uploaded MRI image.

    Returns:
        dict: Prediction result and saved heatmap path.
    """

    img = Image.open(image_path)
    img = img.convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    preds = model.predict(img_array, verbose=0)

    predicted_class = np.argmax(preds[0])
    confidence = float(np.max(preds))

    grad_model = tf.keras.Model(
        inputs=model.input,
        outputs=[
            model.get_layer(LAST_CONV_LAYER).output,
            model.output
        ]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)

        class_channel = predictions[:, predicted_class]

    grads = tape.gradient(
        class_channel,
        conv_outputs
    )

    pooled_grads = tf.reduce_mean(
        grads,
        axis=(0, 1, 2)
    )

    conv_outputs = conv_outputs[0]

    pooled_grads = tf.expand_dims(pooled_grads, axis=-1)

    heatmap = tf.matmul(
        conv_outputs,
        pooled_grads
    )

    heatmap = tf.squeeze(heatmap)

    heatmap = tf.maximum(heatmap, 0)

    max_value = tf.math.reduce_max(heatmap)

    if max_value > 0:
        heatmap = heatmap / max_value

    heatmap = heatmap.numpy()

    original = cv2.imread(image_path)

    if original is None:
        raise ValueError(
            f"Could not read image: {image_path}"
        )

    original = cv2.resize(
        original,
        (224, 224)
    )

    heatmap_resized = np.ascontiguousarray(
        np.uint8(255 * cv2.resize(heatmap, (224, 224))),
        dtype=np.uint8
    )

    heatmap_color = cv2.applyColorMap(
        heatmap_resized,
        cv2.COLORMAP_JET
    )

    overlay = cv2.addWeighted(
        original,
        0.6,
        heatmap_color,
        0.4,
        0
    )

    filename = os.path.basename(image_path)

    output_path = os.path.join(
        "generated",
        filename
    )

    cv2.imwrite(
        output_path,
        overlay
    )

    filename = os.path.basename(output_path)

    return {
        "prediction": CLASS_NAMES[predicted_class],
        "confidence": round(confidence * 100, 2),
        "heatmap_url": f"/generated/{filename}"
    }