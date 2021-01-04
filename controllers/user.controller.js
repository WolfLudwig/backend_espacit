const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//trouver tout les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

//trouver un seul utilisateur
module.exports.userInfo = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    UserModel.findById(req.params.id, (err, docs) => {
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
module.exports.friend= async (req,res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFriend))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try{
        //ajouter a la liste d'ami
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { friend: req.body.idToFriend}},
            {new: true, upsert: true},
            (err,docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.idToFriend,
            { $addToSet: {friend: req.params.id }},
            {new: true, upsert: true},
            (err,docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    }
    catch(err)
    {
        return res.status(500).json({ message: err});
    }
};


//enlever un ami
module.exports.unfriend = async (req,res) => {
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToUnFriend)
        )
        return res.status(400).send('ID unknown : ' + req.params.id)

    try{
        //remove to friend list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { friend: req.body.idUnToFriend}},
            {new: true, upsert: true},
            (err,docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        
        await UserModel.findByIdAndUpdate(
            req.body.idToUnFriend,
            { $pull: { friend: req.params.id }},
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