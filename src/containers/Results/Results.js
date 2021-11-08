import classes from './Results.module.css'
import Movie from '../../components/movie/Movie'
import React, {Fragment, useState} from 'react'
const Results = (props) => {
    let movies = ''
    try {
         movies = props.movies.map((movie) => <Movie nominate={props.nominate} data={movie} key={movie.imdbID}/>)
    }
    catch {
         movies = props.movies
    }
    
    return(
        <Fragment>
            {<div class={classes.results}>
                {movies}
            </div>}
        </Fragment>
    )
}
export default Results