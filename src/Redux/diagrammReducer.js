import { getDollar, getEuro, getItem } from './../API/api';


const ADD_DIAGRAMM = 'ADD_DIAGRAMM'
const ADD_ACTIV = 'ADD_ACTIV'

const ADD_PERIOD_S = 'ADD_PERIOD_S'
const ADD_PERIOD_PO = 'ADD_PERIOD_PO'
const ADD_TABLE_SELECT = 'ADD_TABLE_SELECT'

const ADD_SELECT_DIAGRAMM = 'ADD_SELECT_DIAGRAMM'

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

// Графики
const ADD_GRAF_SELECT_VALUTA = 'ADD_GRAF_SELECT_VALUTA'
const ADD_GRAF_S = 'ADD_GRAF_S'
const ADD_GRAF_PO = 'ADD_GRAF_PO'
const ADD_GRAF_SELECT = 'ADD_DIAGRAMM_SELECT'

// Диаграмма
const ADD_DIAGRAMM_S = 'ADD_DIAGRAMM_S'
const ADD_DIAGRAMM_PO = 'ADD_DIAGRAMM_PO'
const ADD_PROBLEM_SELECT = 'ADD_PROBLEM_SELECT'

const ADD_SALARY_DAY = 'ADD_SALARY_DAY'
const ADD_SALARY_MONTH = 'ADD_SALARY_MONTH'

const ADD_INCOME = 'ADD_INCOME'

// Сегодняшняя дата 

const ADD_TODAY_S = 'ADD_TODAY_S'
const ADD_TODAY_PO = 'ADD_TODAY_PO'

// Сообщение ежа
const ACTIV_HEDGEHOG = 'ACTIV_HEDGEHOG'


let initialState = {
    category:
        [{
            nameRus: 'Еда', nameRusСase: 'Еду', color: '#fde23e', idCategory: 10000,
            data: [
                { id: 10001, time: '2022-02-01', num: 100 },
                { id: 10002, time: '2022-02-10', num: 20 },
                { id: 10003, time: '2022-02-12', num: 20 },
                { id: 10004, time: '2022-02-13', num: 25 },
                { id: 10005, time: '2022-02-14', num: 52 }
            ], summ: 217
        },
        {
            nameRus: 'Алкоголь', nameRusСase: 'Алкоголь', color: '#2222d1', idCategory: 20000,
            data: [{ id: 20001, time: '2022-02-08', num: 40 }], summ: 40
        },
        {
            nameRus: 'Квартира', nameRusСase: 'Квартиру', color: '#57d9ff', idCategory: 30000,
            data: [{ id: 30001, time: '2022-02-11', num: 15 }], summ: 15
        },
        {
            nameRus: 'Транспорт', nameRusСase: 'Транспорт', color: '#169928', idCategory: 40000,
            data: [{ id: 40001, time: '2022-02-09', num: 25 }], summ: 25
        }
        ],
    activ: {
        id: '',
        name: ''
    },
    income: {
        data: [ 
            {name: 'Другие', color:'#7a3232', data:[{ time: '2022-01-15', num: 50, id: 10000 }]},
        {name: 'Зарплата',color:'#12911c', data:[
            { time: '2022-02-04', num: 400, id: 20000 },
            { time: '2022-03-01', num: 700, id: 20001 }]},
        {name: 'Аванс', color:'#c98a2d', data:[{ time: '2022-03-05', num: 200, id: 30000 }]}
        
    ],
        total: 700,
        salary: { Date: { day: '01', month: '03' }},
        prepayment: { Date: { day: '20', month: '03' }},
    },


    periodPo: '',
    periodS: '',
    tableSelect: 'расходов',


    selectDiagramm: 'BYN',
   
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
    text: 'Привет...',
    grafSelectValuta: 'BYN',
    grafSelect: 'расходов',
    grafs: {
        sGrafs: '',
        poGrafs: ''
    },
    selectDiagrammStat: 'BYN',
    diagrammSelect: 'расходов',
    diagramm: {
        s: '',
        po: ''
    },
    today:{
        s:'',
        po:''
    },
    activHedgehog: ''
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
                                    id: a.idCategory + (a.data.length + 1), time: action.time,
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
                ...state, activ: {
                    name: action.activ,
                    id: action.activ
                        ? state.category.filter(a => a.nameRus === action.activ)[0].idCategory
                        : ''
                }
            }


