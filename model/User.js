import {Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required : true
    }
},{
    timestamps: true
})


module.exports =  models?.User || model("User", UserSchema)

