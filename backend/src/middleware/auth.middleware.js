import jwt from "jsonwebtoken";
import User from "./models/user.model.js";

export const protectRoute = async(req, res, next) => {

      try{ // first we take the token from the cookies..
           const token =req.cookies.jwt;
           //checking the cookies..
           if(!token){
              return res.status(401).json({message : "Unauthorized User"});
           }
          //if we have the token then we decode it ..
           const decode = jwt.verify(token, process.env.JWT_SECRET);

          //if decode of token is not 
           if(!decode){
             return res.status(401).json({ message: "Unauthorized -Invalid token"});
           }
         
         // 
         const user = await User.findById(decode.userId).select(" -password ");
         if(!user) return res.status(404).json({ message : "user not found "});
         req.user= user;
         next();
        
        
      }catch (error){
           console.log("Error in protectRoute middleware: ", error);
           res.status(500).json({message : "Internal server error "});
      }
}