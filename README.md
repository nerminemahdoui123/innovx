InnovX
InnovX est une application web développée pour représenter une startup spécialisée en intelligence artificielle (IA). Elle permet de présenter des solutions, de publier des blogs, et de gérer des offres d'emploi. Les administrateurs peuvent gérer ces éléments via une interface d'administration accessible à l'adresse suivante : http://localhost:3000/admin. Le site utilise des technologies modernes pour offrir une expérience utilisateur fluide et interactive.

Accès Administratif
Pour accéder à l'interface d'administration :

URL : http://localhost:3000/admin
Nom d'utilisateur : admin
Mot de passe : admin
Les administrateurs peuvent également créer de nouveaux comptes via la table admins dans la base de données.

Technologies Utilisées
Frontend : Développé en React.js avec CSS pour le style.
Backend : Développé en Node.js avec Express.
Base de données : MySQL, gérée via phpMyAdmin.
Envoi d'emails : Utilisation de Nodemailer.
Chatbot : Intégré avec Dialogflow.
Gestion des environnements : Configuration via des fichiers .env.
Prérequis
Avant de commencer, assurez-vous d'avoir installé les outils suivants :

Node.js
MySQL
phpMyAdmin
Nodemailer
Dialogflow
Configuration du Backend
==>Démarrage du Projet
Pour démarrer le frontend :
cd frontend
npm install
npm start
Pour démarrer le backend :
cd backend
npm install
npm start
Assurez-vous également d'ouvrir la base de données innovx dans phpMyAdmin pour vérifier les tables et les données.

Configuration des Variables d'Environnement
Créez un fichier .env à la racine du projet backend et ajoutez les variables suivantes. Ces variables permettent de configurer les connexions à la base de données, l'envoi d'emails, et l'intégration avec Dialogflow :
.env
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=mot_de_passe
DB_NAME=innovx

DIALOGFLOW_PROJECT_ID="votre-id-de-projet-dialogflow"
DIALOGFLOW_CREDENTIALS_PATH="chemin/vers/dialogflow-credentials.json"

EMAIL_USER=votre_email@example.com
EMAIL_PASS=mot_de_passe_des_applications
Explication des Variables d'Environnement
DB_HOST : Adresse du serveur MySQL (généralement localhost).
DB_USER : Nom d'utilisateur pour se connecter à MySQL. Remplacez votre_utilisateur par votre nom d'utilisateur MySQL.
DB_PASSWORD : Mot de passe associé au nom d'utilisateur MySQL. Remplacez mot_de_passe par votre mot de passe MySQL.
DB_NAME : Nom de la base de données (ici, innovx). Assurez-vous que la base de données existe dans MySQL.
DIALOGFLOW_PROJECT_ID : ID de votre projet Dialogflow, disponible dans la console Dialogflow sous les paramètres de votre agent.
DIALOGFLOW_CREDENTIALS_PATH : Chemin vers le fichier JSON contenant vos identifiants Dialogflow. Téléchargez ce fichier depuis la Google Cloud Console lors de la création d'une clé de service pour Dialogflow.
EMAIL_USER : L'adresse email utilisée pour envoyer les emails (pour les candidatures et les formulaires de contact). Remplacez votre_email@example.com par votre adresse email.
EMAIL_PASS : Mot de passe d'application pour Gmail, obtenu via la section sécurité de votre compte Gmail.
Configuration de Nodemailer
Pour configurer Nodemailer et envoyer des emails :

Installez Nodemailer et configurez-le pour envoyer des emails. Suivez les étapes décrites dans la documentation de Nodemailer pour créer un transporteur SMTP.
Obtenir le mot de passe d'application Gmail :
Connectez-vous à votre compte Gmail.
Accédez à Mon compte Google.
Allez dans Sécurité.
Sous Connexion à Google, sélectionnez Mots de passe des applications.
Suivez les instructions pour générer un mot de passe d'application. Utilisez ce mot de passe dans votre fichier .env.
Configuration de Dialogflow
Accédez à la Console Dialogflow et créez un nouvel agent nommé innovx-agent.
Ajouter les intents :
Téléchargez les intents pour votre agent Dialogflow depuis le dossier nommé "Intents créés par Dialogflow" dans le projet.
Obtenir les Identifiants JSON
Accédez à la Google Cloud Console.

Créez une clé de service :

Sélectionnez ou créez un projet lié à votre agent Dialogflow.
Allez dans API & Services > Identifiants.
Cliquez sur Créer des identifiants et choisissez Clé de compte de service.
Sélectionnez le rôle approprié pour la clé de service (par exemple, Dialogflow API Client).
Cliquez sur Créer et téléchargez le fichier JSON contenant vos identifiants.
Placer le fichier JSON :

Placez ce fichier JSON dans le répertoire backend de votre projet.
Configurer les Variables d'Environnement :

Mettez à jour le fichier .env dans le répertoire backend de votre projet avec le chemin vers le fichier JSON :
DIALOGFLOW_CREDENTIALS_PATH=/chemin/vers/le/fichier.json


