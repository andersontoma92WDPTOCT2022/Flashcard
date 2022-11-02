import FlashCard from "./FlashCards.js";
import RenderHTML from "./RenderHTML.js";

const jogo = document.getElementById("jogo");
const navBar = document.getElementById("navId");
const kanji = document.getElementById("kanji");
const formulario = document.getElementById("formulario");
const reinicio = document.getElementById("reinicio");
const speaker = document.getElementById("speaker");

const game = new FlashCard();
const render = new RenderHTML(game, jogo);

reinicio.addEventListener("click", () => {
  jogo.classList.toggle("d-none");
  navBar.classList.toggle("d-none");
});

speaker.addEventListener("click", () => {
  const utter = new SpeechSynthesisUtterance(kanji.textContent);
  utter.lang = "ja-JP";
  speechSynthesis.speak(utter);
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  // obtém inputs do formulário
  const data = Object.fromEntries(new FormData(formulario).entries());
  game.setRodadas(Number(data.rodadas));
  game.setLevel(data.level);

  render.init(); // inicia o jogo

  navBar.classList.toggle("animate__backOutRight", true);
  navBar.addEventListener(
    "animationend",
    () => {
      navBar.classList.toggle("d-none", true); // remove o formulário
      navBar.classList.toggle("animate__backOutRight");
    },
    { once: true }
  );

  jogo.classList.toggle("d-none"); // mostra o jogo
  jogo.classList.toggle("animate__fadeInLeft", true);
  jogo.addEventListener(
    "animationend",
    () => jogo.classList.toggle("animate__fadeInLeft"),
    { once: true }
  );
});

/* (function (level, rodadas) {
  let data = { level, rodadas };
  game.setRodadas(Number(data.rodadas));
  game.setLevel(data.level);

  // inicia o jogo
  render.init();

  // remove o formulário
  navBar.classList.toggle("d-none", true);

  // mostra o jogo e o painel
  flashcards.classList.toggle("d-none", false);
  painel.classList.toggle("d-none", false);
})(1, 10); */
