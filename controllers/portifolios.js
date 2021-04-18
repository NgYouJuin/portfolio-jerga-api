const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');

exports.getPortfolios = async (req, res) => {
    const portfolios = await Portfolio.find()
    return res.json(portfolios);
}


exports.getPortfoliosById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id)
        return res.json(portfolio);
    } catch(error) {
        return res.status(422).send(error.message);
    }
}

exports.createPortfolio = async (req, res) => {
    const portfoliaData = req.body;
    const userId = req.user.sub;
    portfoliaData.userId = userId
    const portfolio = new Portfolio(portfoliaData)
    
    try {
        const newPortfolio = await portfolio.save()
        return res.json(newPortfolio)
    } catch (e) {
        return res.status(422).send(e.message);
    }
}

exports.updatePortfolio = async (req, res) => {
    const {body, params: {id}} = req;
    
    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate({_id: id}, body,{new: true, runValidators: true})
        return res.json(updatedPortfolio)
    } catch (e) {
        return res.status(422).send(e.message);
    }
}

exports.deletePortfolio = async (req, res) => {
    const {params: {id}} = req;
    try {
        const portfolio = await Portfolio.findByIdAndRemove(id)
        return res.json(portfolio)
    } catch (e) {
        return res.status(422).send(e.message);
    }
}