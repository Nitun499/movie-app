import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddtoFavourites from './Components/AddtoFavourites';
import RemovefromFavourites from './Components/RemovefromFavourites';


function App() {
  const [moviedata,setMovieData]= useState([])
  const [searchValue,setSearchValue]= useState("")
  const [favourites, setFavourites] = useState([]);

  const getMovieData =async (searchValue)=>{
    const url =`https://www.omdbapi.com/?s=${searchValue}&apikey=bf0b386a`
    const response = await fetch(url);
    const responjson = await response.json();
    if(responjson.Search){
      console.log(responjson.Search.length)
      setMovieData(responjson.Search)
    }
  }

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('favmovies')
		);

		setFavourites(movieFavourites);
	}, []);


  const setfavouriteslocal = (item)=>{
    localStorage.setItem('favmovies',JSON.stringify(item));
  }
  
  const addFavouriteMovies =(movie)=>{
    console.log('Add to favourite clicked')
    const newFavouriteMovies = [...favourites,movie]
    setFavourites(newFavouriteMovies)
    setfavouriteslocal(newFavouriteMovies);
  }

  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
    setfavouriteslocal(newFavouriteList);
	};
  useEffect(()=>{
    getMovieData(searchValue)
  },[searchValue])

 
  return (
    
    <div className="main-section container movie-app">
      <div className='row d-flex align-items-center  mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
      <div className="row d-flex align-items-center justify-content-center ">
          <MovieList movies={moviedata} 
          favouriteComponent={AddtoFavourites}
          handleFavouriteClick ={addFavouriteMovies}
          />
      </div>
      <div className='row d-flex align-items-center  mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
      <div className='row'>
				<MovieList movies={favourites} handleFavouriteClick={removeFavouriteMovie} favouriteComponent={RemovefromFavourites} />
			</div>































































      
      
    </div>
  );
}

export default App;
