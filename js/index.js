import FlashCard from './FlashCards.js';
import RenderHTML from './RenderHTML.js';

let incia = document.getElementById('startBtn');
const flashcards = document.getElementById('flashcards');
const navBar = document.getElementById('navId');
const painel = document.getElementById('painel');

const game = new FlashCard();
const render = new RenderHTML(game, flashcards);

const reinicio = document.getElementById('reinicio');

// botão incializa
incia.addEventListener('click', () => {
  render.init();
  flashcards.classList.toggle('visually-hidden', false);
  navBar.classList.toggle('d-none', true);
  painel.classList.toggle('d-none', false);
});

reinicio.addEventListener('click', () => {
  //
  flashcards.classList.toggle('visually-hidden');
  navBar.classList.toggle('d-none');
  painel.classList.toggle('d-none');
});
// proximo set - botão

render.botoesSeletores();

//
