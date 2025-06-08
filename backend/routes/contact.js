import { Router } from "express";
import { contactus } from "../controllers/contactus.js";

export const contactRouter = Router();

contactRouter.post("/addContact", contactus);
