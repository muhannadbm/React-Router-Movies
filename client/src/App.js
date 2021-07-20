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

  useEffect(()=> {

  },[saved])


  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    let myitem = movieList.find(item => item.id == id)
    let newarr = [...saved]
    newarr.push(myitem)
    setSaved(newarr)
    console.log(`inside click saved is ${saved}`)
  };

  return (
    <div>
      <SavedList  list={saved} />
      {console.log(`inside template${saved}`)}
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
