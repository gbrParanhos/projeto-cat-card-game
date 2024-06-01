const cards = []
let numberCards = ""
let numberPairs = ""
let countFlips = 0
let countCorrectPairs = 0
let firstFlippedCard = ""
let firstFrontFlippedCard = ""
let firstBackFlippedCard = ""
let secondFlippedCard = ""
let secondFrontFlippedCard = ""
let secondBackFlippedCard = ""

validateQuestion()

function validateQuestion() {
  numberCards = prompt('Com quantas cartas deseja jogar? Escolha entre 4 a 14')
  if (isNaN(numberCards) || (numberCards % 2) !== 0 || numberCards < 4 || numberCards > 14) {
    validateQuestion()
  } else {
    numberPairs = numberCards / 2;
    setNumberCards()
  }
}

function setNumberCards() {
  
  for (let i = numberPairs; i > 0; i--) {
    cards.push(`  <li id="${i}" class="card" onclick="flipCard(this)">
    <div class="front-face face">
    <img src="assets/${i}.gif" alt="">
    </div>
    <div class="back-face face">
    <img src="assets/back.png" alt="">
    </div>
    </li>`);
    cards.push(`  <li id="-${i}" class="card" onclick="flipCard(this)">
    <div class="front-face face">
    <img src="assets/${i}.gif" alt="">
    </div>
    <div class="back-face face">
    <img src="assets/back.png" alt="">
    </div>
    </li>`)
  }
  
  cards.sort(randomizeCards);
  renderCards()
}

function randomizeCards() {
  return Math.random() - 0.5;
}

function renderCards() {
  const cardList = document.querySelector('ul')
  
  for (let i = cards.length-1; i >= 0; i--) {
    cardList.innerHTML += cards[i]
  }
}

function flipCard(element) {
  if (element.querySelector('.front-face').classList.contains("flip")) {
    return
  } else if (!firstFlippedCard) {
    firstFlippedCard = element
    firstFrontFlippedCard = element.querySelector('.front-face')
    firstBackFlippedCard = element.querySelector('.back-face')
    firstFrontFlippedCard.classList.add('flip')
    firstBackFlippedCard.classList.add('flip')
    countFlips++
  } else if (!secondFlippedCard) {
    secondFlippedCard = element
    secondFrontFlippedCard = element.querySelector('.front-face')
    secondBackFlippedCard = element.querySelector('.back-face')
    secondFrontFlippedCard.classList.add('flip')
    secondBackFlippedCard.classList.add('flip')
    countFlips++
    compareCards()
  }
}

function compareCards() {
  if (Math.abs(firstFlippedCard.getAttribute('id')) === Math.abs(secondFlippedCard.getAttribute('id'))) {
    firstFlippedCard = ""
    firstFrontFlippedCard = ""
    firstBackFlippedCard = ""
    secondFlippedCard = ""
    secondFrontFlippedCard = ""
    secondBackFlippedCard = ""
    setTimeout(checkVictory,200)
  } else {
    setTimeout(removeFlip,1000)
  }
}

function removeFlip() {
  firstFrontFlippedCard.classList.remove('flip')
  firstBackFlippedCard.classList.remove('flip')
  secondFrontFlippedCard.classList.remove('flip')
  secondBackFlippedCard.classList.remove('flip')
  firstFlippedCard = ""
  firstFrontFlippedCard = ""
  firstBackFlippedCard = ""
  secondFlippedCard = ""
  secondFrontFlippedCard = ""
  secondBackFlippedCard = ""
}

function checkVictory() {
  countCorrectPairs++
  if(countCorrectPairs === numberPairs) {
    alert(`Você ganhou em ${countFlips} jogadas!`)
    location.reload()
  }
}