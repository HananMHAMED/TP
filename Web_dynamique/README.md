# Projet TIDAL - Compte rendu

## 1) Contexte et objectif

Le projet **TIDAL** a pour objectif de proposer une application web permettant de consulter des donnees d'acupuncture (pathologies, meridiens, details), avec:

- une interface de navigation et de filtrage,
- un systeme d'authentification utilisateur (login/logout),
- une API securisee par JWT pour l'acces aux donnees via des appels HTTP.

Ce projet a egalement servi de support pedagogique pour appliquer des principes fondamentaux du developpement web: **MVC**, **separation des responsabilites (SEP)**, routage, gestion de session et securisation d'API.

## 2) Architecture et principes web appliques

### MVC

Le projet suit une organisation proche du pattern **Model-View-Controller**:

- **Model**: `PathoModel.php` encapsule les acces aux donnees metier (pathologies, symptomes, filtres, meridiens).
- **View**: templates Twig (affichage HTML).
- **Controller**: `PathoController.php` gere le flux de la requete web et prepare les donnees pour les vues.

Le point d'entree `index.php` joue le role de front controller simplifie: il route vers les pages web ou vers les endpoints API selon la route demandee.

### Separation of Concerns (SEP)

Le projet distingue plusieurs couches:

- presentation (Twig),
- logique applicative (controllers),
- acces base de donnees (`db_handler.php`, model),
- authentification web (session),
- authentification API (JWT).

Cette separation permet de maintenir le code plus facilement, de tester les composants de facon ciblee et de faire evoluer l'API sans impacter fortement l'interface web.

## 3) Fonctionnalites realisees

### Consultation et filtrage des donnees

- liste des pathologies,
- filtres par meridien et type,
- consultation du detail d'une pathologie (informations + symptomes),
- recherche par mot-cle reservee a un utilisateur connecte.

### Authentification web (session)

- inscription avec stockage d'un mot de passe hashe (`password_hash`),
- connexion avec verification (`password_verify`),
- conservation de la session utilisateur,
- deconnexion avec destruction propre de la session et du cookie associe.

### API JWT

Deux routes principales ont ete mises en place:

- `api/login`: genere un JWT apres verification des identifiants;
- `api/info`: endpoint protege, accessible uniquement avec un token valide.

Le token est transmis via l'entete:

- `Authorization: Bearer <token>`

La classe `JwtUtils.php` prend en charge:

- la creation du token (header/payload/signature en HS256),
- la verification de la signature,
- la verification de l'expiration,
- l'extraction du payload.

## 4) Choix techniques et environnement

- **Langage**: PHP
- **Moteur de template**: Twig
- **Base de donnees**: PostgreSQL
- **Orchestration locale**: Docker Compose (`php`, `postgres`, `pgadmin`)
- **Reecriture d'URL**: `.htaccess` vers `index.php?route=...`

Ce choix offre un environnement reproductible pour l'equipe et limite les differences de configuration entre postes.

## 5) Points importants a retenir

- Le projet combine **authentification session** (site web) et **authentification stateless JWT** (API), ce qui illustre deux approches classiques du web.
- Les requetes SQL sont preparees avec parametres, ce qui reduit le risque d'injection SQL.
- La mise en place d'un modele + controller pour la partie pathologies a permis de clarifier l'organisation du code et de renforcer la logique MVC.

## 6) Limites actuelles et pistes d'amelioration

### Limites

- Les utilisateurs sont actuellement stockes dans `users.json` (adapté a un contexte de projet/TP, moins a la production).
- Certaines routes et la gestion de CORS peuvent encore etre durcies pour un contexte de deploiement public.
- Le secret JWT est present en dur dans la classe utilitaire et devrait etre externalise.

### Ameliorations recommandees

- Migrer la gestion des utilisateurs vers PostgreSQL (table `users`).
- Deplacer le secret JWT dans une variable d'environnement.
- Ajouter une couche middleware dediee pour la verification JWT.
- Completer la couverture de tests (tests d'integration API et tests de non-regression).
- Uniformiser les formats de reponse JSON d'erreur/succes.

## 7) Utilisation des LLMs

Nous avons utilisé des LLMs afin de créer les pages html initialement, ainsi que le css. De manière plus générale, nous avons utilisé les LLMs afin de débugger du code écrit à la main ou copié-collé depuis le cours, ainsi que pour les syntaxes plus complexes (twig, htaccess). L'architecture a été entièrement pensé par notre équipe.

## 8) Bilan

Le projet TIDAL est fonctionnel et demontre une bonne progression sur les fondamentaux du developpement web backend:

- structuration de code en MVC,
- separation des responsabilites,
- securisation des acces (sessions + JWT),
- exploitation d'une base de donnees relationnelle avec filtrage metier.

La base est solide pour une evolution vers une architecture plus industrialisee (auth centralisee, tests automatisees, gestion des secrets, API plus formelle).