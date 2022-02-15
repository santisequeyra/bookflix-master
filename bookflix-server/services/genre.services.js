const Genre = require('../models/genre');

const genreServices = {}

genreServices.genreExists = async (genreId) => {
    Genre.findOne({ _id: genreId }, (err) => {
        if (err) return false;
        else { return true };
    });
};

module.exports = genreServices;