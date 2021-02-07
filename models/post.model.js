const mongoose = require('mongoose');

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
                    answerId : String,
                    answerPseudo : String,
                    answertext : String,
                },
            ],
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
        ]        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post',PostSchema);