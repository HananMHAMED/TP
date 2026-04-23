# Système de recommandation d’images (Notebook)

## Description
Notebook Jupyter qui met en place un mini **système de recommandation d’images** : annotation automatique d’images (couleurs dominantes, orientation, catégorie de taille), simulation de profils utilisateurs, recommandations basées sur un modèle de classification, et tests d’intégrité.

## Technologies
- **Python (Notebook Jupyter)**
- **Pillow (PIL)** : lecture/traitement d’images
- **NumPy**
- **pandas**
- **scikit-learn** : `KMeans`, `LabelEncoder`, `RandomForestClassifier`
- **JSON** (stockage des métadonnées/labels/utilisateurs)

## Fonctionnalités
- **Annotation d’images** (`Hanan_Salma.ipynb`) :
  - orientation : paysage / portrait / carré
  - taille : vignette / moyenne / grande
  - couleurs dominantes via **KMeans** + mapping vers des noms de couleurs “basiques”
  - production de `data/images_labels.json` à partir de `data/images_metadata.json` et du dossier `images/`
- **Utilisateurs & profils** :
  - simulation de favoris (échantillonnage aléatoire)
  - construction de profils (couleurs, orientation, taille, tags) et sauvegarde dans `data/users.json`
  - analyse simple avec `pandas` (tendances globales)
  - bonus : clustering des utilisateurs (KMeans + vectorisation de texte)
- **Recommandation** :
  - préparation de features pour toutes les images (orientation, taille, couleur principale)
  - recommandation via **RandomForestClassifier** entraîné “favori vs non favori” par utilisateur
  - renvoie des tuples `(image, raison)` basés sur les features
- **Tests** :
  - `test_data_integrity()` : >= 100 images annotées, existence des fichiers, cohérence des champs et RGB
  - `test_recommendation_system()` : 5 recommandations, pas déjà en favoris, au moins une couleur match

## Installation
Le notebook s’appuie sur la structure :
- `data/images_metadata.json`
- `data/images_labels.json` (généré par le notebook)
- `data/users.json` (généré par le notebook)
- dossier `images/` (référencé dans le notebook)

Exécution :
- Ouvrir `Hanan_Salma.ipynb` et exécuter les cellules dans l’ordre.

## Ce que démontre le projet (compétences)
- Pipeline data → **features** → **modèle ML** → **recommandations**.
- Traitement d’images (PIL) + **clustering** (KMeans) + **classification** (RandomForest).
- Structuration des données (JSON) et contrôles qualité via tests (assert).

## Améliorations possibles
- Remplacer la simulation de favoris (aléatoire) par une génération basée sur des préférences réelles (matching tags/couleurs).
- Enrichir les features (multi-couleurs, tags, texte) et ajouter une vraie évaluation (métriques, split train/test).
- Extraire le code du notebook en modules Python (réutilisable, testable) et ajouter un `requirements.txt`.
