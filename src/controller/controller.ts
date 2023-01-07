import IUser from "../interface/userInterface";
import userModel from "../model/userModel";
import bcrypt from 'bcrypt';

import { Request,Response } from "express";



import "express-session";
import todoModel from "../model/todoModel";
declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}

export const register = async(req:Request, res:Response)=>{
    try {
        const {name, email, password} = req.body;
        
        let user = await userModel.findOne({email});
        
        if(user){
            res.json({message: "User Already Exists..."});
        }
        
        const hashPassword = await bcrypt.hash(password, 10); 
        
        user = new userModel({
            ...req.body,
            password:hashPassword
        });
        
        const result = await user.save()
        .then((result)=> res.send({result: result}))
        .catch((error)=> res.send({error: "Register Failed..."}));
        
    } catch (error) {
        console.log(error);
        
    }
}


export const login = async(req:Request, res:Response)=>{
    try {
        const {email, password} = req.body;
        
        const user = await userModel.findOne({email});
        if(user &&   await bcrypt.compare(password, user.password)){
            req.session.user = user;
            const userData = await userModel.findById({_id:user._id});
            res.status(200).send({user: userData,message:"Now You Can Add Todo..."});
        }else{
            res.status(404).send({error:"User Not Found..."})
        }
    } catch (error) {
        console.log(error);
        
    }
}

export const createTodo =async (req:Request, res:Response) => {
    try {
        const userId = req.session.user?._id;
        const {desc} = req.body;
        const todo = new todoModel({...req.body, userId});
        const result = await todo.save();
        if(result) res.status(200).send({success:"Todo Added..."})
    } catch (error) {
        res.status(404).send({error:"Failed To Add..."})
    }
}


//AdminSide Get Todo Of User
export const adminSide = async(req:Response, res:Response)=>{
    try {
        

        
        
    } catch (error) {
        res.send({error:"Failed To Get Todo Of User"});
    }

}



