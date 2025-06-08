import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express(); // Create the express app instance

// Define your routes
app.get("/", (req, res) => {
    res.send("<h1>Hi there</h1>");
});

app.use(express.json());

app.use("/api/v1/auth",authRoutes);

export default app;