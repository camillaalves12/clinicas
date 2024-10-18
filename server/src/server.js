import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type", "Cache-Control"],
    exposedHeaders: ["Authorization"],
  })
);

app.use(express.json());
app.use(router);

app.listen(3030, () => console.log("🚀 Server listening on port 3030"));
