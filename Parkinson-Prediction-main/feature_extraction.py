import os
import numpy as np
import pandas as pd
from scipy.stats import skew, kurtosis
from PIL import Image

# Path to your dataset
dataset_path = "dataset/train/parkinson"

# Feature extraction function (20 features)
def extract_features(image_path):
    img = Image.open(image_path).convert("L")  # grayscale
    arr = np.array(img).flatten()  # flatten to 1D

    # histogram-based entropy
    hist, _ = np.histogram(arr, bins=256, range=(0, 255), density=True)
    entropy = -np.sum(hist * np.log2(hist + 1e-10))

    features = {
        "mean": np.mean(arr),
        "std": np.std(arr),
        "var": np.var(arr),
        "min": np.min(arr),
        "max": np.max(arr),
        "range": np.max(arr) - np.min(arr),
        "median": np.median(arr),
        "q1": np.percentile(arr, 25),
        "q3": np.percentile(arr, 75),
        "iqr": np.percentile(arr, 75) - np.percentile(arr, 25),
        "skewness": skew(arr),
        "kurtosis": kurtosis(arr),
        "energy": np.sum(arr**2),
        "entropy": entropy,
        "mad": np.mean(np.abs(arr - np.mean(arr))),
        "rms": np.sqrt(np.mean(arr**2)),
        "cov": np.std(arr) / (np.mean(arr) + 1e-10),
        "90th_percentile": np.percentile(arr, 90),
        "10th_percentile": np.percentile(arr, 10)
    }
    return features
# Collecting features
all_features = []
filenames = []

if not os.path.exists(dataset_path):
    print(f"❌ Dataset path not found: {dataset_path}")
else:
    for filename in os.listdir(dataset_path):
        if filename.lower().endswith((".png", ".jpg", ".jpeg")):
            file_path = os.path.join(dataset_path, filename)
            features = extract_features(file_path)
            for k, v in features.items():
                print(f"{k}: {v}")

            all_features.append(features)
            filenames.append(filename)

# Convert to DataFrame
df = pd.DataFrame(all_features, index=filenames)

output_dir = "features_output"
os.makedirs(output_dir, exist_ok=True) 

# Save to Excel
df.to_csv(os.path.join(output_dir, f"{dataset_path.split('/')[-1]}_features.csv"), index_label="filename")
df.to_excel(os.path.join(output_dir, f"{dataset_path.split('/')[-1]}_features.xlsx"), index_label="filename")

print("Feature extraction complete!")
print("Here are first 5 rows of extracted features:\n")
print(df.head())