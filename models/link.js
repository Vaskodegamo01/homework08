const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    urlFull: {
        type: String,
        required: true
    },
    UrlSort: {
        type: String,
        required: true
    }
});

const Urls = mongoose.model('urls', UrlSchema);

module.exports = Urls;