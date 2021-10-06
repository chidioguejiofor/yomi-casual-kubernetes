import express, { Request, Response } from "express";
import { Routes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes.addRoutesToApp(app);
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

export default app;
