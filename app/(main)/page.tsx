"use client";
import { useEffect, useState } from "react";
import { getBooks, getAIInsights } from "/app/utils/api";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

function Dashboard() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [insights, setInsights] = useState<{ [key: number]: string }>({});
    const [loadingAI, setLoadingAI] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        debugger
        getBooks()
            .then((data) => {
                if (data && data.data) {
                    setBooks(data.data);
                } else {
                    setBooks([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching books:", err);
                setLoading(false);
            });
    }, []);

    const handleAIInsights = async (bookId: number) => {
        debugger
        setLoadingAI((prev) => ({ ...prev, [bookId]: true }));
        try {
            const data = await getAIInsights(bookId);
            setInsights((prev) => ({ ...prev, [bookId]: data?.data || "No insights available." }));
        } catch (err) {
            console.error("Error fetching AI insights:", err);
            setInsights((prev) => ({ ...prev, [bookId]: "Error retrieving insights." }));
        } finally {
            setLoadingAI((prev) => ({ ...prev, [bookId]: false }));
        }
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>📚 Library Books</h5>

                    {loading ? (
                        <div className="flex justify-content-center p-5">
                            <ProgressSpinner />
                        </div>
                    ) : books.length === 0 ? (
                        <p className="text-center text-gray-500">No books available.</p>
                    ) : (
                        <div className="grid">
                            {books.map((book) => (
                                <div key={book.id} className="col-12 md:col-4">
                                    <Card title={book.title} subTitle={book.author}>
                                        <p><strong>ISBN:</strong> {book.isbn}</p>
                                        <p><strong>Published:</strong> {book.publicationYear}</p>
                                        <p>{book.description}</p>

                                        <Button
                                            label={loadingAI[book.id] ? "Loading..." : "Get AI Insights"}
                                            className="mt-2"
                                            icon="pi pi-lightbulb"
                                            onClick={() => handleAIInsights(book.id)}
                                            disabled={loadingAI[book.id]}
                                        />

                                        {insights[book.id] && (
                                            <div className="mt-3 p-2 border rounded bg-gray-100">
                                                <h6>💡 AI Insights:</h6>
                                                <p>{insights[book.id]}</p>
                                            </div>
                                        )}
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
