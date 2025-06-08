import { Router } from "express";
import { job } from "../controllers/job.js";

export const jobRouter = Router();

jobRouter.post("/form", job);
