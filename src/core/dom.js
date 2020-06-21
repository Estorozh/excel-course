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
