const Publisher = require('../models/publisher');
const mongoose = require('mongoose');

const publisherCtrl = {};

publisherCtrl.getPublishers = async (req, res) => {
    const publishers = await Publisher.find();
    res.json(publishers);
};

publisherCtrl.getPublisher = async (req, res) => {
    const publisher = await Publisher.findOne({_id: req.params.id});
    res.json(publisher);
};

publisherCtrl.createPublisher = async (req, res) => {
    const publisher = new Publisher(req.body);
    try {
    await publisher.save();
    res.json({
        status: 'Publisher saved'
    })
    } catch (err) {
        console.log('err' + err);
        res.status(409).send({
            message: "La editorial, '"+req.body.name+"' ya existe"
        });
    }
};

publisherCtrl.editPublisher = async (req, res) => {
    const { id } = req.params;
    const publisher = {
        name: req.body.name,
        books: req.body.books
    };
    await Publisher.updateOne(id, { $set: publisher }, { new: true });
    res.json({ status: 'Publisher updated' });
};

publisherCtrl.deletePublisher = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({message: "El parametro "+req.params.id+' no es un id valido'});
        Publisher.findOne({ _id: req.params.id }, async (err, data) => {
            if (err) return res.status(500).send({ message: 'Server error' });
            if (!data)return res.status(400).send({message: 'La editorial con id: '+req.params.id+' no existe' });
            if (data.books.length > 0) return res.status(400).send({ message: 'La editorial con id: '+req.params.id+' posee libros' });
        await Publisher.deleteOne({ _id: req.params.id });
        res.json({ message: 'Editorial borrada' });
    });
    }catch (error) {
    console.log("PUBLISHER DELETION FAILED: ", error);
    return res.status(500).send({message: "There was an error deleting the publisher"});
};
};

module.exports = publisherCtrl;