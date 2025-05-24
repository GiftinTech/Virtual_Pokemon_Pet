export const fetchPokemon = async () => {
  try {
    const inputElem = document.querySelector('.js_user_input') as HTMLInputElement;
    const pokemonName = inputElem.value.trim();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

    if (!response.ok) throw new Error('Pokémon not found.');

    const data = await response.json();

    console.log('jsonData:', data);
    console.log('Name:', data.name);
    console.log('Types:', data.types.map((t: any) => t.type.name).join(', '));
    console.log('Image:', data.sprites.front_default);
  } catch (err) {
    console.error('Error fetching Pokémon:', err);
  }
};
