import {ExcelState} from '@core/ExcelState'
import {createToolbar} from './toolbar.template'
import {defaultStyles} from '@/constants'
import {$} from '@core/dom'

export class Toolbar extends ExcelState {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    storeChanfed(changes) {
        this.setState(changes.currentStyles)
    }

    get template() {
        return createToolbar(this.state)
    }
    toHTML() {
        return this.template
    }    

    onClick(e) {
        const $target = $(e.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value);
            this.$emit('toolbar:applyStyle', value)
        }
    }
}