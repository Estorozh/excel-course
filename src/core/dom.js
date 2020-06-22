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

    text(text) {
        if (typeof text == 'string') {
            this.$el.textContent = text
            return this
        }
        return this.$el.tagName.toLowerCase() == 'input' 
            ? this.$el.value.trim() 
            : this.$el.textContent.trim()
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

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        }) 
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(parse)
            return {
                row: +parsed[0],
                col: +parsed[1] 
            }
        }
        return this.data.id
    }

    focus() {
        this.$el.focus()
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
