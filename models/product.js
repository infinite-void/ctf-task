const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
        uid: {
                type: String,
                required: true,
                trim: true,
                unique: true
        },
        name: {
                type: String,
                trim: true,
                required: true,
                maxlength: 32,
        },
        quantity: {
                type: Number,
                required: true,
                trim: true
        },
        lastmodifiedby: {
                type: String,
                trim: true,
                required: true,
        }},
        { 
                timestamps: true 
        }
);
      
module.exports = mongoose.model("Product", productSchema);