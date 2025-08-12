require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        //check user exist
        const user = await User.findOne({email});
        if (user){
            return null;
        }
        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        //save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "NMH"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email1, password) => {
    try {
        //fetch user by email
        const user = await User.findOne({email: email1});
        if (user){
            //compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword){
                return {
                    EC: 2,
                    EM: "Email/Password fail"
                }
            }else{
                //create an access token
                const payload = {
                    email: user.email,
                    name: user.name
                }

                const accessToken = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    EC: 0,
                    accessToken,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        }else{
            return {
                EC: 1,
                EM: "Email/Password fail"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {

        let result = await User.find({}).select("-password");
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}





module.exports = {
    createUserService, loginService, getUserService
}