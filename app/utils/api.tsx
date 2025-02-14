import axios from 'axios';

const API_BASE_URL = 'http://localhost:8181/books';

export const getBooks = async (): Promise<any> => {
    debugger
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
};

export const getBookById = async (id: number): Promise<any> => {
    debugger
    try {
        const response = await axios.get(`${API_BASE_URL}/get-book/${id}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
};

export const createBook = async (bookData: {
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    description: string;
}): Promise<any> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-book`, bookData, {
            data: {author: "", description: "", isbn: "", publicationYear: 0, title: ""}, string: undefined,
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
};

export const updateBook = async (id: number, bookData: {
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    description: string;
}): Promise<any> => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update-book/${id}`, bookData, {
            data: {author: "", description: "", isbn: "", publicationYear: 0, title: ""}, string: undefined,
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
};

export const deleteBook = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete-book/${id}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
};

export const getAIInsights = async (id: number): Promise<any> => {
    debugger
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}/ai-insights`);
        return response.data.message;
    } catch (error) {
        console.error("AI Insights API Error:", error);
        return null;
    }
};
