import { useEffect, useState } from 'react';
import axios from 'axios';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [movieId, setMovieId] = useState(2); // Default to movie with ID 2

  useEffect(() => {
    const fetchMovie = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/search/${id}`);
        if (response.data) {
          setMovie(response.data);
        } else {
          setMovie(null); // Set movie to null if no data is found
        }
      } catch (error) {
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie(movieId);
  }, [movieId]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/movies/search?title=${search}`);
      if (response.data && response.data.length > 0) {
        setMovieId(response.data[0].MovieID); // Assuming the API returns an array of movies
        setError(null);
      } else {
        setError('Movie not found');
        setMovie(null); // Clear movie data when not found
      }
      setLoading(true);
    } catch (error) {
      setError('Error searching movie');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${movie ? `/public/${movie.Img_Name}` : ''})` }}>
      <header className="bg-gray-900 bg-opacity-80 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bebas-neue">PHIM CON KHỉ</h1>
          <form onSubmit={handleSearch} className="relative w-1/2 md:w-1/3">
            <input
              type="text"
              name="search"
              placeholder="Search movies..."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M15.65 15.65A6.5 6.5 0 1115.65 8.35a6.5 6.5 0 010 7.3z"></path>
            </svg>
          </form>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent">
        <div className="relative w-full max-w-6xl mx-auto bg-gray-800 bg-opacity-90 rounded-3xl shadow-3xl overflow-hidden">
          {loading ? (
            <p className="text-center text-white text-2xl animate-pulse">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-400 text-2xl">{error}</p>
          ) : movie ? (
            <div className="flex flex-col md:flex-row w-full">
              <div className="relative w-full md:w-1/2 lg:w-1/3 h-full flex items-center justify-center p-4">
                <img
                  src={`/public/${movie.Img_Name}`} 
                  alt={movie.Title || 'Movie'}
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="w-full md:w-1/2 lg:w-2/3 p-6 flex flex-col justify-between text-white">
                <div>
                  <h1 className="text-5xl md:text-6xl font-bebas-neue mb-4 leading-tight">{movie.Title}</h1>
                  <p className="text-green-400 text-2xl md:text-3xl mb-4 font-bebas-neue"><strong>Tagline:</strong> {movie.Tagline}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Overview:</strong> {movie.OverView}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Genres:</strong> {movie.Genres}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Production Companies:</strong> {movie.ProductionCompanies}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Release Date:</strong> {new Date(movie.ReleaseDate).toLocaleDateString()}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Revenue:</strong> <span className="text-yellow-400 font-bold">{formatCurrency(movie.Revenue)}</span></p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Vote Average:</strong> {movie.Vote_Average}</p>
                  <p className="text-xl md:text-2xl mt-4 font-bebas-neue"><strong>Runtime:</strong> {movie.Runtime} minutes</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-white text-2xl">No movie details available.</p>
          )}
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-2 border-t border-gray-700">
        <div className="container mx-auto text-center">
          <p className="text-base font-medium mb-1">Hưng</p>
          <p className="text-sm mb-2">Contact: vokhanhhung03@gmail.com</p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/error404-brain" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 transition-colors duration-300">
              GitHub
            </a>
            <a href="https://www.instagram.com/_error404brainnotfound_/" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 transition-colors duration-300">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MovieDetail;
