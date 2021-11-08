import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import classes from './Nominations.module.css'
const Nominations = (props) => {
    console.log(props.movies)
    return(
        <Fragment>
            <Link to='/'><button className={classes.back} ><i className="fas fa-arrow-circle-left"></i>  back to search Results</button></Link>
            {<div className={classes.results}>
                {props.movies}
            </div>}
        </Fragment>
    )
}

export default Nominations