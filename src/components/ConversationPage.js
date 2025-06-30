import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'


function ConversationPage({ otherUserId }) {
    const { user } = useUser();
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [otherUserName, setOtherUserName] = useState('');

    useEffect(() => {
        const fetchConversation = async () => {
            if (!user || !otherUserId) return;
            try {
                const response = await fetch(`http://localhost:8080/messages/conversation/${user.id}/${otherUserId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch conversation');
                }
                const data = await response.json();
                setConversation(data);
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        };
        
        const fetchOtherUserName = async () => {
            if (!otherUserId) return;
            try {
                const response = await fetch(`http://localhost:8080/users/getuserbyid/${otherUserId}`);
                if (response.ok) {  
                    const data = await response.json();
                    setOtherUserName(data.name || data.username || "Unknown User");
                } else {
                    setOtherUserName("Unknown User");
                    console.error('Failed to fetch other user name');
                }
            } catch (error) {
                setOtherUserName("Unknown User");
                console.error('Error fetching other user name:', error);
            }
        };


        fetchConversation();
        fetchOtherUserName();
    }, [user, otherUserId]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setSending(true);
        try {
            const res = await fetch('http://localhost:8080/messages/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderId: user.id,
                    receiverId: otherUserId,
                    text: message
                })
            });
            if (res.ok) {
                setMessage('');
                // refresh conversation after sending
                const updated = await fetch(`http://localhost:8080/messages/conversation/${user.id}/${otherUserId}`);
                setConversation(await updated.json());
            }
        } catch (err) {
            alert('Failed to send message.');
        }
        setSending(false);
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

export default ConversationPage