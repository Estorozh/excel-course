import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false" id="formula"></div>`
    }

    onInput() {
        this.$emit('Formula:input', $(event.target).text())
    }

    onKeydown() {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('Formula:done')
        }
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')
        this.$on('Table:select', $cell => {
            this.$formula.text($cell.data.value)
        })
    }
}