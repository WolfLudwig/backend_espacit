const mongoose = require('mongoose');

const ressourceTypeSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        description : {
            type: String,
            required: true,
            unique:true,
            trim: true
        },
    },
    {
        timestamps : true,
    }
);


const RessourceTypeModel = mongoose.model('RessourceType', ressourceTypeSchema);

module.exports = RessourceTypeModel;