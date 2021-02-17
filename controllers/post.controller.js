const PostModel = require('../models/post.model');
const postModel = require('../models/post.model');
//const UserModel = require('../models/user.model');
const AccountModel = require('../accounts/account.model')
const CommentModel = require('../models/comment.model');
const ObjectID = require('mongoose').Types.ObjectId;


  module.exports.readPost =  (req, res, next) =>{
      console.log( "dans le readPost");
        PostModel.find((err,docs) => {
          if (!err)  res.send(docs);
          else console.log('Error to get data : ' + err);
      }).sort({ createdAt: -1 });

  }

//  module.exports.readPost = async (req, res, next) =>{
//     console.log( "dans le readPost");

//     try
//     {
//        await PostModel.find((err,docs) => {
//            if (err)  res.send(err);
//            else
//            {
//                 res.send(docs)
//            }      
//        }).sort({ createdAt: -1 });
//     }
//     catch(error)
//     {
//        console.log('Error to get data : ' + error);
//     }
     

// }



module.exports.getOnePost = (req, res) =>{
    console.log("je suis dans getOnePost");
    console.log(req.params.id + " id récupéré de onePost");

    PostModel.findById( {_id : req.params.id},
        (err,docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    });
    
}

module.exports.getPostsByFilters = (req, res) =>{
    let cat =req.params.cat!=0;
    let rel = req.params.rel!=0;
    let type = req.params.type!=0;


    console.log("je suis dans getPostByFilters");
    console.log(req.params);

    if(cat)
    {
        var arrayObjectCat = req.params.cat.split(',');
        arrayObjectCat.map(res =>
            {
                ObjectID(res)
            })
    }
    if(rel)
    {   
        var arrayObjectRel = req.params.rel.split(',');
        arrayObjectRel.map(res =>
            {
                ObjectID(res)
            })
        

    }
    if(type)
    {

        var arrayObjectType = req.params.type.split(',');
        arrayObjectType.map(res =>
            {
                ObjectID(res)
            })
    }


//CAS 1
    if(cat && rel && type)
    {
        PostModel.find({ $and :[ {"category._id" : { $in :arrayObjectCat }}, {"relation._id" : {$in : arrayObjectRel }}, {"ressourceType._id" : {$in  : arrayObjectType}}] }, (err, docs) =>
        {
            if(err) console.log(err + " j'ai  PAS trouvé CAS 1")
            else console.log(docs + " j'ai trouvé CAS 1"), res.status(200).send(docs)
        })
    }
//CAS 2
    if(cat && !rel && !type)
    {
        PostModel.find({"category._id" : { $in :arrayObjectCat }}, (err, docs) =>
        {
            if(err) console.log(err + " j'ai  PAS trouvé CAS 2")
            else console.log(docs + " j'ai trouvé CAS 2"), res.status(200).send(docs)
        })

    }
    //CAS 3
    //la catégorie et relations
    if(cat && rel && !type)
    {
        PostModel.find({ $and :[ {"category._id" : { $in :arrayObjectCat }}, {"relation._id" : {$in : arrayObjectRel }}] }, (err, docs) =>
        {
            if(err) console.log(err + " j'ai  PAS trouvé CAS 3")
            else console.log(docs + " j'ai trouvé CAS 3"), res.status(200).send(docs)
        })

    }
    //CAS 4
    //la catégorie et le type
    if(cat && !rel && type)
    {
        PostModel.find({ $and :[ {"category._id" : { $in :arrayObjectCat }}, {"ressourceType._id" : {$in  : arrayObjectType}}] }, (err, docs) =>
        {
            if(err) console.log(err + " j'ai  PAS trouvé CAS 4")
            else console.log(docs + " j'ai trouvé CAS 4"), res.status(200).send(docs)
        })

    }
    //CAS 5
    if(!cat && rel && type)
    {
        PostModel.find({ $and :[ {"relation._id" : {$in : arrayObjectRel }}, {"ressourceType._id" : {$in  : arrayObjectType}}] }, (err, docs) =>
        {
            if(err) console.log(err + " j'ai  PAS trouvé CAS 5")
            else console.log(docs + " j'ai trouvé CAS 5"), res.status(200).send(docs)
        })

    }
    //CAS 6
    if(!cat && rel && !type)
    {
        PostModel.find({"relation._id" : {$in : arrayObjectRel }}, (err, docs) =>
        {
            if(err) console.log(err + " j'ai  PAS trouvé CAS 6")
            else console.log(docs + " j'ai trouvé CAS 6"), res.status(200).send(docs)
        })

    }
    //CAS 7
    if(!cat && !rel && type)
    {
        PostModel.find({"ressourceType._id" : {$in  : arrayObjectType}}, (err, docs) =>
        {
            if(err) console.log(err + " j'ai  PAS trouvé CAS 7")
            else console.log(docs + " j'ai trouvé CAS 7"), res.status(200).send(docs)
        })
    }
        

    
    //const type = req.params.type;
    //  PostModel.find({ "relation._id" : req.params.id},
    //      (err,docs) => {
    //      if (!err) console.log(docs), res.send(docs);
    //      else console.log('Error to get data : ' + err);
    //  });
    
}

