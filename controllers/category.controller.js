const CategoryModel = require('../models/category.model');
const ObjectID = require('mongoose').Types.ObjectId;

//trouver tout les utilisateurs
module.exports.getAllCategories = async (req, res) => {
    const category = await CategoryModel.find();
    res.status(201).json(category);
};

module.exports.deleteCategory = async (req, res) =>
{
    console.log("DANS DELETE CAT");
    console.log(req.params)
    CategoryModel.findByIdAndRemove( req.params.id, (err, docs) =>
    {
        if (!err) console.log(docs), res.status(200).send(docs);
        else res.status(404).send(err)
    })
}
module.exports.createCategory= async (req, res) =>
{
    console.log(req.body.cat)
    const category = new CategoryModel({...req.body.cat}) ;
    console.log(category)
    const cat = await category.save()
    if(cat)
    {
        res.status(200).send(cat)
    }
    else
    {
        res.status(400).send(err)
    }
}


//trouver un seul utilisateur
module.exports.getOneCategory = (req,res) => {
    console.log("DANS GETONECAT")
    console.log(req.params)
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
    console.log("CORPS DE LA REQUETE UPDATE CAT")

    console.log(req.body)
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

module.exports.updateCategory = async (req,res) => {
    console.log("CORPS DE LA REQUETE UPDATE CAT")

    console.log(req.body.cat)

    try {
        await CategoryModel.findOneAndUpdate(
            {_id: req.body.cat._id},
            {
                $set: {
                    title : req.body.cat.title,
                    description: req.body.cat.description
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err,docs) => {
                if (!err)
                {
                    console.log(docs);
                    return res.send(docs);
                }
                if (err) return res.status(500).send({ message: err});
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message: err});
    }
};
