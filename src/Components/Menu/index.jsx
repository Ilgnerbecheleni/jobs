import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineHomeRepairService } from "react-icons/md";
import { TiThMenu } from 'react-icons/ti';

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-light" to="/"><MdOutlineHomeRepairService size={32}/></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <TiThMenu color='white' />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-light" activeClassName="active" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" activeClassName="active" to="/jobs">Jobs</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link btn-outline-dark" activeClassName="active" to="/login"  style={{ color:'white' }}>Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
