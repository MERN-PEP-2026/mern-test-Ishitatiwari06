import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({ name: "", description: "", instructor: "" });
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchCourses();
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/courses`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCourses();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCourses();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
            <form onSubmit={handleCreate} className="flex flex-col gap-4 mb-8">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="text" name="description" placeholder="Description" onChange={handleChange} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="text" name="instructor" placeholder="Instructor" onChange={handleChange} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Create Course</button>
            </form>
            <ul className="space-y-3">
                {courses.map((course) => (
                    <li key={course._id} className="flex justify-between items-center px-4 py-2 bg-blue-100 rounded">
                        <span>{course.name} - {course.instructor}</span>
                        <button onClick={() => handleDelete(course._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;

