import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


const SOCKET_URL = "http://localhost:8080/ws";

function ConversationPage({ otherUserId }) {
    const { user } = useUser();
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [otherUserName, setOtherUserName] = useState('');
    const stompClient = useRef(null);

    // fetch conversation and other user's name
    useEffect(() => {
        if (!user || !otherUserId) return;

        const fetchConversation = async () => {
            try {
                const res = await fetch(`http://localhost:8080/messages/conversation/${user.id}/${otherUserId}`);
                if (res.ok) {
                    setConversation(await res.json());
                }
            } catch (err) {
                setConversation([]);
            }
        };

        const fetchOtherUserName = async () => {
            try {
                const res = await fetch(`http://localhost:8080/users/getuserbyid/${otherUserId}`);
                if (res.ok) {
                    const data = await res.json();
                    setOtherUserName(data.name || data.username || "Unknown User");
                } else {
                    setOtherUserName("Unknown User");
                }
            } catch {
                setOtherUserName("Unknown User");
            }
        };

        fetchConversation();
        fetchOtherUserName();
    }, [user, otherUserId]);

    // WebSocket setup
    useEffect(() => {
        if (!user || !otherUserId) return;

        stompClient.current = new Client({
            webSocketFactory: () => new SockJS(SOCKET_URL),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("WebSocket connected!");
                stompClient.current.subscribe(`/topic/messages/${user.id}`, (msg) => {
                    console.log("Message received:", msg.body);
                });
            },
            onWebSocketError: (error) => {
                console.error("WebSocket error:", error);
            },
            onStompError: (frame) => {
                console.error('STOMP broker error:', frame);
            }
        });


        stompClient.current.activate(); // ✅ this replaces .connect()

        return () => {
            if (stompClient.current && stompClient.current.active) {
                stompClient.current.deactivate();
            }
        };
    }, [user, otherUserId]);


    // Send message
    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setSending(true);

        const newMessage = {
            senderId: user.id,
            receiverId: otherUserId,
            text: message,
            timestamp: new Date().toISOString()  
        };

        // add message immediately to conversation UI
        setConversation(prev => [...prev, newMessage]);

        try {
            // Save to DB
            const res = await fetch('http://localhost:8080/messages/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage)
            });

            if (!res.ok) throw new Error('Failed to save message');

            const savedMessage = await res.json();

            console.log('Message saved:', savedMessage);

            if (stompClient.current && stompClient.current.connected) {
                stompClient.current.publish({
                    destination: "/app/chat.sendMessage",
                    body: JSON.stringify(savedMessage)
                });
            }

            setConversation(prev => {
                const filtered = prev.filter(msg => msg.timestamp !== newMessage.timestamp);
                return [...filtered, savedMessage];
            });

            setMessage('');
        } catch (error) {
            console.error(error);
            alert('Failed to send message.');
            // remove c message if send fails:
            setConversation(prev => prev.filter(msg => msg.timestamp !== newMessage.timestamp));
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-main_pink">{otherUserName}</h2>
            <div className="flex-1 flex flex-col gap-2 mb-4 overflow-y-auto max-h-96">
                {conversation.length === 0 ? (
                    <div className="text-gray-500 text-center">No messages yet.</div>
                ) : (
                    conversation.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`px-4 py-2 rounded-lg max-w-xs
                                ${msg.senderId === user.id
                                    ? 'bg-main_pink text-white rounded-br-none'
                                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <form onSubmit={handleSend} className="flex gap-2 mt-2">
                <input
                    type="text"
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="Type your message..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    disabled={sending}
                />
                <button
                    type="submit"
                    className="bg-main_pink text-white px-4 py-2 rounded font-semibold hover:bg-pink-600 transition"
                    disabled={sending}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ConversationPage;