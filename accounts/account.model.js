const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
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
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // supprimer ces accessoires lorsque l'objet est sérialisé
        delete ret._id;
        delete ret.passwordHash;
    }
});

const AccountModel = mongoose.model('Account', schema);

module.exports = AccountModel;