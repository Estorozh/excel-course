import {$} from '@core/dom'

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const $coords = $parent.$el.getBoundingClientRect()
        let value

        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

        cells.length 
            ? $resizer.css({opacity: 1, bottom: '-2500px'}) 
            : $resizer.css({opacity: 1, width: '2500px'})

        document.onmousemove = e => {
            if (cells.length) {
                const delta = e.pageX - $coords.right
                value = $coords.width + delta
                $resizer.css({right: -delta + 'px'})
            } else {
                const delta = e.pageY - $coords.bottom
                value = $coords.height + delta
                $resizer.css({bottom: -delta + 'px'})
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null

            if (cells.length) {
                $parent.css({width: value + 'px'})
                cells.forEach(el => el.style.width = $parent.$el.style.width)
            } else {
                $parent.css({height: value + 'px'})
            }
            const type = $resizer.data.resize
            resolve({value, type, id: $parent.data[type]})

            $resizer.css({opacity: 0, bottom: 0, right: 0, width: '4px'})
        }
    })
}