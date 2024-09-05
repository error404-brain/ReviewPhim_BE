// src/App.js
import React from 'react';
import MovieDetail from './MovieDetail';
import AddMovieForm from './AddMovieForm';
import UpdateMovie from './UpdateMovie';
import Carousel from './carousel';
function App() {
  return (
    <div>
      <Carousel/>
      <MovieDetail />
      <AddMovieForm />
      <UpdateMovie />
    </div>
  );
}

export default App;
