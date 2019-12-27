var passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('jwt',async function (error, user, info) {
    if (error) {
      return res.serverError(error);
    }
    if (!user) {
      console.log("Not AUTHENTICATED USER");
      return res.unauthorized(null, info && info.code, info && info.message);
    }
    if(user)
    {
        let currentUser=await User.findOne({id:user.id});
        if(!currentUser)
        {
            return res.json({ status: 'ERROR',
                message: 'User not found.',
                data: {},
            });
        }
        req.user = currentUser;
      console.log("AUTHENTICATED USER");
      next();
    }
  })(req, res);
};
