import React, { useState, useEffect } from 'react';
import './styles/main.css';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            const fetchedPokemons = [];
            for (let i = 1; i <= 151; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const data = await response.json();
                fetchedPokemons.push(data);
            }
            setPokemons(fetchedPokemons);
            setFilteredPokemons(fetchedPokemons); // Mostrar todos inicialmente
        };
        fetchPokemons();
    }, []);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        if (type) {
            setFilteredPokemons(
                pokemons.filter(pokemon =>
                    pokemon.types.some(t => t.type.name === type)
                )
            );
        } else {
            setFilteredPokemons(pokemons); // Mostrar todos si no hay tipo seleccionado
        }
    };

    return (
        <div className={`app-container ${selectedType || ''}`}>
            <Header onTypeSelect={handleTypeSelect} />
            <main>
                <div className="pokemon-todos">
                    {filteredPokemons.map((poke) => (
                        <PokemonCard key={poke.id} poke={poke} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;