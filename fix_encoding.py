import os

# Byte-level mapping of broken characters (common when double or triple encoded)
# Example: 0xc3 0x83 0xc2 0x97 -> Ã + \u0097 -> ×
# Example: 0xc3 0xa2 0xc2 0x80 0xc2 0x93 -> â + \u2013 -> – (en-dash)

replacements = {
    # Encoding artifacts
    b'\xc3\x83\xc2\x97': b'\xc3\x97',  # × (multiplication sign)
    b'\xc3\xa2\xc2\x80\xc2\x93': b'\xe2\x80\x93', # – (en-dash)
    b'\xce\x91': b'', # Sometimes unwanted chars
}

# String fixes approved by user
string_fixes = {
    "Our PreL'école Classes": "Nos Classes de Maternelle",
    "PreL'école HTML5 Template": "École La Victoire - Maternelle & Primaire"
}

def fix_file(filepath):
    try:
        # Read as binary to handle all weird combinations
        with open(filepath, 'rb') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return False
    
    original_content = content
    
    # 1. Byte replacements
    for broken, fixed in replacements.items():
        content = content.replace(broken, fixed)
    
    # 2. String fixes (convert to bytes first)
    for broken, fixed in string_fixes.items():
        content = content.replace(broken.encode('utf-8'), fixed.encode('utf-8'))
    
    # 3. Known single-stage artifacts
    # (These might have been missed if the script itself was interpreted differently)
    # Ã¢ge -> âge
    content = content.replace(b'\xc3\x83\xc2\xa2ge', b'\xc3\xa2ge')
    content = content.replace(b'\xc3\xa2ge', b'\xc3\xa2ge') # No change, but for safety
    
    # Let's handle the specific Ã¢ge sequence carefully
    # Ã¢ge in double-encoding often results in 0xc3 0x83 0xc2 0xa2 0x67 0x65
    content = content.replace(b'\xc3\x83\xc2\xa2', b'\xc3\xa2') # General Ã¢ -> â
    
    if content != original_content:
        with open(filepath, 'wb') as f:
            f.write(content)
        return True
    return False

root_dir = r"c:\Users\fasop\.gemini\antigravity\scratch\toddlyhtml-10"
fixed_count = 0

for root, dirs, files in os.walk(root_dir):
    if "assets" in root or "node_modules" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            if fix_file(filepath):
                fixed_count += 1
                print(f"Updated: {filepath}")

print(f"Total files updated: {fixed_count}")
