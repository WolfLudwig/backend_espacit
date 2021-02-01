const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//trouver tout les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
};

module.exports.getAllUsersDistinct = async (req, res) => {

    console.log( " DANS LE DISCTINCT");
    console.log(req.params);

    if (!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    //> db.demo1.find({$nor:[{$and:[{'StudentName':'David'},{'StudentMarks':78}]}]});
    try {
        const users = await UserModel.find({friend :{$not : req.params.id}}, (err, docs) =>
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

//trouver un seul utilisateur
module.exports.userInfo = async (req,res) => {

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
module.exports.Addfriend = async (req,res) => {

    console.log( "dns friend");
    console.log(req.body);

    if (!ObjectID.isValid(req.body.idFriend) || !ObjectID.isValid(req.body.myId))

        return res.status(400).send('ID unknown : ' + req.params.id);

    try{
        //ajouter a la liste d'ami
        await UserModel.findByIdAndUpdate(
            req.body.myId,
            { $addToSet: { friend: req.body.idFriend }},
            { new: true, upsert: true },
            (err,docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
         UserModel.findByIdAndUpdate(
            req.body.idFriend,
            { $addToSet: {friend: req.body.myId }},
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
    if (
        !ObjectID.isValid(req.body.idFriend) ||
        !ObjectID.isValid(req.body.myId)
        )
        return res.status(400).send('ID unknown : ' + req.body.idFriend)

    try{
        //remove to friend list
        await UserModel.findByIdAndUpdate(
            req.body.idFriend,
            { $pull: { friend: req.body.myId}},
            {new: true, upsert: true},
            (err,docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        
         UserModel.findByIdAndUpdate(
            req.body.myId,
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

module.exports.friendsList= async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
  
    UserModel.findOne({id: req.params.id},
        (err,docs) => {
            if (!err)
            {
                console.log(" j'ai récupéré mon utilisateur");
                UserModel.find({friend : { $eq :  req.params.id }},
                (err,docs) => {
                    if (!err) res.status(201).json(docs);
                    else return res.status(400).json(err);
                })
            }
            else 
            {
                console.log(err + " je n'ai pas récupéré mon utilisateur");
                return res.status(400).json(err);
            }
        });
};
