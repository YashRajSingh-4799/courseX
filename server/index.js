const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

// Connect Mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "courses",
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

app.get("/", (req, res) => {
  res.send(
    `<h1 style="padding: 32px 120px; text-align: center; margin-top: 32px">
      CourseX allows users to sign up, log in, explore a wide range of
      courses, and make purchases.
      <br />
      The app also features an admin panel where
      administrators can log in, sign up, create courses, and publish or keep
      them unpublished.
    </h1>`
  );
});

// Invalid Routes
app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

app.listen(3000, () => console.log("App is listening at port at 3000"));