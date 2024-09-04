import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import image6 from '../assets/image6.jpg';
const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false); // État pour gérer l'animation de saisie
    const [showWelcome, setShowWelcome] = useState(true); // État pour afficher le message de bienvenue
    const messagesEndRef = useRef(null);  // Référence pour le défilement

    const handleSend = async () => {
        if (message.trim() === '') return;  // Empêche l'envoi de messages vides

        // Ajout du message de l'utilisateur à l'affichage
        const newResponses = [...responses, { user: message }];
        setResponses(newResponses);
        
        // Réinitialisation du champ de saisie
        setMessage('');

        // Déclenchement de l'animation de saisie du bot
        setIsTyping(true);

        // Simulation d'une réponse du bot avec un délai
        setTimeout(async () => {
            // Envoi de la requête au serveur pour obtenir la réponse du bot
            const res = await fetch('http://localhost:8081/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await res.json();

            // Ajout de la réponse du bot à l'affichage
            setResponses(prevResponses => [
                ...prevResponses,
                { bot: data.reply }
            ]);

            // Arrêt de l'animation de saisie
            setIsTyping(false);
        }, 1000); // Simule un délai de 1 seconde
    };

    const handleWelcomeResponse = (response) => {
        if (response === 'yes') {
            setShowWelcome(false); // Cache le message de bienvenue et les boutons
        } else {
            setIsOpen(false); // Ferme le chatbot
        }
    };

    // Envoyer le message avec la touche "Entrée"
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // Défilement automatique vers le bas après l'ajout d'un nouveau message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [responses]);

    return (
        <>
            {!isOpen && (
                <div className="chatbot-float-button-wrapper">
                    <div className="chatbot-float-button" onClick={() => setIsOpen(true)}>
                        <img 
                           src={image6}
                            alt="Chatbot" 
                            className="chatbot-avatar" 
                        />
                        <div className="chatbot-greeting">Hello! How can I help you?</div>
                    </div>
                </div>
            )}
            {isOpen && (
                <div className="chatbot-wrapper">
                    <div className="chat-header">
                    <img src={image6} alt="Bot Avatar" className="header-avatar" />
                        <div className="header-info">
                            <h2>Support Bot</h2>
                            <p className="status">Online</p>
                        </div>
                        <button className="chat-close-button" onClick={() => setIsOpen(false)}>X</button>
                    </div>
                    <div className="message-container">
                        {showWelcome && (
                            <div className="welcome-message">
                                <div className="message-text">
                                    Welcome to chatbot InnovX! If you have any questions, tap "Yes".
                                </div>
                                <div className="welcome-buttons">
                                    <button className="yes-button" onClick={() => handleWelcomeResponse('yes')}>Yes</button>
                                    <button className="no-button" onClick={() => handleWelcomeResponse('no')}>No</button>
                                </div>
                            </div>
                        )}
                        {responses.map((response, index) => (
                            <div key={index}>
                                {response.user && (
                                    <div className="message user-message">
                                        <div className="message-text">
                                            {response.user}
                                        </div>
                                    </div>
                                )}
                                {response.bot && (
                                    <div className="message bot-message">
                                      <img src={image6}alt="Bot Avatar" className="message-avatar" />
                                        <div className="message-text">
                                            {response.bot}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    {!showWelcome && (
                        <div className="input-container">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}  // Appel au gestionnaire de touches
                                placeholder="Type a message..."
                            />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Chatbot;
