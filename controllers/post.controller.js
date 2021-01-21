const PostModel = require('../models/post.model');
const postModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const CommentModel = require('../models/comment.model');
const commentController = require('../controllers/comment.controller');
const relationController = require('../controllers/relation.controller');
const categoryController = require('../controllers/category.controller');
const ressourceTypeController = require('../controllers/ressourceType.controller');
const RelationModel = require('../models/relation.model');

module.exports.readPost = (req, res) =>{
     PostModel.find((err,docs) => {
        if (!err)  res.send(docs);
        else console.log('Error to get data : ' + err);
    }).sort({ createdAt: -1 });

}


module.exports.getOnePost = (req, res) =>{
    console.log("je suis dans getOnePost");
    console.log(req.params.id + " id récupéré de onePost");

    PostModel.findById( {_id : req.params.id},
        (err,docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    });
    
}

module.exports.createPost = async (req, res) =>{

        console.log("je suis dans la création de post");
        console.log(req.body.comments);
        console.log(req.body.likers);
        const newPost = new PostModel({
            posterId: req.body.posterId,
            posterPseudo : req.body.posterPseudo,
            message: req.body.message,
            video: req.body.video,
            likers: req.body.likers, 
            comments: req.body.comments,
            relation : req.body.relation,
            category : req.body.category,
            ressourceType : req.body.ressourceType

        });

        try{
            const post = await newPost.save();
            return res.status(201).json(post);
        }
        catch (err){
            return console.log(err), res.status(400).send(err);
        };
        
};

module.exports.updatePost = (req, res) =>{
    console.log("je suis dans update");
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        message : req.body.message
    };

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err,docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );
};

module.exports.deletePost = (req, res) =>{
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log("Delete error : " + err);
    })
}


//Likes
module.exports.likePost = async (req, res) =>{

    console.log(req.body.id + " body.id");
    console.log(req.body = " body du like");
    try{
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes : req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req,res) =>{
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try{
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes : req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

//Commentaires

module.exports.commentPost = (req,res) => {
    console.log(" je suis dans comment");
    console.log(req.body);
     idRessource = new String();
     idPoster = new String();
     posterName = new String();
     message = new String();

    req.body.forEach(element => {
        idRessource = element.idress;
        idPoster = element.posterId;
        posterName = element.posterName;
        message = element.message;
        
    });

     if (!ObjectID.isValid(idRessource))
     {
         return res.status(400).send("ID unknown : " + idRessource);
     }
    

    try {
        return PostModel.findByIdAndUpdate(
            idRessource,
            {
                $push: {
                    comments: { 
                        commenterId: idPoster,
                        commenterPseudo: posterName,
                        text: message,
                        timesTamp: new Date().getTime(),
                    }    
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            },
        );
        
    }
    catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.editCommentPost = async (req,res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    // try {
    //     return PostModel.findByIdAndUpdate(req.params.id, (err, docs) => {
    //             const theComment = docs.comments.find((comment) => 
    //                 comment._id.equals(req.body.commentId)
    //             );

    //             if (!theComment) return res.status(404).send("Comment not found");
    //             theComment.text = req.body.text;

    //             return docs.save((err) =>{
    //                 if (!err) return res.status(200).send(docs);
    //                 return res.status(500).send(err);
    //             });
    //         });
    // }
    // catch (err) {
    //     return res.status(400).send(err);
    // }

};

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      return PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
};

