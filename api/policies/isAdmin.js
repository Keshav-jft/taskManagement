module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role.includes('ROLE_SUPER_ADMIN') ) {
            return next();
        }
        else {
            res.redirect('/');
        }
    }
    else{
        return res.redirect('/');
    }
};
