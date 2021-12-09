import { getDollar } from './../API/api';


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
const ADD_SELECT_DIAGRAMM_STAT = 'ADD_SELECT_DIAGRAMM_STAT'
const ADD_CATEGORY ='ADD_CATEGORY'
const DELETE_CATEGORY ='DELETE_CATEGORY'
const RENAME_CATEGORY ='RENAME_CATEGORY'




let initialState = {
    category: 
    [{
         nameRus: 'Еда', color: '#fde23e',
        data: [
            { id: 1, time: '2021-11-28 19:05', num: 10 },
            { id: 2, time: '2021-12-01 14:59', num: 20 },
            { id: 3, time: '2021-12-01 15:01', num: 20 },
            { id: 4, time: '2021-12-01 15:02', num: 25 },
            { id: 5, time: '2021-12-01 15:06', num: 52 }
        ], summ: 127
    },
     {  nameRus: 'Алкоголь', color: '#2222d1', data: [{ id: 1, time: '2021-11-28 19:04', num: 40 }], summ: 40 },
     {  nameRus: 'Квартира', color: '#57d9ff', data: [{ id: 1, time: '2021-11-28 19:03', num: 25 }], summ: 25 },
     {  nameRus: 'Транспорт', color: '#169928', data: [{ id: 1, time: '2021-11-28 19:02', num: 25 }], summ: 25 }],
    activ: '',
    salary: { salaryNum: 700.01, salaryDate: '2021-11-09', salaryValueTrue: false },
    periodPo: '',
    periodS: '',
    periodPoTime: '23:59',
    periodSTime: '00:01',
    selectDiagramm: '%',
    selectDiagrammStat: '%',
    dollar: {
        Cur_OfficialRate: '',
        Date: ''
    }
}

const diagrammReduser = (state = initialState, action) => {


    switch (action.type) {

        case ADD_DIAGRAMM:
            return {
                ...state,
                category: [
                    ...state.category.map(a => {
                        if (a.nameRus === action.name) {
                            return ({...a,
                                    data: [...a.data, {
                                        id: a.nameRus + String(a.data.length+1), time: action.time,
                                        num: Number(action.value)
                                    }],
                                    summ: a.summ + Number(action.value)})
                        }
                        else return a})]
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

                    salaryDate: state.salary.salaryValueTrue === false ? `2021-${action.months + 1}-09 ` : state.salary.salaryDate,
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
                        if (a.nameRus === action.qqq) {
                            return ({...a, color: action.editColor})
                        }
                        else return a })]
            }
        case ADD_DOLLAR:
            return {
                ...state,
                dollar: {...state.dollar,
                    Cur_OfficialRate: action.dollar,
                    Date: action.data.slice(0, -9)
                }
            }
            case ADD_CATEGORY:
                return {
                    ...state,
                  category:  [...state.category, { nameRus: action.name, color: action.color,
                      data: [ ], summ: 0 }]
                }

                case DELETE_CATEGORY:
                    return {
                        ...state,
                      category:  [ ...state.category.filter(a => a.nameRus !== action.name)]
                    }
                    case RENAME_CATEGORY:
                        return {
                            ...state,
                          category:  [ ...state.category.map(a =>  {
                              if (a.nameRus === action.name) {
                            return ({...a,
                                nameRus: action.rename})}
                        else return a})]
                        }

        default:
            return state
    }
}

export const addCategory = (name,color) => {
    return { type: ADD_CATEGORY, name, color}
}
export const deleteCategory = (name) => {
    return { type: DELETE_CATEGORY, name}
}
export const renameCategory = (name, rename) => {
    return { type: RENAME_CATEGORY, name, rename}
}

export const addDollar = (dollar,data) => {
    return { type: ADD_DOLLAR, dollar,data }
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
export const addEditColor = (editColor, qqq) => {
    return { type: ADD_EDIT_COLOR, editColor, qqq }
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


export const getDollarUpdate = () => (dispatch) => {

    getDollar().then(data => {
        dispatch(addDollar(data.Cur_OfficialRate, data.Date))
    })

}

export default diagrammReduser