# Magic: The Gathering — LOTR (Scryfall)

## Description
Site statique qui récupère les cartes **Magic: The Gathering** de l’extension *The Lord of the Rings* en français via l’API **Scryfall**, puis les affiche en grille avec image, nom imprimé et symboles de coût de mana.

## Technologies
- **HTML / CSS / JavaScript**
- **Fetch API**
- **API Scryfall** :
  - recherche cartes (`/cards/search`)
  - symbologie (`/symbology`)

## Fonctionnalités
- **Chargement initial** : `body onload="afficherCartes()"` (`index.html`).
- **Pagination API** : boucle tant que `has_more` est vrai (utilise `next_page`) pour agréger toutes les cartes.
- **Rendu via `<template>`** : injection dans `#grid-container`.
- **Parsing du mana** :
  - découpage de `mana_cost` en tokens (`parseMana`)
  - mapping token → SVG via `/symbology`
  - affichage des icônes dans `.mana-cost`
- **Effets au scroll** : position “fixed” du header + parallax léger du background (listeners `scroll`).

## Installation
Aucune installation (site statique).
- Ouvrir `index.html` dans un navigateur.
- Connexion Internet requise (API Scryfall).

## Ce que démontre le projet (compétences)
- **Consommation d’API paginée** et agrégation de résultats.
- **Transformation de données** (parsing de tokens + rendu d’icônes).
- **Structuration UI** par templates + manipulation DOM.

## Améliorations possibles
- Ajouter un **état de chargement** et une **gestion d’erreurs** côté UI (pas uniquement console).
- Limiter/optimiser le volume chargé (filtres, lazy rendering) selon l’usage.
- Factoriser les listeners `scroll` (actuellement déclarés deux fois) et éviter de modifier le style du header à chaque scroll.
