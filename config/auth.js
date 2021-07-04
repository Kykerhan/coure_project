module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  },
  ensureAdmin: function (req, res, next){
    if(req.user == undefined){
      res.redirect('/users/login');
    }
    if(req.user.role === "admin"){
      return next();
    }else{
      req.flash('error_msg', 'is not enough permissions');
      res.redirect('/dashboard');
    }
  }
};
