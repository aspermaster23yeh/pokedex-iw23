import React from 'react';

const PokemonCard = ({ poke }) => {
    const tipos = poke.types.map((type) => (
        <p className={`${type.type.name} tipo`} key={type.type.name}>{type.type.name}</p>
    ));

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) pokeId = "00" + pokeId;
    else if (pokeId.length === 2) pokeId = "0" + pokeId;

    return (
        <div className="pokemon">
            <p className="pokemon-id-back">#{pokeId}</p>
            <div className="pokemon-imagen">
                <img src={poke.sprites.other['official-artwork'].front_default} alt={poke.name} />
            </div>
            <div className="pokemon-info">
                <div className="nombre-contenedor">
                    <p className="pokemon-id">#{pokeId}</p>
                    <h2 className="pokemon-nombre">{poke.name}</h2>
                </div>
                <div className="pokemon-tipos">{tipos}</div>
                <div className="pokemon-stats">
                    <p className="stat">{poke.height}m</p>
                    <p className="stat">{poke.weight}kg</p>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
