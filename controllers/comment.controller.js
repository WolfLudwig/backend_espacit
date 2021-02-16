const CommentModel = require('../models/comment.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllComments = async (req, res) => {
    console.log(" dans le getAllComments !!!!!")
    const comment = await CommentModel.find();
    console.log(comment), res.status(200).json(comment);
};

module.exports.getAllCommentsById = async (req, res) => {
    console.log(" dans le getAllCommentsById !!!!!");
    console.log(req.params.id + " l'id à traiter");

    CommentModel.findOne({"comments.postId" : req.params.id},
    (err, docs) =>
        {
            if(err) 
            {
                console.log(err)
            }
            else
            {
                console.log(docs + " ce que j'ai retrouvé en commentaires")
                res.status(200).json(docs);
            }
    });
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
    console.log(" dans addComment");
    console.log(req.body.idress + " ce que je dois chercher ou ajouter");

    try {
         CommentModel.find({"comments.postId" :  req.body.idress}, (err, docs) =>
        {
            let id;
            console.log(docs);
            docs.map(resp =>
                {
                    console.log(resp._id)
                    id = resp._id;
                })

            if(!err)
            {

                 CommentModel.findByIdAndUpdate(
                     {_id : id},
                     {
                         $push: {
                             comments : 
                             {
                                 postId : req.body.idress,
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
                             console.log(docs + " le commentaire est pushé ! ");
                             return res.status(200).json(docs);
        
                         }
                         else
                         {
                             console.log(err);
                         }
                     },
                 ); 
            }
        }
    );

    }
    catch
    {
        const newComm = new CommentModel(
            {
                comments : 
                {
                    postId : req.body.idress,
                    commenterId: res.locals._id,
                    commenterPseudo: res.locals.pseudo,
                    text: req.body.message,
                    timesTamp: new Date().getTime(),
                }
    
    
        });
        console.log(newComm + " à envoyer en base");
    
        try{
             const comm = CommentModel.create(newComm);
             res.status(200).send(comm);

    
        }
        catch (err){
            console.log(err + " sortie du try commentModel.save()");
            return res.status(400).send(err);
        }

    }

    


   
}

//Commentaires

module.exports.commentPost = async (req,res) => {

    if (!ObjectID.isValid(req.body.idress))
    {
        return res.status(400).send("ID unknown : " + req.body.idress);
    }

   try {
       CommentModel.findByIdAndUpdate(
           req.body.idress,
           {
               $push: {
                   comments : 
                   {
                       postId : req.body.idress,
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

