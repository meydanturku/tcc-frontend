"use client";
import { useEffect, useState } from "react";
import { getBooks, getAIInsights } from "/app/utils/api";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";

function Dashboard() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [insights, setInsights] = useState<{ [key: number]: string }>({});
    const [loadingAI, setLoadingAI] = useState<{ [key: number]: boolean }>({});
    const [inputBookId, setInputBookId] = useState<string>("");

    useEffect(() => {
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

    const handleAIInsights = async () => {
        const bookId = parseInt(inputBookId);
        if (isNaN(bookId)) {
            alert("Please enter a valid book ID.");
            return;
        }

        setLoadingAI((prev) => ({ ...prev, [bookId]: true }));

        try {
            const message = await getAIInsights(bookId);  // ✅ API cevabı doğrudan mesaj içeriyor
            setInsights((prev) => ({ ...prev, [bookId]: message || "No insights available." }));  // ✅ Doğrudan message kullan
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
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="card mt-4">
                    <h5>💡 Get AI Insights for a Book</h5>
                    <div className="flex align-items-center gap-2">
                        <InputText
                            value={inputBookId}
                            onChange={(e) => setInputBookId(e.target.value)}
                            placeholder="Enter Book ID"
                            className="w-2"
                        />
                        <Button
                            label="Get AI Insights"
                            icon="pi pi-lightbulb"
                            className="p-button-primary"
                            onClick={handleAIInsights}
                            disabled={loadingAI[parseInt(inputBookId)]}
                        />
                    </div>

                    {insights[parseInt(inputBookId)] && (
                        <div className="mt-3 p-2 border rounded bg-gray-100">
                            <h6>💡 AI Insights:</h6>
                            <p>{insights[parseInt(inputBookId)]}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
