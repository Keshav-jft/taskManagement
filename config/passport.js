
/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var bcrypt = require('bcrypt');
passport.serializeUser(function (user, done) {
  done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  var existingUser = {};
  var roles=[];
  User.findOne({id: id}).populate(['role']).exec(function (err, user) {
      if (user) {
        existingUser.firstName = user ? user.firstName :'';
        existingUser.lastName = user ? user.lastName :'';
        existingUser.email = user ? user.email : '';
        existingUser.mobileNumber= user ? user.mobileNumber : '';
        existingUser.id = user ? user.id : '';
        existingUser.tokenType = 'JWT ';
        user.role.forEach(function (auth) {
          roles.push(auth.authority)
        });
        existingUser.role = roles;
        done(err, existingUser);
      }else{
        done(null,false);
      }
    }
  );
});




/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'username',
  passwordField: 'password',
  jwtFromRequest:ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  passReqToCallback: true,
};

/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: '4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM',
  issuer : "amit",
  audience: "ravi",
  jwtFromRequest:ExtractJwt.fromAuthHeaderWithScheme('jwt'),

};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(req,username,password, next) {
  User.findOne({email:username}).populate('role')
    .exec(function (error, user) {
      console.log('*********',user);
      if (error) return next(error, false, {});
      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: 'Email or Password wrong',
      });
      // TODO: replace with new cipher service type
      if (!CipherService.comparePassword(password, user))
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Email or Password wrong',
          authenticated:false
        });
      return next(null, user, {});
    });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  return next(null, user, {});
}
passport.use(
  new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
  new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));



passport.use('webLogin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },

  function (email, password, done) {
    User.findOne({email: email}).populate('role').exec(function (err, user){
      if (err) {
        console.log('errrr-----')
        return done(err);
      }
      if (!user) {
        return done(null, false, {message: 'Invailid Email'});
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (!res)
          return done(null, false, {
            message: 'Password not matched.'
          });
        let existingUser = {};
        let roles = [];
        user.role.forEach(function (auth) {
          roles.push(auth.authority)
        });
        existingUser.role = roles
        existingUser.id = user.id;
        return done(null, existingUser, {
          message: 'Logged In Successfully'
        });
      });
    });
  }
));


module.exports.jwtSettings = {
  expiresInMinutes: '365d',
  secret: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
  algorithm : "HS256",
  issuer :  "amit",
  audience : "ravi"
};


