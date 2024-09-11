const mongoose = require('mongoose')
const FoodSchema = new mongoose.Schema({
    title: {type: String, require: true},
    time: {type: String, require: true},
    foodTags:{type: Array, required: true},
    Category:{type: String, required: true},
    foodType:{type: Array, required: true},
    code:{type: String, required: true},
    isAvailable: {type: Boolean, default: true},
    restaurant:{ type: mongoose.Schema.Types.ObjectId, required: true},
    rating:{ type: Number, min: 1, max: 5, default: 3},
    ratingCount:{type: String, default: "267"},
    description:{type: String, required: true},
    price:{type: Number, required: true},
    additives:{type: Array, default: []},
    imageUrl: {type: Array, require: true},
});

module.exports = mongoose.model('Food', FoodSchema);