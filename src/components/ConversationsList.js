import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'

function ConversationsList() {
    const { user } = useUser();
    const [conversations, setConversations] = useState([]);
    const [userNames, setUserNames] = useState({}); // { userId: name }

    // fetch user name by ID and cache it
    const fetchUserName = async (userId) => {
        if (!userId || userNames[userId]) return;
        try {
            const res = await fetch(`http://localhost:8080/users/getuserbyid/${userId}`);
            if (res.ok) {
                const data = await res.json();
                setUserNames(prev => ({ ...prev, [userId]: data.name || data.username || "User" }));
            }
        } catch (e) {
            setUserNames(prev => ({ ...prev, [userId]: "User" }));
        }
    };

    const fetchConversations = async () => {
        if (!user || !user.id) {
            console.error("User not logged in or user ID missing");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/messages/getLatestConversations/${user.id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const messages = await response.json();
            setConversations(messages);

            // Fetch names for all conversation partners
            messages.forEach(msg => {
                const otherUserId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
                fetchUserName(otherUserId);
            });
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    useEffect(() => {
        fetchConversations();
        // eslint-disable-next-line
    }, [user]);

    return (
        <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-main_pink text-white px-6 py-4 text-xl font-semibold">
                Conversations
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
                {conversations.length === 0 ? (
                    <div className="p-6 text-gray-500 text-center">No conversations yet.</div>
                ) : (
                    conversations.map((msg, idx) => {
                        const otherUserId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
                        const otherUserName = userNames[otherUserId] || "Loading...";
                        return (
                            <div key={msg.id || idx} className="p-4 hover:bg-gray-100 cursor-pointer">
                                <div className="font-medium">{otherUserName}</div>
                                <div className="text-sm text-gray-600 truncate">{msg.text || ''}</div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default ConversationsList