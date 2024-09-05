var express = require('express');
var app = express();
var db = require('./model');
var cors = require('cors');
const { Sequelize } = require('sequelize');
const path = require('path'); // Import path module for resolving file paths

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

const movieRouter = require('./route/movie.route');
app.use('/movies', movieRouter);

app.listen(3000, function() {
  console.log('Node server running @ http://localhost:3000');
});

db.sequelize.sync().then(() => {
  console.log('Đồng bộ cơ sở dữ liệu thành công.');
}).catch(err => {
  console.error('Lỗi khi đồng bộ cơ sở dữ liệu:', err);
});
