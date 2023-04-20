import { createElement } from "../utils/utils.js"
import { showAllert } from "./ShowAlert.js"

export function createPairs(app) {

  const unmount = () => { 
    pairs.remove() 
    btnCard.removeEventListener('click', flipCard)
    cards = []
  }

  const mount = (data) => {
    cards = data.pairs
    cardController()
    app.append(pairs)
  }

  const flipCard = () => {
    console.log('flipCard', index, cards[0])

    btnCard.classList.add('card__item_flipped') 
    btnCard.removeEventListener('click', flipCard)

    setTimeout(() => { 
      btnCard.classList.remove('card__item_flipped') 
      setTimeout(() => { 
        if (++index == cards.length)  {
          front.textContent = 'The end'
          showAllert('Возвращаемся на главную', 2000)
          setTimeout(() => { btnReturn.click(); }, 2000);
          return
        }

        front.textContent = cards[index][0]
        back.textContent = cards[index][1]      

        setTimeout(() => { btnCard.addEventListener('click', flipCard) }, 200)
      }, 100)
    }, 1000)
  }

  const cardController = () => {
    cards.sort(() => Math.random() - 0.5)
    index = 0;
    front.textContent = cards[index][0]
    back.textContent = cards[index][1]
 
    btnCard.addEventListener('click', flipCard)
  }

  const pairs = createElement("section", { className: "card section-offset" })
  const container = createElement("div", { className: "container card__container" })
  const btnReturn = createElement("button", { className: "card__return", ariaLabel: "Возврат к категориям" })
  const btnCard = createElement("button", { className: "card__item" })
  const front = createElement("span", { className: "card__front", textContent: "front"});
  const back = createElement("span", { className: "card__back", textContent: "back"});

  let index = 0, cards = []

  btnCard.append(front, back)
  container.append(btnReturn, btnCard)
  pairs.append(container)

  return { btnReturn, mount, unmount }
}