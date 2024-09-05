import React, { useState } from 'react';
import { insertMovie, uploadFile } from './Api'; // Updated import to include uploadFile
import bg_img from './assets/download.jpg';


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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadImage = async (event) => {
    event.preventDefault();
    try {
      if (file) {
        const response = await uploadFile(file);
        if (typeof response.fileName === 'string') {
          setImgName(response.fileName);
          setUploadSuccess('Image uploaded successfully!');
        } else {
          throw new Error('Invalid file name received from server.');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      setUploadSuccess('Failed to upload image.');
    }
  };

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
      setSuccessMessage('Movie added successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error adding movie:', error.message);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bg_img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Movie</h2>

        {/* Image Upload Form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Upload Image</h3>
          {uploadSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md border border-green-200">
              {uploadSuccess}
            </div>
          )}
          <form onSubmit={handleUploadImage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Choose an Image:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Image
            </button>
          </form>
        </div>

        {/* Movie Addition Form */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Add Movie Details</h3>
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md border border-green-200">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleAddMovie} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title:</label>
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
              <label className="block text-sm font-medium text-gray-700">Overview:</label>
              <textarea
                type="text"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Genres:</label>
              <input
                type="text"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Production Companies:</label>
              <input
                type="text"
                value={productionCompanies}
                onChange={(e) => setProductionCompanies(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Release Date:</label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Revenue:</label>
              <input
                type="number"
                step="0.01"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Vote Average:</label>
              <input
                type="number"
                step="0.1"
                value={voteAverage}
                onChange={(e) => setVoteAverage(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Runtime (minutes):</label>
              <input
                type="number"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image Name:</label>
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
              Add Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;
