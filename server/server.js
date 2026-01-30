// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import { clerkMiddleware, requireAuth } from "@clerk/express";
// import aiRouter from "./routes/aiRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import connectCloudinary from "./configs/cloudinary.js";
// import multer from "multer";

// // Initialize Express
// const app = express();

// // Load environment variables
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(clerkMiddleware());

// // Multer setup for file uploads
// const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files

// // Connect to Cloudinary
// await connectCloudinary();

// // Root route
// app.get("/", (req, res) => res.send("Server is Live!"));

// // ===== Routes =====

// // AI routes (protected)
// app.use("/api/ai", requireAuth(), aiRouter);

// // User routes (protected)
// app.use("/api/user", requireAuth(), userRouter);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

// Initialize Express
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(clerkMiddleware());

// Root route (Render health check)
app.get("/", (req, res) => {
  res.send("IntelliStackAI Server is Live 🚀");
});

// Routes
app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);

// Start server AFTER cloudinary connects
const startServer = async () => {
  try {
    await connectCloudinary();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
