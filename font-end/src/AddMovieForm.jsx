import React, { useState, useEffect } from 'react';
import { insertMovie, uploadFile } from './Api'; // Nhập các hàm API để thêm phim và tải lên file
import bg_img from './assets/download.jpg'; // Nhập hình nền

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [productionCompanies, setProductionCompanies] = useState('');
  const [revenue, setRevenue] = useState('');
  const [voteAverage, setVoteAverage] = useState('');
  const [runtime, setRuntime] = useState('');
  const [imgName, setImgName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState(''); 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      // Giải phóng URL đối tượng khi component unmount
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  // Xử lý tải lên hình ảnh
  const handleUploadImage = async (event) => {
    event.preventDefault();
    try {
      if (file) {
        const response = await uploadFile(file);
        if (typeof response.fileName === 'string') {
          setImgName(response.fileName);
          setUploadSuccess('Tải hình ảnh lên thành công!');
        } else {
          throw new Error('Tên file không hợp lệ nhận được từ máy chủ.');
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải hình ảnh:', error.message);
      setUploadSuccess('Không thể tải hình ảnh lên.');
    }
  };

  // Xử lý thêm phim
  const handleAddMovie = async (event) => {
    event.preventDefault();
    try {
      const movie = {
        Title: title,
        Tagline: tagline,
        OverView: overview,
        Genres: genres,
        ProductionCompanies: productionCompanies,
        ReleaseDate: releaseDate,
        Revenue: revenue,
        Vote_Average: voteAverage,
        Runtime: runtime,
        Img_Name: imgName,
      };

      await insertMovie(movie);
      setSuccessMessage('Thêm phim thành công!');
      setTimeout(() => {
        window.location.reload(); // Tải lại trang sau 2 giây
      }, 2000);
    } catch (error) {
      console.error('Lỗi khi thêm phim:', error.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bg_img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-3xl w-full p-6 bg-white bg-opacity-80 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Thêm Phim</h2>

        {/* Form tải lên hình ảnh */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Tải lên hình ảnh</h3>
          {uploadSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md border border-green-200">
              {uploadSuccess}
            </div>
          )}
          <form onSubmit={handleUploadImage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Chọn hình ảnh:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {previewUrl && (
              <div className="mt-4">
                <img src={previewUrl} alt="Hình ảnh xem trước" className="w-full h-auto rounded-md border border-gray-300" />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tải lên hình ảnh
            </button>
          </form>
        </div>

        {/* Form thêm phim */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Thông tin phim</h3>
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md border border-green-200">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleAddMovie} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tiêu đề:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tagline:</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tổng quan:</label>
              <textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Thể loại:</label>
              <input
                type="text"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Công ty sản xuất:</label>
              <input
                type="text"
                value={productionCompanies}
                onChange={(e) => setProductionCompanies(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ngày phát hành:</label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Doanh thu:</label>
              <input
                type="number"
                step="0.01"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Điểm đánh giá:</label>
              <input
                type="number"
                step="0.1"
                value={voteAverage}
                onChange={(e) => setVoteAverage(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Thời gian chạy (phút):</label>
              <input
                type="number"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tên hình ảnh:</label>
              <input
                type="text"
                value={imgName}
                onChange={(e) => setImgName(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Thêm phim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;
