# Pokédex (PokeAPI)

## Description
Mini “Pokédex” en site statique : au clic sur un bouton, l’application charge 100 Pokémon et affiche une grille (sprite + nom en français + numéro).

## Technologies
- **HTML / CSS / JavaScript**
- **Fetch API**
- **PokeAPI** (endpoint `pokemon-species`)
- **Sprites GitHub** (URL des images “dream-world”)

## Fonctionnalités
- **Chargement au clic** : bouton “Afficher les Pokemon!” déclenche `afficher()` (`index.html` → `script.js`).
- **Boucle de récupération (1..100)** :
  - sprite via `raw.githubusercontent.com/.../dream-world/<id>.svg`
  - nom via `https://pokeapi.co/api/v2/pokemon-species/<id>/` (lecture d’un nom dans `data.names[...]`)
- **Rendu via `<template>`** : clonage et remplacement des placeholders `{{nom}}` et `{{numero}}`.

## Installation
Aucune installation (site statique).
- Ouvrir `index.html` dans un navigateur.
- Connexion Internet requise (PokeAPI + sprites).

## Ce que démontre le projet (compétences)
- **Intégration d’API** (fetch, JSON) et orchestration de plusieurs sources (API + CDN).
- **Rendu dynamique** via template HTML et manipulation DOM.
- **UI simple** : déclenchement d’une action, masquage du bouton après lancement.

## Améliorations possibles
- **Paralléliser/optimiser** les 100 requêtes (actuellement séquentielles) et ajouter un **loader**.
- **Robustesse i18n** : sélectionner le nom FR par `language.name === 'fr'` plutôt que par index fixe.
- Ajouter **recherche, filtres, pagination** et gestion d’erreurs visible côté UI.
