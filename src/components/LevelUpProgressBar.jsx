import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect } from "react";

export default function LevelUpProgressBar({ xp, totalXP, level, setUserData }) {
    const xpPercentage = (xp / 100) * 100;

    const getProgressBarColor = () => {
        if (xpPercentage <= 20) return "bg-red-600";
        if (xpPercentage <= 60) return "bg-yellow-500";
        return "bg-green-600";
    };

    const calculateLevel = (totalXP) => {
        return Math.floor(totalXP / 100); // fiecare 100 XP -> 1 nivel
    };

    useEffect(() => {
        const updateLevelInFirestore = async () => {
            const user = auth.currentUser;
            if (!user || totalXP == null || level == null) return;

            const newLevel = calculateLevel(totalXP);

            if (newLevel !== level) {
                const userRef = doc(db, "users", user.uid);
                try {
                    await updateDoc(userRef, { level: newLevel });
                    if (setUserData) {
                        setUserData((prev) => ({
                            ...prev,
                            level: newLevel,
                        }));
                    }
                } catch (err) {
                    console.error("Eroare la actualizarea nivelului:", err);
                }
            }
        };

        updateLevelInFirestore();
    }, [totalXP, level, setUserData]);

    return (
        <div className="flex items-center gap-2">
            <p className="text-gray-700 font-medium">Nivel: {level ?? 0}</p>
            <div className="relative w-32 h-4 bg-gray-300 rounded-full">
                <div
                    className={`absolute top-0 left-0 h-full ${getProgressBarColor()} rounded-full`}
                    style={{ width: `${xpPercentage}%` }}
                />
            </div>
        </div>
    );
}
