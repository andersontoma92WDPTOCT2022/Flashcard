import FlashCard from './FlashCards.js';
import RenderHTML from './RenderHTML.js';

const game = new FlashCard();
const render = new RenderHTML(game, document.getElementById('flashcards'));

// botão incializa
let incia = document.getElementById('startBtn');
incia.addEventListener('click', () => {
  render.init();
});

// proximo set - botão
