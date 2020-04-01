import React, { useState, useEffect } from 'react';
import { subscribeToEvent, sendEvent } from '../../services/socket';
import { v1 as uuidv1 } from 'uuid';

import './styles.css';

export default function Chat() {
    const [messagesEnd, setMessagesEnd] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const author = localStorage.getItem('name');

    useEffect(() => {
        subscribeToEvent('previousMessages', (data) => {
            setMessages(data);
        });

        subscribeToEvent('receivedMessage', (data) => {
            setMessages([...messages, data]);
        });
    }, [messages, setMessages]);

    useEffect(() => {
        if (messagesEnd) {
            messagesEnd.scrollIntoView({});
        }
    }, [messages, messagesEnd]);

    async function handleSendMessage(e) {
        e.preventDefault();
        if (message.length) {
            console.log('sendMessage', message);
            const messageObject = {
                id: uuidv1(),
                author,
                message,
            };
            sendEvent('sendMessage', messageObject);
            setMessages([...messages, messageObject]);
            setMessage('');
        }
    }

    return (
        <div className="chat-container">
            <section className="header">
                <h1>Você está conectado como: {author}</h1>
            </section>
            <section className="messages">
                <div className="content">
                    <ul>
                        {messages.map(message => (
                            <li key={message.id} className={message.author === author ? "mine" : ""}>
                                <strong>{message.author}:</strong>
                                <p>{message.message}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    style={{ float: "left", clear: "both" }}
                    ref={(el) => { setMessagesEnd(el); }}
                />
            </section>
            <section className="form">
                <form onSubmit={handleSendMessage}>
                    <input
                        placeholder="Sua mensagem"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </form>
            </section>
        </div>
    )
}