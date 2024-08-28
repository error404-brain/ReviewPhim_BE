var express = require('express');
var app = express();
var db = require('./model');
var cors = require('cors');
const { Sequelize } = require('sequelize');

app.use(cors());


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
