import React, { useState } from 'react';
import { UpdateMovie as updateMovieAPI } from './Api'; // Import the UpdateMovie API function
import updateBG from './assets/download2.jpg';

function UpdateMovie() {
  // State variables for the form fields
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

  // Handler for form submission
  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    
    // Create a movie object with the form data
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
      // Call the API to update the movie
      await updateMovieAPI(movie);
      setSuccessMessage('Movie updated successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to update movie: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundImage: `url(${updateBG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-3xl mx-auto p-8 bg-black bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Update Movie</h2>

        {/* Success/Error Messages */}
        {successMessage && <p className="text-green-400 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-400 text-center mb-4">{errorMessage}</p>}

        {/* Update Movie Form */}
        <form className="space-y-6" onSubmit={handleUpdateMovie}>
          {/* ID */}
          <div>
            <label className="block text-sm font-semibold text-white">Movie ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setMovieId(e.target.value)}
              placeholder="Enter movie ID"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-white">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter movie title"
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
              placeholder="Enter movie tagline"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block text-sm font-semibold text-white">Overview:</label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Enter movie overview"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-semibold text-white">Genres:</label>
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              placeholder="Enter movie genres"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Production Companies */}
          <div>
            <label className="block text-sm font-semibold text-white">Production Companies:</label>
            <input
              type="text"
              value={productionCompanies}
              onChange={(e) => setProductionCompanies(e.target.value)}
              placeholder="Enter production companies"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-sm font-semibold text-white">Release Date:</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Revenue */}
          <div>
            <label className="block text-sm font-semibold text-white">Revenue:</label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="Enter revenue"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Vote Average */}
          <div>
            <label className="block text-sm font-semibold text-white">Vote Average:</label>
            <input
              type="number"
              step="0.1"
              value={voteAverage}
              onChange={(e) => setVoteAverage(e.target.value)}
              placeholder="Enter vote average"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Runtime */}
          <div>
            <label className="block text-sm font-semibold text-white">Runtime (minutes):</label>
            <input
              type="number"
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
              placeholder="Enter runtime in minutes"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image Name */}
          <div>
            <label className="block text-sm font-semibold text-white">Img Name:</label>
            <input
              type="text"
              value={imgName}
              onChange={(e) => setImgName(e.target.value)}
              placeholder="Enter image name"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Movie
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMovie;
