import { fetchCards, fetchCategories } from "../service/api.service.js";
import { createCategory } from "./components/Category.js";
import { createEditCategory } from "./components/EditCategoryy.js";
import { createHeader } from "./components/Header.js";
import { createElement } from "./utils/utils.js";


initApp();

async function initApp() {

  const returnIndex = async e => {
    e?.preventDefault()
    allSectionUnmount()
    const categories = await fetchCategories()
    if (categories.error) {
        app.append(createElement('p', {className: 'server-error', textContent:'Ошибка сервера'}))
        return
    }
    
    categoryObj.mount(categories)
    headerObj.updateHeaderTitle('Категории')
}

  const allSectionUnmount = () => { [categoryObj, editCategoryObj].forEach(v => v.unmount()) }

  const headerParent = document.querySelector('.header')
  const app = document.querySelector('#app')
  const headerObj = createHeader(headerParent)
  const categoryObj = createCategory(app)
  const editCategoryObj = createEditCategory(app)

  returnIndex()

  headerObj.headerLogoLink.addEventListener('click', returnIndex)
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
  })
}