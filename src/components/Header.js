import React from "react";
import { useNavigate } from "react-router-dom";
import Pokeball from "../img/Pokeball.gif"; // Adjust the path as necessary

function Header({ onTypeSelect }) {
  const types = [
    "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"
  ];
  const navigate = useNavigate();

  return (
    <header>
      <div className="gif-container">
        <img src={Pokeball} alt="Pokeball" className="pokeball-gif" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <button className="btn btn-header" id="ver-todos" onClick={() => onTypeSelect(null)}>Ver todos</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-header" id="crud" onClick={() => navigate("/crud")}>CRUD</button>
          </li>
          {types.map(type => (
            <li key={type} className="nav-item">
              <button
                className={`btn btn-header ${type}`}
                id={type}
                onClick={() => onTypeSelect(type)}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;