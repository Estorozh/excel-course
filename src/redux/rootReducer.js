import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE} from './types'

export function rootReducer(state, action) {
    let prevState
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState} // id, val
        case CHANGE_TEXT: 
            prevState = state['dataState'] || {}
            prevState[action.data.id] = action.data.text
            return {...state, currentText: action.data.text, dataState: prevState}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE: 
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data['value']}
            })
            return {
                ...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case CHANGE_TITLE:
            return {...state, title: action.data}
        case UPDATE_DATE: 
            return {...state, openedDate: new Date().toJSON()}
        default: return state
    }
}