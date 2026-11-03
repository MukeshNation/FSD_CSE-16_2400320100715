import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

// POST method
app.post("/students", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    students.push(req.body);

    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

    res.send("Student record saved successfully!");
});

// GET method
app.get("/students", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    res.json(students);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});