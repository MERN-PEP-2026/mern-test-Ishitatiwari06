import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CourseForm() {
    const [form, setForm] = useState({ name: "", description: "", instructor: "" });
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/courses`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Course</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Name" name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="text" placeholder="Description" name="description" value={form.description} onChange={handleChange} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="text" placeholder="Instructor" name="instructor" value={form.instructor} onChange={handleChange} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Create</button>
            </form>
        </div>
    )
}

export default CourseForm;