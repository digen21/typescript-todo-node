import mongoose,{Schema, model, connect} from 'mongoose';

import ITodo from '../interface/todoInterface';


const todoSchema = new Schema({
    id:{
        type:"string",
    },
    desc:{
        type:'string',
        required:'true'
    },
    userId:{
        type: Schema.Types.ObjectId,
        required:'true'
    }
});


const todoModel = model<ITodo>("Todos", todoSchema);
export default todoModel;