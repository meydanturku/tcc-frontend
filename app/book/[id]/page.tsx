"use client";
import { useEffect, useState } from "react";
import { getBookById, getAIInsights } from "/app/utils/api";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";

function BookDetailPage() {
    const router = useRouter();
    const params = useParams();
    const bookId = parseInt(params.id as string);

    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [insights, setInsights] = useState<string>("");
    const [loadingAI, setLoadingAI] = useState<boolean>(false);

    useEffect(() => {
        if (!bookId || isNaN(bookId)) {
            setLoading(false);
            return;
        }
        getBookById(bookId)
            .then((data) => {
                setBook(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching book details:", err);
                setLoading(false);
            });
    }, [bookId]);

    const handleAIInsights = async () => {
        if (!bookId || isNaN(bookId)) return;
        setLoadingAI(true);
        try {
            const message = await getAIInsights(bookId);
            setInsights(message || "No insights available.");
        } catch (err) {
            console.error("Error fetching AI insights:", err);
            setInsights("Error retrieving insights.");
        } finally {
            setLoadingAI(false);
        }
    };

    if (loading) {
        return <div className="flex justify-content-center p-5"><ProgressSpinner /></div>;
    }

    if (!bookId || isNaN(bookId)) {
        return <p className="text-center text-red-500">Invalid Book ID.</p>;
    }

    if (!book) {
        return <p className="text-center text-gray-500">Book not found.</p>;
    }

    return (
        <div className="flex justify-content-center p-5">
            <Card title={book.title} subTitle={book.author} style={{ width: "50%" }}>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Published:</strong> {book.publicationYear}</p>
                <p>{book.description}</p>

                <Button
                    label={loadingAI ? "Loading..." : "Get AI Insights"}
                    className="mt-2"
                    icon="pi pi-lightbulb"
                    onClick={handleAIInsights}
                    disabled={loadingAI}
                />

                {insights && (
                    <div className="mt-3 p-2 border rounded bg-gray-100">
                        <h6>💡 AI Insights:</h6>
                        <p>{insights}</p>
                    </div>
                )}

                <Button label="Back to Library" className="p-button-secondary mt-3" onClick={() => router.push("/main")} />
            </Card>
        </div>
    );
}

export default BookDetailPage;