module.exports.getPostsByCats = (req, res) =>{
    console.log("je suis dans getPostByCats");
    console.log(req.params.id + " id récupéré de onePost");
    console.log(req.params);
    const type = req.params.type;
     PostModel.find({ "category._id" : req.params.id},
         (err,docs) => {
         if (!err) console.log(docs), res.send(docs);
         else console.log('Error to get data : ' + err);
     });
    
}

module.exports.createPost = async (req, res) =>{

    //console.log(req.headers['x-access-token'] + " token à gérer");
    console.log(res.locals._id + " local user token");
    console.log(req.body + " corps de la requete");

        const newPost = new PostModel({
            posterId: res.locals._id,
            posterPseudo : res.locals.pseudo,
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


    try{
        const usr = new AccountModel();


        await AccountModel.findByIdAndUpdate(
            res.locals._id,
            {
                $addToSet: { likes : req.body.idRess },
            },
            { new: true },
            (err, docs) => {
                if (err) return console.log(err + " utilisateur non modifié "), res.status(400).send(err);
            }
        );

         PostModel.findByIdAndUpdate(
            req.body.idRess,
            {
                $addToSet: { likers: 
                    { _id : res.locals._id,
                    pseudo : res.locals.pseudo,
                    email : res.locals.email} },
            },
            { new: true },
            (err, docs) => {
                if (err) console.log("j'ai une erreur sur le postModel Like" + err), res.status(400).send(err);
                else  res.status(200).send(docs);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req,res) =>{

    console.log(" Je suis dans unLike !! ");
    console.log(req.body);
    console.log(res.locals._id + " idSession")
    console.log(res.locals.pseudo + " pseudoSession")
    console.log(res.locals.email + " emailSession")

    if (!ObjectID.isValid(req.body.idRess))
    return res.status(400).send("ID unknown : " + req.body.idRess);

    try{

        await AccountModel.findByIdAndUpdate(
            res.locals._id,
            {
                $pull: { likes : req.body.idRess },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
                else console.log(" c'est ok pour le AccountModel " + docs)

            }
        );

        await PostModel.findByIdAndUpdate(
            req.body.idRess,
            {
                $pull: { likers :  {_id : res.locals._id }},
            },
            { new: true },
            (err, docs) => {
                if (err) 
                {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else 
                {
                    console.log(" c'est ok pour le postModel " + docs)
                    res.status(200).send(docs);
                }
            }
        );
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

//Commentaires

module.exports.commentPost = async (req,res) => {

     if (!ObjectID.isValid(req.body.idress))
     {
         return res.status(400).send("ID unknown : " + req.body.idress);
     }

    try {
        PostModel.findByIdAndUpdate(
            req.body.idress,
            {
                $push: {
                    comments : 
                    {
                        commenterId: res.locals._id,
                        commenterPseudo: res.locals.pseudo,
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

module.exports.answerPost = async (req,res) => {
    console.log(res.locals._id + " idUser");
    console.log(req.body);

     if (!ObjectID.isValid(req.body.idPost))
     {
         return res.status(400).send("ID unknown : " + req.body.idPost);
     }

    try {
        PostModel.findByIdAndUpdate(
            req.body.idPost,
            {
                $push: {
                    answers: { 
                        commId : req.body.idPost,
                        commenterIdent :req.body.commId,
                        commPseudo : req.body.pseudo,
                        answerId : res.locals._id,
                        answerPseudo : res.locals.pseudo,
                        answertext : req.body.message,
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

module.exports.askAnswer = async (req,res) => {
    console.log(res.locals._id + " idUser");
    console.log(req.body);
    console.log(" Pour pousser en thread ! ");

     if (!ObjectID.isValid(req.body.idPost))
     {
         return res.status(400).send("ID unknown : " + req.body.idPost);
     }

    try {
        PostModel.findByIdAndUpdate(
            req.body.idPost,
            {
                $push: {
                    thread: { 
                        threadPostId : req.body.idPost,
                        threadAsnwId :req.body.commId,
                        threadPseudo : req.body.pseudo,
                        threadMyId : res.locals._id,
                        threadMyPseudo : res.locals.pseudo,
                        threadText : req.body.message,
                    }    
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) 
                {
                    return res.status(200).json(docs);
 
                }
                    
                else 
                {
                    console.log(" ya ano !! : " + err)
                    return res.status(400).send(err);
                }
            },
        );   
    }
    catch (err) {
        return res.status(400).send(err);
    }
}