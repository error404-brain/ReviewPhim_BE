const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const movieController = require('../controller/movie.controller');

// Cấu hình multer để lưu trữ tập tin tải lên
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public')); // Lưu vào thư mục public
    },
    filename: (req, file, cb) => {
        const sanitizedFileName = file.originalname.replace(/\s/g, ''); // Loại bỏ khoảng trắng trong tên file
        cb(null, sanitizedFileName); 
    },
});
const upload = multer({ storage: storage });

router.get('/', movieController.getHello);
router.get('/search', movieController.getSearch);
router.get('/search/:id', movieController.getMovieDetail);
router.post('/insert', movieController.getInsertMovie);
router.post('/upload', upload.single('file'), movieController.uploadMovieImg);
router.put('/update/:id', movieController.getUpdateMovie);
module.exports = router;
