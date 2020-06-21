class DOM {
    constructor(selector) {
        // #app
        this.$el = typeof selector === 'string' 
            ? document.querySelector(selector) 
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, cb) {
        this.$el.addEventListener(eventType, cb)
    }

    off(eventType, cb) {
        this.$el.removeEventListener(eventType, cb)
    }

    append(node) {
        if (node instanceof DOM) {
            node = node.$el
        }
        this.$el.append(node)

        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    get data() {
        return this.$el.dataset
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        }) 
    }
}

export function $(selector) {
    return new DOM(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}
