import { createElement } from "../utils/utils.js"

export function createCategory(app) {

    const createCategoryCard = data => {
        const li = createElement('li', {className: 'category__item'})
        li.dataset.id = data.id

        const b1 = createElement('button', {className: 'category__card'})
        b1.append(createElement('span', {className: 'category__title', textContent: data.title}))
        b1.append(createElement('span', {className: 'category__pairs', textContent: declOfNum(data.length, ['пара', 'пары', 'пар'])}))
        
        const b2 = createElement('button', {className: 'category__btn category__edit', ariaLabel: 'редактировать'})
        const b3 = createElement('button', {className: 'category__btn category__del', ariaLabel: 'удалить' })
        li.append(b1, b2, b3)

        return li
    }
    
    const unmount = () => { category.remove() }
    
    const mount = (data) => {
        categoryList.textContent = ''
        app.append(category)
        const cards = data.map(createCategoryCard)
        categoryList.append(...cards)
    }
     

    const category = createElement('section', {className : 'category section-offset'})
    
    const container = createElement('div', {className : 'container'})
    category.append(container)

    const categoryList = createElement('ul', {className: 'category__list'})
    container.append(categoryList)

    return {mount, unmount, categoryList}
}

function declOfNum (n, titles) {
    const d = n % 10, h = n % 100
    return `${n} ${titles[
        d == 1 && h != 11
        ? 0
        : d >= 2 && d <= 4 && (h < 10 || h >= 20) ? 1 : 2]}`
}