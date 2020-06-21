const CODES = {
    A: 65,
    Z: 90
}

function createCell(content) {
    return `
        <div class='cell' contenteditable>
            ${content}
        </div>
    `
}

function createCol(col) {
    return `
        <div class='column'>${col}</div>
    `
}

function createRow(content, info = '') {
    return `
        <div class='row'>
            <div class='row-info'>${info}</div>
            <div class='row-data'>${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 10) {
    const colsCount = CODES.Z - CODES.A + 1 
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map( (el, i) => toChar(el, i) )
        .map(el => createCol(el))
        .join('')

    rows.push(createRow(cols))

    for (let i=0; i<rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(() => createCell(''))
            .join('')
            
        rows.push(createRow(cells, i+1))
    }

    return rows.join('')
}