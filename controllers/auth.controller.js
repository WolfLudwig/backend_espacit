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


// const createToken = (id) => 
// { 
//     return jwt.sign({id}, RSA_PRIVATE_KEY, 
//         {
//             algorithm: 'RS256',
//             expiresIn: maxAge,
//             subject: userId
//         })
// }

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
    console.log("je suis dans signIn ");
    const email = req.body.email;
    const password = req.body.password;
    try {
       const user = await UserModel.login(email, password);
       console.log(user._id + " idRecup pour créer token");
       const token = createToken(user._id);
       console.log(" user trouvé : token créé " + token );
       res.cookie('jwt', token, { httpOnly: true, secure:true });
       res.status(200).json({ idToken : token,
                            expiresIn : maxAge });
       console.log(user._id + " sortie de signIn");
    }
    catch (err){
        const errors = signInErrors(err);

        res.status(200).send({ errors });
      }
}

module.exports.requireAuth = (req, res) => {
    console.log(req.params._id + " _id");
    console.log(req.params.id + " id");
    console.log(req.body);
    const token = req.params.id;
    console.log(token + " token récup pour auth");
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(decodedToken.id + " token");
                res.status(201).json(decodedToken.id);
                

            }
        });
    }
    else{
        console.log('Pas de token');
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




