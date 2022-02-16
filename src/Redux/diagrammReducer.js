import { getDollar, getEuro, getItem } from './../API/api';


const ADD_DIAGRAMM = 'ADD_DIAGRAMM'
const ADD_ACTIV = 'ADD_ACTIV'
const ADD_SALARY = 'ADD_SALARY'
const ADD_PERIOD_S = 'ADD_PERIOD_S'
const ADD_PERIOD_PO = 'ADD_PERIOD_PO'
const ADD_PERIOD_S_TIME = 'ADD_PERIOD_S_TIME'
const ADD_PERIOD_PO_TIME = 'ADD_PERIOD_PO_TIME'
const ADD_SELECT_DIAGRAMM = 'ADD_SELECT_DIAGRAMM'
const ADD_SALARY_VALUE_TRUE = 'ADD_SALARY_VALUE_TRUE'
const ADD_EDIT_COLOR = 'ADD_EDIT_COLOR'
const ADD_DOLLAR = 'ADD_DOLLAR'
const ADD_EURO = 'ADD_EURO'
const ADD_SELECT_DIAGRAMM_STAT = 'ADD_SELECT_DIAGRAMM_STAT'
const ADD_CATEGORY = 'ADD_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const RENAME_CATEGORY = 'RENAME_CATEGORY'
const CHANGE_RELATIVITY = 'CHANGE_RELATIVITY'
const ADD_TEXT = 'ADD_TEXT'
const ADD_NAME_CASE = 'ADD_NAME_CASE'





let initialState = {
    category:
        [{
            nameRus: 'Еда', nameRusСase: 'Еду', color: '#fde23e',
            data: [
                { id: 'Еда1', time: '2022-02-08 ', num: 100 },
                { id: 'Еда2', time: '2022-02-10 ', num: 20 },
                { id: 'Еда3', time: '2022-02-12 ', num: 20 },
                { id: 'Еда4', time: '2022-02-13 ', num: 25 },
                { id: 'Еда5', time: '2022-02-14 ', num: 52 }
            ], summ: 127
        },
        { nameRus: 'Алкоголь', nameRusСase: 'Алкоголь', color: '#2222d1', 
        data: [{ id: 'Алкоголь1', time: '2022-02-08 ', num: 40 }], summ: 40 },
        { nameRus: 'Квартира', nameRusСase: 'Квартиру', color: '#57d9ff', 
        data: [{ id: 'Квартира1', time: '2022-02-11 ', num: 25 }], summ: 25 },
        { nameRus: 'Транспорт', nameRusСase: 'Транспорт', color: '#169928', 
        data: [{ id: 'Транспорт1', time: '2022-02-09 ', num: 25 }], summ: 25 }
    ],
    activ: '',
    salary: { salaryNum: 700.01, salaryDate: '2022-02-01', salaryValueTrue: false },
    periodPo: '',
    periodS: '',
    periodPoTime: '23:59',
    periodSTime: '00:01',
    selectDiagramm: '%',
    selectDiagrammStat: '%',
    exchangeRates: {
        dollar: { Cur_OfficialRate: '2.5', Date: '' },
        euro: { Cur_OfficialRate: '2.9', Date: '' }
    },
    relativity:
    {
        name: 'пива',
        unit: 'бутылка',
        price: 4.59,
        case: ['пива', 'пив', 'пиво']
    },
    text: 'Привет...'

}

