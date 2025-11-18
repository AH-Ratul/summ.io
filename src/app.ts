import express, { Application, Request, Response } from "express";
import appRouter from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      const originUri = ["http://localhost:3000"];
      if (!origin || originUri.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/v1", appRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Summ.io app running...",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
