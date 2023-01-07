import  express,{Request, Response}  from "express";


const userRouter = express();


import { register, login,createTodo } from "../controller/controller";
import { isAuth } from "../middleware/isAuth";
import todoModel from "../model/todoModel";
import userModel from "../model/userModel";


userRouter.get("/",async(req:Request, res:Response)=>{
    const user =await userModel.aggregate([{$lookup:{from:"todos", localField:"_id",foreignField:"userId",as:"todos"}}, {$unwind:{path:"$todos", preserveNullAndEmptyArrays: true} }]); 
    res.send(user)
});
userRouter.get("/addtodo",isAuth,async(req:Request, res:Response)=>{
    const userData = req.session.user;
    
    
    res.send({isVerify: true, message:"Add Todo..."})
});




userRouter.get("/get",isAuth, async(req:Request, res:Response)=>{
    const user = req.session.user?._id;
    const userTodo = await todoModel.findOne({userId: user});
    res.send({yourTodo: userTodo})
});


userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/addtodo", createTodo);

export default userRouter;