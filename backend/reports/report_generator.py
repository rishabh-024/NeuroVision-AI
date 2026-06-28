from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image
)

from reportlab.lib.styles import getSampleStyleSheet

import os


def generate_report(
    filename,
    prediction,
    confidence,
    heatmap_url
):

    report_name = (
        f"reports/{os.path.splitext(filename)[0]}.pdf"
    )

    doc = SimpleDocTemplate(report_name)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "Brain Tumor Detection Report",
            styles["Title"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            f"<b>Filename:</b> {filename}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Prediction:</b> {prediction}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Confidence:</b> {confidence:.2f}%",
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            "Grad-CAM Visualization",
            styles["Heading2"]
        )
    )

    content.append(
        Image(
            heatmap_url,
            width=300,
            height=300
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            f"The AI model predicts "
            f"{prediction} with "
            f"{confidence:.2f}% confidence.",
            styles["Normal"]
        )
    )

    doc.build(content)

    return report_name