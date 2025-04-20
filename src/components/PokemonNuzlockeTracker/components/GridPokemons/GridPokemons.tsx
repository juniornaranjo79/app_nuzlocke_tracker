import React, { useState, useEffect } from "react";
import { Info, Result } from "../../../../interface/type";
import CardPokemon from "../CardPokemon/CardPokemon.tsx";
import Pagination from "../../../Pagination/Pagination.tsx";

interface Props {
  searchPokemon: string;
}

const GridPokemons = ({ searchPokemon }: Props) => {
  const [pokemonList, setPokemonList] = useState<Result[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Result[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=1302`
        );
        const data: Info = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (searchPokemon) {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
      );
      console.log(filtered);
      setFilteredPokemon(filtered);
      setCurrentPage(1);
    } else {
      setFilteredPokemon(pokemonList);
    }
  }, [searchPokemon, pokemonList]);

  const paginatedPokemons = filteredPokemon.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  console.log("paginatedPokemons", paginatedPokemons);

  return (
    <div>
      <div className="gridPokemons">
        {paginatedPokemons.map((pokemon) => (
          <div key={pokemon.name}>
            <CardPokemon
              url={pokemon.url}
              /* sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url
                .split("/")
                .slice(-2, -1)}.png`} */
            />
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPokemon.length}
          itemsPerPage={limit}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default GridPokemons;
