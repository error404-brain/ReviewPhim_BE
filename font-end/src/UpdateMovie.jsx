import React, { useState } from 'react';
import { UpdateMovie as updateMovieAPI, uploadFile } from './Api'; // Nhập các hàm API
import updateBG from './assets/download2.jpg'; // Nhập hình nền

function UpdateMovie() {
  // Các biến trạng thái cho các trường trong form
  const [id, setMovieId] = useState('');
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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState(''); // Trạng thái để lưu URL xem trước hình ảnh

  // Xử lý sự kiện thay đổi file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Tạo URL xem trước cho hình ảnh
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Xử lý việc tải lên hình ảnh
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

  // Xử lý việc cập nhật thông tin phim
  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    const movie = {
      id,
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

    try {
      // Gọi API để cập nhật phim
      await updateMovieAPI(movie);
      setSuccessMessage('Cập nhật phim thành công!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Cập nhật phim không thành công: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundImage: `url(${updateBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-3xl mx-auto p-8 bg-black bg-opacity-80 rounded-lg shadow-md">
        {/* Phần tải lên hình ảnh */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Tải lên hình ảnh</h1>
          <input type="file" onChange={handleFileChange} className="mb-4 p-2 bg-gray-700 text-white rounded-md" />
          <button
            onClick={handleUploadImage}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Tải lên hình ảnh
          </button>
          {uploadSuccess && <p className="text-green-400 mt-4">{uploadSuccess}</p>}
        </div>

        {/* Xem trước hình ảnh */}
        {previewUrl && (
          <div className="flex justify-center mb-8">
            <img src={previewUrl} alt="Preview" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
          </div>
        )}

        {/* Thông báo thành công/ lỗi */}
        {successMessage && <p className="text-green-400 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-400 text-center mb-4">{errorMessage}</p>}

        {/* Form cập nhật phim */}
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Cập nhật phim</h2>
        <form className="space-y-6" onSubmit={handleUpdateMovie}>
          {/* Các trường trong form */}
          {/* ID */}
          <div>
            <label className="block text-sm font-semibold text-white">ID phim:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setMovieId(e.target.value)}
              placeholder="Nhập ID phim"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tiêu đề */}
          <div>
            <label className="block text-sm font-semibold text-white">Tiêu đề:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề phim"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-semibold text-white">Tagline:</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Nhập tagline phim"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tổng quan */}
          <div>
            <label className="block text-sm font-semibold text-white">Tổng quan:</label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Nhập tổng quan phim"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Thể loại */}
          <div>
            <label className="block text-sm font-semibold text-white">Thể loại:</label>
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              placeholder="Nhập thể loại phim"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Công ty sản xuất */}
          <div>
            <label className="block text-sm font-semibold text-white">Công ty sản xuất:</label>
            <input
              type="text"
              value={productionCompanies}
              onChange={(e) => setProductionCompanies(e.target.value)}
              placeholder="Nhập công ty sản xuất"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Ngày phát hành */}
          <div>
            <label className="block text-sm font-semibold text-white">Ngày phát hành:</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Doanh thu */}
          <div>
            <label className="block text-sm font-semibold text-white">Doanh thu:</label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="Nhập doanh thu"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Điểm trung bình */}
          <div>
            <label className="block text-sm font-semibold text-white">Điểm trung bình:</label>
            <input
              type="number"
              step="0.1"
              value={voteAverage}
              onChange={(e) => setVoteAverage(e.target.value)}
              placeholder="Nhập điểm trung bình"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Thời gian chạy */}
          <div>
            <label className="block text-sm font-semibold text-white">Thời gian chạy (phút):</label>
            <input
              type="number"
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
              placeholder="Nhập thời gian chạy (phút)"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tên hình ảnh */}
          <div>
            <label className="block text-sm font-semibold text-white">Tên hình ảnh:</label>
            <input
              type="text"
              value={imgName}
              onChange={(e) => setImgName(e.target.value)}
              placeholder="Nhập tên hình ảnh"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Nút gửi */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cập nhật phim
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMovie;
