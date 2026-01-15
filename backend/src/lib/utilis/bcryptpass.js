import bycrypt from "bcryptjs";

const saltRounds = 10;

export const hashPassword = async(password) =>{
    const salt = await bycrypt.genSalt(saltRounds);
    const hashedPassword = await bycrypt.hash(password, salt);
    return hashedPassword;
}