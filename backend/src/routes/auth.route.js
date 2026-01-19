import { Router } from "express";
import { signAuth , loginAuth , logoutAuth, updateProfile} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup",signAuth);

authRouter.post("/login",loginAuth);

authRouter.post("/logout",logoutAuth);

authRouter.put("/update-profile", protectRoute, updateProfile);

export default authRouter;