const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const setSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    exercise: { type: mongoose.Schema.Types.ObjectId, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number },
    createdAt: { type: Date, default: () => new Date() },
});

const Set = model('Set', setSchema);
module.exports = Set;
