export class Emitter {
    constructor() {
        this.listeners = {}
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)

        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener != fn)
        }
    }

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach(listener => {
            listener(...args) 
        } )
        return true
    }
}

// const emiter = new Emitter()

// const unsub = emiter.subscribe('John', data => console.log('sub: ' + data))
// emiter.emit('John', 42)

// setTimeout(() => {
//     emiter.emit('John', 'after 2 seconds')
// }, 2000)

// setTimeout(() => {
//     unsub()
// }, 3000)

// setTimeout(() => {
//     emiter.emit('John', 'after 2 seconds')
// }, 5000)