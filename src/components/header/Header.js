import {ExcelComponent} from '@core/ExcelComponent'
import {changeTitle} from '@/redux/actions'
import {$} from '@core/dom'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title || 'Новая таблица'
    return `
    <input type="text" class="input" value="${title}">
    <div class="">
        <div class="button"><i class="material-icons">delete</i></div>
        <div class="button"><i class="material-icons">exit_to_app</i></div>
    </div>`
  }

  onInput(e) {
    const $target = $(e.target)
    this.$dispatch(changeTitle($target.text()))
  }
}