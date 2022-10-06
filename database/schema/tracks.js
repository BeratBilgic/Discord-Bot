const mongoose = require("mongoose");

module.exports = mongoose.model("tracks", new mongoose.Schema({

    id: { type: String },
    title: { type: String },
    author: { type: String },
    duration: { type: String },
    url: { type: String },
    views: { type: Number }
    
}));