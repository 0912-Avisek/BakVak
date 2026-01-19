import Router from "express";
import { getAllContacts, getBothMessages, getChatPatners, sendMessage } from "../controllers/msg.controller";
import { protectRoute } from "../middleware/auth.middleware";

const messageRouter = Router();
// Define your message routes here
messageRouter.get("/contacts",protectRoute,getAllContacts);

messageRouter.get("/chats", protectRoute, getChatPatners )

messageRouter.get("/:id", protectRoute, getBothMessages )

messageRouter.post("/send/:id", protectRoute, sendMessage);


export default messageRouter;