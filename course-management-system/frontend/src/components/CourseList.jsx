import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CourseList() {
    const [courses, setCourses] = useState([]);
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
        fetchCourses();
    }, []);
    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Course List</h1>
            <ul className="space-y-3">
                {courses.map((course) => (
                    <li key={course._id} onClick={() => navigate(`/dashboard/${course._id}`)} className="cursor-pointer px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 transition">
                        {course.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}