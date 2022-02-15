const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createAdmin = (req, res, next) => {
    const newAdmin = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }

    Admin.create(newAdmin, (err, admin) => {
        if (err && err.code === 11000) return res.status(409).send({
            message: 'Email already exists'
        });
        if (err) return res.status(500).send({
            message: 'Server error'
        });
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({id: admin.id},
            SECRET_KEY, {
                expiresIn: expiresIn
            });
        const dataAdmin = {
            email: admin.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        // response
        res.send({dataAdmin});
    });
}

exports.loginAdmin = (req, res, next) => {
    const adminData = {
        email: req.body.email,
        password: req.body.password
    }
    Admin.findOne({email: adminData.email}, (err, admin) => {
        if (err) return res.status(500).send({
            message: 'Server error!'
        });

        if (!admin) {
            // email does not exist
            res.status(409).send({message: 'Something is wrong'});
        } else {
            const resultPassword = bcrypt.compareSync(adminData.password, admin.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({id: admin.id}, SECRET_KEY, {expiresIn: expiresIn});

                const dataAdmin = {
                    email: admin.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({dataAdmin});
            } else {
                // password wrong
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    });
}

exports.logoutAdmin = (req, res, next) => {
    res.status(200).send({message: "Admin logout"});
}