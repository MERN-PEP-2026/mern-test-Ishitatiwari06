import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
    const { name, description, instructor } = req.body;
    try {
        const newCourse = await Course.create({ name, description, instructor });
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {    
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};