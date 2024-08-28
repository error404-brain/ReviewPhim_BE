import create from 'zustand';

const useStore = create((set) => ({
  movies: JSON.parse(localStorage.getItem('movies')) || [], // Lấy phim từ local storage nếu có
  setMovies: (movies) => {
    set({ movies });
    localStorage.setItem('movies', JSON.stringify(movies)); // Lưu phim vào local storage
  },
  addMovie: (movie) => set((state) => {
    const updatedMovies = [...state.movies, movie];
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    return { movies: updatedMovies };
  }),
  clearMovies: () => {
    set({ movies: [] });
    localStorage.removeItem('movies');
  },
}));

export default useStore;
