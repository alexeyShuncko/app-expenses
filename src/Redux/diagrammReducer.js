
import {
    getDollar, getEuro, getСategories, getItem, getSources, postIncomes,
    postСategories, postExpenses, deleteСategories, putСategories, getSalary, postSalary,
    getRelatiity,
    postRelatiity
} from './../API/api';


const ADD_DIAGRAMM = 'ADD_DIAGRAMM'
const ADD_ACTIV = 'ADD_ACTIV'


const ADD_SOURCE = 'ADD_SOURCE'
const ADD_CATEGORIES = 'ADD_CATEGORIES'
const ADD_SALARY = 'ADD_SALARY'
const ADD_RELATIV = 'ADD_RELATIV'



const ADD_PERIOD = 'ADD_PERIOD'
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
const ADD_GRAF_SELECT = 'ADD_DIAGRAMM_SELECT'

// Диаграмма
const ADD_PROBLEM_SELECT = 'ADD_PROBLEM_SELECT'

const ADD_SALARY_DAY = 'ADD_SALARY_DAY'
const ADD_SALARY_MONTH = 'ADD_SALARY_MONTH'

// Сегодняшняя дата 

const ADD_TODAY_S = 'ADD_TODAY_S'
const ADD_TODAY_PO = 'ADD_TODAY_PO'

// Сообщение ежа
const ACTIV_HEDGEHOG = 'ACTIV_HEDGEHOG'


let initialState = {
    category:
        [{
            name: 'Еда', nameRusСase: 'Еду', color: 'rgb(253, 226, 62)', id: 1,
            data: [
                { id: 10001, created: '2022-04-01', amount: 100 },
                { id: 10002, created: '2022-04-10', amount: 20 },
                { id: 10003, created: '2022-04-12', amount: 20 },
                { id: 10004, created: '2022-04-13', amount: 25 },
                { id: 10005, created: '2022-04-14', amount: 45 }
            ], summ: 217
        },
        {
            name: 'Алкоголь', nameRusСase: 'Алкоголь', color: 'rgb(33, 33, 209)', id: 2,
            data: [{ id: 20001, created: '2022-04-08', amount: 40 }], summ: 40
        },
        {
            name: 'Квартира', nameRusСase: 'Квартиру', color: 'rgb(87, 217, 255)', id: 3,
            data: [{ id: 30001, created: '2022-04-11', amount: 15 }], summ: 15
        },
        {
            name: 'Транспорт', nameRusСase: 'Транспорт', color: 'rgb(22, 153, 40)', id: 4,
            data: [{ id: 40001, created: '2022-04-09', amount: 25 }], summ: 25
        }
        ],
    activ: {
        id: 1,
        name: 'Еда'
    },
    income: {
        data: [
            {
                name: 'Другие', color: 'rgb(224, 83, 118)', id: 1,
                data: [{ id: 1, created: '2022-04-12', amount: 10 }]
            },
            {
                name: 'Зарплата', color: 'rgb(18, 145, 28)', id: 2,
                data: [{ id: 2, created: '2022-04-09', amount: 15 }]
            },
            {
                name: 'Аванс', color: 'rgb(201, 138, 45)', id: 3,
                data: [{ id: 3, created: '2022-04-10', amount: 25 }]
            }
        ],
        salary: [
            { id: 1, salary_day: '01', salary_month: '04' },
            { id: 2,  salary_day: '02', salary_month: '04' }
        ]
     
    },

    period: [
        { name: 'table', S: '', Po: '' },
        { name: 'graf', S: '', Po: '' },
        { name: 'diagramm', S: '', Po: '' }
    ],

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
    today: {
        s: '',
        po: ''
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
                    name: action.activ
                        ? action.activ
                        : state.category[0].name,
                    id: action.activ
                        ? state.category.filter(a => a.name === action.activ)[0].id
                        : state.category[0].id
                }
            }


        // Статистика
        case ADD_PERIOD:

            return {
                ...state,
                period: [...state.period.map(a => {
                    if (a.name === action.key) {
                        return ({
                            ...a,
                            S: action.period[0],
                            Po: action.period[1],
                        })

                    }
                    else return a
                })
                ]
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
                        if (a.nameRus === action.name) {
                            return ({ ...a, color: action.editColor })
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
        case ADD_GRAF_SELECT:
            return {
                ...state,
                grafSelect: action.select
            }




        // Диаграмма

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
                    salary: {
                        Date: action.name === 'Зарплата'
                            ? {
                                ...state.income.salary.Date,
                                day: action.day
                            }
                            : { ...state.income.salary.Date }
                    },
                    prepayment: {
                        Date: action.name === 'Аванс'
                            ? {
                                ...state.income.prepayment.Date,
                                day: action.day
                            }
                            : { ...state.income.prepayment.Date }
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
                            : { ...state.income.salary.Date }
                    },
                    prepayment: {
                        Date: action.name === 'Аванс'
                            ? {
                                ...state.income.prepayment.Date,
                                month: action.month < 10
                                    ? `0${action.month}`
                                    : action.month
                            }
                            : { ...state.income.prepayment.Date }
                    }

                }
            }

        case ADD_TODAY_S:
            return {
                ...state,
                today: {
                    ...state.today,
                    s: action.date
                }
            }
        case ADD_TODAY_PO:
            return {
                ...state,
                today: {
                    ...state.today,
                    po: action.date
                }
            }

        // Сообщение ежа
        case ACTIV_HEDGEHOG:
            return {
                ...state,
                activHedgehog: action.activ
            }

        case ADD_SOURCE:
            return {
                ...state,
                income: {
                    ...state.income,
                    data: action.data
                }
            }
        case ADD_CATEGORIES:
            return {
                ...state,
                category: action.data
            }
            case ADD_SALARY:
                return {
                    ...state,
                    income: {
                        ...state.income,
                        salary: action.salary
                    }
                }


            
        default:
            return state
    }
}




