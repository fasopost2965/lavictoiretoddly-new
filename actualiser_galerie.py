import os
import re

def update_gallery():
    # Dossiers cibles
    directories = ['.', 'download version']
    gallery_dir = os.path.join('.', 'assets', 'img', 'gallery')
    
    # Prefix mapping for categories (prefix -> (class, label))
    category_map = {
        'mat': ('cat-maternelle', 'Maternelle'),
        'maternelle': ('cat-maternelle', 'Maternelle'),
        'coran': ('cat-coran', 'Cours de Coran'),
        'cours': ('cat-cours', 'Salles de Cours'),
        'equipe': ('cat-equipe', 'L\'équipe'),
        'transport': ('cat-transport', 'Transport'),
        'sortie': ('cat-sorties', 'Sorties Scolaires'),
        'evenements': ('cat-evenements', 'Événements'),
        'viescolaire': ('cat-viescolaire', 'Vie Scolaire'),
        'info': ('cat-info', 'Informatique'),
        'informatique': ('cat-info', 'Informatique'),
        'vieecole': ('cat-vieecole', 'Vie à l\'école'),
        'classes': ('cat-classes', 'Salles Vides'),
        'animations': ('cat-animations', 'Animations')
    }

    # Lire les images
    images_html = []
    if os.path.exists(gallery_dir):
        # Trier les images pour un ordre prévisible
        all_imgs = sorted([f for f in os.listdir(gallery_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))])
        
        for img in all_imgs:
            cat_class = ""
            cat_label = ""
            for prefix, (c_class, c_label) in category_map.items():
                if img.lower().startswith(prefix):
                    cat_class = c_class
                    cat_label = c_label
                    break
            
            # Si pas de prefixe reconnu, on ignore ou on met dans une catégorie par défaut
            if cat_class:
                html_block = f'        <div class="vs-gallery {cat_class}"><div class="vs-gallery__figure"><img src="assets/img/gallery/{img}" alt="{cat_label}" class="vs-gallery__image" loading="lazy"></div><div class="vs-gallery__hover"><a href="assets/img/gallery/{img}" class="vs-gallery__icon popup-image"><i class="fa-solid fa-eye"></i></a><a href="javascript:void(0)" class="vs-gallery__cate">{cat_label}</a></div></div>'
                images_html.append(html_block)

    new_html_content = "\n".join(images_html)

    # Actualiser les 2 fichiers gallery.html
    for d in directories:
        filepath = os.path.join(d, 'gallery.html')
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Trouver le conteneur de la galerie
        pattern = r'(<div class="vs-gallery--row filter-container">).*?(      </div>\s*<div class="d-flex justify-content-center pt-50">)'
        
        if re.search(pattern, content, re.DOTALL):
            new_content = re.sub(
                pattern, 
                f'\\1\n{new_html_content}\n\\2', 
                content, 
                flags=re.DOTALL
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"[Succès] {filepath} a été actualisé.")
        else:
            print(f"[Erreur] Impossible de trouver la section de la galerie dans {filepath}.")

if __name__ == '__main__':
    print("Actualisation de la galerie en cours...")
    update_gallery()
    print("Terminé ! Appuyez sur Entrée pour quitter.")
    input()
