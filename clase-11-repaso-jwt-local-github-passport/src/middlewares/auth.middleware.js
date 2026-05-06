
export const authUser = (req, res, next) => {
    if(req.user.role === 'user' || req.user.role === 'admin') {
        return next();
    }
    res.redirect('/login');
}

export const authAdmin = (req, res, next) => {
    if(req.user.role === 'admin') {
        return next();
    }
    res.redirect('/login');
}
