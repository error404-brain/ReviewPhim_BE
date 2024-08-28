import { useEffect, useState } from 'react';
import { fetchMovieById, searchMovieByTitle } from './Api'; // Import các hàm API
import useStore from './store/useStore'; // Import Zustand store

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [movieId, setMovieId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  
  const { movies, setMovies, addMovie } = useStore((state) => ({
    movies: state.movies,
    setMovies: state.setMovies,
    addMovie: state.addMovie,
  }));

  useEffect(() => {
    // Lấy phim từ local storage khi ứng dụng khởi động
    const latestMovie = movies[movies.length - 1];
    if (latestMovie) {
      setMovie(latestMovie);
    }
  }, [movies]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        if (movieId) {
          const movieData = await fetchMovieById(movieId);
          setMovie(movieData);
          // Lưu phim vào local storage
          if (movieData) {
            addMovie(movieData);
          }
        }
      } catch (error) {
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [movieId]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const movies = await searchMovieByTitle(search);
      if (movies && movies.length > 0) {
        setSuggestions(movies); // Hiển thị danh sách gợi ý
        setError(null);
      } else {
        setError('No movies found');
        setSuggestions([]);
      }
      setLoading(true);
    } catch (error) {
      setError('Error searching movie');
    }
  };

  const handleSelectMovie = async (id) => {
    setMovieId(id);
    setSearch('');
    setSuggestions([]);
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
          <h1 className="text-white text-3xl font-bebas-neue">PHIM CON KHi</h1>
          <form onSubmit={handleSearch} className="relative w-1/2 md:w-1/3">
            <input
              type="text"
              name="search"
              placeholder="Search movies..."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e); // Tìm kiếm khi người dùng nhập
              }}
            />
            <svg className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M15.65 15.65A6.5 6.5 0 1115.65 8.35a6.5 6.5 0 010 7.3z"></path>
            </svg>
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-gray-700 border border-gray-600 rounded-lg mt-1 z-10">
                {suggestions.map(movie => (
                  <li 
                    key={movie.MovieID} 
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleSelectMovie(movie.MovieID)}
                  >
                    {movie.Title}
                  </li>
                ))}
              </ul>
            )}
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
                  <p className="text-green-400 text-2xl md:text-3xl mb-4 font-bebas-neue"><strong>Tagline :</strong> {movie.Tagline}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Overview :</strong> {movie.OverView}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Genres :</strong> {movie.Genres}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Production Companies :</strong> {movie.ProductionCompanies}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Release Date :</strong> {new Date(movie.ReleaseDate).toLocaleDateString()}</p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Revenue :</strong> <span className="text-yellow-400 font-bold">{formatCurrency(movie.Revenue)}</span></p>
                  <p className="text-xl md:text-2xl mb-4 font-bebas-neue"><strong>Vote Average :</strong> {movie.Vote_Average}</p>
                  <p className="text-xl md:text-2xl mt-4 font-bebas-neue"><strong>Runtime :</strong> {movie.Runtime} minutes</p>
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
