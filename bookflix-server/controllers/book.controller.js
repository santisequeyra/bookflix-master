const mongoose = require('mongoose');
const Book = require('../models/book.js');
const Services = require('../services/book.services');

const bookCtrl = {};

bookCtrl.getBooks = async (req, res) => {
    try {
        if (!req.query.isbns) {
            console.log("Getting all books...");
            const books = await Book.find()
                .populate('author')
                .populate('publisher')
                .populate('genre')
                .populate({path: 'file',model: 'BookFile'});
            res.json(books);
        } else {
            const isbns = req.query.isbns.split(',');
            console.log("Getting books with ISBNs: ", isbns);
            let books = [];
            for (let isbn of isbns) {
                const book = await Book.findOne({isbn: isbn})
                    .populate('author')
                    .populate('publisher')
                    .populate('genre')
                    .populate({path: 'file',model: 'BookFile'});
                if (book)
                    books.push(book);
                else
                    console.log(`Book with ISBN ${isbn} was not found`);
            }
            res.json(books);
        }
    } catch (error) {
        console.log("GET BOOKS ERROR ", error)
        return res.status(500).json([]);
    }
};

bookCtrl.search = async (req, res) => {
    try {
        console.log("Searching books... ", req.query);
        const searchResult = await Services.search(req.query);
        res.status(searchResult.status).json(searchResult.data);
    } catch (error) {
        console.log("SEARCHING BOOKS ERROR ", error)
        return res.status(500).json({message: "There was an error during book search. Check the logs."});
    }
}

bookCtrl.getBook = async (req, res) => {
    const book = await Book.findOne({_id: req.params.id})
        .populate('author')
        .populate('publisher')
        .populate('genre')
        .populate('trailers')
        .populate({path: 'file',
        model: 'BookFile'})
        .populate({path: 'reviews',
        model: 'Review'});
    book.file.sort((a, b) => {
        return a.chapternumber - b.chapternumber;
    });
    res.json(book);
};

bookCtrl.createBook = async (req, res) => {
    try {
        var book = new Book({
            title: req.body.title,
            isbn: req.body.isbn,
            publisher: mongoose.Types.ObjectId(req.body.publisher),
            genre: mongoose.Types.ObjectId(req.body.genre),
            author: mongoose.Types.ObjectId(req.body.author),
            complete: req.body.complete,
            date: req.body.date
        });
        book.save((err, doc) => {
            if (err) return res.status(409).send({
                message: "El libro con isbn, '" + req.body.isbn + "' ya existe"});
            Services.addBook(doc);
            res.json({
            message: 'Libro guardado'
            })
        });
    } catch (err) {
        console.log('err' + err);
        res.status(409).send({
            message: "There was an error creating the book"
        });
    }
};

bookCtrl.editBook = async (req, res) => {
    try {
    const book = {
        title: req.body.title,
        isbn: req.body.isbn,
        publisher: mongoose.Types.ObjectId(req.body.publisher),
        genre: mongoose.Types.ObjectId(req.body.genre),
        author: mongoose.Types.ObjectId(req.body.author),
        reviews: req.body.reviews,
        file: req.body.file,
        complete: req.body.complete,
        trailers: req.body.trailers
    };
    await Book.updateOne({ _id: req.params.id}, {$set: book});
    res.json({message: 'Libro modificado'});
    } catch (err) {
        console.log('err' + err);
        res.status(409).send({
            message: "El libro con isbn, '" + req.body.isbn + "' ya existe"
    });
    }
};

bookCtrl.editMeta = async (req, res) => {
    try {
    const book = {
        title: req.body.title,
        isbn: req.body.isbn,
        publisher: req.body.publisher,
        genre: req.body.genre,
        author: req.body.author,
        complete: req.body.complete,
        timesread: req.body.timesread
    };
    await Book.updateOne({ _id: req.params.id }, {$set: book});
    res.json({message: 'Metadatos modificados'});
    } catch (err) {
        console.log('err' + err);
        res.status(409).send({
        message: "El libro con isbn, '" + req.body.isbn + "' ya existe"
    });
}
};

bookCtrl.deleteBook = async (req, res) => {
    const dBook = await Book.findOne({ _id: req.params.id });
    const ret = await Services.removeBook(dBook);
    await Book.findOneAndDelete({_id: req.params.id});
    res.json(ret);
};

bookCtrl.increaseCount = async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id });
    book.timesread = book.timesread + 1;
    await Book.updateOne({ _id: req.params.id }, { $set: book });
    res.json({ message: 'Cuenta aumentada correctamente' });
}

module.exports = bookCtrl;
