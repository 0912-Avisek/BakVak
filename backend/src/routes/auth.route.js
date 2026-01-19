import { Router } from "express";
import { signAuth , loginAuth , logoutAuth, updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup",signAuth);

authRouter.post("/login",loginAuth);

authRouter.post("/logout",logoutAuth);

authRouter.put("/update-profile", protectRoute, updateProfile);

authRouter.get("/check", protectRoute , (req, res) => res.status(200).json(req.user));



export default authRouter;