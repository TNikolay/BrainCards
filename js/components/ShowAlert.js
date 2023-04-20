import { createElement } from "../utils/utils.js";

export function showAllert(text, time = 3000) {
  const alertBlock = createElement('div', { className: "alert"})
  alertBlock.append(createElement('p', { className: "alert_text ", textContent: text}))
  document.body.append(alertBlock)

  setTimeout(() => { alertBlock.classList.add('alert_show') });
  setTimeout(() => {
    alertBlock.classList.remove('alert_show')
    setTimeout(() => { alertBlock.remove() }, 200);
}, time);
}