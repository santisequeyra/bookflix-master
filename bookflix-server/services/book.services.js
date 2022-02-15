const Genre = require('../models/genre');
const Author = require('../models/author');
const Publisher = require('../models/publisher');
const Book = require('../models/book');
const BookFile = require('../models/bookfile');
const Trailer = require('../models/trailer');
const Review = require('../models/review');
const Profile = require('../models/profile');
const Reading = require('../models/reading');

const BookFileServices = require('../services/bookfile.services');


const bookServices = {};

function response(status, content) {
    return {
        status: status,
        data: content
    }
}

bookServices.addBook = async (book) => {
    await Genre.findOneAndUpdate ( { _id: book.genre }, { $push: { books: book._id } });
    await Author.findOneAndUpdate ( { _id: book.author }, { $push: { books: book._id } } );
    await Publisher.findOneAndUpdate ( { _id: book.publisher }, { $push: { books: book._id } });
};

bookServices.removeBook = async (book) => {
    if (book.genre) await Genre.findOneAndUpdate ( { _id: book.genre }, { $pull: { books: book._id } });
    if (book.author) await Author.findOneAndUpdate ( { _id: book.author }, { $pull: { books: book._id } } );
    if (book.publisher) await Publisher.findOneAndUpdate ( { _id: book.publisher }, { $pull: { books: book._id } });
    for (var file of book.file){
        let bookFile = await BookFile.findOne({ _id: file });
        BookFileServices.removeBookFile(bookFile);
        await BookFile.deleteOne({ _id: file._id });
    };
    const profiles = await Profile.find().populate({ path: 'readings', model: 'Reading' });
    const readingsProfiles = profiles.filter(profile => (profile.readings.some(reading => reading.book._id.toString() == book._id.toString())));
    const readingsProfilesIds = readingsProfiles.map(a => a._id );
    var readingsReadings = [];
    for (var each of readingsProfiles){
        for (var subeach of each.readings){
            if (!readingsReadings.some(a => a._id.toString() == subeach._id.toString())) readingsReadings.push(subeach);
        };
    };
    const correctReadingsIds = readingsReadings.filter(e => e.book.toString() == book._id.toString());
    const readingsIds = correctReadingsIds.map(a => a._id);
    await Profile.updateMany({
        _id: { $in: readingsProfilesIds }},
        {
        $pull: { readings: { $in: readingsIds } }
    });
    const favouritesProfiles= profiles.filter(profile => profile.favourites.some(favourite => favourite.toString() == book._id.toString()));
    const favouritesIds = favouritesProfiles.map(a => a._id);
    await Profile.updateMany({
        _id: { $in: favouritesIds }},
        {
         $pull: { favourites: book._id } 
    });
    await Reading.deleteMany({ book: book._id });
    await Trailer.deleteMany({ book: book._id });
    await Review.deleteMany({ book: book._id });
    return { message: 'Libro borrado correctamente' };
}

bookServices.addTrailer = async (trailerId, bookId) => {
    await Book.findOneAndUpdate( { _id: bookId }, { $push: { trailers: trailerId } });
}

bookServices.removeTrailer = async (trailerId, bookId) => {
    await Book.findOneAndUpdate( { _id: bookId }, { $pull: { trailers: trailerId } });
}

bookServices.addReview = async (reviewId, bookId) => {
    await Book.findOneAndUpdate( { _id: bookId }, { $push: { reviews: reviewId } });
}

bookServices.removeReview = async (reviewId, bookId) => {
    await Book.findOneAndUpdate( { _id: bookId }, { $pull: { reviews: reviewId } });
}

bookServices.search = async (searchParams) => {
    return Book.find().populate('author').populate('publisher').populate('genre')
        .then(books => {
            console.log("Books initial size: ", books.length);
            books = books.filter(book => !((book.genre == null) || (book.author == null) || (book.publisher == null)));
            if (searchParams.genre && books.length > 0){
                console.log("Genre filtering... ", searchParams.genre);
                books = books.filter(book => book.genre.name.toLowerCase().includes(searchParams.genre.toLowerCase().trim()));
                console.log("Books after GENRE filter: ", books.length);
            }
            if (searchParams.author  && books.length > 0){
                console.log("Author filtering... ", searchParams.author);
                books = books.filter(book => book.author.name.toLowerCase().includes(searchParams.author.toLowerCase().trim()));
                console.log("Books after AUTHOR filter: ", books.length);
            }
            if (searchParams.publisher && books.length > 0){
                console.log("Publisher filtering... ", searchParams.publisher);
                books = books.filter(book => book.publisher.name.toLowerCase().includes(searchParams.publisher.toLowerCase().trim()));
                console.log("Books after PUBLISHER filter: ", books.length);
            }
            if (searchParams.title && books.length > 0){
                console.log("Title filtering... ", searchParams.title);
                books = books.filter(book => book.title.toLowerCase().includes(searchParams.title.toLowerCase().trim()));
                console.log("Books after TITLE filter: ", books.length);
            }
            return response(200, books)
        })
        .catch(err => {
            console.log(err);
            if (err) return response(500, {message: 'Server error', error: err.message});
        })
}

module.exports = bookServices;
