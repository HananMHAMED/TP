# Catalogue produits (OpenFoodFacts)

## Description
Mini application web statique qui consomme l’API **OpenFoodFacts** pour récupérer une liste de produits (France) et les afficher sous forme de cartes (image + informations produit + indicateurs).

## Technologies
- **HTML / CSS / JavaScript**
- **Fetch API**
- **OpenFoodFacts API v2** (`/api/v2/search`)

## Fonctionnalités
- **Chargement automatique** au démarrage (`DOMContentLoaded` → `recupererProduits()`).
- **Rendu en grille** via un `<template>` cloné et injecté dans `#grid-container`.
- **Affichage d’informations** : nom, marque, quantité (concaténés dans `script.js`).
- **Scores** : construction de chemins d’icônes pour Nutri‑Score, NOVA et Eco‑Score (ex. `images/nutriscore-a.svg`).
- **Contrôle de qualité des données** : les produits sans image, sans marque ou sans nom sont ignorés (log console).

## Installation
Aucune installation.
- Ouvrir `index.html` dans un navigateur.
- Connexion Internet requise (appel OpenFoodFacts).

## Ce que démontre le projet (compétences)
- **Intégration d’API REST** (requête, parsing JSON, itération sur résultats).
- **Manipulation DOM** et génération de UI à partir d’un template.
- **Traitement de cas incomplets** (valeurs manquantes / règles de filtrage).

## Améliorations possibles
- Exploiter la barre de recherche `#search-input` (filtrage côté client ou requêtes API).
- Ajouter une **gestion d’erreurs côté UI** (écran “chargement”, “aucun résultat”, “API indisponible”).
- Optimiser le rendu (pagination, lazy-loading, cache) lorsque le nombre de produits augmente.
- Vérifier/packager les assets attendus dans `images/` (les icônes de scores sont référencées par nom).
