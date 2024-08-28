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

module.exports = {
    searchMovies,
    getMovieById
};
