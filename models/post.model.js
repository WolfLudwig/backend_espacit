const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
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
            type: [String],
            required: true,
        },
        comments: {
                type: [
                    {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : 'Comment'
                    }
                ],
                required: true,
        },
        relation : 
             [
                 {
                     type : mongoose.Schema.Types.ObjectId,
                     ref : 'Relation'
                 }
            ],        
        category : 
        [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Category'
            }
        ],
        ressourceType : 
        [
            {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'RessourceType',
        }
    ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post',PostSchema);