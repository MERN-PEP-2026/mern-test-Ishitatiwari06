import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "Student already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Student.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingStudent = await Student.findOne({ email });
        if (!existingStudent) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingStudent.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { email: existingStudent.email, id: existingStudent._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ result: existingStudent, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
