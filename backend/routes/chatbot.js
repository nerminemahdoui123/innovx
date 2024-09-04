const express = require('express');
const router = express.Router();
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid'); 

require('dotenv').config();

// Configurer Dialogflow
const credentialsPath = process.env.DIALOGFLOW_CREDENTIALS_PATH;
const sessionClient = new dialogflow.SessionsClient({ keyFilename: credentialsPath });
const projectId = process.env.DIALOGFLOW_PROJECT_ID;

// Fonction pour détecter l'intention
async function detectIntent(text) {
    const sessionId = uuid.v4();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: 'en',
            },
        },
    };

    try {
        const [response] = await sessionClient.detectIntent(request);
        const intentResponse = response.queryResult;
        return intentResponse.fulfillmentText;
    } catch (error) {
        console.error('Error querying Dialogflow:', error.message);
        return 'Sorry, something went wrong. Please try again later.';
    }
}

// Route pour gérer les requêtes POST vers /api/chatbot
router.post('/', async (req, res) => { 
    const userInput = req.body.message;

    if (!userInput) {
        return res.status(400).send('Please enter a message.');
    }

    try {
        const botResponse = await detectIntent(userInput);
        res.json({ reply: botResponse });
    } catch (error) {
        console.error('Error handling chatbot request:', error.message);
        res.status(500).send('Internal server error.');
    }
});

module.exports = router;
