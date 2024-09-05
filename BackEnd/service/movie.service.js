const db = require('../model');
const { Sequelize } = require('sequelize');


const searchMovies = async (title) => {
    return db.Movie.findAll({
        where: {
            Title: {
                [Sequelize.Op.like]: `%${title}%`
            }
        }
    });
};

const getMovieById = async (id) => {
    return db.Movie.findByPk(id, {
        attributes: { exclude: ['MovieID'] }
    });
};

const insertMovie = async (movie) => {
    return db.Movie.create(movie);
};

const updateMovie = async (id, movie) => {
    return db.Movie.update(movie, {
        where: { MovieID: id }
    });
};

const uploadFile = async (file) => {
    return { filename: file.filename };
};


module.exports = {
    searchMovies,
    getMovieById,
    insertMovie,
    updateMovie,
    uploadFile
};
