const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    console.log(req.headers['x-access-token'] + " access token");
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err,decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1000000 });
                next();
            }
            else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(user);
                next();
            }
        })
        }
        else {
            res.locals.user = null;
            next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log(token + " toekn decode requireAuth");
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(decodeToken.toString());
                console.log(decodedToken.id + " token decodé requireAuth");
                res.send(decodedToken.id);
                next();
            }
        });
    }
    else{
        console.log('Pas de token');
    }
}