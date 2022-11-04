// import FlashCard from "./FlashCards.js";
// import RenderHTML from "./RenderHTML.js";

const jogo = document.getElementById("jogo");
const navBar = document.getElementById("navId");
const kanji = document.getElementById("kanji");
const formulario = document.getElementById("formulario");
const startBtn = document.getElementById("startBtn");
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

startBtn.addEventListener("click", () => {
  // obtém inputs do formulário
  const data = Array.from(formulario.querySelectorAll("select")).reduce(
    (acc, select) => {
      acc[select.name] = select.value;
      return acc;
    },
    {}
  );
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
