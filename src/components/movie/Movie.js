import classes from './Movie.module.css'
import React from 'react'

const Movie = (props) => {
    const genres = props.data.Genre.split(', ').splice(0,3)
    return (
        <div className={classes.movie} style={{backgroundImage: `url(${props.data.Poster})`}} key={props.data.imdbID}>
            
            <div className={classes.info}>
            
                <ul className= {classes.genres}>
                    {genres.map(genre => <li className={classes.genre}>{genre}</li>)}
                </ul>
            
            <button className={classes.nominateBtn} onClick={() => props.nominate(props.data)} >Nominate</button>
                <div className={classes.rate}>
                    <div className={[classes.btn, classes.rating].join(' ')} >Rating:<i className="fas fa-star" style={{color: 'yellow'}}></i>{props.data.imdbRating}</div>
                    <div className= {[classes.btn, classes.age].join(' ')}>{props.data.Rated}</div>
                </div>
            </div>
            <div className={classes.movieTitle}>
                <h4>{props.data.Title} - ${props.data.Year}</h4>
            </div>
        </div>
    )
}

export default Movie