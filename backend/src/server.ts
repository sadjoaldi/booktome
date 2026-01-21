import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "node:http";
import { appRouter } from "./trpc/app-router";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const allowedOrigin: string[] = ["http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ): void => {
    if (!origin || allowedOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by Cors"));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de base pour tester le serveur
app.get("/", (req, res) => {
  res.json({ message: "Backend BookToMe API is running!", version: "1.0.0" });
});

// Mount trpc endpoint
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }),
);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
