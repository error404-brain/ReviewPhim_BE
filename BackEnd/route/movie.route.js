const express = require('express');
const router = express.Router();

const movieController = require('../controller/movie.controller');

router.get('/', movieController.getHello);
router.get('/search', movieController.getSearch);
router.get('/search/:id', movieController.getMovieDetail);

module.exports = router;
