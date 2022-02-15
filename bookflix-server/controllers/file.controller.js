const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Book = require('../models/book.js');

const Services = require('../services/file.services');

const fileCtrl = {};

fileCtrl.downloadCover = async (req, res) => {
    try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({message: "El parametro "+req.params.id+' no es un id valido'});
    if  (!Services.bookExists(req.params.id))
        return res.status(400).send({message: 'El libro con id: '+req.params.id+' no existe' });
    const { cover } = await Book.findOne({ _id: req.params.id });
    if (!cover) return res.status(400).send({message: "El libro con id "+req.params.id+' no posee tapa'});
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const downloadstream = bucket.openDownloadStream(mongoose.Types.ObjectId(cover));
    const writestream = fs.createWriteStream('./tmp/downloads/'+cover+'.jpg');
    downloadstream.pipe(writestream);
    writestream.on('finish', () => { 
        res.sendFile(path.join(__dirname, '../tmp/downloads/'+cover+'.jpg'), (err) => {
            if (err) throw(err);
            fs.unlink('./tmp/downloads/'+cover+'.jpg', (err) => {
                console.log('./tmp/downloads/'+cover+' was deleted');
            });
        });  
    });
    } catch (error) {
        console.log("FILE DOWNLOAD FAILED: ", error);
        return res.status(500).send({message: "There was an error downloading the file"});
    }
};

fileCtrl.uploadCover = async (req, res) => {
    try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({message: "El parametro "+req.params.id+' no es un id valido'});
    Book.findOne({ _id: req.params.id }, (err, data) => {
        if (err) throw err;
        if (!data) return res.status(400).send({message: 'El libro con id: '+req.params.id+' no existe' });
        if (data.cover)
            return res.status(400).send({message: 'El libro con id: '+req.params.id+' ya posee tapa' });
        const dataBase64 = Buffer.from(req.body.file, 'base64');
        const filepath = './tmp/uploads/'+req.body.filename;
        fs.writeFile(filepath, dataBase64, async (err) => {
            if (err) throw err;
            console.log('The file has been saved');
            const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
            const uploadstream = bucket.openUploadStream(req.body.filename);
            Book.updateOne({ _id: req.params.id }, { $set: { cover: uploadstream.id }}, (err) => {
                if (err) throw err;
                console.log('Book id updated successfully');
            });
            fs.createReadStream(filepath).pipe(uploadstream);
            fs.unlink(filepath, (err) => {
                if (err) throw err;
                console.log(filepath+' was deleted');
            });
            res.json('El archivo se guardo correctamente');
        });
    });
    } catch (error) {
        console.log("FILE UPLOAD FAILED: ", error);
        return res.status(500).send({message: "There was an error uploading the file"});
    };
};

fileCtrl.deleteCover = async (req, res) => {
    try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({message: 'El parametro '+req.params.id+' no es un id valido'});
    if (!Services.bookExists(req.params.id))
        return res.status(400).send({message: 'El libro con id: '+req.params.id+' no existe' });
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
        Services.removeCover(req.params.id, (data) => {
            if (!data)
                return res.status(400).send({message: "El libro con id "+data.id+' no posee tapa'});
                bucket.delete(mongoose.Types.ObjectId(data), (err) => {
                if (err) throw err;
                res.json('La tapa se elimino con exito');
            });
        });
    } catch (error) {
        console.log("FILE DELETION FAILED: ", error);
        return res.status(500).send({message: "There was an error deleting the file"});
    };
};

fileCtrl.downloadBook = async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: "El parametro "+req.params.id+' no es un id valido' });
        var cursor = bucket.find({ _id: mongoose.Types.ObjectId(req.params.id) });
        cursor.count((err, count) => {
            if (err) throw err;
            if (!count)
                return res.status(400).send({ message: "El documento con id "+req.params.id+' no existe'});
            const downloadstream = bucket.openDownloadStream(mongoose.Types.ObjectId(req.params.id));
            const writestream = fs.createWriteStream('./tmp/downloads/'+req.params.id);
            downloadstream.pipe(writestream);
            writestream.on('finish', () => { 
                res.sendFile(path.join(__dirname, '../tmp/downloads', req.params.id), (err) => {
                    if (err) throw(err);
                    fs.unlink('./tmp/downloads/'+req.params.id, (err) => {
                        console.log('./tmp/downloads/'+req.params.id+' was deleted');
                    });
                });  
            });
        });
    } catch (err) {
        console.log("FILE DOWNLOAD FAILED: ", err);
        return res.status(500).send({ message: "There was an error deleting the file" });
    };
};

fileCtrl.uploadBook = async (req,res) => {
    try {
        const dataBase64 = Buffer.from(req.body.file, 'base64');
        const filepath = './tmp/uploads/'+req.body.filename;
        fs.writeFile(filepath, dataBase64, async (err) => {
            if (err) throw err;
            console.log('The file has been saved');
            const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
            const uploadstream = bucket.openUploadStream(req.body.filename);
            const id = uploadstream.id;
            fs.createReadStream(filepath).pipe(uploadstream);
            fs.unlink(filepath, (err) => {
                if (err) throw err;
                console.log(filepath+' was deleted');
            });
            res.send({ message: 'El archivo se guardo correctamente',
                        fileid: id });
        });
    } catch (err) {
        console.log('FILE UPLOAD FAILED: ',err);
        return res.status(500).send({ message: "There was an error uploading the file" });
    };
};

fileCtrl.deleteBook = async (req,res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({message: 'El parametro '+req.params.id+' no es un id valido'});
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
        var cursor = bucket.find({ _id: mongoose.Types.ObjectId(req.params.id) });
        cursor.count((err, count) => {
            if (err) throw err;
            if (!count)
                return res.status(400).send({ message: "El documento con id "+req.params.id+' no existe'});
            bucket.delete( mongoose.Types.ObjectId(req.params.id), (err) => {
                if (err) throw err;
                return res.json('El archivo fue eliminado satisfactoriamente');
            });
        });
    } catch (err) {
        console.log('FILE DELETION FAILED: ', err);
        res.status(500).send({message: "There was an error deleting the file"});
    };
}


module.exports = fileCtrl;