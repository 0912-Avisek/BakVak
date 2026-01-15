import { sendWelcomeEmail } from "../email/emailHandler.js";
import { hashPassword } from "../lib/utilis/bcryptpass.js";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utilis/jwtwebtoken.js";

export const signAuth = async(req, res) =>{
    //takin out data from req body
    const { username, password, email } = req.body;
   try{
    // Input validation
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

    // Check if user already exists
        const newUser = await User.findOne({ email });

       if(newUser){
        res.status(400).json({ message: "Email already in use." });
        }
    // Hash the password
        const hashedPassword = await hashPassword(password);

    // Create new user
        const userDB = new User ({
            username,
            email,
            password: hashedPassword
        });

        if(userDB){
           
             await userDB.save(); // Save user to the database
             generateToken(userDB._id, res); // Generate and send token

    // Send user data in response
            res.status(201).json({ 
                _id: userDB._id,
                username: userDB.username,
                email: userDB.email,
                profilePic: userDB.profilePic
             });
    // Send welcome email
             try{
             await sendWelcomeEmail(userDB.email, userDB.username, process.env.CLIENT_URL);

            }catch(err){
            console.error("Failed to send welcome email:", err);
            }

        }else{
            res.status(400).json({ message: "Invalid user data." });
        }

   }catch(error){
        res.status(500).json({ message: "Server error. Please try again later." });
        console.error("Error during user registration:", error);
   }
    

};

export const loginAuth = async(req, res) =>{
  
}

export const logoutAuth = async(req, res) =>{

}