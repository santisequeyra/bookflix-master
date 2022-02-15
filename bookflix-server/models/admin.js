const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

adminSchema.statics = {
    create: function (data, cb) {
        const admin = new this(data);
        admin.save(cb);
    },
    login: function (query, cb) {
        this.find(query, cb);
    }
}

module.exports = mongoose.model('Admin', adminSchema);