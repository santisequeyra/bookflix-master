const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';
const mongoose = require('mongoose');
const accountServices = require('../services/account.services');

const Profile = require('../models/profile');

const userServices = {}


userServices.register = async (registrationData) => {
    console.log("Registering user... ", registrationData);

    const account = await accountServices.createAccount(registrationData);

    const userData = {
        name: registrationData.name,
        email: registrationData.email,
        password: bcrypt.hashSync(registrationData.password),
        account: account
    }

    const newUser = new User(userData)

    console.log("Saving new user to database...");
    return newUser.save()
        .then(user => {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({id: user.id},
                SECRET_KEY, {
                    expiresIn: expiresIn
                });
            const dataUser = {
                name: user.name,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            return response(200, dataUser)
        })
        .catch(err => {
            console.log(err);
            if (err && err.code === 11000) return response(409, {message: 'El email ya existe'});
            if (err) return response(500, {message: 'Server error'});
        })
}

userServices.login = async (credentials) => {
    console.log("User login started");
    const user = await userServices.getUserByEmail(credentials.email);
    if (user) {
        const resultPassword = bcrypt.compareSync(credentials.password, user.password);
        if (resultPassword) {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});
            const userData = {
                access_token: accessToken,
                user_id: user._id,
                name: user.name,
                email: user.email,
                account: user.account
            }
            return response(200, userData);
        } else {
            return response(409, {message: "La clave es incorrecta"});
        }
    } else {
        return response(404, {message: "No se encontró al usuario"});
    }
}

userServices.changePassword = async (passwordData) => {

    const findResult = await userServices.getUserById(passwordData.user_id);

    if (findResult.status !== 200) {
        console.log("There was an unexpected error. Returning error response");
        return findResult;
    }

    console.log("Checking if previous password is ok...");
    const user = findResult.data
    const password_ok = bcrypt.compareSync(passwordData.previous_password, user.password);
    if (!password_ok) return response(401, {message: "La clave anterior no es correcta"});

    console.log("Encripting new password...");
    const password_setter = {
        password: bcrypt.hashSync(passwordData.new_password)
    };

    console.log(`Updating password for user ${user.name}`);
    return User.updateOne({_id: passwordData.user_id}, {$set: password_setter})
        .then(_ => {
            console.log("Password updated");
            return response(200, {message: "La clave fue actualizada"});
        })
        .catch(err => {
            console.log("Error updating password: ", err)
            return response(500, {message: 'There was an error updating user in database'});
        })

}

userServices.changeCreditCard = async (creditCardData) => {
    const findResult = await userServices.getUserById(creditCardData.user_id);

    if (findResult.status !== 200) {
        console.log("There was an unexpected error. Returning error response");
        return findResult;
    }

    const account = findResult.data.account;
    return accountServices.changeCreditCard(account._id, creditCardData.credit_card)
}

userServices.changePlan = async (changingPlanData) => {
    const findResult = await userServices.getUserById(changingPlanData.user_id);

    if (findResult.status !== 200) {
        console.log("There was an unexpected error. Returning error response");
        return findResult;
    }

    const account = findResult.data.account;
    if (account.plan == changingPlanData.plan){
        return response(400, {message: "El plan es el mismo"})
    } else {
        return accountServices.changePlan(account._id, changingPlanData.plan)
    }
}

userServices.getUserById = async (id) => {
    try {
        console.log(`Getting user data for id: ${id}`);
        const user = await User.findOne({_id: id});
        if (user){
            return response(200, {
                user_id: user._id,
                password: user.password,
                name: user.name,
                email: user.email,
                account: user.account
            });
        } else {
            return response(404, {message: "User not found"})
        }
    } catch(error) {
            console.log("ERROR GETTING USER: ", error);
            return response(500, { message: "There was an unexpected error getting user" })
    };
}

