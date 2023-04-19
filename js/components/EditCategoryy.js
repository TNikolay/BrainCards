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
    app.append(editCategory)
  }

  const clearTitle = () => { if (title.textContent == TITLE) title.textContent = '' }
  const checkTitle = () => { if (title.textContent == '') title.textContent = TITLE }

  const createTRCell = (dataArray) => {
    const tr = createElement("tr");
    const tableCell1 = createElement("th", { className: "table__cell table__cell_one", textContent: dataArray[0], contentEditable: true });
    const tableCell2 = createElement("th", { className: "table__cell table__cell_two", textContent: dataArray[1], contentEditable: true });
    const tableCellDel = createElement("th", { className: "table__cell" });
    const delRow = createElement("button", { className: "table__del", textContent: "x" });

    delRow.addEventListener("click", () => { if (confirm('Sure?')) tr.remove() });
    
    tableCellDel.append(delRow)
    tr.append(tableCell1, tableCell2, tableCellDel)

    return tr
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

  return { mount, unmount };
}
