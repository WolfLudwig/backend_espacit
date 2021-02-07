const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        commenterId : {
            type : String,
            required : true,
            unique : true,
            trim : true
        },
        commenterPseudo : {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        text : {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        timestamps : true,
    }
);


const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;