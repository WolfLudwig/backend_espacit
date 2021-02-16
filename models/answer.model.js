const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
    {
    answers : 
    {
        commentId : 
        {
            type: String,
            required : false,
            trim : true
        },
        answerId : 
        {
            type : String,
            require : false,
            trim : true
        },
        answerPseudo : 
        {
            type : String,
            require : false,
            trim : true
        },
        answertext : 
        {
            type : String,
            require : false,
            trim : true
        }
    },
    },
    {
        timestamps : true,
    }

);


const AnswerModel = mongoose.model('Answer', answerSchema);

module.exports = AnswerModel;