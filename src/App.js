import React, {useState} from 'react'
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Results from './containers/Results/Results'
import classes from './App.module.css';
import Movie from './components/movie/Movie'
import Nominations from './components/Nominations/Nominations'

function App() {
  const [search, setSearch] = useState(null)
  const [results, setResults] = useState('')
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(null)
  const [nominated, setNominated] = useState([])
  const changeHandler = (e) => {
    setSearch(e.target.value)
  }
  

  const getMovies = async (e) => {
    e.preventDefault()
    setPage(1)
    console.log(typeof(results))
    if (search == null || !search.trim()){
        setResults(`Please Enter a movie keyword in the search box `)
        return
    }
    const res = await fetch(`https://www.omdbapi.com/?apikey=1a241340&s=${search}&type=movie&page=${page}`)
    const data =  await res.json()
    if (data.Response === 'False'){
        setResults(`There are no results for search ${search}`)
    }
    else { 
      //displayMovies(data.Search, Number(data.totalResults))
      const moviesList = []
      for (let movie of data.Search){
        const res = await fetch(`https://www.omdbapi.com/?apikey=1a241340&i=${movie.imdbID}`)
        const data = await res.json()
        moviesList.push(data)
      }
      setResults(moviesList)
      setTotalResults(Number(data.totalResults))
    }
  }

  const getPrev = async () => {
    setPage(prevPage => {
      return prevPage-= 1
    })
  const res = await fetch(`https://www.omdbapi.com/?apikey=1a241340&s=${search}&type=movie&page=${page}`)
  const data =  await res.json()
    const moviesList = []
    for (let movie of data.Search){
      const res = await fetch(`https://www.omdbapi.com/?apikey=1a241340&i=${movie.imdbID}`)
      const data = await res.json()
      moviesList.push(data)
    }
    setResults(moviesList)
    setTotalResults(Number(data.totalResults))
}

const getNext = async () => {
  setPage(prevPage => {
    return prevPage+= 1
  })
const res = await fetch(`https://www.omdbapi.com/?apikey=1a241340&s=${search}&type=movie&page=${page}`)
const data =  await res.json()
  const moviesList = []
  for (let movie of data.Search){
    const res = await fetch(`https://www.omdbapi.com/?apikey=1a241340&i=${movie.imdbID}`)
    const data = await res.json()
    moviesList.push(data)
  }
  setResults(moviesList)
  setTotalResults(Number(data.totalResults))
}
const nominateMovie = (data) => {
  setNominated(prevState => {
    let newState = [...prevState]
    newState.push(<Movie nominate={nominateMovie} data={data} key={data.imdbID}/>)
    return newState
  })
  console.log(nominated)
}
  
  return (
      <div className={classes.App}>
        <Route path='/'>
          <Nav changeHandler={changeHandler} submit={getMovies}/>
        </Route>
        <Route path='/' exact>
        <Results search={search} movies={results} nominate={nominateMovie}/>
        <div className={classes.more}>
          {page > 1 && <button className={classes.btn} onClick={getPrev} >Prev</button>}
          {totalResults >= (page * 10) && <button className={classes.btn} onClick={getNext} >Next</button>}
        </div>
        </Route>
        <Route path='/nominations'>
         <Nominations movies={nominated}/>
        </Route>
      </div>
  );
}

export default App;
