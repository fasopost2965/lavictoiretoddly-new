import os

ROOT = r"c:\Users\fasop\.gemini\antigravity\scratch\toddlyhtml-10"

# ============================================================
# 1. CYCLE-MATERNELLE: Replace 4 fake team members with 3 real ones
# ============================================================
MATERNELLE_TEAM_OLD = '''          <div class="row">
           <div class="col-lg-3 col-md-6 wow animate__fadeInUp" data-wow-delay="0.20s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-1-1.jpg" alt="Éducatrice">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Fatima Zahra El Amrani</a>
                   <a class="vs-team__share--hover" href=""><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Directrice Maternelle</span>
               </div>
               <ul class="vs-team__share--list">
                 <li>
                   <a href="#" target="_blank">
                     <i class="fa-brands fa-facebook-f"></i>
                   </a>
                 </li>
                 <li>
                   <a href="ht#" target="_blank">
                     <i class="fa-brands fa-instagram"></i>
                   </a>
                 </li>
                 <li>
                   <a href="#" target="_blank">
                     <i class="fa-brands fa-linkedin-in"></i>
                   </a>
                 </li>
               </ul>
             </div>
           </div>
           <div class="col-lg-3 col-md-6 wow animate__fadeInUp" data-wow-delay="0.20s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-1-2.jpg" alt="Éducatrice">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Nadia Benchrif</a>
                   <a class="vs-team__share--hover" href=""><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Professeur d'Art</span>
               </div>
               <ul class="vs-team__share--list">
                 <li>
                   <a href="#" target="_blank">
                     <i class="fa-brands fa-facebook-f"></i>
                   </a>
                 </li>
                 <li>
                   <a href="ht#" target="_blank">
                     <i class="fa-brands fa-instagram"></i>
                   </a>
                 </li>
                 <li>
                   <a href="#" target="_blank">
                     <i class="fa-brands fa-linkedin-in"></i>
                   </a>
                 </li>
               </ul>
             </div>
           </div>
           <div class="col-lg-3 col-md-6 wow animate__fadeInUp" data-wow-delay="0.20s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-1-3.jpg" alt="Éducatrice">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Salma Ouali</a>
                   <a class="vs-team__share--hover" href=""><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Éducatrice</span>
               </div>
               <ul class="vs-team__share--list">
                 <li>
                   <a href="#" target="_blank">
                     <i class="fa-brands fa-facebook-f"></i>
                   </a>
                 </li>
                 <li>
                   <a href="ht#" target="_blank">
                     <i class="fa-brands fa-instagram"></i>
                   </a>
                 </li>
                 <li>
                   <a href="#" target="_blank">
                     <i class="fa-brands fa-linkedin-in"></i>
                   </a>
                 </li>
               </ul>
             </div>
           </div>
           <div class="col-lg-3 col-md-6 wow animate__fadeInUp" data-wow-delay="0.20s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-1-4.jpg" alt="Éducatrice">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Khadija Moussaoui</a>
                   <a class="vs-team__share--hover" href=""><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Éducatrice</span>
               </div>
               <ul class="vs-team__share--list">
                 <li>
                   <a href="#" target="_blank">
                     <i class="fa-brands fa-facebook-f"></i>
                   </a>
                 </li>
                 <li>
                   <a href="ht#" target="_blank">
                     <i class="fa-brands fa-instagram"></i>
                   </a>
                 </li>
                 <li>
                   <a href="#" target="_blank">
                     <i class="fa-brands fa-linkedin-in"></i>
                   </a>
                 </li>
               </ul>
             </div>
           </div>
         </div>'''

MATERNELLE_TEAM_NEW = '''          <div class="row justify-content-center">
           <div class="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.15s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-23.png" alt="Wassima Jamhoun">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Wassima Jamhoun</a>
                   <a class="vs-team__share--hover" href="notre-equipe.html"><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Directrice Maternelle</span>
               </div>
               <ul class="vs-team__share--list">
                 <li><a href="https://www.facebook.com/EcoleLaVictoireEnseignementPrive" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                 <li><a href="https://www.instagram.com/ecole.la.victoire" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
               </ul>
             </div>
           </div>
           <div class="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.25s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-14.png" alt="Khouloud Zerrouk">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Khouloud Zerrouk</a>
                   <a class="vs-team__share--hover" href="notre-equipe.html"><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Éducatrice Maternelle</span>
               </div>
               <ul class="vs-team__share--list">
                 <li><a href="https://www.facebook.com/EcoleLaVictoireEnseignementPrive" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                 <li><a href="https://www.instagram.com/ecole.la.victoire" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
               </ul>
             </div>
           </div>
           <div class="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.35s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-20.png" alt="Najoua El Bakkali">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Najoua El Bakkali</a>
                   <a class="vs-team__share--hover" href="notre-equipe.html"><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Éducatrice Maternelle</span>
               </div>
               <ul class="vs-team__share--list">
                 <li><a href="https://www.facebook.com/EcoleLaVictoireEnseignementPrive" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                 <li><a href="https://www.instagram.com/ecole.la.victoire" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
               </ul>
             </div>
           </div>
         </div>'''

# ============================================================
# 2. CYCLE-PRIMAIRE: Same structure but with Primaire teachers
# ============================================================
PRIMAIRE_TEAM_OLD = MATERNELLE_TEAM_OLD  # Same placeholder HTML

