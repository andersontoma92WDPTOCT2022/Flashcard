// import jouYou from '../assets/kanji_compilado.json' assert { type: 'json' };

class FlashCard {
  constructor() {
    this.optionLevel = "1";
    this.rodadas = 10;
    this.numCardsPorSet = 4; //5 kanjis de cada vez. evitar Mock
    this.erros = 0;
    this.acertos = 0;
    this.levelArr = jouYou[this.optionLevel];
    this.mainCard = null; //não incializado ainda, sorteio da carta principal
    this.sorteadosArr = []; //os 5 cartões sorteads
    this.vidas = 2;
  }

  setLevel(level) {
    this.optionLevel = level;
    this.levelArr = jouYou[level];
  }

  setRodadas(rodadas) {
    this.rodadas = rodadas;
    this.vidas = rodadas / 5;
  }

  getRandom(max) {
    return Math.floor(max * Math.random());
  }

  randomDeck() {
    // conjunto de 5 kanji's aleatorios de 1 rodada
    let sorteados = [];

    while (sorteados.length < this.numCardsPorSet) {
      let numSorteado = this.getRandom(this.levelArr.length);
      let card = this.levelArr[numSorteado];

      if (
        !sorteados.some(({ kanji }) => kanji === card.kanji) &&
        card.readings_kun.length !== 0
      ) {
        let copy = { ...card };
        copy.meanings = copy.meanings.slice(0, 3);
        copy.readings_kun = copy.readings_kun.slice(0, 3);
        sorteados.push(copy);
      }
    }

    // seleciona uma carta
    let random = this.getRandom(this.numCardsPorSet);
    this.mainCard = sorteados[random];

    this.sorteadosArr = sorteados;
    //console.log(sorteados);
  }

  resetFlashcards() {
    this.erros = 0;
    this.acertos = 0;
  }
}

// export default FlashCard;
