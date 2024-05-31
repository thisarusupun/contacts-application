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
app.use(
  cors({
    origin: ["https://contacts-application-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/contacts", contactRoute);
app.use("/api/users", userRoute);

connectDb();
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
