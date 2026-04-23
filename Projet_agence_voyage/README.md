# Agence de voyage (site web statique)

## Description
Mini-site d’agence de voyage en **HTML/CSS/JavaScript** : affichage d’une grille de destinations, consultation d’une page de réservation par destination, calcul du prix total et persistance d’une réservation via `localStorage`. Le header et le footer sont chargés dynamiquement.

## Technologies
- **HTML / CSS / JavaScript**
- **jQuery** (chargement partiel de `header.html` / `footer.html`)
- **API OpenWeatherMap** (récupération de la température par destination)
- **Web Storage** (`localStorage`)

## Fonctionnalités
- **Catalogue de destinations** : rendu via `<template>` (grille dans `html/index.html`).
- **Météo par destination** : appel OpenWeatherMap et affichage de la température (dans `js/java.js`).
- **Filtrage** : recherche par prix exact + bouton “All” pour réinitialiser l’affichage.
- **Réservation** :
  - calcul du prix total selon dates, nombre d’adultes/enfants et option petit-déjeuner (`calcule_Prix_total`)
  - bouton de remise à zéro des champs (`supprimer`)
- **Panier / récapitulatif** : stockage et affichage d’une réservation via `localStorage` (`js/panier.js`).
- **Header / footer réutilisables** : injection via `$("#header").load(...)` et `$("#footer").load(...)`.

## Installation
Aucune installation (site statique).
- Ouvrir `html/index.html` dans un navigateur.
- Remarque : le projet dépend d’appels réseau (OpenWeatherMap) et de fichiers statiques (`images/`, `html/header.html`, `html/footer.html`).

## Ce que démontre le projet (compétences)
- **DOM & templates HTML** (`<template>`, `document.importNode`, injection de contenu).
- **Intégration d’API** (fetch + gestion d’erreurs) et **formatage de données** (conversion Kelvin → °C).
- **Logique métier front** (calcul de prix, validation simple des dates).
- **Persistance côté client** (`localStorage`) et navigation via **query params** (`?id=...`).

## Améliorations possibles
- **Centraliser les données destinations** : utiliser `json/Base_Donee_Dest.json` (déjà présent) au lieu d’une liste “en dur”.
- **Sécuriser la clé API** OpenWeatherMap (ne pas l’exposer côté client).
- **Filtrage plus robuste** (plage de prix, recherche texte, tri) et accessibilité (labels, focus states).
- **Gestion d’erreurs UI** (API indisponible, données manquantes, validation dates/quantités).
