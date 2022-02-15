const mongoose = require('mongoose');
const { Schema } = mongoose;

const SiteNewSchema = new Schema({ 
    title: { type: String, required: true },
    description: { type: String},
    date: { type: Date, required: true }
});

module.exports = mongoose.model('SiteNew', SiteNewSchema);