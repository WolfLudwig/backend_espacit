const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        comments: {
            type : 
            [
                {
                    postId : String,
                    commenterId : String,
                    commenterPseudo : String,
                    text : String,
                },
                {
                    timestamps : true,
                }
            ],

        },
    },

);


const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;