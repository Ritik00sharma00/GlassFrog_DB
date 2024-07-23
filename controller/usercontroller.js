const User = require("../model/usermodel");
const {sign} = require("jsonwebtoken");
const {hashPassword, comparePassword} = require("../utils/Password");
const fastify = require("fastify")();


const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, reply) =>
 {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});


        if (existingUser)
           {
            return reply.code(400).send({error: "User already exists"});
           }

        const existingUsername = await User.findOne({username});


        if (existingUsername) 
          {
            return reply.code(400).send({error: "Username already in use"});
          }

        const hashedPassword = await hashPassword(password);
        const user = new User({username, email, password: hashedPassword});
        await user.save();
        reply.code(201).send({message: "User created successfully"});
        } catch (err) {
        console.error(err);
        }
};

async function signIn(req, reply) {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return reply.code(401).send({error: "Invalid credentials"});
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return reply.code(401).send({error: "Invalid credentials"});
        }

        const token = sign({userId: user._id}, JWT_SECRET, {expiresIn: "1h"});

        reply.send({message: "Signed in successfully", token});
    } catch (err) {
        console.log(err);
        reply.code(500).send({error: "Error signing in"});
    }
}

module.exports = {
    signUp,
    signIn,
};
