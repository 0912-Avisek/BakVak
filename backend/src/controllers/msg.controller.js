import User from '../models/user.model.js';
import Message from '../models/message.model.js';
// to do cloudinary

export const getAllContacts = async (req, res) => {
    try{
       const loggedInUserId = req.user._id;

       const filteredUsers =await User.find( {_id : {$ne : loggedInUserId } }).select("-password");

       res.status(200).json(filteredUsers);

    }catch(error){
         console.log("Error in getAllContacts : ", error);
         res.status(500).json({message : "Internal server error"});
    }

}

export const sendMessage = async (req, res) =>{
    try{
        const senderId =req.user._id;
        const {id : receiverId }= req.params;
        const { text , image} =req.body;
        let imageUrl;
        if(image){
            const uploadResponse = await Cloudinary.uploader.upload(image);
            imageUrl= uploadResponse.secure_url;
        }

        const newMessage =new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl,

        })

        await newMessage.save();

        res.status(201).json(newMessage);

    }catch(error){
         console.log("sendMessage is not working", error);
         res.status(500).json("internal server error");
    }


}

export const getBothMessages = async (req, res) =>{
  try{

    const myId = req.user._id;
    const {id : sendingtoId} =req.params;

    const messages= await Message.find({
      $or:[
        {senderId : myId , receiverId : sendingtoId},
        {senderId : sendingtoId, receiverId : myId}
      ]
    })

    res.status(200).json(messages);

  }catch( error){
       console.log("getBothMessages is not working", error);
         res.status(500).json("internal server error");
  }

}

export const getChatPatners = async (req, res) =>{
    try{
       const loggedInUserId = req.user._id;
       
       const messages= await Message.find({
          $or: [
            {senderId: loggedInUserId} , {receiverId : loggedInUserId}
          ]
       });

       const chatPartnerIds =[
        ...new Set(messages.map((msg) => 
        msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            :msg.senderId.toString()
            )
        )
       ];

    }catch(error){
        console.log("getChatPatners is not working", error);
         res.status(500).json("internal server error");
    }
}