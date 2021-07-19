import React from 'react';
import {Link} from 'react-router-dom'
export default function SavedList(props) {
  {console.log(`inside saved list ${props.list}`)}
  return (

    <div className="saved-list">

      <h3>Saved Movies:</h3>
      {props.list.map(movie => (
        <span key={movie} className="saved-movie">{movie.title}</span>
      ))}
      <Link to= '/'>
      <div className="home-button">Home</div>
      </Link>
    </div>
  );
}
