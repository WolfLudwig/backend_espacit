const UserModel = require('../models/user.model');
const AccountModel = require ('../accounts/account.model')
const ObjectID = require('mongoose').Types.ObjectId;

//trouver tout les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    console.log(req.params)
    const users = await AccountModel.find({$and : [{role : {$eq :  "User"}}, {id : {$ne : req.params.id}}, {friend : {$ne : req.params.id}}]});
    
    console.log(" ce que je retourne pour finfreinds");
    console.log(users);
    res.status(201).json(users);
};

module.exports.checkLikes= async (req, res) => {
    try
    {
        await UserModel.find({_id : res.locals._id}, (err, docs) =>
        {
            if(!err) UserModel.find({likes : req.params.id}, (err, docs) =>
            {
                if(!err) res.status(200).send(docs)
            })
        })
    }
    catch
    {
        res.status(404).send("user not found");
    }
};

module.exports.getOneUser = (req, res) =>
{
    console.log( " dans getOneUser !! !!! !" );
    console.log(req.params._id + " id");
    if (!ObjectID.isValid(req.params._id) )
    {
        return res.status(400).send('ID unknown : ' + req.params._id)
    }

    const user =  UserModel.findOne({_id : req.params._id}, (err, docs) =>
    {
        if(!err) res.status(201).send(docs)
        else res.status(404).send(err)
    })

}

module.exports.getAllUsersDistinct = async (req, res) => {

    console.log( " DANS LE DISCTINCT");
    console.log(req.params);

    if (!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    try {
        const users = await UserModel.find({$and : [{friend : {$ne :req.params.id}},{role : {$eq : "User"}}]}, (err, docs) =>
        {
            if(!err)res.status(200).json(users);
            else res.status(400).send();
            
        });
    }
    catch(error)
    {
        res.status(400).send(error);
    }
    
};

//trouver l'utilisateur connecté
module.exports.currentUserInfo = async (req,res) => {
    console.log(res.locals.id + " id retour requireAuth");

    UserModel.findById(res.locals._id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password');

};

//update user
module.exports.udapteUser = async (req,res) => {
    
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err,docs) => {
                if (!err) return res.send[docs];
                if (err) return res.status(500).send({ message: err});
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message: err});
    }
};

//delete user
module.exports.deleteUser = async(req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try{
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted. "});
    }
    catch(err)
    {
        return res.status(500).json({ message:err});
        
    }
};

//ajouter un ami
module.exports.Addfriend = async (req,res) => {

    console.log( "dns friend");
    console.log(req.body.idFriend);
    console.log(res.locals._id + " idUser session");

    if (!ObjectID.isValid(req.body.idFriend) || !ObjectID.isValid(res.locals._id))

        return res.status(400).send('ID unknown : ' + req.body.idFriend);

    try{
        //ajouter a la liste d'ami
        await UserModel.findByIdAndUpdate(
            res.locals._id,
            { $addToSet: { friend: req.body.idFriend }},
            { new: true, upsert: true },
            (err,docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
         UserModel.findByIdAndUpdate(
            req.body.idFriend,
            { $addToSet: {friend: res.locals._id }},
            { new: true, upsert: true },
            (err,docs) => {
                if (err) return res.status(400).json(err);
            }
        );
    }
    catch(err)
    {
        return res.status(500).json({ message: err});
    }
};


//enlever un ami
module.exports.unfriend = async (req,res) => {

    console.log( "dns unFriend");
    console.log(req.body.idFriend);
    console.log(req.body + " body");
    console.log(res.locals._id +" idUser session");
    if (
        !ObjectID.isValid(req.body.idFriend) ||
        !ObjectID.isValid(res.locals._id)
        )
        return res.status(400).send('ID unknown : ' + req.body.idFriend)

    try{
        //remove to friend list
        await UserModel.findByIdAndUpdate(
            req.body.idFriend,
            { $pull: { friend: res.locals._id}},
            {new: true, upsert: true},
            (err,docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        
         UserModel.findByIdAndUpdate(
            res.locals._id,
            { $pull: { friend: req.body.idFriend }},
            {new: true, upsert: true},
            (err,docs) => {
                if (err) {return res.status(400).json(err)};
            }
        )
    }
    catch(err)
    {
        return res.status(500).json({ message:err});
        
    }
};

module.exports.friendsList=  (req,res, next) => {

    if (!ObjectID.isValid(res.locals._id))
    {
        return res.status(400).send('ID unknown : ' + res.locals._id);
    }
  
    UserModel.findById(res.locals._id,
        (err,docs) => {
            if (!err)
            {
                UserModel.find({friend : { $eq :  res.locals.id }},
                (err,docs) => {
                    if (!err) res.status(201).json(docs);
                    else return res.status(400).json(err);
                })
            }
            else 
            {
                return res.status(400).json(err);
            }
        });
};
