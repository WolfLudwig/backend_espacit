const mongoose = require('mongoose');
const CommentModel = require('./comment.model');

const PostSchema = mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        posterPseudo: {
            type : String,
            required : true
        },
        message: {
            type: String,
            trim: true,
            maxlengt: 500,
        },
        picture: {
            type: String,
        },
        video: {
            type: String,
        },
        description : {
            type : String,
        },
        likers: {
            type: 
            [
                {
                    _id : String,
                    pseudo : String,
                    email : String,
                }
            ],
            required: true,
        },
        comments: {
            type : 
            [
                {
                    commenterId : String,
                    commenterPseudo : String,
                    text : String,
                },
            ],
        },
        answers : {
            type : 
            [
                {
                    commId : String,
                    commenterIdent :String,
                    commPseudo : String,
                    answerId : String,
                    answerPseudo : String,
                    answertext : String,
                }
              

            ]
        },
        thread : {
            type : 
            [
                {
                    threadPostId : String,
                    threadAsnwId :String,
                    threadPseudo : String,
                    threadMyId : String,
                    threadMyPseudo : String,
                    threadText : String,
                }
              

            ]
        },
        relation : { 
            type :
             [
                 {
                     _id : String,
                     title : String,
                     description : String,
                 }
            ]},        
        category : {
            type : 

        [
            {
                _id : String,
                title : String,
                description : String,
            }
        ]},
        ressourceType : 
        {
            type : 
        [
            {
                _id : String,
                title : String,
                description : String,
            }
        ]        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post',PostSchema);