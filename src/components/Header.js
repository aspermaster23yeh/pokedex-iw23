import React from "react";

function Header({ onTypeSelect }) {
  const types = [
    "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"
  ];

  return (
    <header>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <button className="btn btn-header" id="ver-todos" onClick={() => onTypeSelect(null)}>Ver todos</button>
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