const CategoryModel = require('../models/category.model');
const ObjectID = require('mongoose').Types.ObjectId;

//trouver tout les utilisateurs
module.exports.getAllCategories = async (req, res) => {
    const category = await CategoryModel.find();
    res.status(201).json(category);
};

//trouver un seul utilisateur
module.exports.getOneCategory = (req,res) => {
    console.log(req.params)

    console.log( " dans le getOneCategory")
    if (!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    CategoryModel.findById(req.params.id, (err, docs) => {
        if (!err) console.log(docs), res.send(docs);
        else console.log('ID unknown : ' + err);
    });
};

//update user
module.exports.udapteCategoryDesc = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await CategoryModel.findOneAndUpdate(
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

module.exports.udapteCategoryTitle = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await CategoryModel.findOneAndUpdate(
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
