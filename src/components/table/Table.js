import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, matrix, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'
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
        return createTable(20, this.store.getState())
    }  

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('Table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('Formula:input', text => {
            this.selection.current.attr('data-value', text).text(parse(text))
            this.selection.current.text(text)
            this.updateTextInStore(text)
        })
        
        this.$on('Formula:done', () =>{
            this.onKeydown({key: 'Enter', preventDefault: ()=>{}})
        })

        this.$on('toolbar:applyStyle', (style) => {
            this.selection.applyStyle(style)
            this.$dispatch(actions.applyStyle({
                value: style,
                ids: this.selection.selectedIds
            }))
        })
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.log(e.message)
        }
    }

    onMousedown() {
        if ( shouldResize(event) ) {
            this.resizeTable(event)
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
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }  

    updateTextInStore(text) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(), 
            text
        }))
    }
}
