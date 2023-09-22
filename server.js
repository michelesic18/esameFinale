import express from "express";
import session from "express-session";
import axios from "axios";
import cors from 'cors'
import { User } from "./database/db.js";
import router from "./router/router.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'jsx');
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:5173',
credentials: true, 
allowedHeaders: ['Content-Type', 'Authorization'] }));

app.use(express.json());

// qui cerco di gestire le sessioni 
app.use(
  session({
    secret: "key1", 
    resave: false,
    saveUninitialized:true,
    cookie:{secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 ,sameSite: 'none' }
  })
)

app.use('/', router);

app.post('/logout', (req, res)=>{
  req.session.destroy(err =>{
    if (err) {
      console.error('errore durante la distruzione della sessione', err)
      res.status(500).json({success : false, message: 'logout avvenuto con successo'})
    } else{
      res.status(200).json({success:true, message:'logout avvenuto con successo'})
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

