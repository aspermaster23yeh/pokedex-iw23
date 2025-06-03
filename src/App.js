import React, { useState, useEffect, useRef } from 'react';
import './styles/main.css';
import Header from './components/Header';
import Login from './components/Login';
import PokemonCard from './components/PokemonCard';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const audioRef = useRef(null);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) return;
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
    }, [isAuthenticated]);

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

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setMuted(audioRef.current.muted);
        }
    };

    // El audio y el botón de mute están siempre presentes
    return (
        <div className={`app-container ${selectedType || ''}`}>
            <audio
                ref={audioRef}
                src={require('./img/musicpoke.mp3')}
                autoPlay
                loop
            />
            <button
                onClick={toggleMute}
                style={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    zIndex: 20,
                    background: 'rgba(255,255,255,0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    fontSize: 22,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
                aria-label={muted ? "Activar sonido" : "Silenciar"}
            >
                {muted ? '🔇' : '🔊'}
            </button>
            {!isAuthenticated ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
            ) : (
                <>
                    <Header onTypeSelect={handleTypeSelect} />
                    <main>
                        <div className="pokemon-todos">
                            {filteredPokemons.map((poke) => (
                                <PokemonCard key={poke.id} poke={poke} />
                            ))}
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

export default App;