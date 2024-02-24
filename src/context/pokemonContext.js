import { createContext, useState, useContext } from "react";

export const PokemonDataContext = createContext();

export const usePokemonData = () => {
  if (!PokemonDataContext) {
    throw new Error("usePokemonData must be used within a PokemonDataProvider");
  }
  return useContext(PokemonDataContext);
};

export const PokemonDataProvider = ({ children, value }) => {
  const [pokemonData, setPokemonData] = useState(value);

  return (
    <PokemonDataContext.Provider value={{ pokemonData, setPokemonData }}>
      {children}
    </PokemonDataContext.Provider>
  );
};
