# Projet Chatbot (Streamlit + OpenAI)

## Description
Application Streamlit simple qui permet de discuter avec un assistant (API OpenAI) et de garder un historique de conversations côté interface.

## Installation
Prérequis : Python.

1) Installer les dépendances (selon ton environnement) :
- `streamlit`
- `openai`

2) Configurer la clé API **sans la mettre dans le code** :
- Ajouter la valeur dans `Projet_chatbot/.env` (variable `OPENAI_API_KEY`)

## Lancer l’application
Depuis le dossier `Projet_chatbot` :
- `streamlit run main.py`

## Notes
- Le modèle peut être configuré via `OPENAI_MODEL` (par défaut `gpt-3.5-turbo`).