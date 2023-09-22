import express from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const app = express();
const port = process.env.PORT || 3000;

const url = "mongodb+srv://digitazon:ciao@progetto-mal.cgdwk5g.mongodb.net/progetto-mal?retryWrites=true&w=majority"

// connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('db connection ok')
    })
    .catch(err => console.log(err))


// schemas
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: {type: Number},
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },

    favorites: [{
        id:Number,
        title:String
    }]


}, { timestamps: true })

const User = mongoose.model('User', UserSchema);
export { User }



