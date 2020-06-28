import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Excel} from '@/components/excel/Excel'
import {rootReducer} from '@/redux/rootReducer'
import {createStore} from '@core/createStore'
import {storage, debounce} from '@core/utils'
import {initialState} from '@/redux/initialState'
import {Page} from '@core/Page';

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()

        const state = storage(this.storageName(params))
        const store = createStore(rootReducer, initialState(state))

        const stateListener = debounce(state => {
            storage(this.storageName(params), state)
        }, 300)

        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot();
    }

    storageName(param) {
        return `excel:${param}`
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy
    }
}