import React, { useState } from "react";
import rocketImage from "../img/rocket.png";
import { motion, AnimatePresence } from "framer-motion";

const types = [
  "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"
];

const typeColors = {
  fire: "bg-red-100",
  water: "bg-blue-100",
  grass: "bg-green-100",
  electric: "bg-yellow-100",
  ice: "bg-blue-200",
  rock: "bg-yellow-200",
  bug: "bg-green-200",
  normal: "bg-gray-100",
  psychic: "bg-pink-200",
  fighting: "bg-red-300",
  poison: "bg-purple-200",
  ground: "bg-yellow-300",
  flying: "bg-indigo-100",
  ghost: "bg-indigo-200",
  dark: "bg-gray-700 text-white",
  dragon: "bg-purple-300",
  steel: "bg-gray-300",
  fairy: "bg-pink-100"
};

function downloadTextFile(filename, text) {
  const element = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const CrudPage = () => {
  const [pokemon, setPokemon] = useState("");
  const [type, setType] = useState(types[0]);
  const [cantidad, setCantidad] = useState(1);
  const [registros, setRegistros] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!pokemon.trim() || !cantidad) return;
    setRegistros([...registros, { pokemon, type, cantidad }]);
    setPokemon("");
    setType(types[0]);
    setCantidad(1);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleDelete = (idx) => {
    setRegistros(registros.filter((_, i) => i !== idx));
  };

  const handleDownload = () => {
    const text = registros.map(r =>
      `Pokémon: ${r.pokemon}, Tipo: ${r.type}, Cantidad: ${r.cantidad}`
    ).join('\n');
    downloadTextFile("pokemons.txt", text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-red-600 text-white relative overflow-hidden p-8">
      <img
        src={rocketImage}
        alt="Rocket"
        className="absolute top-1/2 left-1/2 w-[400px] opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      
      <h2 className="text-4xl font-bold mb-8 relative z-10 drop-shadow-lg">CRUD de Pokémon</h2>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md mb-4 w-fit relative z-10"
          >
            Pokémon registrado exitosamente
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleAdd}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg backdrop-blur-md relative z-10"
      >
        <input
          type="text"
          placeholder="Nombre del Pokémon"
          value={pokemon}
          onChange={e => setPokemon(e.target.value)}
          className="px-4 py-2 rounded text-black flex-1 min-w-[160px]"
          required
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="px-4 py-2 rounded text-black"
        >
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={e => setCantidad(Number(e.target.value))}
          className="px-4 py-2 rounded text-black w-20"
          required
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          Registrar
        </button>
      </motion.form>

      <button
        onClick={handleDownload}
        className="mb-4 bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300 relative z-10 disabled:opacity-50 transition"
        disabled={registros.length === 0}
      >
        Descargar archivo de texto
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto bg-white bg-opacity-60 backdrop-blur rounded-lg relative z-10 shadow-md"
      >
        <table className="w-full text-black text-sm">
          <thead className="bg-white bg-opacity-60 text-black font-semibold">
            <tr>
              <th className="p-2 text-left">Pokémon</th>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2 text-left">Cantidad</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.length > 0 ? (
              registros.map((r, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`transition duration-200 ease-in-out ${typeColors[r.type] || "bg-white bg-opacity-30"}`}
                >
                  <td className="p-2">{r.pokemon}</td>
                  <td className="p-2 capitalize">{r.type}</td>
                  <td className="p-2">{r.cantidad}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(idx)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1 transition"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-red-600 font-semibold">
                  No hay registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default CrudPage;