// Статистика
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
            case ADD_TABLE_SELECT:
                return {
                    ...state,
                    tableSelect: action.select
                }

        
     

        case ADD_SELECT_DIAGRAMM:
            return {
                ...state, selectDiagramm: action.selectDiagramm
            }
        case ADD_SELECT_DIAGRAMM_STAT:
            return {
                ...state, selectDiagrammStat: action.selectDiagrammStat
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
                        Date: action.data.slice(0, -9)
                    },
                    euro: { ...state.exchangeRates.euro }
                }
            }
        case ADD_EURO:
            return {
                ...state,
                exchangeRates: {
                    dollar: { ...state.exchangeRates.dollar },
                    euro: {
                        Cur_OfficialRate: action.euro,
                        Date: action.data.slice(0, -9)
                    }
                }
            }
        case ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, {
                    nameRus: `${action.name[0].toUpperCase() + action.name.slice(1)}`,
                    nameRusСase: '',
                    color: action.color,
                    idCategory: state.category[0].idCategory * (state.category.length + 1),
                    data: [],
                    summ: 0
                }]
            }
        case ADD_NAME_CASE:
            return {
                ...state,
                category: [...state.category.map(a => {
                    if (a.nameRus.toLowerCase() === action.name.toLowerCase()) {
                        return ({ ...a, nameRusСase: `${action.data[0].toUpperCase() + action.data.slice(1)}` })
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


 // График
        case ADD_GRAF_SELECT_VALUTA:
            return {
                ...state,
                grafSelectValuta: action.select
            }

        case ADD_GRAF_S:
            return {
                ...state,
                grafs: {...state.grafs,
                    sGrafs: action.data
                }
            }
        case ADD_GRAF_PO:
            return {
                ...state,
                grafs: {
                    ...state.grafs,
                    poGrafs: action.data
                }
            }
            case  ADD_GRAF_SELECT:
                return {
                    ...state,
                    grafSelect: action.select
                }


           

// Диаграмма
        case ADD_DIAGRAMM_S:
            return {
                ...state,
                diagramm: {
                    s: action.data,
                    po: state.diagramm.po
                }
            }
        case ADD_DIAGRAMM_PO:
            return {
                ...state,
                diagramm: {
                    s: state.diagramm.s,
                    po: action.data
                }
            }
        case ADD_PROBLEM_SELECT:
                return {
                    ...state,
                    diagrammSelect: action.select
                }
        case ADD_SALARY_DAY:
            return {
                ...state,
                income: {
                    ...state.income,
                    salary:  {
                        Date: action.name === 'Зарплата'
                        ? { ...state.income.salary.Date,
                            day: action.day 
                        }
                        : {...state.income.salary.Date}  
                    },
                    prepayment: {
                        Date: action.name === 'Аванс'
                        ? { ...state.income.prepayment.Date,
                            day: action.day 
                        }
                        : {...state.income.prepayment.Date}  
                    }
                }
            }
        case ADD_SALARY_MONTH:
            return {
                ...state,
                income: {
                    ...state.income,
                    salary: {
                        Date: action.name === 'Зарплата'
                       ? {
                            ...state.income.salary.Date,
                            month: action.month < 10
                                ? `0${action.month}`
                                : action.month
                        }
                        : {...state.income.salary.Date} 
                    },
                    prepayment: {
                        Date: action.name === 'Аванс'
                       ? {   ...state.income.prepayment.Date,
                            month: action.month < 10
                                ? `0${action.month}`
                                : action.month
                        }
                        : {...state.income.prepayment.Date} 
                    }

                }
            }

        case ADD_INCOME:
            const numValuta = () => {
                if (action.valuta === "BYN") {
                    return action.num
                }
                else if (action.valuta === "USD") {
                    return (action.num * state.exchangeRates.dollar.Cur_OfficialRate).toFixed(2)
                }
                else if (action.valuta === "EUR") {
                    return (action.num * state.exchangeRates.euro.Cur_OfficialRate).toFixed(2)
                }
            }
            let num = numValuta()
           
            state.income.data.find(a => a.name===action.name).data.push(
                {time: action.time,
                num: Number(num),
                id:  state.income.data.find(a => a.name===action.name).data[0].id + 
                state.income.data.find(a => a.name===action.name).data.length}
                )
            return {
                ...state,
                income: {
                    ...state.income,
                    total: state.income.total + Number(num)
                }
            }

            case  ADD_TODAY_S:
                return {
                    ...state,
                    today: {
                        ...state.today,
                        s: action.date
                    }
                }
                case  ADD_TODAY_PO:
                    return {
                        ...state,
                    today: {
                        ...state.today,
                        po: action.date
                    }
                }

// Сообщение ежа
                case  ACTIV_HEDGEHOG:
                    return {
                        ...state,
                    activHedgehog:  action.activ
                }





        default:
            return state
    }
}




export const addActivHedgehog = (activ) => {
    
    let qqq = document.getElementById("myPopup")
  
    setTimeout(()=> {
        qqq.focus()
    },500)
   
    return { type: ACTIV_HEDGEHOG, activ }
}

// Сегодняшняя дата 
export const addTodayS = (date) => {
    return { type: ADD_TODAY_S, date }
}
export const addTodayPo = (date) => {
    return { type: ADD_TODAY_PO, date }
}



// Графики
export const addGrafSelectValuta = (select) => {
    return { type: ADD_GRAF_SELECT_VALUTA, select }
}
export const addGrafS = (data) => {
    return { type: ADD_GRAF_S, data }
}
export const addGrafPo = (data) => {
    return { type: ADD_GRAF_PO, data }
}
export const addGrafSelect = (select) => {
    return { type: ADD_GRAF_SELECT, select }
}




// Диаграмма
export const addDiagrammS = (data) => {
    return { type: ADD_DIAGRAMM_S, data }
}
export const addDiagrammPo = (data) => {
    return { type: ADD_DIAGRAMM_PO, data }
}
export const addDiagrammSelect = (select) => {
    return { type: ADD_PROBLEM_SELECT, select }
}




export const addSalaryDay = (name, day) => {
    return { type: ADD_SALARY_DAY, name, day }
}
export const addSalaryMonth = (name, month) => {
    return { type: ADD_SALARY_MONTH, name, month }
}




export const addIncome = (name, time, num, valuta) => {
    return { type: ADD_INCOME, name, time, num, valuta }
}




export const addText = (text) => {
    return { type: ADD_TEXT, text }
}

export const changeRelativity = (name, unit, price, array) => {
    return { type: CHANGE_RELATIVITY, name, unit, price, array }
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

// Статистика
export const addPeriodS = (periodS) => {
    return { type: ADD_PERIOD_S, periodS }
}
export const addPeriodPo = (periodPo) => {
    return { type: ADD_PERIOD_PO, periodPo }
}
export const addTableSelect = (select) => {
    return { type: ADD_TABLE_SELECT, select }
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
        dispatch(addNameCase(data.В, name))
    })
}
export const nameCaseRelativity = (name, unit, prise) => (dispatch) => {

    getItem(name).then(data => {
        dispatch(changeRelativity(data.Р, unit, prise, [data.Р, data.множественное.Р, name]))
    })
}



export default diagrammReduser