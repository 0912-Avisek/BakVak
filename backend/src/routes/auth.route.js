import { Router } from "express";
import { signAuth , loginAuth , logoutAuth} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/signup").post(signAuth);

authRouter.route("/login").post(loginAuth);

authRouter.route("/logout").post(logoutAuth);

export default authRouter;