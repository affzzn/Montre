import {Router, Request, Response} from "express";
import { IUser, userModel } from "../models/user";
import { USER_ERRORS } from "../errors";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router();

// "localhost:3000/user" // is for the user route
// "localhost:3000/use/register" // is for the user register route within the user route

// registering a new user
router.post('/register', async (req: Request, res: Response) => {
    const {username, password} = req.body

    // check if user already exists

try{
    // if user exists, return an error
    const user = await userModel.findOne({username: username})

    if(user){
        return res.status(400).json({type: USER_ERRORS.USER_ALREADY_EXISTS})
    }

    // if user does not exist, create a new user

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({username, password: hashedPassword})
    await newUser.save()


    res.json({message: 'User registered successfully'})
}catch(error){
    console.log(error)
    res.status(500).json({type: error})
}
})


// authenticating a user :: login

router.post('/login', async (req: Request, res: Response) => {
    const {username, password} = req.body

    // check if user exists
    try {
        
        const user: IUser = await userModel.findOne({username: username})

        if(!user){
            return res.status(400).json({type: USER_ERRORS.USER_NOT_FOUND})
        }

        // check if password is correct
        // password === user.password // user.password is the hashed password

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({type: USER_ERRORS.INCORRECT_CREDENTIALS})
        }

        const token = jwt.sign({id: user._id}, 'secret')
        res.json({token, userID: user._id})

    } catch (error) {
        res.status(500).json({type: error})
    }
})


export {router as userRouter}