import React from 'react' 
import classes from './Nav.module.css'
import {Link} from 'react-router-dom'

const Nav = (props) => {
    return (
    <nav className={classes.nav}>
        <div class={classes.title}>
            <i class="fas fa-film fa-2x"></i>
            <h1>The Shoppies</h1>
        </div>
        <form id="form" type = 'submit' onSubmit={props.submit}>
            <input type="text" onChange={props.changeHandler} className={classes.search} placeholder="Enter movie keyword..."/>
            <button className={classes.searchBtn}><i className="fas fa-search"></i></button>
        </form>
        <Link to='/nominations'><button className={classes.nominations} >Nominations</button></Link>
    </nav>
    )
}

export default Nav