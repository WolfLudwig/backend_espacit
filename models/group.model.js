const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema(
    {
        CreaterId: {
            type: String,
            required: true
        },
        CreaterPseudo: {
            type : String,
            required : true
        },
        CreaterMessage: {
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
        followers: {
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
            type : [
                {
                    commenterId : String,
                    commenterPseudo : String,
                    text : String,
                }

        ]},
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