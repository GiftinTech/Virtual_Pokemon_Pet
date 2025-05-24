import { switchSection } from './main';

export const fetchPokemon = async (pokemonName: string) => {
  try {
    if (!pokemonName) throw new Error('No Pokemon name provided.');

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

    if (!response.ok) {
      const errMsg = document.querySelector('.js_not_found') as HTMLSpanElement;
      errMsg.textContent =
        'Pokémon not found. Please check the spelling or enter another Pokémon :)';
      console.log('Pokémon not found');
      return;
    }

    const data = await response.json();

    // Save to localStorage
    localStorage.setItem(
      'selectedPokemon',
      JSON.stringify({
        name: data.name,
        image: data.sprites.front_default,
      })
    );

    // Render on the page
    const renderPokemon = document.getElementById('pokemon') as HTMLElement;
    renderPokemon.innerHTML = `
     <img src="${data.sprites.front_default}" alt="An image of ${data.name}" />
     <p>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
    `;

    switchSection('play');

    console.log('jsonData:', data);
    console.log('Name:', data.name);
    console.log('Types:', data.types.map((t: any) => t.type.name).join(', '));
    console.log('Image:', data.sprites.front_default);
  } catch (err) {
    console.error('Error fetching Pokémon:', err);
  }
};
