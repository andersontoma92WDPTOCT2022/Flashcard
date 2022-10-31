import jouYou from '../assets/kanji_compilado.json' assert { type: 'json' };

export default class FlashCard {
  constructor() {
    this.optionLevel = '1';
    this.rodadas = 10;
    this.numCardsPorSet = 5; //5 kanjis de cada vez. evitar Mock
    this.erros = 0;
    this.acertos = 0;
    this.levelArr = jouYou[this.optionLevel];
    this.mainCard = null; //não incializado ainda, sorteio da carta principal
    this.sorteadosArr = []; //os 5 cartões sorteads
    this.vidas = 2;
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

      if (!sorteados.includes(card) && card.readings_kun.length !== 0) {
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
  }
}

/*
    let card = {
      "kanji": "入",
      "meanings": ["Enter", "Insert"],
      "readings_on": ["にゅう", "じゅ"],
      "readings_kun": [
        "い.る",
        "-い.る",
        "-い.り",
        "い.れる",
        "-い.れ",
        "はい.る"
      ]
    };

    

    elemento[1].meanings
      .slice(0, Math.min(2, elemento[1].meanings.length))
      .join(', '),
*/
