const movieService = require('../service/movie.service');

const getHello = (req, res) => {
    res.send({ message: 'Hello World' });
};

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
};

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
};

const getInsertMovie = async (req, res) => {
    try {
        const {
            Title,
            Tagline,
            OverView,
            Genres,
            ProductionCompanies,
            ReleaseDate,
            Revenue,
            Vote_Average,
            Runtime,
            Img_Name
        } = req.body;

        if (!Title) {
            return res.status(400).send({ error: 'Title is required' });
        }

        const result = await movieService.insertMovie({
            Title,
            Tagline,
            OverView,
            Genres,
            ProductionCompanies,
            ReleaseDate,
            Revenue,
            Vote_Average,
            Runtime,
            Img_Name
        });

        res.status(201).send(result);
    } catch (err) {
        console.log('Lỗi khi chép phim:', err);
        res.status(500).send({ error: 'Lỗi khi chép phim', details: err.message });
    }
};

const uploadMovieImg = async (req, res) => {
    try {
        const file = req.file;
        console.log('Uploaded file:', file);

        if (!file) {
            return res.status(400).send({ error: 'Không có file nào được gửi lên' });
        }
        res.status(201).send({
            message: 'File đã được tải lên thành công!',
            fileName: file.filename 
        });
    } catch (err) {
        console.log('Lỗi khi tải lên hình ảnh:', err);
        res.status(500).send({
            error: 'Lỗi khi tải lên hình ảnh',
            details: err.message
        });
    }
};

const getUpdateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const {
            Title,
            Tagline,
            OverView,
            Genres,
            ProductionCompanies,
            ReleaseDate,
            Revenue,
            Vote_Average,
            Runtime,
            Img_Name
        } = req.body;

        if (!Title) {
            return res.status(400).send({ error: 'Title is required' });
        }

        const result = await movieService.updateMovie(movieId, {
            Title,
            Tagline,
            OverView,
            Genres,
            ProductionCompanies,
            ReleaseDate,
            Revenue,
            Vote_Average,
            Runtime,
            Img_Name
        });

        res.send(result);
    } catch (err) {
        console.log('Lỗi khi chép phim:', err);
        res.status(500).send({ error: 'Lỗi khi chép phim', details: err.message });
    }
};


module.exports = {
    getHello,
    getSearch,
    getMovieDetail,
    getInsertMovie,
    getUpdateMovie,
    uploadMovieImg 
};
