import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import contactRoutes from "./routes/contactRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", contactRoutes)

const PORT = process.env.PORT || 7000
app.listen(PORT, () => console.log(`Server brivin running on port ${PORT}`))