export const addActivHedgehog = (activ) => {

    let qqq = document.getElementById("myPopup")

    setTimeout(() => {
        qqq.focus()
    }, 500)

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
export const addGrafSelect = (select) => {
    return { type: ADD_GRAF_SELECT, select }
}




// Диаграмма
export const addDiagrammSelect = (select) => {
    return { type: ADD_PROBLEM_SELECT, select }
}




export const addSalaryDay = (name, day) => {
    return { type: ADD_SALARY_DAY, name, day }
}
export const addSalaryMonth = (name, month) => {
    return { type: ADD_SALARY_MONTH, name, month }
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
// export const addDiagramm = (name, value, time) => {
//     return { type: ADD_DIAGRAMM, name, value, time }
// }
export const addActiv = (activ) => {
    return { type: ADD_ACTIV, activ }
}

// Статистика
export const addPeriod = (key, period) => {
    return { type: ADD_PERIOD, key, period }
}
export const addTableSelect = (select) => {
    return { type: ADD_TABLE_SELECT, select }
}



export const addEditColor = (name, editColor) => {
    return { type: ADD_EDIT_COLOR, name, editColor }
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



export const addSource = (data) => {
    return { type: ADD_SOURCE, data }
}
export const addCategories = (data) => {
    return { type: ADD_CATEGORIES, data }
}

export const addSalary = (salary) => {
    return { type: ADD_SALARY, salary }
}
export const addRelativ = (salary) => {
    return { type: ADD_RELATIV, salary }
}






export const sources = () => (dispatch) => {
    getSources()
        .then(data =>
            dispatch(addSource(data)))
}

export const addIncome = (created, amount, category) => (dispatch) => {

    postIncomes(created, amount, category)
        .then(() => dispatch(sources()))
}

export const categories = () => (dispatch) => {
    getСategories()
        .then(data =>
            dispatch(addCategories(data)))
}

export const addDiagramm = (data) => (dispatch) => {

    postExpenses(data)
        .then(() => dispatch(categories()))
}







// Настройки 

// Добавление категории

export const itemCategories = (name, color) => (dispatch) => {
    getItem(name)
        .then(data => postСategories(name, data.В, color))
        .then(() => dispatch(categories()))
}

// Удаление категории

export const deleteItemCategories = (id) => (dispatch) => {
    deleteСategories(id)
        .then(() => dispatch(categories()))
}

// Переименование категории

export const updateItemCategories = (name, color, id) => (dispatch) => {
    getItem(name)
        .then(data => putСategories(name, data.В, color, id))
        .then(() => dispatch(categories()))
}

// Изменение цвета категории

export const updateColor = (name, nameRusСase, color, id) => (dispatch) => {
     putСategories(name, nameRusСase, color, id)
        .then(() => dispatch(categories()))
}

// Дата зарплаты

export const salary = () => (dispatch) => {
    getSalary()
        .then(data =>
            dispatch(addSalary(data)))
}
export const updateSalary = (day, month, id) => (dispatch) => {
    postSalary(day, month, id)
        .then(() => dispatch(salary()))
}



// Относительная величина 

export const relativ = () => (dispatch) => {
    getRelatiity()
        .then(data =>
            dispatch(addRelativ(data)))
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

    getItem(name)
        .then(data => dispatch(addNameCase(data.В, name)))
}

export const nameCaseRelativity = (name, unit, prise) => (dispatch) => {

    getItem(name).then(data => {
        dispatch(changeRelativity(data.Р, unit, prise, [data.Р,
        data.множественное
            ? data.множественное.Р
            : data.Р,
            name]))
    })
}



export default diagrammReduser