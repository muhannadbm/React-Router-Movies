import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);




  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    console.log(`your id is${id}`)
    console.log(`saved inside click is ${saved}`)
    setSaved([id])
    console.log(`inside click saved is ${saved}`)
  };

  return (
    <div>
      <SavedList  list={saved} />

      <div>
        <Switch>
        <Route path='/movies/:id'>
        <Movie add={addToSavedList}></Movie>
        </Route>
        <Route path='/'>
        <MovieList movies={movieList}/>
        </Route>
        </Switch>
        </div>
    </div>
  );
}
