from PIL import Image
import os

images = [
    "assets/img/grade/grade-h2-1.jpg",
    "assets/img/grade/grade-h2-2.jpg",
    "assets/img/grade/grade-h2-3.jpg",
    "assets/img/gallery/mat_1.jpg",
    "assets/img/gallery/mat_2.jpg",
    "assets/img/gallery/mat_3.jpg",
    "assets/img/gallery/maternelle_3.jpg",
    "assets/img/gallery/maternelle_4.jpg"
]

root_dir = r"c:\Users\fasop\.gemini\antigravity\scratch\toddlyhtml-10"

for img_path in images:
    full_path = os.path.join(root_dir, img_path)
    if os.path.exists(full_path):
        with Image.open(full_path) as img:
            print(f"{img_path}: {img.width}x{img.height}")
    else:
        print(f"{img_path}: NOT FOUND")
