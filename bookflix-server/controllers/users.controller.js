const User = require('../models/user');
const userServices = require('../services/user.services')
const Validators = require("../utils/validators");
const mongoose = require('mongoose');

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getUser = async (req, res) => {
    try {
        const userResponse = await userServices.getUserById(req.params.id)
        res.status(userResponse.status).send(userResponse.data);
    } catch (error) {
        console.log("GET USER ERROR: ", error);
        return res.status(500).send({message: "There was an error getting a user information. Check the logs."});
    }

};

exports.deleteUser = async (req, res) => {
    try {
        const userResponse = await userServices.deleteUser(req.params.id)
        res.status(userResponse.status).send(userResponse.data);
    } catch (error) {
        console.log("DELETE USER ERROR: ", error);
        return res.status(500).send({message: "There was an error deleting a user. Check the logs."});
    }

};

exports.register = async (req, res) => {
    try {
        console.log("Creating user with body... ", req.body);

        console.log("Validating request...");
        if (!req.body.name) return res.status(400).send({message: "El nombre es obligatorio"});
        if (!req.body.email) return res.status(400).send({message: "El email es obligatorio"});
        if (!req.body.password) return res.status(400).send({message: "La clave es obligatoria"});
        if (!req.body.credit_card) return res.status(400).send({message: "La tarjeta de credito es obligatoria"});
        if (!req.body.credit_card.number) return res.status(400).send({message: "El numero de tarjeta es obligatorio"});
        if (!req.body.credit_card.code) return res.status(400).send({message: "El codigo de la tarjeta es obligatorio"});
        if (!req.body.credit_card.due_date) return res.status(400).send({message: "La fecha de vencimiento de la tarjeta es obligatoria"});

        const registerResult = await userServices.register(req.body)
        res.status(registerResult.status).json(registerResult.data)
    } catch (error) {
        console.log("REGISTER ERROR: ", error);
        return res.status(500).send({message: "There was an error during registration. Check the logs."});
    }
}

exports.login = async (req, res) => {
    try {
        console.log("Validating credentials...");
        if (!Validators.isValidEmail(req.body.email)) return res.status(400).send({message: "Email invalido"});
        if (!Validators.isValidPassword(req.body.password)) return res.status(400).send({message: "Clave invalida"});

        const credentials = {
            email: req.body.email,
            password: req.body.password
        }

        const loginResult = await userServices.login(credentials);
        res.status(loginResult.status).json(loginResult.data)
    } catch (error) {
        console.log("LOGIN ERROR: ", error)
        return res.status(500).send({message: "There was an error during login. Check the logs."});
    }
}

exports.logout = (req, res) => {
    res.status(200).json({message: "User logout"});
}

exports.changePassword = async (req, res) => {
    try {
        console.log("Validating request... ", req.body);
        if (!Validators.isValidId(req.body.user_id)) return res.status(400).send({message: "Usuario invalid"});
        if (!Validators.isValidPassword(req.body.previous_password)) return res.status(400).send({message: "La clave previa ingresada no es válida"});
        if (!Validators.isValidPassword(req.body.new_password)) return res.status(400).send({message: "La nueva clave ingresada no es valida"});
        if (req.body.previous_password === req.body.new_password) return res.status(400).send({message: "Ambas claves son iguales"});

        const updatePasswordResult = await userServices.changePassword(req.body);
        res.status(updatePasswordResult.status).json(updatePasswordResult.data);

    } catch (error) {
        console.log("UPDATE PASSWORD ERROR: ", error);
        return res.status(500).send({message: "There was an error updating the password. Check the logs."});
    }
}

exports.changeCreditCard = async (req, res) => {

    try {

        console.log("Validating request body ...", req.body);
        if (!Validators.isValidId(req.body.user_id))
            return res.status(400).send({message: "ID de usuario invalido"});
        if (!Validators.isValidCreditCard(req.body.credit_card))
            return res.status(400).send({message: "Tarjeta de credito invalida"});

        const result = await userServices.changeCreditCard(req.body);
        return res.status(result.status).json(result.data)

    } catch (error) {
        console.log("UPDATE CREDIT CARD ERROR: ", error);
        res.status(500).send({message: "There was an error updating credit card"});
    }

}

