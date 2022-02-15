const Account = require('../models/account');
const CreditCard = require('../models/creditcard');
const Profile = require('../models/profile');
const profileServices = require('../services/profile.services');

const accountServices = {};

function createCreditCard(creditCardData) {
    const creditCard = new CreditCard(creditCardData);
    return creditCard.save()
}

function createProfile(name) {
    const profile = new Profile({name})
    return profile.save()
}

accountServices.createAccount = async (registrationData) => {
    console.log(`Creating account for user`);

    const account = {
        profiles: [ await createProfile(registrationData.name) ],
        credit_card: await createCreditCard(registrationData.credit_card)
    }
    const newAccount = new Account(account)
    return newAccount.save()
};

accountServices.addProfile = async (accountId, profileName) => {
    console.log(`Creating profile for user`);
    const profile = await createProfile(profileName);
    return Account.updateOne({_id: accountId}, {$push: {profiles: profile._id}})
        .then(_ => {
            console.log("New profile created");
            return response(200, {message: "New profile created"});
        })
        .catch(err => {
            console.log("Error creating new profile: ", err)
            return response(500, {message: 'There was an error creating a new profile in database'});
        })
};

accountServices.deleteProfile = async (accountId, profileId) => {

    const result = await Account.findOne({_id: accountId})
        .then(account => {
            if (Array.of(account.profiles).flat().map(p => p._id.toString()).includes(profileId)){
                if (account.profiles.length == 1){
                    return response(409, {message: "Last profile can't be deleted"});
                } else {
                    return null;
                }
            } else {
                return response(404, {message: "Profile not found"})
            }
        })

    if (result) return result

    console.log(`Deleting profile reference from user account`);
    await Account.update({_id: accountId}, {$pull: {profiles: profileId}})
    console.log(`Deleting profile from database`);
    return Profile.deleteOne({_id: profileId})
        .then(_ => {
            console.log("Profile deleted");
            return response(200, {message: "Profile deleted"});
        })
        .catch(err => {
            console.log("Error deleting profile: ", err)
            return response(500, {message: 'There was an error deleting a profile in database'});
        })
};

accountServices.changeCreditCard = async (accountId, creditCard) => {

    const creditCardId = await Account.findOne({_id: accountId})
        .then(account => {
            return account.credit_card
        })

    return CreditCard.updateOne({_id: creditCardId}, {$set: creditCard})
        .then(_ => {
            console.log("Credit card updated");
            return response(200, {message: "Tarjeta de credito actualizada"});
        })
        .catch(err => {
            console.log("Error updating credit card: ", err)
            return response(500, {message: 'There was an error updating user in database'});
        })


}

accountServices.changePlan = async (accountId, plan) => {

    return Account.updateOne({_id: accountId}, {$set: {plan: plan}})
        .then(_ => {
            console.log("Plan updated");
            return response(200, {message: "Plan actualizada"});
        })
        .catch(err => {
            console.log("Error updating plan: ", err)
            return response(500, {message: "There was an error updating user's plan in database"});
        })

}

accountServices.readBook = async (accountId, readingData) => {

    return Account.findOne({_id: accountId})
        .then(account => {
            const profile = account.profiles.find(profile => readingData.profile_id == profile._id);
            if (profile) {
                return profileServices.readBook(profile._id, readingData);
            } else {
                console.log("The provided profile id was not found for the provided user id account");
                return response(404, {message: 'The provided profile id was not found for the provided user id account'});
            }
        })
        .catch(err => {
            console.log("Error getting account for readings updates: ", err)
            return response(500, {message: 'There was an error updating user in database'});
        })

}

accountServices.setFavourite = async (accountId, favouriteData) => {

    return Account.findOne({_id: accountId})
        .then(account => {
            const profile = account.profiles.find(profile => favouriteData.profile_id == profile._id);
            if (profile) {
                return profileServices.setFavourite(profile._id, favouriteData);
            } else {
                console.log("The provided profile id was not found for the provided user id account");
                return response(500, {message: 'There was an error updating user in database'});
            }
        })
        .catch(err => {
            console.log("Error getting account for favourites update: ", err)
            return response(500, {message: 'There was an error updating user in database'});
        })

}

accountServices.removeFavourite = async (accountId, favouriteData) => {

    return Account.findOne({_id: accountId})
        .then(account => {
            const profile = account.profiles.find(profile => favouriteData.profile_id == profile._id);
            if (profile) {
                return profileServices.removeFavourite(profile._id, favouriteData);
            } else {
                console.log("The provided profile id was not found for the provided user id account");
                return response(500, {message: 'There was an error updating user in database'});
            }
        })
        .catch(err => {
            console.log("Error getting account for favourites update: ", err)
            return response(500, {message: 'There was an error updating user in database'});
        })

}

function response(status, content) {
    return {
        status: status,
        data: content
    }
}


module.exports = accountServices;
