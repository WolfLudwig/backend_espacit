const { boolean } = require('joi');
const mongoose = require('mongoose');
const AccountModel = require('../accounts/account.model');
const postModel = require('./post.model');
const PostModel = require('./post.model')
const ObjectID = require('mongoose').Types.ObjectId;

const ReportPostSchema = mongoose.Schema(
    {
        post :
        {
            _id : 
            {
                type : ObjectID,
                required : true
            },
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
        account : 
        {
            email: { type: String, unique: true, required: true },
            pseudo: { type: String, unique: true, required: true },
            passwordHash: { type: String, required: true },
            title: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            adress: { type: String },
            city: { type: String },
            zipCode: { type: Number },
            acceptTerms: Boolean,
            role: { type: String, required: true },
            verificationToken: String,
            verified: Date,
            status: Boolean,
            resetToken: {
                token: String,
                expires: Date
            },
            friend: {
                type: [String]
            },
           
            likes: {
                type: [String]
            }, 
            passwordReset: Date,
            created: { type: Date, default: Date.now },
            updated: Date
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('report',ReportPostSchema);