userServices.deleteUser = async (id) => {
    console.log(`Deleting user with id: ${id}`);
    // TODO: Borrar referencias a cada perfil (reviews, readings, favourites), borrar cada perfil, borrar tarjeta, borrar cuenta
    return User.findByIdAndDelete(id)
        .then(_ => {
            return response(200, {message: "User deleted"})
        })
        .catch(error => {
            console.log("ERROR GETTING USER: ", error);
            return response(500, { message: "There was an unexpected error getting user" })
        })
}

userServices.getUserByEmail = async (email) => {
    console.log(`Getting user data for email: ${email}`);
    return User.findOne({email: email})
}

userServices.readBook = async (readingData) => {
    try {
        const findResult = await userServices.getUserById(readingData.user_id);

        if (findResult.status !== 200) {
            console.log("There was an unexpected error. Returning error response");
            return findResult;
        }

        const account = findResult.data.account
        return accountServices.readBook(account, readingData)

    } catch (error){
        console.log("Error adding a reading for the user: ", err)
        return response(500, {message: 'There was an error updating user in database'});
    }
}

userServices.addProfile = async (profileData) => {
    try {
        const findResult = await userServices.getUserById(profileData.user_id);

        if (findResult.status !== 200) {
            console.log("There was an unexpected error. Returning error response");
            return findResult;
        }

        const account = findResult.data.account
        if (account.profiles.includes(profile => profile.name == profileData.profile)){
            return response(400, {message: "The provided profile name already exists in the account"});
        }
        if (account.plan == "STANDARD" && account.profiles.length == 2){
            return response(400, {message: "Profiles limit (2) reached for STANDARD plan"});
        }
        if (account.plan == "PREMIUM" && account.profiles.length == 4){
            return response(400, {message: "Profiles limit (4) reached for PREMIUM plan"});
        }

        return accountServices.addProfile(account._id, profileData.profile)
    } catch (error){
        console.log("Error adding a new profile for the user: ", err)
        return response(500, {message: 'There was an error creating a new profile in database'});
    }
}

userServices.deleteProfile = async (profileData) => {
    try {
        const findResult = await userServices.getUserById(profileData.user_id);

        if (findResult.status !== 200) {
            console.log("There was an unexpected error. Returning error response");
            return findResult;
        }

        const account = findResult.data.account
        return accountServices.deleteProfile(account._id, profileData.profile_id)

    } catch (error){
        console.log("Error deleting a profile for the user: ", err)
        return response(500, {message: 'There was an error deleting a profile in database'});
    }
}

userServices.setFavourite = async (favouriteData) => {
    try {
        const findResult = await userServices.getUserById(favouriteData.user_id);

        if (findResult.status !== 200) {
            console.log("There was an unexpected error. Returning error response");
            return findResult;
        }

        const account = findResult.data.account;
        return accountServices.setFavourite(account, favouriteData);

    } catch (error) {
        console.log("Error adding a favourite for the user: ", err)
        return response(500, {message: 'There was an error updating user in database'});
    }
}

userServices.removeFavourite = async (favouriteData) => {
    try {

        const findResult = await userServices.getUserById(favouriteData.user_id);

        if (findResult.status !== 200) {
            console.log("There was an unexpected error. Returning error response");
            return findResult;
        }

        const account = findResult.data.account;
        return accountServices.removeFavourite(account, favouriteData);

    } catch (error) {
        console.log("Error removing a favourite for the user: ", err)
        return response(500, {message: 'There was an error updating user in database'});
    }
}

userServices.getFavourites = async (profileId) => {
    try {
        const ret = await Profile.findOne({ _id: profileId })
            .populate({
                path: 'favourites', 
                populate: { path: 'author publisher genre'}, 
            });
        return response(200, ret.favourites);
    } catch (error) {
        console.log("Error getting favourites for the user: ", error)
        return response(500, {message: 'There was an error getting user from database'});
    }
}

function response(status, content) {
    return {
        status: status,
        data: content
    }
}

module.exports = userServices
