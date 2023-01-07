import express,{Application} from 'express';
import bodyParser from 'body-parser';
import  dotenv from 'dotenv';
import db from './config/dbConnect';
import session from 'express-session';

dotenv.config();
db;
const app : Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
    resave: false,
    secret: "somesessionsecrets",
    saveUninitialized: true
}));


const PORT = process.env.PORT || 8080;



import userRouter from './routers/routes';
app.use(userRouter);






app.listen(PORT, ()=>console.log(`server started on http://localhost:${PORT}`));