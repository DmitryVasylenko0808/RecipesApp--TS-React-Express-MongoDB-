const mongoose = require("mongoose");

const KindSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }
    }
);

const KindModel = mongoose.model("Kind", KindSchema);

module.exports = KindModel;