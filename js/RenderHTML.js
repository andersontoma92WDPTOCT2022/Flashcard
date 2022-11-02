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
        '<div class="col-5 mx-auto mb-3 p-3 btn rounded shadow text-bg-light"></div>';
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
    // Mostra o Ideograma
    this.section.querySelector("#kanji").textContent = this.game.mainCard.kanji;

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
        } else {
          this.game.erros++;
        }
        this.renderPainel();
        // INSERIR PAUSA PARA MOSTRAR SE ACERTOU OU ERROU
        this.renderNext();
      };

      this.listeners.push(listener);

      cartao.addEventListener("click", listener);
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
    console.log(this.game.acertos + this.game.erros + 1 < this.game.rodadas);
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
