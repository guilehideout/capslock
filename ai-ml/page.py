from flask import Flask, request, render_template_string
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

# Load trained model
MODEL_PATH = "models/mangrove_classifier.h5"
model = load_model(MODEL_PATH)

# Flask app
app = Flask(__name__)

# Simple HTML form
HTML_TEMPLATE = """
<!doctype html>
<title>Mangrove Classifier</title>
<h1>Upload an image to classify</h1>
<form method=post enctype=multipart/form-data>
  <input type=file name=file>
  <input type=submit value=Upload>
</form>
<p>{{ result }}</p>
"""

# Preprocess uploaded image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # add batch dim
    img_array = img_array / 255.0  # normalize like training
    return img_array

@app.route("/", methods=["GET", "POST"])
def upload_file():
    result = ""
    if request.method == "POST":
        if "file" not in request.files:
            result = "No file uploaded"
        else:
            file = request.files["file"]
            if file.filename == "":
                result = "No file selected"
            else:
                filepath = os.path.join("uploads", file.filename)
                os.makedirs("uploads", exist_ok=True)
                file.save(filepath)

                # Preprocess + predict
                img_array = preprocess_image(filepath)
                pred = model.predict(img_array)[0][0]

                if pred > 0.5:
                    result = "Not Mangrove"   # flipped
                else:
                    result = "Mangrove"       # flipped


    return render_template_string(HTML_TEMPLATE, result=result)

if __name__ == "__main__":
    app.run(debug=True)
