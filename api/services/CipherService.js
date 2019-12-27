var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
  secret: sails.config.jwtSettings.secret,
  issuer: sails.config.jwtSettings.issuer,
  audience: sails.config.jwtSettings.audience,

  /**
   * Hash the password field of the passed user.
   */
  hashPassword: function (user) {
    console.log('---->>>>>',user.password)
    if (user.password) {
      return user.password = bcrypt.hashSync(user.password);
    }
  },

  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */
  comparePassword: function(password, user){
    console.log('password',password)
    console.log('password sync',bcrypt.hashSync(password))
    console.log('password stored',user.password)
    return bcrypt.compareSync(password, user.password);
  },

  /**
   * Create a token based on the passed user
   * @param user
   */
  createToken: function(user)
  {
    return jwt.sign({
        user: user.toJSON(),
      },
      sails.config.jwtSettings.secret,
      {
        algorithm: sails.config.jwtSettings.algorithm,
        expiresIn: sails.config.jwtSettings.expiresInMinutes,
        issuer: sails.config.jwtSettings.issuer,
        audience: sails.config.jwtSettings.audience
      }
    );
  }
};
