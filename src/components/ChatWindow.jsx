import { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

export default function ChatWindow({ chatId, requestId, participantId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const currentUser = auth.currentUser;

    // Scroll automat în jos
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // 🔄 Ascultă în timp real mesajele
    useEffect(() => {
        if (!chatId) return;

        const messagesRef = collection(db, "chats", chatId, "messages");
        const q = query(messagesRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [chatId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !currentUser || !chatId) return;

        try {
            const messagesRef = collection(db, "chats", chatId, "messages");
            await addDoc(messagesRef, {
                text: newMessage.trim(),
                senderId: currentUser.uid,
                timestamp: serverTimestamp(),
            });
            setNewMessage("");
        } catch (err) {
            console.error("Eroare la trimiterea mesajului:", err);
        }
    };

    return (
        <div className="flex flex-col h-[400px] w-full border rounded-xl p-4 bg-white shadow-md">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-2 rounded-lg max-w-xs text-sm break-words ${
                            auth.currentUser?.uid === msg.senderId
                                ? "bg-green-100 self-end"
                                : "bg-gray-100 self-start"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Scrie un mesaj..."
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    Trimite
                </button>
            </div>
        </div>
    );
}
