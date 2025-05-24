import gameLogic from './gameLogic';
import { fetchPokemon } from './pokemonApi';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container') as HTMLElement;

  container.innerHTML = `
    <div class="pokemon" id="pokemon" aria-label="Cute Pokemon">🌱</div>
      <h1>Care for Your Pokemon</h1>

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

      <input type="text" class="user_input js_user_input" />
      <button class="js_search_pokemon">Search</button>
  `;

  const searchPokemonBtn = document.querySelector('.js_search_pokemon') as HTMLButtonElement;
  searchPokemonBtn.addEventListener('click', fetchPokemon);
  gameLogic();
});
