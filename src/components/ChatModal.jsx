import { useEffect, useState, useRef } from 'react';
import { db, auth } from '../firebase';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    getDoc,
    doc
} from 'firebase/firestore';

export default function ChatModal({ requestId, onClose }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatPartnerName, setChatPartnerName] = useState('');
    const chatRef = useRef(null);

    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchChatPartnerName = async () => {
            const requestDoc = await getDoc(doc(db, 'requests', requestId));
            if (requestDoc.exists()) {
                const data = requestDoc.data();
                const partnerId = data.volunteerId === currentUser.uid ? data.uid : data.volunteerId;
                const partnerDoc = await getDoc(doc(db, 'users', partnerId));
                if (partnerDoc.exists()) {
                    const partnerData = partnerDoc.data();
                    setChatPartnerName(partnerData.name || 'Utilizator');
                }
            }
        };

        fetchChatPartnerName();
    }, [requestId, currentUser.uid]);

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
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-gray-600 hover:text-black text-3xl"
                    aria-label="Închide chatul"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Chat cu {chatPartnerName}</h2>

                <div className="h-72 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50 text-base leading-relaxed">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className={`my-2 py-2 px-3 rounded-xl max-w-[80%] break-words shadow-md text-[17px] tracking-wide ${
                                msg.senderId === currentUser.uid
                                    ? 'ml-auto bg-green-100 text-right'
                                    : 'mr-auto bg-gray-200 text-left'
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={chatRef}></div>
                </div>

                <form onSubmit={sendMessage} className="mt-4 flex gap-3">
                    <input
                        type="text"
                        className="flex-1 border border-gray-400 rounded-lg px-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Scrie un mesaj..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg text-lg"
                    >
                        Trimite
                    </button>
                </form>
            </div>
        </div>
    );
}
