import gameLogic from './gameLogic';
import { fetchPokemon } from './pokemonApi';

const pokemonContainer = document.querySelector('.js_pokemon_container') as HTMLElement;
const playInterface = document.querySelector('.js_play_interface') as HTMLElement;
const body = document.body as HTMLBodyElement;
const themeButton = document.querySelector('.js_theme_mode') as HTMLButtonElement;
const savedTheme = sessionStorage.getItem('theme');

// Helper function
export const switchSection = (to: 'pokemon' | 'play') => {
  if (to === 'play') {
    pokemonContainer.style.display = 'none';
    playInterface.style.display = 'block';
  } else {
    pokemonContainer.style.display = 'block';
    playInterface.style.display = 'none';
  }
  localStorage.setItem('activeSection', to);
};

document.addEventListener('DOMContentLoaded', () => {
  if (savedTheme === 'dark') {
    body.classList.add('dark_mode');
    themeButton.textContent = 'Light Mode';
  } else {
    body.classList.remove('dark_mode');
    themeButton.textContent = 'Dark Mode';
  }
  // Render HTML (View)
  pokemonContainer.innerHTML = `
    <h1>Choose Your Pokémon</h1>
    <div class="pokemon-grid">
      <div class="pokemon-card" data-name="pikachu">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
        />
        <div class="pokemon-name">Pikachu</div>
      </div>
      <div class="pokemon-card" data-name="charmander">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
          alt="Charmander"
        />
        <div class="pokemon-name">Charmander</div>
      </div>
      <div class="pokemon-card" data-name="bulbasaur">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
          alt="Bulbasaur"
        />
        <div class="pokemon-name">Bulbasaur</div>
      </div>
      <div class="pokemon-card" data-name="squirtle">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
          alt="Squirtle"
        />
        <div class="pokemon-name">Squirtle</div>
      </div>
      <div class="pokemon-card" data-name="eevee">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
          alt="Eevee"
        />
        <div class="pokemon-name">Eevee</div>
      </div>
      <div class="pokemon-card" data-name="jigglypuff">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png"
          alt="Jigglypuff"
        />
        <div class="pokemon-name">Jigglypuff</div>
      </div>
    </div>
    <div class="search_pokemon">
      <label>Can't find your Pokémon? Search for them here:</label>
      <input type="text" class="user_input js_user_input" placeholder="Type your Pokémon name here..." />
      <span class="not_found js_not_found"></span>
      <button class="js_search_pokemon">Search</button>
    </div>
  `;

  playInterface.innerHTML = `
    <button class="change_pokemon js_change_pokemon">Change Pokémon</button>
    <h2>Care for Your Pokémon</h2>
    <div class="pokemon" id="pokemon" aria-label="Cute Pokémon"></div>

      <div class="bars">
        <div class="bar">
          <label for="hunger">Hunger</label>
          <div class="progress_bar">
            <progress id="hunger" class="hunger" value="30" max="100"></progress>
            <span id="hungerValue">30%</span>
          </div>
        </div>
        <div class="bar">
          <label for="happiness">Happiness</label>
          <div class="progress_bar">
            <progress id="happiness" class="happiness" value="60" max="100"></progress>
            <span id="happinessValue">60%</span>
          </div>
        </div>
        <div class="bar">
          <label for="health">Health</label>
          <div class="progress_bar">
            <progress id="health" class="health" value="80" max="100"></progress>
            <span id="healthValue">80%</span>
          </div>
        </div>
      </div>

      <div class="actions">
        <button id="feedBtn">Feed</button>
        <button id="playBtn">Play</button>
        <button id="healBtn">Heal</button>
      </div>
  `;

  // Restore saved section
  const savedSection = localStorage.getItem('activeSection') as 'pokemon' | 'play' | null;
  switchSection(savedSection === 'play' ? 'play' : 'pokemon');

  // Theme toggle
  themeButton.addEventListener('click', () => {
    body.classList.toggle('dark_mode');

    if (body.classList.contains('dark_mode')) {
      themeButton.textContent = 'Light Mode';
      sessionStorage.setItem('theme', 'dark');
    } else {
      themeButton.textContent = 'Dark Mode';
      sessionStorage.setItem('theme', 'light');
    }
  });

  // Change Pokémon functionality
  const changePokeman = document.querySelector('.js_change_pokemon') as HTMLButtonElement;
  changePokeman.addEventListener('click', () => switchSection('pokemon'));

  // Select Pokemon by card
  document.querySelectorAll('.pokemon-card').forEach((card) => {
    card.addEventListener('click', () => {
      const pokemonName = (card as HTMLElement).dataset.name!;
      fetchPokemon(pokemonName);
      switchSection('play');
    });
  });

  // Select Pokemon manually
  const searchPokemonBtn = document.querySelector('.js_search_pokemon') as HTMLButtonElement;
  const inputElem = document.querySelector('.js_user_input') as HTMLInputElement;
  const errMsg = document.querySelector('.js_not_found') as HTMLSpanElement;

  const searchPokemon = () => {
    searchPokemonBtn.addEventListener('click', () => {
      const pokemonName = inputElem.value.trim();
      if (!pokemonName) {
        errMsg.textContent = 'Please enter a Pokémon name';
        return;
      }
      fetchPokemon(pokemonName);
    });

    inputElem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const pokemonName = inputElem.value.trim();
        if (!pokemonName) {
          errMsg.textContent = 'Please enter a Pokémon name';
          return;
        }
        fetchPokemon(pokemonName);
      }
    });
  };

  searchPokemon();

  // Clear err message when user starts typing again
  inputElem.addEventListener('input', () => {
    if (errMsg) errMsg.textContent = '';
  });

  // Get Pokemon from localStorage
  const savedPokemon = localStorage.getItem('selectedPokemon');
  if (savedPokemon) {
    const { name, image } = JSON.parse(savedPokemon);

    const renderPokemon = document.getElementById('pokemon') as HTMLElement;
    renderPokemon.innerHTML = `
    <img src="${image}" alt="An image of ${name}" />
    <p>${name.charAt(0).toUpperCase() + name.slice(1)}</p>
  `;
  }

  gameLogic();
});
