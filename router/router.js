
import express from "express";
import { UserController } from "../controller/signInController.js"; 
import {loginController} from "../controller/loginController.js"




//qui in router ho provato a gestire che se l'utente era logatto gli venisse lasciato in permesso di entarre e svolgere certe operazioni ma mi ha casusato molti problemi

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
      return next();
  }
  res.status(401).json({ message: 'Non autorizzato' });
}

router.get('/user', ensureAuthenticated, (req,res) =>{
  res.status(200).json({user: req.session.user})
}
)

router.delete('/', ensureAuthenticated, (req, res) => {
  User.findByIdAndDelete(req.session.user._id) 
    .then(user => {
      req.session.destroy(); 
      res.status(200).json({ message: 'Account eliminato con successo' });
    })
    .catch(error => {
      console.error('Errore durante l\'eliminazione dell\'account:', error);
      res.status(500).json({ message: 'Errore del server' });
    });
});

router.post('/login', loginController.login);

router.post('/sign-in', UserController.signIn);

router.post("/logout", (req,res)=>{
  res.sendStatus(200)
})

export default router;