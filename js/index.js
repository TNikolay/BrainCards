import { fetchCategories } from "../service/api.service.js";
import { createCategory } from "./components/Category.js";
import { createHeader } from "./components/Header.js";
import { createElement } from "./utils/utils.js";


initApp();

async function initApp() {

    const returnIndex = async e => {
        e?.preventDefault()
        const categories = await fetchCategories()
        if (categories.error) {
            app.append(createElement('p', {className: 'server-error', textContent:'Ошибка сервера'}))
            return
        }
        
        categoryObj.mount(categories)
        headerObj.updateHeaderTitle('Категории')
    }
    
    const headerParent = document.querySelector('.header')
    const app = document.querySelector('#app')
    const headerObj = createHeader(headerParent)
    const categoryObj = createCategory(app)
    returnIndex()

    headerObj.headerLogoLink.addEventListener('click', returnIndex)
    headerObj.headerBtn.addEventListener('click', () => {
        categoryObj.unmount()
        headerObj.updateHeaderTitle('Новая категория')
    })
}