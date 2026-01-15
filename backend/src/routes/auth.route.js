import { Router } from "express";
import { loginAuth } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/login").post(loginAuth);

authRouter.route("/register").post();

authRouter.route("/verify").post();

export default authRouter;