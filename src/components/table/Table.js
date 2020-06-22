import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, matrix, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(20)
    }  

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('Table:select', $cell.text())
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('Formula:input', text => {
            this.selection.current.text(text)
        })
        
        this.$on('Formula:done', () =>{
            this.onKeydown({key: 'Enter', preventDefault: ()=>{}})
        })
    }

    onMousedown() {
        if ( shouldResize(event) ) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $cell = $(event.target)
            if (event.shiftKey) {                
                const $cells = matrix($cell, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))

                this.selection.selectGroup($cells)
            } else {
                this.selectCell($cell)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp']
        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(':')
            // eslint-disable-next-line no-debugger
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('Table:input', $(event.target).text())
    }  
}
