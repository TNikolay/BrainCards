import { createElement } from "../utils/utils.js";

const TITLE = "Введите название категории";

export function createEditCategory(app) {
  
  const unmount = () => { editCategory.remove() }
  const mount = (data = {title: TITLE, pairs: []}) => {
    tbody.textContent = ''
    title.textContent = data.title

    if (title.textContent == TITLE) title.classList.add('edit__title_change') 
    else title.classList.remove('edit__title_change')

    const rows = data.pairs.map(createTRCell)
    tbody.append(...rows, createTRCell(['', '']))

    btnSave.dataset.id = data.id ? data.id : ''

    app.append(editCategory)
  }

  const clearTitle = () => { if (title.textContent == TITLE) title.textContent = '' }
  const checkTitle = () => { if (title.textContent == '') title.textContent = TITLE }

  const createTRCell = (dataArray) => {
    const tr = createElement("tr");
    const tableCell1 = createElement("td", { className: "table__cell table__cell_one", textContent: dataArray[0], contentEditable: true });
    const tableCell2 = createElement("td", { className: "table__cell table__cell_two", textContent: dataArray[1], contentEditable: true });
    const tableCellDel = createElement("td", { className: "table__cell" });
    const delRow = createElement("button", { className: "table__del", textContent: "x" });

    delRow.addEventListener("click", () => { if (confirm('Sure?')) tr.remove() });
    
    tableCellDel.append(delRow)
    tr.append(tableCell1, tableCell2, tableCellDel)

    return tr
  }

  const parseData =() => {
    const cellsMain = document.querySelectorAll('.table__cell_one')
    const cellsSecond = document.querySelectorAll('.table__cell_two')
    const data = { pairs: [] }

    for (let i = 0; i < cellsMain.length; i++) {
      const t1 = cellsMain[i].textContent.trim(), t2 = cellsSecond[i].textContent.trim()
      if (t1 && t2) data.pairs.push([t1, t2])
    }

    const t = title.textContent.trim()
    if (t && t != TITLE) data.title = t

    if (btnSave.dataset.id) data.id = btnSave.dataset.id
    return data
  }

  const editCategory = createElement("section", { className: "edit section-offset" });
  const container = createElement("div", { className: "container edit__container" });
  const title = createElement("h2", { className: "edit__title ", contentEditable: true, title: "Можно редактировать" });
  const table = createElement("table", { className: "edit__table table" });
  const thead = createElement("thead");
  const trThead = createElement("tr");
  const hadCell1 = createElement("th", { className: "table__cell", textContent: "main" });
  const hadCell2 = createElement("th", { className: "table__cell", textContent: "second" });
  const hadCell3 = createElement("th", { className: "table__cell" });
  const tbody = createElement("tbody");

  const btnWrapper = createElement("div", { className: "edit__btn-wrapper" });
  const btnAddRow = createElement("button", { className: "edit__btn edit__add-row", textContent: "Добавить пару" });
  const btnSave = createElement("button", { className: "edit__btn edit__save", textContent: "Сохранить" });
  const btnCancel = createElement("button", { className: "edit__btn edit__cancel", textContent: "Отмена" });

  title.addEventListener('focus', clearTitle)
  title.addEventListener('blur', checkTitle)
  btnAddRow.addEventListener('click', () => { tbody.append(createTRCell(['', ''])) })

  editCategory.append(container)
  table.append(thead, tbody)
  thead.append(trThead)
  trThead.append(hadCell1, hadCell2, hadCell3)
  btnWrapper.append(btnAddRow, btnSave, btnCancel)
  container.append(title, table, btnWrapper)

  return { mount, unmount, parseData, btnSave, btnCancel };
}
