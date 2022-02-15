const User = require('../models/user');
const moment = require('moment');


const metricsServices = {}

metricsServices.getUsersMetric = async (range) => {
    return User.find()
        .then(users => {
            const from = moment(range.from, "DD-MM-YYYY");
            const to = moment(range.to, "DD-MM-YYYY")
            const usersInRange = users.filter(user => {
                const created = moment(user.createdAt, "YYYY-MM-DD")
                return created.isSameOrAfter(from) && created.isSameOrBefore(to);
            })
            return response(200, usersInRange)
        })
        .catch(err => {
            console.log(err);
            return response(500, {message: "There was an error getting users from database"})
        })

};

function response(status, content) {
    return {
        status: status,
        data: content
    }
}

module.exports = metricsServices;
