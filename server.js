import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"


dotenv.config()

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://brivin-ad8a5.web.app",
      "https://briv-in.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", contactRoutes)

const PORT = process.env.PORT || 7000
app.listen(PORT, () => console.log(`Server brivin running on port ${PORT}`))


app.get("/", (req, res) => {
  res.send("Welcome to Brivin and thank you users");
});