const diagrammReduser = (state = initialState, action) => {


    switch (action.type) {

        case ADD_DIAGRAMM:
            return {
                ...state,
                category: [
                    ...state.category.map(a => {
                        if (action.name.includes(a.nameRus)) {
                            return ({
                                ...a,
                                data: [...a.data, {
                                    id: a.nameRus + String(a.data.length + 1), time: action.time,
                                    num: Number(action.value[action.name.indexOf(a.nameRus)])
                                }],
                                summ: a.summ + Number(action.value[action.name.indexOf(a.nameRus)])
                            })
                        }
                        else return a
                    })]
            }
        case ADD_ACTIV:
            return {
                ...state, activ: action.activ
            }
        case ADD_SALARY:
            return {
                ...state, salary: {
                    ...state.salary,
                    salaryNum: action.salary,

                    salaryDate: state.salary.salaryValueTrue === false ? `2022-${action.months + 1}-01 ` : state.salary.salaryDate,
                    salaryValueTrue: true
                }
            }
        case ADD_PERIOD_S:
            return {
                ...state,
                periodS: action.periodS
            }
        case ADD_PERIOD_PO:
            return {
                ...state,
                periodPo: action.periodPo
            }
        case ADD_PERIOD_S_TIME:
            return {
                ...state,
                periodSTime: action.periodSTime
            }

        case ADD_SELECT_DIAGRAMM:
            return {
                ...state, selectDiagramm: action.selectDiagramm
            }
        case ADD_SELECT_DIAGRAMM_STAT:
            return {
                ...state, selectDiagrammStat: action.selectDiagrammStat
            }
        case ADD_SALARY_VALUE_TRUE:
            return {
                ...state, salary: { ...state.salary, salaryValueTrue: action.value }
            }
        case ADD_EDIT_COLOR:
            return {
                ...state,
                category: [
                    ...state.category.map(a => {
                        if (action.name.includes(a.nameRus)) {
                            return ({ ...a, color: action.editColor[action.name.indexOf(a.nameRus)] })
                        }
                        else return a
                    })]
            }
        case ADD_DOLLAR:
            return {
                ...state,
                exchangeRates: {
                    dollar: {
                    Cur_OfficialRate: action.dollar,
                    Date: action.data.slice(0, -9)},
                    euro: {...state.exchangeRates.euro}
                }
            }
            case ADD_EURO:
                return {
                    ...state,
                    exchangeRates: {
                        dollar: {...state.exchangeRates.dollar},
                        euro: {
                            Cur_OfficialRate: action.euro,
                            Date: action.data.slice(0, -9)}
                    }
                }
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, {
                    nameRus: `${action.name[0].toUpperCase() + action.name.slice(1)}`,
                    nameRusСase: '',
                    color: action.color,
                    data: [], summ: 0
                }]
            }
            case  ADD_NAME_CASE: 
            return {
                ...state,
                category: [...state.category.map(a=>  {
                    if (a.nameRus.toLowerCase() === action.name){
                        return ({...a, nameRusСase: `${action.data[0].toUpperCase() + action.data.slice(1)}`})
                    }
                   return a
                }
                    )]
                }

        case DELETE_CATEGORY:
            return {
                ...state,
                category: [...state.category.filter(a => a.nameRus !== action.name)]
            }
        case RENAME_CATEGORY:
            return {
                ...state,
                category: [...state.category.map(a => {
                    if (a.nameRus === action.name) {
                        return ({
                            ...a,
                            nameRus: `${action.rename[0].toUpperCase() + action.rename.slice(1)}`
                        })
                    }
                    else return a
                })]
            }
        case CHANGE_RELATIVITY:
            return {
                ...state,
                relativity: {
                    name: action.name,
                    unit: action.unit,
                    price: Number(action.price),
                    case: action.array
                }
            }
        case ADD_TEXT:
            return {
                ...state,
                text: action.text
            }

        default:
            return state
    }
}


export const addText = (text) => {
    return { type: ADD_TEXT, text }
}

export const changeRelativity = (name, unit, price, array) => {
    return { type: CHANGE_RELATIVITY, name, unit, price , array}
}

export const addCategory = (name, color) => {
    return { type: ADD_CATEGORY, name, color }
}
export const deleteCategory = (name) => {
    return { type: DELETE_CATEGORY, name }
}
export const renameCategory = (name, rename) => {
    return { type: RENAME_CATEGORY, name, rename }
}

export const addDollar = (dollar, data) => {
    return { type: ADD_DOLLAR, dollar, data }
}
export const addEuro = (euro, data) => {
    return { type: ADD_EURO, euro, data }
}
export const addDiagramm = (name, value, time) => {
    return { type: ADD_DIAGRAMM, name, value, time }
}
export const addActiv = (activ) => {
    return { type: ADD_ACTIV, activ }
}
export const addSalary = (salary, months) => {
    return { type: ADD_SALARY, salary, months }
}
export const addPeriodS = (periodS) => {
    return { type: ADD_PERIOD_S, periodS }
}
export const addPeriodPo = (periodPo) => {
    return { type: ADD_PERIOD_PO, periodPo }
}
export const addPeriodSTime = (periodSTime) => {
    return { type: ADD_PERIOD_S_TIME, periodSTime }
}
export const addPeriodPoTime = (periodPoTime) => {
    return { type: ADD_PERIOD_PO_TIME, periodPoTime }
}
export const addEditColor = (editColor, name) => {
    return { type: ADD_EDIT_COLOR, editColor, name }
}
export const addSelectDiagramm = (selectDiagramm) => {
    return { type: ADD_SELECT_DIAGRAMM, selectDiagramm }
}
export const addSelectDiagrammStat = (selectDiagrammStat) => {
    return { type: ADD_SELECT_DIAGRAMM_STAT, selectDiagrammStat }
}
export const addSalaryValueTrue = (value) => {
    return { type: ADD_SALARY_VALUE_TRUE, value }
}
export const addNameCase = (data, name) => {
    return { type: ADD_NAME_CASE, data, name }
}





export const getDollarUpdate = () => (dispatch) => {

    getDollar().then(data => {
        dispatch(addDollar(data.Cur_OfficialRate, data.Date))
    })
}
export const getEuroUpdate = () => (dispatch) => {
 
    getEuro().then(data => {
        dispatch(addEuro(data.Cur_OfficialRate, data.Date))
    })
}

export const nameCase = (name) => (dispatch) => {

    getItem(name).then(data => {
        dispatch(addNameCase(data.В, name) )
        })
    }
export const nameCaseRelativity = (name,unit,prise) => (dispatch) => {

        getItem(name).then(data => {
            dispatch(changeRelativity(data.Р, unit,prise, [data.Р,data.множественное.Р,name]) )
            })
        }



export default diagrammReduser