exports.changePlan = async (req, res) => {

    try {

        console.log("Validating request body ...", req.body);
        if (!Validators.isValidId(req.body.user_id))
            return res.status(400).send({message: "ID de usuario invalido"});
        if (!Validators.isValidPlan(req.body.plan))
            return res.status(400).send({message: "Plan invalido"});

        const result = await userServices.changePlan(req.body);
        return res.status(result.status).json(result.data)

    } catch (error) {
        console.log("CHANGE PLAN ERROR: ", error);
        res.status(500).send({message: "There was an error updating the user's plan"});
    }

}

exports.readBook = async (req, res) => {
    try {
        console.log("Validating request... ", req.body);
        if (!Validators.isValidId(req.body.user_id)) return res.status(400).send({message: "Usuario invalido"});
        if (!Validators.isValidId(req.body.book_id)) return res.status(400).send({message: "Libro invalido"});
        if (!Validators.isValidId(req.body.profile_id)) return res.status(400).send({message: "Perfil invalido"});
        if (!Validators.isValidPage(req.body.current_page)) return res.status(400).send({message: "Página invalida"});

        const readingResponse = await userServices.readBook(req.body);
        return res.status(readingResponse.status).json(readingResponse.data);

    } catch (error) {
        console.log("UPDATING USER READING LIST ERROR: ", error);
        return res.status(500).send({message: "There was an error updating the reading list. Check the logs."});
    }
}

exports.addProfile = async (req, res) => {
    try {
        console.log("Validating request... ", req.body);
        if (!Validators.isValidId(req.body.user_id)) return res.status(400).send({message: "Usuario invalido"});
        if (!Validators.isValidProfile(req.body.profile)) return res.status(400).send({message: "Perfil invalido"});

        const response = await userServices.addProfile(req.body);
        return res.status(response.status).json(response.data);

    } catch (error) {
        console.log("NEW PROFILE CREATION ERROR: ", error);
        return res.status(500).send({message: "There was an error creating a new profile. Check the logs."});
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        console.log("Validating request... ", req.body);
        if (!Validators.isValidId(req.params.user_id)) return res.status(400).send({message: "Usuario invalido"});
        if (!Validators.isValidId(req.params.profile_id)) return res.status(400).send({message: "Perfil invalido"});

        const response = await userServices.deleteProfile(req.params);
        return res.status(response.status).json(response.data);

    } catch (error) {
        console.log("DELETE PROFILE ERROR: ", error);
        return res.status(500).send({message: "There was an error removing a profile. Check the logs."});
    }
}

exports.setFavourite = async (req, res) => {
    try {
        console.log("Validating request... ", req.body);
        if (!Validators.isValidId(req.body.user_id)) return res.status(400).send({message: "Usuario invalido"});
        if (!mongoose.Types.ObjectId.isValid(req.body.profile_id)) return res.status(400).send({message: "Perfil invalido"});
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({message: "Libro invalido"});

        const favouriteResponse = await userServices.setFavourite({ 
            "user_id": req.body.user_id,
            "profile_id": req.body.profile_id,
            "book_id": req.params.id
         });
        return res.status(favouriteResponse.status).json(favouriteResponse.data);

    }   catch (error) {
        console.log("SETTING FAVOURITE BOOK ERROR: ", error);
        return res.status(500).send({message: "There was an error updating the  reading list. Check the logs."});
    }
}

exports.removeFavourite = async (req, res) => {
    try {
        console.log("Validating request... ", req.body);
        if (!Validators.isValidId(req.body.user_id)) return res.status(400).send({message: "Usuario invalido"});
        if (!mongoose.Types.ObjectId.isValid(req.body.profile_id)) return res.status(400).send({message: "Perfil invalido"});
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({message: "Libro invalido"});

        const favouriteResponse = await userServices.removeFavourite({ 
            "user_id": req.body.user_id,
            "profile_id": req.body.profile_id,
            "book_id": req.params.id
         });
        return res.status(favouriteResponse.status).json(favouriteResponse.data);
        
    } catch (error) {
        console.log("REMOVING FAVOURITE BOOK ERROR: ", error);
        return res.status(500).send({message: "There was an error updating the  reading list. Check the logs."});
    }
}

exports.getFavourites = async (req, res) => {
    try {
        console.log("Validating request... ", req.body);
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({message: "Perfil invalido"});

        const favouritesResponse = await userServices.getFavourites(req.params.id);
        return res.status(favouritesResponse.status).json(favouritesResponse.data);
        
    } catch (error) {
        console.log("GETTING FAVOURITE BOOKS ERROR: ", error);
        return res.status(500).send({message: "There was an error getting favourite books. Check the logs."});
    }
}








