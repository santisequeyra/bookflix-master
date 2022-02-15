const trailerServices = require('../services/trailer.services');
const Validators = require('../utils/validators');

const trailersController = {};

trailersController.createTrailer = async (req, res) => {
    try {
        console.log("Creating trailer with body... ", req.body);
        console.log("Validating request...");
        if (!Validators.isValidTrailer(req.body)) return res.status(400).send({message: "El trailer es invalido"});
        const trailersResponse = await trailerServices.createTrailer(req.body);
        return res.status(trailersResponse.status).json(trailersResponse.data);

    } catch (error) {
        console.log("TRAILER CREATION FAILED: ", error);
        return res.status(500).send({message: "There was an error creating the trailer. Check the logs."});
    }
};

trailersController.getTrailers = async (req, res) => {
    try {
        const trailersResponse = await trailerServices.getTrailers();
        return res.status(trailersResponse.status).json(trailersResponse.data);

    } catch (error) {
        console.log("GETTING TRAILERS FAILED: ", error);
        return res.status(500).send({message: "There was an error getting trailers. Check the logs."});
    }
};

trailersController.getTrailer = async (req, res) => {
    try {
        const trailerResponse = await trailerServices.getTrailer(req.params.id);
        return res.status(trailerResponse.status).json(trailerResponse.data);
    } catch (error) {
        console.log("GETTING TRAILER FAILED: ", error);
        return res.status(500).send({message: "There was an error getting trailer. Check the logs."});
    }
};

trailersController.deleteTrailer = async (req, res) => {
    try {
        const trailerId = req.body.trailer_id;
        const bookId = req.body.book_id
        if (!Validators.isValidId(trailerId)) return res.status(400).send({message: "El id del trailer es invalido"});
        if (!Validators.isValidId(trailerId)) return res.status(400).send({message: "El id del libro es invalido"});
        console.log(`Deleting trailer with id ${trailerId}`);

        const trailersResponse = await trailerServices.deleteTrailer(trailerId, bookId);
        return res.status(trailersResponse.status).json(trailersResponse.data);

    } catch (error) {
        console.log("TRAILER DELETE FAILED: ", error);
        return res.status(500).send({message: "There was an error deleting the trailer. Check the logs."});
    }
};

module.exports = trailersController;
