const CommentModel = require('../models/comment.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllComments = async (req, res) => {
    const comment = await CommentModel.find();
    res.status(200).json(comment);
};

module.exports.getOneComment = (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    CommentModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    });
};

module.exports.udapteComments = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await CommentModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    text: req.body.text
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

module.exports.deleteComment = (req, res) =>{
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    CommentModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log("Delete error : " + err);
    })
}

module.exports.addComment = async (req, res) =>{
    const newComm = new CommentModel({
        commenterId: req.body.commenterId,
        commenterPseudo: req.body.commenterPseudo,
        text: req.body.text,
        timesTamp: new Date().getTime(),
    });

    try{
        const comm = await newComm.save();
        return res.status(201).json(comm);
    }
    catch (err){
        return res.status(400).send(err);
    }
}

