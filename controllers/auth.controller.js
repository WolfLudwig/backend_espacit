const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const logIn = false;

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge       
    })
};

module.exports.signUp = async (req,res) => {
    console.log(req.body);
    const {pseudo, email, password} = req.body
    try {
        const user = await UserModel.create({pseudo, email, password});
        this.logIn = true;
        res.status(201).json({ user: user._id});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
    }
}

module.exports.signIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
       const user = await UserModel.login(email, password);
       console.log(user);
       const token = createToken(user._id);
       res.cookie('jwt', token, { httpOnly: true, maxAge });
       this.logIn = true;
       console.log(logIn + " suite à l'authentification !!! ");
       res.status(200).json({ user: user._id })
    }
    catch (err){
        const errors = signInErrors(err);

        res.status(200).send({ errors });
      }
}

module.exports.logout = (req,res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
    this.logIn = false;
}

module.exports.isLog = (req,res) => {
    console.log("je suis dans IsLog !! ");
    console.log(this.logIn + " avant de retourner la valeur");
    if(this.logIn == true) 
    {
        console.log("je suis connecté ! ")
        return res.status(201).send({ logIn });
    }
    return res.status(500).send(false);

    

}


