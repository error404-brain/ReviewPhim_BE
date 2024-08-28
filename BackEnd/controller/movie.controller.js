const movieService = require('../service/movie.service');

const getHello = (req, res) => {
    res.send({ message: 'Hello World' });
}

const getSearch = async (req, res) => {
    try {
        const movieTitle = req.query.title;
        const movies = await movieService.searchMovies(movieTitle);
        if (movies.length > 0) {
            res.send(movies);
        } else {
            res.status(404).send({ error: 'Không tìm thấy phim nào' });
        }
    } catch (err) {
        console.error('Lỗi khi tìm kiếm phim:', err);
        res.status(500).send({ error: 'Lỗi khi tìm kiếm phim' });
    }
}

const getMovieDetail = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await movieService.getMovieById(movieId);
        if (movie) {
            res.send(movie);
        } else {
            res.status(404).send({ error: 'Phim không tìm thấy' });
        }
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu phim:', err);
        res.status(500).send({ error: 'Lỗi khi lấy dữ liệu phim' });
    }
}

module.exports = {
    getHello,
    getSearch,
    getMovieDetail
};
