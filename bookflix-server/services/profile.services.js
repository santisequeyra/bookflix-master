const Profile = require('../models/profile');
const Reading = require('../models/reading')

const profileServices = {};

profileServices.addReview = async (reviewId, profileId) => {
    console.log(`Saving review for user profile...`);
    await Profile.updateOne({ _id: profileId }, { $push: { reviews: reviewId }});
};

profileServices.readBook = async (profileId, readingData) => {

    const profile = await Profile.findOne({_id: profileId});

    if (!profile) return response(404, {message: "Profile not found"})

    const reading = profile.readings.find(reading => reading.book._id == readingData.book_id);

    if (reading) {

        console.log("Updating current page");
        return Reading.updateOne({_id: reading._id}, {$set: {current_page: readingData.current_page}})
            .then(_ => {
                console.log("Current page updated");
                return response(200, {message: "Se actualizó la página actual del libro"});
            })
            .catch(err => {
                console.log("Error updating current page: ", err)
                return response(500, {message: 'There was an error updating user readings in database'});
            })

    }
    else {

        console.log("New reading")
        const reading = new Reading({
            book: readingData.book_id,
            current_page: readingData.current_page
        })
        const dbResult = await reading.save();
        return await Profile.updateOne({_id: readingData.profile_id}, {$push: {readings: dbResult._id}})
            .then(_ => {
                console.log("Profile readings updated");
                return response(201, {message: "Nuevo libro agregado a la lista de lecturas en progreso"});
            })
            .catch(err => {
                console.log("Error updating profile readings: ", err)
                return response(500, {message: 'There was an error updating user in database'});
            });

    }


}

profileServices.setFavourite = async (profileId, data) => {
    try {

        console.log("Updating favourites list");
        return await Profile.updateOne({_id: profileId}, {$push: {favourites: data.book_id}})
            .then(_ => {
                console.log("Favourites updated");
                return response(200, {message: "Se actualizó la lista de favoritos"});
            })
            .catch(err => {
                console.log("Error updating favourites: ", err)
                return response(500, {message: 'There was an error updating user favourites in database'});
            })
    } catch (error) {
        console.log("Error seting book as favourite for the profile: ", error);
        return response(500, {message: 'There was an error updating user in database'});
    }
}

profileServices.removeFavourite = async (profileId, data) => {
    try {
        const result = await Profile.updateOne({ _id: profileId}, { $pull: { favourites: data.book_id } })
            .then(_ => {
                console.log("User updated");
                return response(200, {message: "Se actualizó el listado de favoritos del usuario"});
            })
            .catch(err => {
                console.log("Error updating favourites: ", err)
                return response(500, {message: 'There was an error updating user in database'});
            })
        return result;
    } catch (error) {
        console.log("Error ramoving book from favourites for the profile: ", error);
        return response(500, {message: 'There was an error updating user in database'});
    }
}

function response(status, content) {
    return {
        status: status,
        data: content
    }
}

module.exports = profileServices;
