const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stampSchema = new Schema({
    stamp_name: {
        type: String,
        required: true,
    },
    stamp_image: {
        type: String,
        required: true
    },
    stamp_description: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Correctly create the Stamp model
const Stamp = mongoose.model("Stamp", stampSchema);

module.exports = Stamp;

