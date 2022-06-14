module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'You have to login first to use this Restaurant List.')
    res.redirect("/users/login")
  }
}
