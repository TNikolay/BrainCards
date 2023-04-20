import { createElement } from "../utils/utils.js"
import { showAllert } from "./ShowAlert.js"

export function createPairs(app) {

  const unmount = () => { pairs.remove() }
  const mount = (data) => {
    cardController(data.pairs)
    app.append(pairs)
  }

  const cardController = data => {
    const flipCard = () => {
      console.log('flipCard', index, data[0])

      btnCard.classList.add('card__item_flipped') 
      btnCard.removeEventListener('click', flipCard)

      setTimeout(() => { 
        btnCard.classList.remove('card__item_flipped') 
        setTimeout(() => { 
          if (++index == data.length)  {
            front.textContent = 'The end'
            showAllert('Возвращаемся на главную', 2000)
            setTimeout(() => { btnReturn.click(); }, 2000);
            return
          }

          front.textContent = data[index][0]
          back.textContent = data[index][1]      

          setTimeout(() => { btnCard.addEventListener('click', flipCard) }, 200)
        }, 100)
      }, 1000)
    }

    data.sort(() => Math.random() - 0.5)
    let index = 0;
    front.textContent = data[index][0]
    back.textContent = data[index][1]
 
    btnCard.addEventListener('click', flipCard)
  }

  const pairs = createElement("section", { className: "card section-offset" })
  const container = createElement("div", { className: "container card__container" })
  const btnReturn = createElement("button", { className: "card__return", ariaLabel: "Возврат к категориям" })
  const btnCard = createElement("button", { className: "card__item" })
  const front = createElement("span", { className: "card__front", textContent: "front"});
  const back = createElement("span", { className: "card__back", textContent: "back"});

  btnCard.append(front, back)
  container.append(btnReturn, btnCard)
  pairs.append(container)

  return { btnReturn, mount, unmount }
}