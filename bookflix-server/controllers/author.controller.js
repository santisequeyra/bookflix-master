const Author = require('../models/author.js');
const mongoose = require('mongoose');

const authorCtrl = {};

authorCtrl.getAuthors = async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
};

authorCtrl.getAuthor = async (req, res) => {
    const author = await Author.findOne({ _id: req.params.id });
    res.json(author);
};

authorCtrl.createAuthor = async (req, res) => {
    const author = new Author(req.body);
    try {
        await author.save();
        res.json({
            message: 'Autor guardado'
    })
    } catch (err) {
    console.log('err' + err);
    res.status(409).send({
        message: "El autor con nombre, '"+req.body.name+"' ya existe"
    });
}
};

authorCtrl.editAuthor = async (req, res) => {
    const author = {
        name: req.body.name,
        books: req.body.books
    };
    await Author.updateOne({ _id: req.params.id }, { $set: author }, { new: true });
    res.json({ message: 'Autor modificado' });
};

authorCtrl.deleteAuthor = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({message: "El parametro "+req.params.id+' no es un id valido'});
    await Author.findOne({ _id: req.params.id }, async (err, data) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        if (!data)return res.status(400).send({message: 'El autor con id: '+req.params.id+' no existe' });
        if (data.books.length > 0) return res.status(400).send({ message: 'El autor con id: '+req.params.id+' posee libros' });
        await Author.deleteOne({ _id: req.params.id });
        res.json({ message: 'Autor borrado' });
    });
};

module.exports = authorCtrl;