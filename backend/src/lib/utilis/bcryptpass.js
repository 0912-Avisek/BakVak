import bycrypt from "bcryptjs";

const saltRounds = 10;

// FIRST METHOD
export const hashPassword = async(password) =>{
    const salt = await bycrypt.genSalt(saltRounds);
    const hashedPassword = await bycrypt.hash(password, salt);
    return hashedPassword;
}

// SECOND METHOD
export const comparePassword = async (password, userpassword) =>{
    return await bycrypt.compare(password, userpassword);
}