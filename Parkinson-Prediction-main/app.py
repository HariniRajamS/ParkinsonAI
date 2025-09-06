from flask import Flask, request, render_template_string
import cv2, numpy as np, joblib
import matplotlib.pyplot as plt
import base64, io
from skimage.feature import graycomatrix, graycoprops

app = Flask(__name__)
model = joblib.load("parkinson_model.pkl")

# Feature extraction
def extract_features(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.resize(img, (128, 128))
    mean, std, var, min_val, max_val = np.mean(img), np.std(img), np.var(img), np.min(img), np.max(img)
    glcm = graycomatrix(img, [1], [0], 256, symmetric=True, normed=True)
    contrast = graycoprops(glcm, 'contrast')[0, 0]
    homogeneity = graycoprops(glcm, 'homogeneity')[0, 0]
    energy = graycoprops(glcm, 'energy')[0, 0]
    correlation = graycoprops(glcm, 'correlation')[0, 0]
    hist = cv2.calcHist([img], [0], None, [16], [0, 256]).flatten()
    hist = hist / np.sum(hist)
    features = [mean, std, var, min_val, max_val, contrast, homogeneity, energy, correlation]
    features.extend(hist.tolist())
    return np.array(features).reshape(1, -1)

# HTML template
html = """
<!doctype html>
<title>Parkinson Detector</title>
<h1>Upload Spiral Image</h1>
<form method=post enctype=multipart/form-data>
  <input type=file name=file>
  <input type=submit value=Upload>
</form>
{% if prediction %}
  <h2>Prediction: {{ prediction }}</h2>
  <h2>Feature Visualization:</h2>
  <img src="data:image/png;base64,{{ plot_url }}">
{% endif %}
"""

@app.route("/", methods=["GET", "POST"])
def upload():
    prediction = None
    plot_url = None
    if request.method == "POST":
        file = request.files["file"]
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

        features = extract_features(img)
        pred = model.predict(features)[0]
        prediction = "Healthy" if pred == "Healthy" else "Parkinson"

        # Visualization (bar plot)
        plt.figure(figsize=(10,5))
        plt.bar(range(len(features[0])), features[0])
        plt.title("Feature Distribution")
        plt.xlabel("Feature Index")
        plt.ylabel("Value")
        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        plot_url = base64.b64encode(buf.getvalue()).decode("utf-8")
        plt.close()

    return render_template_string(html, prediction=prediction, plot_url=plot_url)

if __name__ == "__main__":
    app.run(debug=True)
