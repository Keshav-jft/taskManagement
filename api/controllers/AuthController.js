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
      console.log(err, user, info)
      if ((err) || (!user)) {
        req.flash('errorMsg', 'Email or Password incorrect!');
        return res.redirect('/')
      }
      else {
        req.logIn(user, function (err) {
          if (err) {
            res.redirect('/');
          } else {
            if(req.user.role.includes('ROLE_SUPER_ADMIN') ) {
              return res.redirect('/adminDashboard');
            }
            req.flash('errorMsg', 'Email or Password incorrect!');
            res.redirect('/');
          }
        })
      }
    })(req, res);
  },


//logout api
  logout: async function (req, res) {
    req.session.destroy();
    req.logout();
    return res.redirect('/');
  },
};

