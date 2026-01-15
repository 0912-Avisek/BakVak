import { hashPassword } from "../lib/utilis/bcryptpass.js";
import User from "../models/user.model.js";

export const loginAuth = async(req, res) =>{
    const { username, password, email } = req.body;
   try{

        if( !username || !password || !email){
        res.status(400).json({ message: "Username, password, and email are required." });
        }

        if(password.length < 6){
        res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
        res.status(400).json({ message: "Invalid email format." });
        }


        const newUser = await User.findOne({ email });

       if(newUser){
        res.status(400).json({ message: "Email already in use." });
        }

        const hashedPassword = await hashPassword(password);

        const userDB = new User ({
            username,
            email,
            password: hashedPassword
        });

        if(userDB){
           
            await userDB.save();
             generateToken(userDB._id, res);

            res.status(201).json({ 
                _id: userDB._id,
                username: userDB.username,
                email: userDB.email,
                profilePic: userDB.profilePic
             });
        }
        


   }catch(error){
        res.status(500).json({ message: "Server error. Please try again later." });
        console.error("Error during user registration:", error);
   }
    

};