import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect("");               //Add Your Connection String
const db = mongoose.connection;

db.on("error", ()=> console.log("DB Connection Error"));
db.once("open", ()=>{console.log("DB Connected");
});

export default db;



