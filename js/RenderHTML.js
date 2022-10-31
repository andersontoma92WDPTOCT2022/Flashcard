class RenderHTML {
  constructor(game, section) {
    this.game = game;
    this.section = section;
    this.listeners = [];
  }
  init() {
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

      cartao.innerHTML = `<div>${meaningSpan}</div><div>${card.readings_kun}</div>`;

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
    if (this.game.acertos + this.game.erros + 1 < this.game.rodadas) {
      this.game.randomDeck();
      this.renderDeck();
    } else this.clearButton();
  }
}

export default RenderHTML;
