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

Pour le **backend **:

```bash
cd backend
npm install
npm start
bash```
-Assurez-vous également d'ouvrir le fichier de base de données (innovx) dans phpMyAdmin pour vérifier les tables et les données.

## **Configuration des Variables d'Environnement**
-Créez un fichier .env à la racine du projet backend et ajoutez les variables suivantes. Ces variables permettent de configurer les connexions à la base de données, l'envoi d'emails, et l'intégration avec Dialogflow :

### **.env**
Copier le code

```bash
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=mot_de_passe
DB_NAME=innovx

DIALOGFLOW_PROJECT_ID="votre-id-de-projet-dialogflow"
DIALOGFLOW_CREDENTIALS_PATH="chemin/vers/dialogflow-credentials.json"

EMAIL_USER=votre_email@example.com
EMAIL_PASS=mot_de_passe_des_appliactions
Explication des Variables d'Environnement
DB_HOST : Adresse du serveur MySQL (généralement localhost).

**-DB_USER **: Nom d'utilisateur pour se connecter à MySQL. Remplacez votre_utilisateur par votre nom d'utilisateur MySQL.

**-DB_PASSWORD**: Mot de passe associé au nom d'utilisateur MySQL. Remplacez mot_de_passe par votre mot de passe MySQL.

**-DB_NAME** : Nom de la base de données (ici, innovx). Assurez-vous que la base de données existe dans MySQL.

**-DIALOGFLOW_PROJECT_ID** : ID de votre projet Dialogflow. Vous pouvez le trouver dans la console Dialogflow sous les paramètres de votre agent.

**-DIALOGFLOW_CREDENTIALS_PATH** : Chemin vers le fichier JSON contenant vos identifiants Dialogflow. Téléchargez ce fichier depuis la Google Cloud Console lorsque vous créez une clé de service pour Dialogflow.

**-EMAIL_USER** : L'adresse email à partir de laquelle les emails seront envoyés (pour les candidatures et les formulaires de contact). Remplacez votre_email@example.com par votre adresse email.

**-EMAIL_PASS**- : Mot de passe d'application pour Gmail. Vous pouvez obtenir ce mot de passe depuis la section sécurité de votre compte Gmail (voir ci-dessous pour plus de détails).

### **Configuration de Nodemailer**

-Installez Nodemailer et configurez-le pour envoyer des emails. Suivez les étapes décrites dans la documentation de Nodemailer pour créer un transporteur SMTP et envoyer des emails.
Obtenir le mot de passe d'application Gmail :
Pour utiliser Nodemailer avec Gmail, vous devez générer un mot de passe d'application :
Connectez-vous à votre compte Gmail.
Accédez à Mon compte Google.
Allez dans Sécurité.
Sous Connexion à Google, sélectionnez Mots de passe des applications.
Suivez les instructions pour générer un mot de passe d'application. Utilisez ce mot de passe dans votre fichier .env.
### **Configuration de Dialogflow**
-Accédez à Dialogflow Console.
-Créez un nouvel agent avec le nom innovx-agent.
-Ajouter les intents :
Téléchargez les intents pour votre agent Dialogflow(trouvé dans le dossier nomé "Intents créér par dialgFlow" dans le projet).
 **.-Obtenir les identifiants JSON:**
Accéder à Google Cloud Console
-Rendez-vous sur Google Cloud Console.
-Créer une clé de service
-Sélectionnez ou créez un projet lié à votre agent Dialogflow.
-Allez dans "API & Services" > "Identifiants".
-Cliquez sur "Créer des identifiants" et choisissez "Clé de compte de service".
-Sélectionnez le rôle approprié pour la clé de service (par exemple, "Dialogflow API Client").
-Cliquez sur "Créer" et téléchargez le fichier JSON contenant vos identifiants.
-Placez ce fichier JSON dans le répertoire backend de votre projet.
-Configurer les variables d'environnement
-Créez ou mettez à jour le fichier .env dans le répertoire backend de votre projet.
-Ajoutez la ligne suivante, en spécifiant le chemin vers le fichier JSON :

**Copier le code(dans .env)**
```bash
DIALOGFLOW_CREDENTIALS_PATH=/chemin/vers/le/fichier.json
