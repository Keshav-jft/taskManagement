module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user) {
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
