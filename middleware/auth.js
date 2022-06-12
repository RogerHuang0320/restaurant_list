module.exports = {
  authenticator: (req, res, next) => {
    let a = req.isAuthenticated
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash("warning_msg", "You Have to login first to use this Restaurant List.")
    res.redirect("/users/login")
  }
}