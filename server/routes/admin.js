const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Admin, Course } = require("../db");
const { authenticateJWT, SECRETKEY } = require("../middleware/auth");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRETKEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  } else {
    res.status(403).json({ meassge: "Admin already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRETKEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Loggedin successfully", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

router.get("/me", authenticateJWT, async (req, res) => {
  const user = req.user.username;
  res.json(user);
});

// Create Course
router.post("/courses", authenticateJWT, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

// Update specific course
router.put("/courses/:id", authenticateJWT, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(400).send({ message: "course not found" });
  }
});

// Get courses
router.get("/courses", authenticateJWT, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

router.get("/courses/:id", authenticateJWT, async (req, res) => {
  const id = req.params.id;
  const course = await Course.findById(id);
  res.json({ course });
});

module.exports = router;
