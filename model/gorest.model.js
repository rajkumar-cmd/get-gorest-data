const mongoose = require("mongoose");

const gorestSchema = mongoose.Schema({
    "id": Number,
    "name": String,
    "email": String,
    "gender": String,
    "status": String,
},{
    timestamps: true
});

const gorestModel = mongoose.model("gorest", gorestSchema);

module.exports = {
    gorestModel
}