import { fetchCards, fetchCategories } from "../service/api.service.js";
import { createCategory } from "./components/Category.js";
import { createEditCategory } from "./components/EditCategoryy.js";
import { createHeader } from "./components/Header.js";
import { createPairs } from "./components/Pairs.js";
import { createElement } from "./utils/utils.js";


initApp();

async function initApp() {

  const renderIndex = async e => {
    e?.preventDefault()
    const categories = await fetchCategories()
    allSectionUnmount()
    if (categories.error) {
        app.append(createElement('p', {className: 'server-error', textContent:'Ошибка сервера'}))
        return
    }
    
    categoryObj.mount(categories)
    headerObj.updateHeaderTitle('Категории')
  }

  const allSectionUnmount = () => { [categoryObj, editCategoryObj, pairsObj].forEach(v => v.unmount()) }

  const headerParent = document.querySelector('.header')
  const app = document.querySelector('#app')
  const headerObj = createHeader(headerParent)
  const categoryObj = createCategory(app)
  const editCategoryObj = createEditCategory(app)
  const pairsObj = createPairs(app)

  renderIndex()

  pairsObj.btnReturn.addEventListener('click', renderIndex)
  headerObj.headerLogoLink.addEventListener('click', renderIndex)
  headerObj.headerBtn.addEventListener('click', () => {
    headerObj.updateHeaderTitle('Новая категория')
    allSectionUnmount()
    editCategoryObj.mount()
  })


  categoryObj.categoryList.addEventListener('click', async ({ target }) => { 
    const categoryItem = target.closest('.category__item')
    
    if (target.closest('.category__edit')) {
        const dataCards = await fetchCards(categoryItem.dataset.id)
        allSectionUnmount()
        headerObj.updateHeaderTitle('Редактирование')
        editCategoryObj.mount(dataCards)
        return
    }
    
    if (target.closest('.category__del')) {
      return
    }

    if (categoryItem) {
      const dataCards = await fetchCards(categoryItem.dataset.id)
      allSectionUnmount()
      headerObj.updateHeaderTitle(dataCards.title)
      pairsObj.mount(dataCards)
    }
  })

  
}