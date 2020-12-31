const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        uid: {
                type: String,
                required: true,
                trim: true,
        },
        email: {
                type: String,
                trim: true,
                required: true,
                unique: true,
        },
        name: {
                type: String,
                trim: true,
                required: true,
                maxlength: 32,
        },
        phone: {
                type: Number,
                required: true,
        },
        pwd: {
            type: String,
            required: true,
        },
        psalt: String,
        vsalt: String
        },
        { 
                timestamps: true 
        }
);
      
module.exports = mongoose.model("User", userSchema);
      
      
      