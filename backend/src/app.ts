import express from "express";
import cors from "cors";
import pollRoutes from "./routes/pollRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/polls", pollRoutes);

export default app;
