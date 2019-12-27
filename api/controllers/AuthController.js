/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const passport = require('passport');
module.exports = {

  login:async function(req,res){
    passport.authenticate('webLogin', function (err, user, info) {
      if ((err) || (!user)) {
        req.flash('errMessage', info.message);
        return res.redirect('/')
      }
      else {
        req.logIn(user, function (err) {
          if (err) {
            res.redirect('/');
          } else {
            if(req.user.role.includes('ROLE_SUPER_ADMIN') ) {
              return res.redirect('/dashboard');
            }
            req.flash('errMessage', "You have not assigned Admin login role");
            res.redirect('/');
          }
        })
      }
    })(req, res);
  },
  dashboard: async function (req, res) {
    return res.view("admin/dashboard", {layout: 'layouts/adminLayout'});
  },

  logout:function(req,res){
    req.session.destroy();
    return res.redirect('/');
  }
};

