import {DOMListener} from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []
        this.storeSub

        this.prepare()
    }

    // Настройка компонента до init
    prepare() {}

    // return template components
    toHTML () {
        return '';
    }

    // инициализируем компонент и добавляем DOM слушателей
    init() {
        this.initDOMListeners()
    }

    // уведомление подписчиков
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // подписываемся на событие
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    // удаляем компонент и чистим DOM слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.unsub.map(unsub => unsub())
        this.storeSub.unsubscribe()
    }

    // сюда приходят изменения по тем полям на которые мы подписались
    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }
}
