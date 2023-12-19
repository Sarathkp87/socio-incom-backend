import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURATION
const__filename =fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename);   ////these are only when u use type:module
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",exended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.json(__dirname,'public/assets')));


// FILE STORAGE

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");  //someone uploads a file onto ur website it is going get save to this partticular folder
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload =multer({storage})  //so anytime we upload a file we will use this variable