PRIMAIRE_TEAM_NEW = '''          <div class="row justify-content-center">
           <div class="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.15s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-5.png" alt="El Yazid Slimani">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">El Yazid Slimani</a>
                   <a class="vs-team__share--hover" href="notre-equipe.html"><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Enseignant CP</span>
               </div>
               <ul class="vs-team__share--list">
                 <li><a href="https://www.facebook.com/EcoleLaVictoireEnseignementPrive" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                 <li><a href="https://www.instagram.com/ecole.la.victoire" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
               </ul>
             </div>
           </div>
           <div class="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.25s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-12.png" alt="Karima Laakel">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Karima Laakel</a>
                   <a class="vs-team__share--hover" href="notre-equipe.html"><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Enseignante CE1</span>
               </div>
               <ul class="vs-team__share--list">
                 <li><a href="https://www.facebook.com/EcoleLaVictoireEnseignementPrive" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                 <li><a href="https://www.instagram.com/ecole.la.victoire" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
               </ul>
             </div>
           </div>
           <div class="col-lg-4 col-md-6 wow animate__fadeInUp" data-wow-delay="0.35s">
             <div class="vs-team vs-team--style2">
               <div class="vs-team__img">
                 <a href="notre-equipe.html">
                   <img src="assets/img/team/team-4.png" alt="Aya El Moussaty">
                 </a>
               </div>
               <div class="vs-team__content">
                 <h3 class="vs-team__heading">
                   <a href="notre-equipe.html">Aya El Moussaty</a>
                   <a class="vs-team__share--hover" href="notre-equipe.html"><i class="fa-solid fa-share-nodes"></i></a>
                 </h3>
                 <span class="vs-team__role">Enseignante CE2</span>
               </div>
               <ul class="vs-team__share--list">
                 <li><a href="https://www.facebook.com/EcoleLaVictoireEnseignementPrive" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                 <li><a href="https://www.instagram.com/ecole.la.victoire" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
               </ul>
             </div>
           </div>
         </div>'''

# ============================================================
# 3. CLASS PAGES: Map each class to contextual gallery images
# ============================================================
CLASS_IMAGE_MAP = {
    "classe-ps.html":  ("../assets/img/gallery/mat_1.jpg",  "../assets/img/gallery/mat_2.jpg"),
    "classe-ms.html":  ("../assets/img/gallery/mat_3.jpg",  "../assets/img/gallery/mat_4.jpg"),
    "classe-gs.html":  ("../assets/img/gallery/mat_5.jpg",  "../assets/img/gallery/mat_6.jpg"),
    "classe-cp.html":  ("../assets/img/gallery/classes_1.jpg", "../assets/img/gallery/classes_2.jpg"),
    "classe-ce1.html": ("../assets/img/gallery/classes_3.jpg", "../assets/img/gallery/classes_4.jpg"),
    "classe-ce2.html": ("../assets/img/gallery/classes_5.jpg", "../assets/img/gallery/classes_6.jpg"),
    "classe-cm1.html": ("../assets/img/gallery/classes_7.jpg", "../assets/img/gallery/classes_8.jpg"),
    "classe-cm2.html": ("../assets/img/gallery/classes_9.jpg", "../assets/img/gallery/cours_1.jpg"),
    "classe-6eme.html":("../assets/img/gallery/cours_2.jpg",   "../assets/img/gallery/cours_3.jpg"),
}

def update_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

updated = []

# Update cycle-maternelle.html (root)
mat_root = os.path.join(ROOT, "cycle-maternelle.html")
if update_file(mat_root, [(MATERNELLE_TEAM_OLD, MATERNELLE_TEAM_NEW)]):
    updated.append("cycle-maternelle.html")

# Update cycle-maternelle.html (download version)
mat_dl = os.path.join(ROOT, "download version", "cycle-maternelle.html")
if update_file(mat_dl, [(MATERNELLE_TEAM_OLD, MATERNELLE_TEAM_NEW)]):
    updated.append("download version/cycle-maternelle.html")

# Update cycle-primaire.html (root)
prim_root = os.path.join(ROOT, "cycle-primaire.html")
if update_file(prim_root, [(PRIMAIRE_TEAM_OLD, PRIMAIRE_TEAM_NEW)]):
    updated.append("cycle-primaire.html")

# Update cycle-primaire.html (download version)
prim_dl = os.path.join(ROOT, "download version", "cycle-primaire.html")
if update_file(prim_dl, [(PRIMAIRE_TEAM_OLD, PRIMAIRE_TEAM_NEW)]):
    updated.append("download version/cycle-primaire.html")

# Update class pages images
classes_dir = os.path.join(ROOT, "classes")
for filename, (img1, img2) in CLASS_IMAGE_MAP.items():
    filepath = os.path.join(classes_dir, filename)
    if os.path.exists(filepath):
        replacements = [
            ("../assets/img/class/class-details-big-image-1.jpg", img1),
            ("../assets/img/class/class-details-big-image-2.jpg", img2),
        ]
        if update_file(filepath, replacements):
            updated.append(f"classes/{filename}")

print(f"Updated {len(updated)} files:")
for f in updated:
    print(f"  - {f}")
