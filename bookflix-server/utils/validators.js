const moment = require('moment');

const Validator = {};

Validator.isValidTrailer = (trailer) => {
    return (trailer) && (trailer.title) && (trailer.book) && (trailer.description != null);
}

Validator.isValidReview = (review) => {
    return (review) && (review.book) && (review.description != null) && (review.rating >= 0) && (review.rating <= 5);
}

Validator.isValidSpoilerValue = (spoiler) => {
    return (spoiler != undefined) && (spoiler != null) && (typeof(spoiler) == 'boolean');
}

Validator.isValidPlan = (plan) => {
    return (plan) && (plan == "STANDARD" || plan == "PREMIUM");
}

Validator.isValidProfile = (profile) => {
    return (profile) && (profile.length > 0);
}

Validator.isValidId = (id) => {
    return (id !== undefined) && (id.match(/^[0-9a-fA-F]{24}$/));
}

Validator.isValidPassword = (password) => {
    return ((password !== undefined) && (password.length >= 8));
}

Validator.isValidEmail = (email) => {
    return ((email !== undefined) && (email.includes("@")) && (email.includes(".")));
}

Validator.isValidPage = (pageNumber) => {
    return ((pageNumber !== undefined) && (typeof pageNumber === "number"))
}

Validator.isValidCreditCard = (credit_card) => {
    return (
        (credit_card !== undefined) &&
        (credit_card.number && credit_card.due_date && credit_card.code) &&
        (credit_card.number.length = 16) &&
        (Validator.isValidDueDate(credit_card.due_date)) &&
        (credit_card.code.length = 3)
    );
}

Validator.isValidDueDate = (due_date) => {
    try {
        const isValidFormat = (due_date.length = 5) && (due_date.includes('/'));
        const date = due_date.split('/')
        const month = parseInt(date[0]);
        const year = parseInt(date[1]);
        const isValidDate = (month >= 1 && month <= 12 && year >= 20) // TODO: Dynamic current year
        return isValidFormat && isValidDate
    } catch (error) {
        console.log(error);
        return false;
    }
}

Validator.isValidDatesRange = (range) => {
    try {
        const from = moment(range.from, "DD-MM-YYYY");
        const to = moment(range.to, "DD-MM-YYYY")
        return from.isSameOrBefore(to);
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = Validator
