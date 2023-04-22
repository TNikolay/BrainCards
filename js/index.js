import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "../service/api.service.js";
import { createCategory } from "./components/Category.js";
import { createEditCategory } from "./components/EditCategoryy.js";
import { createHeader } from "./components/Header.js";
import { createPairs } from "./components/Pairs.js";
import { showAllert } from "./components/ShowAlert.js";
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

  const postHandler = async () => {
    const data = editCategoryObj.parseData()
    const category = await fetchCreateCategory(data)
    if (category.error) {
       showAllert(category.error.message)
       return
      }
    
    showAllert(`Новая категория ${data.title} добавлена`)
    allSectionUnmount()
    categoryObj.mount(category)
    headerObj.updateHeaderTitle('Категории')
  }
  
  const pathHandler = async () => {
    const data = editCategoryObj.parseData()
    const category = await fetchEditCategory(editCategoryObj.btnSave.dataset.id, data)

    if (category.error) {
      showAllert(category.error.message)
      return
     }
   
   showAllert(`Категория ${data.title} обновлена`)
   allSectionUnmount()
   categoryObj.mount(category)
   headerObj.updateHeaderTitle('Категории')
  }

  const editCategoryCancelHandler = () => { if (confirm('Sure?')) renderIndex() }

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
    editCategoryObj.btnSave.addEventListener('click', postHandler)
    editCategoryObj.btnSave.removeEventListener('click', pathHandler)
    editCategoryObj.btnCancel.addEventListener('click', editCategoryCancelHandler)
  })


  categoryObj.categoryList.addEventListener('click', async ({ target }) => { 
    const categoryItem = target.closest('.category__item')
    
    if (target.closest('.category__edit')) {
        const dataCards = await fetchCards(categoryItem.dataset.id)
        allSectionUnmount()
        headerObj.updateHeaderTitle('Редактирование')
        editCategoryObj.mount(dataCards)
        editCategoryObj.btnSave.addEventListener('click', pathHandler)
        editCategoryObj.btnSave.removeEventListener('click', postHandler)
        editCategoryObj.btnCancel.addEventListener('click', editCategoryCancelHandler)
        return
    }
    
    if (target.closest('.category__del')) {
      if (confirm('Sure?')) {
        fetchDeleteCategory(categoryItem.dataset.id)
        showAllert('Категория удалена')
        categoryItem.remove()
      }
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