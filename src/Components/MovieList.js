import React from 'react'
import AddtoFavourites from './AddtoFavourites'

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent
  return <>
    {props.movies.map((movie, index) => (
        <div className='col-md-3 image-container d-flex  justify-content-center m-3 shadow-lg p-3 mb-5 bg-white rounded' 
        onClick={() => props.handleFavouriteClick(movie)} 
        >
            <img src={movie.Poster} alt='movie'></img>
            <div className='overlay d-flex align-items-center justify-content-center'>
						<FavouriteComponent />
			</div>
        </div>
	))}
    </>
}

export default MovieList
