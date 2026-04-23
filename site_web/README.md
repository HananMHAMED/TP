# Mini e‑commerce (panier côté client)

## Description
Prototype de boutique en **HTML/CSS/JavaScript** avec une liste de produits statiques et un **panier** géré côté navigateur (ajout, suppression, quantités, total).

## Technologies
- **HTML / CSS / JavaScript**
- **Boxicons** (icônes via CDN)
- Manipulation DOM (événements, création de nœuds)

## Fonctionnalités
- **Ouverture/fermeture du panier** via toggle de classe CSS (`.cart.active`).
- **Ajout au panier** : clic sur l’icône “add-cart” d’un produit.
- **Déduplication** : empêche l’ajout d’un produit déjà présent (alerte).
- **Quantité** : modification d’un `<input type="number">` avec recalcul du total.
- **Suppression d’item** : icône corbeille (classe `.cart-remove`).
- **Achat** : bouton “Buy New” vide le panier et recalcule le total.

## Installation
Aucune installation (site statique).
- Ouvrir `index.html` dans un navigateur.
- Remarque : les images produits sont référencées via `../images/...`.

## Ce que démontre le projet (compétences)
- **Gestion d’état UI** (panier) uniquement via le DOM.
- **Événementiel** (listeners click/change, initialisation sur `DOMContentLoaded`).
- **Calculs** et formatage d’un total à partir de prix affichés.

## Améliorations possibles
- Structurer le code (modules, séparation modèle/DOM) et stocker le panier en **localStorage**.
- Internationalisation/formatage monétaire (devise, séparateurs).
- Tests unitaires (fonctions de calcul) et accessibilité (navigation clavier, ARIA).
