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
    let inner = '';
    for (let i = 0; i < this.game.numCardsPorSet; i++) {
      inner += '<button></button>';
    }
    this.section.querySelector('#deck').innerHTML = inner;
  }

  clearButton() {
    let btns = this.section.querySelectorAll('#deck button');
    btns.forEach((btn, index) => {
      btn.removeEventListener('click', this.listeners[index]);
    });
    this.listeners = [];
  }

  botoesSeletores() {
    //inicializar no index.js
    let btnRodadas = document.getElementById('numRodadas');
    btnRodadas.addEventListener('change', () => {
      let optRodadas = btnRodadas.options[btnRodadas.selectedIndex].value;
      this.game.rodadas = optRodadas;
      this.game.vidas = optRodadas / 5;
    });

    let btnLevel = document.getElementById('level');
    btnLevel.addEventListener('change', () => {
      let optLevel = btnLevel.options[btnLevel.selectedIndex].value;
      this.game.optionLevel = optLevel;
      //incluido na classe Flascard!!!!!!!!!!!
      this.game.atualizaLevelArray();
    });
  }

  renderDeck() {
    // Mostra o Ideograma
    this.section.querySelector('#main-card').textContent =
      this.game.mainCard.kanji;

    let btns = this.section.querySelectorAll('#deck button');

    this.clearButton();

    //console.table(this.game.sorteadosArr);

    this.game.sorteadosArr.forEach((card, index) => {
      let cartao = btns[index];

      let meaningSpan = '';

      card.meanings.forEach(
        (meaning) => (meaningSpan += `<span class="meaning">${meaning}</span>`)
      );

      let readingSpan = '';
      card.readings_kun.forEach(
        (reading) => (readingSpan += `<span class="reading">${reading}</span>`)
      );

      cartao.innerHTML = `<div>${meaningSpan}</div><div>${readingSpan}</div>`;

      let listener = () => {
        if (card === this.game.mainCard) {
          this.game.acertos++;
        } else {
          this.game.erros++;
          this.game.vidas--;
        }
        this.renderPainel();
        // INSERIR PAUSA PARA MOSTRAR SE ACERTOU OU ERROU
        this.renderNext();
      };

      this.listeners.push(listener);

      cartao.addEventListener('click', listener);
    });
  }
  renderPainel() {
    let infor = this.section.querySelector('#painel');
    let { optionLevel, levelArr, acertos, erros, rodadas, vidas } = this.game;

    let quadroInformacoes = `<div>Nível atual: ${optionLevel} / contém ${
      levelArr.length
    } ideogramas</div>
      <div>Rodada ${acertos + erros + 1} de ${rodadas} </div>
       <div>Acertos: ${acertos} / Erros: ${erros} / vidas ${vidas}</div>`;
    infor.innerHTML = quadroInformacoes;
  }
  renderNext() {
    console.log(this.game.acertos + this.game.erros + 1 < this.game.rodadas);
    if (
      this.game.acertos + this.game.erros < this.game.rodadas &&
      this.game.vidas > 0
    ) {
      this.game.randomDeck();
      this.renderDeck();
    } else this.clearButton();
  }
}

export default RenderHTML;
