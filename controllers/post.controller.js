const PostModel = require('../models/post.model');
const postModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost =  (req, res, next) =>{
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
module.exports.likePost = async (req, res, next) =>
{

    console.log(" Je suis dans Like !! ");

    console.log(req.body.id +  " idRess");
    console.log(req.body.idUsr + " idUsr");
    console.log(req.body + " body");


    try{
        const usr = new UserModel();
        console.log(req.body);

        await UserModel.findById({_id : req.body.idUsr},
            (err, usr) =>
            {
               if(!err) this.usr = usr, console.log(this.usr)
               else return console.log(err), res.status(404).send(err);
            })

        await PostModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likers: 
                    { _id :this.usr._id,
                    pseudo : this.usr.pseudo,
                    email : this.usr.email} },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
         await UserModel.findByIdAndUpdate(
            this.usr._id,
            {
                $addToSet: { likes : req.body.id },
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
    next();
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
                if (!err) res.status(200).send(docs);
                else return res.status(400).send(err);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

//Commentaires

module.exports.commentPost = async (req,res) => {
    console.log(req.body.posterId + " dans comment + user");


     if (!ObjectID.isValid(req.body.idress))
     {
         return res.status(400).send("ID unknown : " + req.body.idress);
     }

    try {
        PostModel.findByIdAndUpdate(
            req.body.idress,
            {
                $push: {
                    comments: { 
                        commenterId: req.body.posterId,
                        commenterPseudo: req.body.posterName,
                        text: req.body.message,
                        timesTamp: new Date().getTime(),
                    }    
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) 
                {
                    return res.status(200).json(docs);
 
                }
                    
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

module.exports.getAllCommentsById = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send("ID unknown : " + req.params.id);
    }
    console.log("dans getAllCommentById");
    console.log(req.params.id + " id a traiter");


        PostModel.findOne({_id : req.params.id}, (err, docs) =>
        {
            if(!err) 
            {
                console.log("les commentaires sont retrouvés");
                return res.status(201).send(docs.comments);
            }

            return res.status(404).send(err);
        })
}

module.exports.getRessourcesByLikes= async (req, res) => {
    console.log(req.params.id + " id de ressources by likes !! ");


    if (!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send("ID unknown : " + req.params.id);
    }

        PostModel.find({"likers._id" : req.params.id}, (err, docs) =>
        {
            if(!err) 
            {
                return res.status(201).send(docs);
            }

            return res.status(404).send(err);
        })


}


