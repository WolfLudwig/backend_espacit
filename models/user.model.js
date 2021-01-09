const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique:true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        picture: {
            type: String,
            default: "..\assets\images\avatars.jpg"
        },
        bio: {
            type: String,
            max: 1024,
        },
        //tableau d'amis pour l'utilisateur
        friend: {
            type: [UserModel]
        },
       
        likes: {
            type: [String]
        },  
    },
    {
        timestamps : true,
    }
);

//fonction de lecture avant de sauvegarder les informations dans l'affichage: 'block',
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Mot de passe incorrect');
    }
    throw Error('Adresse mail incorrecte')
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;