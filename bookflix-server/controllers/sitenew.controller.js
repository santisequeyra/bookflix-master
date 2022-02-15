const SiteNew = require('../models/sitenew.js');

const siteNewCtrl = {};

siteNewCtrl.getSiteNews = async (req, res) => {
    const sitenew = await SiteNew.find();
    res.json(sitenew);
};

siteNewCtrl.getSiteNew = async (req, res) => {
    const sitenew = await SiteNew.findOne({ _id: req.params.id });
    res.json(sitenew);
};

siteNewCtrl.createSiteNew = async (req, res) => {
    const sitenew = new SiteNew(req.body);
    await sitenew.save();
    res.json({ status: 'News created' });
};

siteNewCtrl.editSiteNew = async (req, res) => {
    const sitenew = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    };
    await SiteNew.findOneAndUpdate({ _id: req.params.id}, { $set: sitenew }, { new: true });
    res.json({ mensaje: 'Novedad modificada' });
};

siteNewCtrl.deleteSiteNew = async (req, res) => {
    await SiteNew.findOneAndDelete({ _id: req.params.id });
    res.json({ mensaje: 'Novedad borrada' });
};

module.exports = siteNewCtrl;