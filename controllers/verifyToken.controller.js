const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {

    const token = req.headers['x-access-token'];
    if (token)
    {
      try  {
          //req._id vient du front
          // besoin de toujours envoyer un _id vers le back pour décoder le token
          // ._id représentant l'id user
                jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {

                    if (err) {

                        res.locals.user = null;
                        res.cookie('jwt', '', { maxAge: 1000000 });
                        next();
                    }
                    else 
                    {
                        UserModel.findById( decodedToken.id, (err, result) =>
                        {
                            if(err) 
                            {
                                res.status(404).send(err)
                            }
                            else
                            {
                                res.locals = result;
                                next();
                            }      
                        });                            
                    }
             });             
        }
        catch(error)
        {
            console.log(error);
            res.status(400).send("Pas de token");
        }
        
    }
    else
    {
        next();
    }
}

module.exports.checkUser = (req, res, next) => {
    console.log(" je ne suis pas dans checkUser ??");

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