
import express from "express";

const app = express();

app.use(express.json());

// In-memory array
let students = [];

// POST API - Create Student
app.post("/api/students", (req, res) => {

    const { id, name, email, course, age } = req.body;

    // Validate mandatory fields
    if (!id || !name || !email || !course || !age) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check duplicate ID
    const existingStudent = students.find(
        student => student.id === id
    );

    if (existingStudent) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    // Store student
    const newStudent = { id, name, email, course, age };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});


// GET API - Retrieve all students
app.get("/api/students", (req, res) => {

    res.status(200).json(students);

});


// GET API - Retrieve student by ID
app.get("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});


// PUT API - Update student details
app.put("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(
        student => student.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (!name || !email || !course || !age) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    students[index] = {
        id: id,
        name,
        email,
        course,
        age
    };

    res.status(200).json({
        message: "Student updated successfully",
        student: students[index]
    });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
