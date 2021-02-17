const RelationModel = require('../models/relation.model');
const ObjectID = require('mongoose').Types.ObjectId;

//trouver tout les utilisateurs
module.exports.getAllRelations = async (req, res) => {
    const relations = await RelationModel.find();
    res.status(201).json(relations);
};

 module.exports.getOneRelationsById = (req,res) => {
     if (!ObjectID.isValid(req.params.id))
         return res.status(400).send('ID unknown : ' + req.params.id)
     RelationModel.findById(req.params.id, (err, docs) => {
         if (!err) res.send(docs);
         else console.log('ID unknown : ' + err);
     });
 };

module.exports.getOneRelationsByTitle = (req,res) => {

    RelationModel.findOne({title  : {$eq : req.params.title}}, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('unknown title : ' + err);
    });
};



//update user
module.exports.udapteRelationDesc = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await RelationModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    description: req.body.description
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

module.exports.udapteRelationTitle = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await RelationModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    title: req.body.title
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