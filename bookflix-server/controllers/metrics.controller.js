const Book = require('../models/book.js');
const metricsServices = require('../services/metrics.services');
const Validators = require('../utils/validators');

const mongoose = require('mongoose');

const metricsCtrl = {};

metricsCtrl.topReadBooks = async (req, res) =>{
    try {
        var books = await Book.find()
            .populate('author')
            .populate('publisher')
            .populate('genre')
            .populate('trailers')
            .populate({path: 'file',
            model: 'BookFile'});
        var base = 0;
        var top = books.length;
        if (req.query.top)
            if (req.query.top > 0)
                top = req.query.top;
            else {
                return res.status(409).send({ message: 'Parametro top debe ser mayor que 0' });
            };
        if (req.query.base)
            if (req.query.base > 0)
                base = req.query.base - 1;
            else {
                return res.status(409).send({ message: 'Parametro base debe ser mayor a 0' });
            };
        books.sort((a, b) => {
            return b.timesread - a.timesread;
        });
        var retBooks = books.slice(base, top);
        return res.json(retBooks);
    } catch (err) {
        console.log('GETTING METRICS ERROR', error);
        return res.status(500).json([]);
    };
};

metricsCtrl.getUsersMetric = async (req, res) =>{
    try {
        console.log("Validating request... ", req.query);
        if (!Validators.isValidDatesRange(req.query))
            return res.status(400).send({message: "Rango de fechas invalido"});

        const response = await metricsServices.getUsersMetric(req.query);
        return res.status(response.status).json(response.data);
    } catch (err) {
        console.log('USERS METRIC ERROR', err);
        return res.status(500).json([]);
    }
};

module.exports = metricsCtrl;
