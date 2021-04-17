const { boolean } = require('joi');
const mongoose = require('mongoose');
const CommentModel = require('./comment.model');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
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
                     title : String,
                     description : String,
                 }
            ]},        
        category : {
            type : 

        [
            {
                title : String,
                description : String,
            }
        ]},
        ressourceType : 
        {
            type : 
        [
            {
            title : String,
            description : String,
            }
        ]        
        },
        isSuspend : {
            type : Boolean
        },
        isRestricted : 
        {
            type : Boolean
        }
    },
    {
        timestamps: true,
    }
);
const PostModel = mongoose.model('post', PostSchema);
module.exports = PostModel;