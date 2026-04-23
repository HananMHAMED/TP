# Space Invaders (Python / Tkinter)

## Description
Jeu “Space Invaders” réalisé en **Python** avec une interface **Tkinter** : vaisseau contrôlé au clavier, aliens en formation, projectiles, protections, score et gestion de fin de partie.

## Technologies
- **Python**
- **Tkinter** (GUI, canvas, boucle d’événements)

## Fonctionnalités
- **Lancement du jeu** : `main.py` crée une fenêtre Tk et instancie `Fenetre` puis `Jeu`.
- **UI** : canvas avec image de fond, affichage du score, boutons (Démarrer, New game, Quit).
- **Gameplay** (dans `Class_jeu.py`) :
  - génération d’aliens en grille (4×8)
  - déplacement horizontal avec descente au bord d’écran
  - tir du joueur (touche `space`) + tirs aléatoires des aliens
  - collisions (projectiles ↔ aliens / protections / vaisseau)
  - score (+10 par alien) et gestion de la défaite (vies, aliens trop bas)
  - boucle de jeu via `after(30, ...)`

## Installation
Prérequis : Python avec Tkinter.

Exécution :
- Lancer `main.py`.

Remarque : `Class_Fenetre.py` charge une image de fond `tp4-image.gif` (référencée dans le code).

## Ce que démontre le projet (compétences)
- Conception orientée objets (séparation **fenêtre / logique de jeu / entités**).
- **Boucle de jeu** et synchronisation avec l’event loop Tkinter (`after`).
- Gestion de collisions et mise à jour d’état (score, vies, listes d’objets).

## Améliorations possibles
- Ajouter un **écran de pause**, des niveaux/difficulté et un système de high-score persistant.
- Améliorer la robustesse des collisions (hitboxes, suppression sécurisée des objets) et la structure (typing, tests).
- Externaliser les constantes (vitesses, dimensions) et gérer proprement les assets (chemins relatifs).
