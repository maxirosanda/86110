
export const authUser = (req, res, next) => {
    if(req.user.role === 'user' || req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'User not authorized' });
}

export const authAdmin = (req, res, next) => {
    if(req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'User not authorized' });
}
