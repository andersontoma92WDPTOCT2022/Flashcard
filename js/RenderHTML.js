class RenderHTML {
  constructor(game, section) {
    this.game = game;
    this.section = section;
    this.listeners = [];
  }
  init() {
    this.game.resetFlashcards();
    this.game.randomDeck();
    this.renderButtons();
    this.renderDeck();
    this.renderPainel();
  }
  renderButtons() {
    let inner = "";
    for (let i = 0; i < this.game.numCardsPorSet; i++) {
      inner +=
        '<div class="col-5 mx-auto mb-3 p-3 btn rounded shadow text-bg-light animate__animated"></div>';
    }
    this.section.querySelector("#deck").innerHTML = inner;
  }

  clearButton() {
    let btns = this.section.querySelectorAll("#deck > div");
    btns.forEach((btn, index) => {
      btn.removeEventListener("click", this.listeners[index]);
    });
    this.listeners = [];
  }

  renderDeck() {
    const ideograma = this.section.querySelector("#kanji");
    const deck = this.section.querySelector("#deck");
    // Mostra o Ideograma
    ideograma.textContent = this.game.mainCard.kanji;

    let btns = this.section.querySelectorAll("#deck > div");

    this.clearButton();

    //console.table(this.game.sorteadosArr);

    this.game.sorteadosArr.forEach((card, index) => {
      let cartao = btns[index];

      let meaningSpan = "";

      card.meanings.forEach(
        (meaning) => (meaningSpan += `<li class="meaning">${meaning}</li>`)
      );

      let readingSpan = "";
      card.readings_kun.forEach(
        (reading) =>
          (readingSpan += `<li class="reading text-muted">${reading}</li>`)
      );

      cartao.innerHTML = `
        <div class="row row-cols-2" lang="en">
          <span>Meaning </span>
          <span>Kun reading </span>
        </div>
        <hr>
        <div class="row row-cols-2">
          <ul class="list-unstyled" lang="en">
            ${meaningSpan}
          </ul>
          <ul class="list-unstyled">
            ${readingSpan}
          </ul>
        </div>`;

      let listener = () => {
        if (card === this.game.mainCard) {
          this.game.acertos++;
          cartao.classList.add("animate__bounce");
        } else {
          this.game.erros++;
          cartao.classList.add("animate__shakeX");
        }
        this.renderPainel();

        // ANIMAÇÃO PARA MOSTRAR SE ACERTOU OU ERROU
        cartao.addEventListener(
          "animationend",
          (event) => {
            event.stopImmediatePropagation();

            cartao.classList.remove("animate__shakeX", "animate__bounce");

            deck.classList.toggle("animate__zoomIn", true);
            deck.addEventListener(
              "animationend",
              (event) => {
                event.stopImmediatePropagation();

                deck.classList.toggle("animate__zoomIn");
              },
              { once: true }
            );

            this.renderNext();
          },
          { once: true }
        );
      };

      this.listeners.push(listener);

      cartao.addEventListener("click", listener, { once: true });
    });
  }
  renderPainel() {
    let { optionLevel, levelArr, acertos, erros, rodadas, vidas } = this.game;
    //
    document.getElementById("optionLevel").textContent = optionLevel;
    document.getElementById("numIdeogramas").textContent = levelArr.length;
    document.getElementById("rodada").textContent = Math.min(
      acertos + erros + 1,
      rodadas
    );
    document.getElementById("rodadas").textContent = rodadas;
    // document.getElementById("acertos").textContent = acertos;
    document.getElementById("vidas").textContent =
      "❤".repeat(vidas - erros) + "🖤".repeat(erros);
    //
  }
  renderNext() {
    if (
      this.game.acertos + this.game.erros < this.game.rodadas &&
      this.game.erros < this.game.vidas
    ) {
      this.game.randomDeck();
      this.renderDeck();
    } else {
      //<------------resultado final---------
      this.clearButton();
      document.getElementById("resultado").textContent = `vc ${
        this.game.vidas - this.game.erros === 0
          ? "perdeu, estude mais"
          : "venceu!"
      }`;
      new bootstrap.Modal(document.getElementById("staticBackdrop")).show();
    }
  }
}

export default RenderHTML;
