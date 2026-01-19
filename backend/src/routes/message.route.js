import Router from "express";

const messageRouter = Router();
// Define your message routes here
messageRouter.route("/contacts").get(getAllContacts);
messageRouter.route("/chats").get(getChatPartners);
messageRouter.route("/:id").get(getMessagesByUserId);

messageRouter.route("/send/:id").post(sendMessage);


export default messageRouter;