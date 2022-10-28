//
//import {* as kanjiJouyou} from './kanjiJouyou.json';
// criando array no formato [kanji, informações]

let keyObjArr = Object.entries(jouYou);
let kanjiArr = keyObjArr.map((elemento) => {
  return [
    elemento[0],
    elemento[1].grade,
    elemento[1].meanings
      .slice(0, Math.min(2, elemento[1].meanings.length))
      .join(', '),
    elemento[1].readings_on
      .slice(0, Math.min(2, elemento[1].meanings.length))
      .join(',  '),
    elemento[1].readings_kun
      .slice(0, Math.min(2, elemento[1].meanings.length))
      .join(',  '),
  ];
});
console.log(kanjiArr[0]);
/*
 ['一', 1 (nível), ['One', 'One Radical (no.1)'], 
 ['いち', 'いつ'], ['ひと-', 'ひと.つ']]
*/
//******************************* */
//******************************* */
//console.log(kanjiArr);
class Flashcards {
  constructor(kanjiArr) {
    this.optionLevel = 1;
    this.rodadas = 10;
    this.numCardsPorSet = 5; //5 kanjis de cada vez. evitar Mock
    this.erros = 0;
    this.acertos = 0;
    this.kanjiArr = kanjiArr;
    this.levelArr = this.kanjiArr.filter(
      (elemento) => elemento[1] === this.optionLevel
    );
    this.random = 0; //não incializado ainda, sorteio da carta principal
    this.sorteadosArr = []; //os 5 cartões sorteads
  }
  //level
  updateLevel() {
    let select = document.getElementById('level');
    let optionLevel = select.options[select.selectedIndex].value;
    console.log(optionLevel, typeof optionLevel, '<-optionLevel');
    this.optionLevel = Number(optionLevel);
    console.log(this.optionLevel, '< nível selecionado');
    //se mudar level, atualizar o array de nivel
    console.log('atualizando novo array filtrado a ser usado');
    //console.log(this, '<--this');
    this.atualizaArrayNivel();
  }
  //rodadas
  updateRodadas() {
    let select = document.getElementById('numRodadas');
    let optionRodadas = select.options[select.selectedIndex].value;
    console.log(optionRodadas, typeof optionRodadas, '<-optionRodadas');
    this.rodadas = Number(optionRodadas);
    console.log(this.rodadas, '< num rodadas selecionada');
  }
  //filtra o nivel e forma Array e retorna
  atualizaArrayNivel() {
    this.levelArr = this.kanjiArr.filter(
      (elemento) => elemento[1] === this.optionLevel
    );
    //console.log(this, 'this no atualiza nivel array');
    //console.log(this.levelArr, '<-- novo array filtrado pro nivel');
  }
  //randomDeck
  randomDeck() {
    //inicializa o valor aleatorio da carta principal
    this.random = Math.floor(this.numCardsPorSet * Math.random());
    //
    // conjunto de 5 kanji's aleatorios de 1 rodada
    let sorteados = [];
    while (sorteados.length < this.numCardsPorSet) {
      let numSorteado = Math.floor(this.levelArr.length * Math.random());
      //console.log(numSorteado, this.levelArr[numSorteado], '<-- sorteio');
      if (!sorteados.includes(this.levelArr[numSorteado])) {
        sorteados.push(this.levelArr[numSorteado]);
      }
    }
    console.log('**************');
    console.log(sorteados, '<--arr dos sorteados');
    this.sorteadosArr = sorteados;
    //console.log(this.sorteadosArr, 'sorteadosArr');
  }

  // Render Main card
  renderMainCard() {
    //
    //this.random inicalizado na renderização
    let mainCard = document.getElementById('main-card');
    console.log(mainCard, '<--main card');
    console.log(this.random, 'this.random');
    mainCard.textContent = this.sorteadosArr[this.random][0];
    //
    //----para console somente:
    let kanji = this.sorteadosArr[this.random][0];
    let level = this.sorteadosArr[this.random][1];
    let significado = this.sorteadosArr[this.random][2];
    console.table({ kanji, level, significado });
  }
  //renderiza Deck no HTML
  renderDeck() {
    //
    let deck = document.getElementById('deck');
    //
    this.sorteadosArr.forEach((elemento, index) => {
      //
      let cartao = document.createElement('article');
      //marcar se é a resposta
      if (this.random === index) {
        cartao.setAttribute('resposta', 'correto');
      } else {
        cartao.setAttribute('resposta', 'errado');
      }

      let htmlText = `<div>${elemento[2]}</div>
      <div>${elemento[4]}</div>`;
      cartao.innerHTML = htmlText;
      deck.appendChild(cartao);
      //---------------------continuar**************
      /* 
      marcar classe ou id para erro/acerto
      event listener >> chamer function p/ contar pontuação erro/acerto, mudar estilo      
      */
      //console.log(cartao, '<-- cartao a ser escutado');
      cartao.addEventListener('click', (event) => {
        //console.log('clicou!!!!!!!!!');
        //
        let target = event.currentTarget;
        console.log(target, '<-target');
        console.log(target.getAttribute('resposta'), '<-target');
        if (target.getAttribute('resposta') === 'correto') {
          this.acertos++;

          console.log(
            this.acertos,
            '<< acertos',
            this.acertos + this.erros,
            '<--round'
          );
        } else {
          this.erros++;

          console.log(
            this.erros,
            '<< erros',
            this.acertos + this.erros,
            '<--round'
          );
        }
        this.informacoes1();
        //console.table({this.erros, this.acertos, this.rodadas});
      });
    });
    //

    //
  }
  // --- metodo - atualiza informações básicas nivel escolhido
  //campos de dados - painel para acompanhar
  informacoes1() {
    let infor = document.getElementsByClassName('information1');
    console.log(infor, '<=infor');
    let quadroInformacoes = `<div>Nível atual: ${this.optionLevel} / contém ${
      this.levelArr.length
    } ideogramas</div>
    <div>Rodada ${this.acertos + this.erros} de ${this.rodadas} </div>
     <div>Acertos: ${this.acertos} / Erros: ${this.erros}</div>`;
    infor[0].innerHTML = quadroInformacoes;
  }
}
//
//******************************* */
//******************************* */
//******************************* */
//******************************* */
// instancia do jogo
const flascardsGame = new Flashcards(kanjiArr);
//console.log(flascardsGame.levelArr);

let inicializa = function () {
  flascardsGame.randomDeck();
  flascardsGame.renderMainCard();
  flascardsGame.renderDeck();
  // informações - teste
  flascardsGame.informacoes1();
};

// botão incializa
let incia = document.getElementById('startBtn');
incia.addEventListener('click', () => {
  inicializa();
});

// proximo set - botão
let proximo = document.getElementById('proximoBtn');

proximo.addEventListener('click', () => {
  //limpar cartões, verificar quantidade antes
  let numCards = document.querySelectorAll('article').length;
  for (i = 0; i < numCards; i++) {
    let node = document.querySelector('article');
    //console.log(node, '<---node a apagar');
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  inicializa();
});

//******************************* */
//******************************* */

// botão reset//
// limitar qt de rodadas
// vitória/derrota
// refatorar - event listener - bootstraps
// slides/prize
// tempo

//******************************* */
//******************************* */
