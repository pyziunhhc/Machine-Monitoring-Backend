import express from 'express';
const router = express.Router();
import {
  check,
  validationResult
}
from 'express-validator';
import Users from './models/UsersModel.mjs'
import {
  jwtAuth
} from '../../middleware/auth.mjs';
import UsersController from './UsersController.mjs'
router.get('/', jwtAuth, UsersController.get)
router.get('/current', jwtAuth, UsersController.getCurrentUser)
router.put('/password', UsersController.updatePassword)
router.put('/email', UsersController.updateEmail)
router.delete('/delete', UsersController.remove)
router.post('/register',
  [
    check('login')
    .not().isEmpty().withMessage('Login nie może być pusty!')
    .isLength({
      min: 3
    }).withMessage('Minimalna długość loginu to 3 znaki!'),
    check('email')
    .isEmail().withMessage('Wprowadź poprawny adres email!'),
    check('password')
    .not().isEmpty().withMessage('Hasło nie może być puste!')
    .isLength({
      min: 5
    }).withMessage('Hasło musi zawierać przynajmniej 5 znaków!'),
    check('name')
    .not().isEmpty().withMessage('Musisz wpisać imię!'),
    check('surname')
    .not().isEmpty().withMessage('Musisz wpisać nazwisko!'),
    check('role')
    .not().isEmpty().withMessage('Musisz wybrać rolę!'),
  ], UsersController.register)
router.post('/myAccount', (req, res, next) => {
  const login = req.cookies.login;
  if (login) {
    Users.findOne({
      login: login
    }, (err, user) => {
      if (user) {
        res.send({
          title: 'Moje konto | ITA Tools Sp. z o.o',
          jsfiles: 'myAccount.js',
          cssfiles: 'users',
          user: user,
          login: login
        })

      } else {
        res.send({
          status: 500,
          message: ['Błąd bazy danych']
        })
      }
    })

  } else {
    res.redirect('/login')
  }

})
export default router;