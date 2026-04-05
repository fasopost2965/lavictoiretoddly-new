import os

# Specific strings and sequences found in the audit
fixes = [
    # Metadata and Titles
    ("Our PreL'école Classes", "Nos Classes de Maternelle"),
    ("PreL'école HTML5 Template", "École La Victoire - Maternelle & Primaire"),
    
    # Broken Encodings (Symptom-based)
    ("Ã—", "×"),
    ("Ã¢ge", "âge"),
    ("â€“", "–"),
    ("â€”", "—"),
    ("Ã©", "é"),
    ("Ã¨", "è"),
    ("Ã ", "à"),
    ("Ã¢", "â"),
    ("Â°", "°"),
    ("Ãª", "ê"),
    ("Ã´", "ô"),
    ("Ã»", "û"),
    ("Ã®", "î"),
    ("Ã¯", "ï"),
    ("Ã§", "ç"),
    ("Ã€", "À"),
    ("Ã‰", "É"),
    ("Ãˆ", "È"),
    ("Ã‚", "Â"),
    ("Ã”", "Ô"),
    ("Ã‹", "Ë"),
    ("Ã‡", "Ç"),
]

def clean_file(filepath):
    # Try different encodings if UTF-8 fails or gives weird results
    content = None
    encodings = ['utf-8', 'latin-1', 'cp1252']
    
    for encoding in encodings:
        try:
            with open(filepath, 'r', encoding=encoding) as f:
                content = f.read()
                current_encoding = encoding
                break
        except UnicodeDecodeError:
            continue
    
    if content is None:
        return False
    
    original_content = content
    
    # Apply all fixes
    for broken, fixed in fixes:
        content = content.replace(broken, fixed)
    
    if content != original_content:
        # Always write back as UTF-8
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

root_dir = r"c:\Users\fasop\.gemini\antigravity\scratch\toddlyhtml-10"
fixed_count = 0

for root, dirs, files in os.walk(root_dir):
    if any(ignore in root for ignore in ["assets", "node_modules", ".git"]):
        continue
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            if clean_file(filepath):
                fixed_count += 1
                print(f"Cleaned: {filepath}")

print(f"Total files cleaned: {fixed_count}")
