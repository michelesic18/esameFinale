import { User } from "../database/db.js";

class loginController {
  static async login(req, res) {
    const { name, password } = req.body;

    try {
      
      const user = await User.findOne({ name: name, password: password });

      if (user) {
      
       req.session.user = user
        res.status(200).json({ success: true, message: 'Login avvenuto con successo' });
      } else {
      
        res.status(401).json({ success: false, message: 'Credenziali non valide' });
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      res.status(500).json({ success: false, message: 'Errore del server' });
    }
  }


}

export { loginController };