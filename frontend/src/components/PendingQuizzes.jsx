import { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "./NavBar";

export function PendingQuizzes() {
    const [pendingQuizzes, setPendingQuizzes] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingQuizzes();
    }, []);

    const fetchPendingQuizzes = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("❌ User not authenticated. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get("http://localhost:3000/attemptQuiz/pending", {
                headers: { Authorization: `Bearer ${token}` }, 
            });

            if (response.data.pendingQuizzes.length === 0) {
                setMessage("⚠️ No pending quizzes.");
            } else {
                setPendingQuizzes(response.data.pendingQuizzes);
            }
        } catch (error) {
            setMessage("❌ Error fetching pending quizzes: " + (error.response?.data?.msg || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="bg-violet-500 h-screen flex flex-col items-center pt-10">
                <h1 className="text-white text-4xl font-bold">⏳ Pending Quizzes</h1>
                <div className="bg-white mt-10 p-5 rounded-2xl shadow-lg w-96">
                    {loading ? (
                        <p className="text-center">⌛ Loading...</p>
                    ) : message ? (
                        <p className="text-red-500 text-center">{message}</p>
                    ) : (
                        <div>
                            <h3 className="text-lg font-semibold text-center mb-4">📝 Pending Quizzes</h3>
                            <ul>
                                {pendingQuizzes.map((quiz, index) => (
                                    <li key={index} className="p-2 bg-gray-100 rounded shadow mt-2 text-center">
                                        <div>
                                            <strong>Quiz Code:</strong> {quiz.quizCode}
                                        </div>
                                        <div>
                                            <strong>Owner:</strong> {quiz.quizOwner}
                                        </div>
                                        <div>
                                            <strong>Class:</strong> {quiz.className || "N/A"}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
