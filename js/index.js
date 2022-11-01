import FlashCard from "./FlashCards.js";
import RenderHTML from "./RenderHTML.js";

let incia = document.getElementById("startBtn");
const flashcards = document.getElementById("flashcards");
const navBar = document.getElementById("navId");
const painel = document.getElementById("painel");
const speaker = document.getElementById("speaker");
const formulario = document.getElementById("valores");

const game = new FlashCard();
const render = new RenderHTML(game, flashcards);

const reinicio = document.getElementById("reinicio");

// botão incializa
/*
incia.addEventListener("click", () => {
  render.init();

});
*/

reinicio.addEventListener("click", () => {
  //
  flashcards.classList.toggle("d-none");
  navBar.classList.toggle("d-none");
  painel.classList.toggle("d-none");
});
// proximo set - botão

speaker.addEventListener("click", (event) => {
  let kanji = event.target.previousElementSibling.textContent;
  const utter = new SpeechSynthesisUtterance(kanji);
  utter.lang = "ja-JP";
  speechSynthesis.speak(utter);
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const data = Object.fromEntries(new FormData(formulario).entries());
  game.setRodadas(Number(data.rodadas));
  game.setLevel(data.level);

  render.init();

  flashcards.classList.toggle("d-none", false);
  navBar.classList.toggle("d-none", true);
  painel.classList.toggle("d-none", false);
});

// render.botoesSeletores();

//
