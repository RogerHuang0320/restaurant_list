const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push[{ message: 'You have to fill in every blank.' }]
  }
  if (password !== confirmPassword) {
    errors.push[{ message: 'The two passwords you put in do not match' }]
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push[{ message: 'This email has been registered.Please use another.' }]
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  })
    .catch(error => console.log(error))
})

router.get('/logout', (req, res) => {
  req.logout() //Passport.js 提供的函式，清除 session
  req.flash('success_msg', 'You have logged out successfully.')
  req.redirect('/users/login')
})

module.exports = router