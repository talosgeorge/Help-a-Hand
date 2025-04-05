// src/components/Beneficiar.jsx
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase'; // adjust path to your config
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore';

export default function Beneficiar() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requests, setRequests] = useState([]);

    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, 'requests'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRequests(data);
        });

        return () => unsubscribe();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) return;

        try {
            await addDoc(collection(db, 'requests'), {
                userId: user.uid,
                title,
                description,
                createdAt: serverTimestamp(),
            });
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding request:', error);
        }
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'requests', id));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create a Help Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Submit Request
                </button>
            </form>

            <h3 className="text-xl font-semibold mb-2">Your Requests</h3>
            {requests.length === 0 ? (
                <p>No requests yet.</p>
            ) : (
                <ul className="space-y-2">
                    {requests.map((req) => (
                        <li key={req.id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-start">
                            <div>
                                <h4 className="font-bold">{req.title}</h4>
                                <p className="text-sm">{req.description}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(req.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
