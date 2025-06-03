import React, { useState } from "react";

// Lista de tipos de Pokémon
const types = [
  "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"
];

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

  const handleAdd = (e) => {
    e.preventDefault();
    if (!pokemon.trim() || !cantidad) return;
    setRegistros([...registros, { pokemon, type, cantidad }]);
    setPokemon("");
    setType(types[0]);
    setCantidad(1);
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
    <div
      style={{
        minHeight: "100vh",
        background: "#D93E30",
        padding: 32,
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Imagen de fondo */}
      <img
        src={require('../img/rocket.png')}
        alt="Rocket"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "400px",
          height: "auto",
          transform: "translate(-50%, -50%)",
          opacity: 0.35,
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none"
        }}
      />
      <h2 style={{ position: "relative", zIndex: 1 }}>CRUD de Pokémon</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 24, display: "flex", gap: 12, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <input
          type="text"
          placeholder="Nombre del Pokémon"
          value={pokemon}
          onChange={e => setPokemon(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "none", minWidth: 160 }}
          required
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "none" }}
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
          style={{ padding: 8, borderRadius: 4, border: "none", width: 80 }}
          required
        />
        <button type="submit" style={{
          padding: "8px 16px",
          borderRadius: 4,
          border: "none",
          background: "#F5DB13",
          color: "#212121",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Registrar
        </button>
      </form>
      <button
        onClick={handleDownload}
        style={{
          marginBottom: 16,
          padding: "8px 16px",
          borderRadius: 4,
          border: "none",
          background: "#F5DB13",
          color: "#212121",
          fontWeight: "bold",
          cursor: "pointer",
          position: "relative",
          zIndex: 1
        }}
        disabled={registros.length === 0}
      >
        Descargar archivo de texto
      </button>
      <div style={{ width: "100%", borderRadius: 8, overflow: "hidden", position: "relative", zIndex: 1 }}>
        <table style={{
          width: "100%",
          background: "rgba(255,255,255,0.65)",
          color: "#212121",
          borderRadius: 8,
          backdropFilter: "blur(2px)"
        }}>
          <thead>
            <tr>
              <th style={{ padding: 8 }}>Pokémon</th>
              <th style={{ padding: 8 }}>Tipo</th>
              <th style={{ padding: 8 }}>Cantidad</th>
              <th style={{ padding: 8 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r, idx) => (
              <tr key={idx}>
                <td style={{ padding: 8 }}>{r.pokemon}</td>
                <td style={{ padding: 8 }}>{r.type}</td>
                <td style={{ padding: 8 }}>{r.cantidad}</td>
                <td style={{ padding: 8 }}>
                  <button
                    onClick={() => handleDelete(idx)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 4,
                      border: "none",
                      background: "#D93E30",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {registros.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 16, color: "#D93E30" }}>
                  No hay registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudPage;