import express from "express";
import { User } from "../database/db.js";

class UserController {
  static async signIn(req, res) {
    const { name, email, age, password, confirmPassword } = req.body;
    try {
      const newUser = new User({
        name,
        email,
        age,
        password,
        confirmPassword
      });
      await newUser.save();
      res.json({ message: 'dati salvati nel db' });
    } catch (error) {
      console.error('Errore durante il salvataggio dei dati:', error);
      res.status(500).json({ error: 'Errore durante il salvataggio dei dati' });
    }
  }

}

export { UserController };