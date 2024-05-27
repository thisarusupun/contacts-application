import express from "express";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoutes.js";
import userRoute from "./routes/userRoutes.js";
import connectDb from "./config/dbConnection.js";
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use("/api/contacts", contactRoute);
app.use("/api/users", userRoute);

connectDb();
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
