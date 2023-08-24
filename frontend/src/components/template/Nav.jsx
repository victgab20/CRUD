import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'

export default props =>
    <aside className="menu-area">
       <nav className="menu">
           <Link to="/">
                <i className="fa fa-home">Inicio</i>
            </Link>
            <Link to="/user">
                <i className="fa fa-user">Usuarios</i>
            </Link>
       </nav>
    </aside>