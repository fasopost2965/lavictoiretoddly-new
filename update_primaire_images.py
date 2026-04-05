import os
import re

BASE_ROOT = r'c:\Users\fasop\.gemini\antigravity\scratch\toddlyhtml-10'

# Target both images per class page for primaire (CP to 6eme)
# Strategy: find the 2 gallery imgs currently in each file and replace with new ones
CLASS_TARGETS = {
    'classe-cp.html':  ('../assets/img/gallery/classes_1.jpg',       '../assets/img/gallery/viescolaire_1.jpeg'),
    'classe-ce1.html': ('../assets/img/gallery/classes_3.jpg',       '../assets/img/gallery/viescolaire_2.jpeg'),
    'classe-ce2.html': ('../assets/img/gallery/cours_1.jpg',         '../assets/img/gallery/viescolaire_3.jpeg'),
    'classe-cm1.html': ('../assets/img/gallery/cours_3.jpg',         '../assets/img/gallery/informatique_1.jpg'),
    'classe-cm2.html': ('../assets/img/gallery/informatique_3.jpg',  '../assets/img/gallery/viescolaire_5.jpeg'),
    'classe-6eme.html':('../assets/img/gallery/viescolaire_7.jpeg',  '../assets/img/gallery/evenements_1.jpg'),
}

# Pattern to find the 2 content images in the blog section (not gallery section)
# These are inside vs-blog__img--figure and the second figure row
IMG1_PATTERN = re.compile(r'(<img src=")(\.\./assets/img/gallery/[^"]+)(" alt="vs blog" class="vs-blog__img")')
IMG2_PATTERN = re.compile(r'(<figure>\s*<img src=")(\.\./assets/img/gallery/[^"]+)(" alt="blog Details Image">)')

for label, base_dir in [('root', os.path.join(BASE_ROOT, 'classes')),
                         ('download', os.path.join(BASE_ROOT, 'download version', 'classes'))]:
    for filename, (new1, new2) in CLASS_TARGETS.items():
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            print(f'NOT FOUND [{label}]: {filename}')
            continue
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        original = content

        # Replace the first content image (main header image)
        content = IMG1_PATTERN.sub(lambda m: m.group(1) + new1 + m.group(3), content, count=1)
        # Replace the second content image (inline figure)
        content = IMG2_PATTERN.sub(lambda m: m.group(1) + new2 + m.group(3), content, count=1)

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'UPDATED [{label}]: {filename}')
            print(f'   img1 -> {new1}')
            print(f'   img2 -> {new2}')
        else:
            print(f'NO CHANGE [{label}]: {filename}  <-- check patterns')

print('Done.')
