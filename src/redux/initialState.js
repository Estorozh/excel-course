import {clone} from '../core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
    rowState: {},
    colState: {},
    stylesState: {},
    dataState: {}, // {'0:1': 'someText'}
    currentText: '',
    defaultTitle: 'Новая таблица',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function initialState(state) {
    return state ? normalize(state) : clone(defaultState)
}