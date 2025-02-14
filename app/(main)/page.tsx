"use client";
import { useEffect, useState } from "react";
import { getBooks } from "/app/utils/api";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";

function Dashboard() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const router = useRouter();

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

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>📚 Library Books</h5>

                    {/* 📌 Arama Inputu */}
                    <div className="flex align-items-center gap-2 mb-3">
                        <InputText
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search books by title or author..."
                            className="w-3"
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-content-center p-5">
                            <ProgressSpinner />
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <p className="text-center text-gray-500">No books available.</p>
                    ) : (
                        <div className="grid">
                            {filteredBooks.map((book) => (
                                <div
                                    key={book.id}
                                    className="col-12 md:col-4 cursor-pointer"
                                    onClick={() => router.push(`/book/${book.id}`)}
                                >
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
            </div>
        </div>
    );
}

export default Dashboard;
