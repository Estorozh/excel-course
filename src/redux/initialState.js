import {storage} from '../core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
    rowState: {},
    colState: {},
    stylesState: {},
    dataState: {}, // {'0:1': 'someText'}
    currentText: '',
    defaultTitle: 'Новая таблица',
    currentStyles: defaultStyles
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export const initialState = storage('excel-state') 
    ? normalize(storage('excel-state'))
    : defaultState;