import { useEffect, useState, useRef } from 'react';
import { db, auth } from '../firebase';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';

export default function ChatModal({ requestId, onClose }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatRef = useRef(null);

    const currentUser = auth.currentUser;

    // Fetch messages in real time
    useEffect(() => {
        const messagesRef = collection(db, 'chats', requestId, 'messages');
        const q = query(messagesRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [requestId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageRef = collection(db, 'chats', requestId, 'messages');
        await addDoc(messageRef, {
            text: newMessage,
            senderId: currentUser.uid,
            timestamp: serverTimestamp()
        });

        setNewMessage('');
    };

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-2 text-center">Chat Beneficiar & Voluntar</h2>

                <div className="h-64 overflow-y-auto border rounded-md p-2 bg-gray-50">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className={`my-1 p-2 rounded-lg max-w-[75%] ${
                                msg.senderId === currentUser.uid
                                    ? 'ml-auto bg-green-100 text-right'
                                    : 'mr-auto bg-gray-200'
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={chatRef}></div>
                </div>

                <form onSubmit={sendMessage} className="mt-2 flex gap-2">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-md px-3 py-1"
                        placeholder="Scrie un mesaj..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
                    >
                        Trimite
                    </button>
                </form>
            </div>
        </div>
    );
}
