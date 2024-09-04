# **InnovX**

InnovX est une application web développée pour représenter une startup qui présente ses solutions en intelligence artificielle (IA), ses blogs, et ses offres d'emploi. Les administrateurs peuvent gérer ces éléments à partir d'une interface d'administration accessible via `http://localhost:3000/admin`. Le site utilise des technologies modernes pour offrir une expérience utilisateur fluide et interactive.

## **Accès Administratif**

Pour accéder à l'interface d'administration :

- **URL** : `http://localhost:3000/admin`
- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `admin`

Les administrateurs peuvent également créer de nouveaux comptes via la table `admins` dans la base de données.

## **Technologies Utilisées**

- **Frontend** : Développé en React.js avec CSS pour le style.
- **Backend** : Développé en Node.js avec Express.
- **Base de données** : MySQL, gérée via phpMyAdmin.
- **Envoi d'emails** : Utilisation de Nodemailer.
- **Chatbot** : Intégré avec Dialogflow.
- **Gestion des environnements** : Configuration via des fichiers `.env`.

## **Prérequis**

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- **Node.js**
- **MySQL**
- **phpMyAdmin**
- **Nodemailer**
- **Dialogflow**

## **Configuration du Backend**

### **Démarrage du Projet**

Pour le **frontend** :

```bash
cd frontend
npm install
npm start
