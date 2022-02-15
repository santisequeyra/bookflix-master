const Genre = require('../models/genre');
const mongoose = require('mongoose');

const Services = require('../services/genre.services');

const genreCtrl = {};

genreCtrl.getGenres = async (req, res) => {
    const genres = await Genre.find();
    res.json(genres);
};

genreCtrl.getGenre = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({message: "El parametro "+req.params.id+' no es un id valido'});
    Genre.findOne({ _id: req.params.id }, (err, docs) => {
        if (err) return res.status(500).send({message: 'Server error' });
        if (!docs) return res.status(400).send({message: 'El genero con id: '+req.params.id+' no existe' });
        res.json(docs);
    });
};

genreCtrl.createGenre = async (req, res) => {
    const genre = new Genre(req.body);
    try {
    await genre.save();
    res.json({
        status: 'Genero guardado'
    })
    } catch (err) {
        console.log('err' + err);
        res.status(409).send({
            message: "El genero, '"+req.body.name+"' ya existe"
        });
    }
};

genreCtrl.editGenre = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({message: "El parametro "+req.params.id+' no es un id valido'});
    Genre.findOne({ _id: req.params.id }, async (err, data) => {
        if (err) return res.status(500).send({ message: "Server error" });
        if (!data) return res.status(400).send({message: 'El genero con id: '+req.params.id+' no existe' });
        const genre = {
            name: req.body.name,
            books: req.body.books
        };
        await Genre.updateOne({ _id: req.params.id }, { $set: genre }, { new: true });
        res.json({ status: 'Genero editado' });
    });
};

genreCtrl.deleteGenre = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({message: "El parametro "+req.params.id+' no es un id valido'});
        Genre.findOne({ _id: req.params.id }, async (err, data) => {
            if (err) return res.status(500).send({ message: "Server error" });
            if (!data) return res.status(400).send({message: 'El genero con id: '+req.params.id+' no existe' });
            if (data.books.length > 0) return res.status(400).send({ message: 'El genero con id: '+req.params.id+' posee libros' });
            await Genre.deleteOne({ _id: req.params.id });
            res.json({ status: 'Genero borrado' })
        });
    } catch (error) {
        console.log("GENRE DELETION FAILED: ", error);
        return res.status(500).send({message: "There was an error deleting the genre"});
    };
};

module.exports = genreCtrl;
