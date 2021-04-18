const express = require("express");
const { checkJwt, checkRole } = require("../controllers/auth");
const router = express();
const {getPortfolios, getPortfoliosById, createPortfolio, updatePortfolio, deletePortfolio} = require('../controllers/portifolios')

router.get('/', getPortfolios)

router.get('/:id', getPortfoliosById)

router.post('/', checkJwt, createPortfolio)

router.patch('/:id', checkJwt, checkRole('admin'), updatePortfolio)

router.delete('/:id', checkJwt, checkRole('admin'), deletePortfolio)

module.exports = router;