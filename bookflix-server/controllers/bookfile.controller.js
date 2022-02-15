const mongoose = require('mongoose');
const BookFile = require('../models/bookfile.js')

const Book = require('../models/book.js');

const Services = require('../services/bookfile.services.js');

const bookFileCtrl = {};

bookFileCtrl.getBookFile = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: 'El id no es valido' });
        BookFile.findOne({ _id: req.params.id }, (err, data) => {
            if (err) throw err;
            if (data == null) return res.status(400).send({ message: 'El archivo con id: '+req.params.id+' no existe' });
            return res.json(data);
        });
    } catch (err) {
        console.log('GETTING FILE FAILED: ', err);
        return res.status(500).send({message: 'An error occured while getting the docuement'});
    };
};

bookFileCtrl.getBookFiles = async (req, res) => {
    try {
        const bookfiles = await BookFile.find();
        res.json(bookfiles);
    } catch (err) {
        console.log('GETTING ALL FILES FAILED: ', err);
        return res.status(500).send({ message: 'An error occurred while getting all the documents' })
    };
};

bookFileCtrl.createBookFile = async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: 'El id no es valido' });
        if (!mongoose.Types.ObjectId.isValid(req.body.fileId))
            return res.status(400).send({ message: 'El id del archivo no es valida' });
        if (book == null)
            return res.status(400).send({ message: 'El libro con id '+req.params.id+' no existe' });
        if (book.file.find((post, index) => { if (post.chapternumber == req.body.chapternumber) return true }))
            return res.status(400).send({ message: 'El numero de capitulo '+req.body.chapternumber+' se encuentra repetido' });
        const bookfile = new BookFile({
            fileId: req.body.fileId,
            release: req.body.release,
            concealment: req.body.concealment,
            chapternumber: req.body.chapternumber,
            book: req.params.id
        });
        bookfile.save((err, doc) => {
            if (err) return res.status(400).send({ message: 'Un bookfile con id '+req.body.fileID+' ya existe' });
            Services.addBookFile(doc);
            return res.json('El bookfile fue creado satisfactoriamente');
        });
    } catch (err) {
        console.log('CREATING FILE ERROR: ', err);
        return res.status(500).send({ message: 'An error ocurred while creating the document' });
    };
};

bookFileCtrl.editBookFile = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: 'El id no es valido' });
        if (await BookFile.findOne({ _id: req.params.id }) == null)
            return res.status(400).send({ message: 'El bookFile con id '+req.params.id+' no existe' });
        const bookfile = {
            fileId: req.body.fileId,
            release: req.body.release,
            concealment: req.body.concealment,
            chapternumber: req.body.chapternumber
        };
        await BookFile.updateOne({ _id: req.params.id }, { $set: bookfile });
        res.json('El documento fue editado con exito');
    } catch (err) {
        console.log('EDITING DOC FAILED: ', err);
        return res.status(500).send({ message: 'An error occurred while editing the docuement' });
    };
};

bookFileCtrl.deleteBookFile = async (req, res) => {
    try {
        var bookfile;
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: 'El id no es valido' });
        if ((bookfile = await BookFile.findOne({ _id: req.params.id })) == null)
            return res.status(400).send({ message: 'El bookFile con id '+req.params.id+' no existe' });
        console.log(bookfile);
        Services.removeBookFile(bookfile);
        await BookFile.deleteOne({ _id: req.params.id });
        res.json('El documento se borro correctamente');
    } catch (err) {
        console.log('DOC DELETING FAILED: ', err);
        return res.status(500).send({ message: 'An error occurred while deleting the document' })
    };
};

module.exports = bookFileCtrl; 