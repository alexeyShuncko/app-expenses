import {
    getDollar, getEuro, getСategories, getItem, getSources, postIncomes,
    postСategories, postExpenses, deleteСategories, putСategories, getSalary, putSalary,
    getRelativity,
    postRelativity,
    getRuble,
    deleteRecording
} from './../API/api';


// ГЛАВНАЯ
// Диаграмма
const ADD_SELECT_DIAGRAMM = 'ADD_SELECT_DIAGRAMM'
// Добавление курса валют
const ADD_DOLLAR = 'ADD_DOLLAR'


// СТАТИСТИКА
const ADD_ACTIV = 'ADD_ACTIV'
const ADD_PERIOD = 'ADD_PERIOD'
const ADD_TABLE_SELECT = 'ADD_TABLE_SELECT'
const TABLE_VALUTA = 'TABLE_VALUTA'
const TABLE_TOTAL_VALUTA = 'TABLE_TOTAL_VALUTA'

// ГРАФИК
const ADD_GRAF_SELECT_VALUTA = 'ADD_GRAF_SELECT_VALUTA'
const ADD_GRAF_SELECT = 'ADD_DIAGRAMM_SELECT'

// ДИАГРАММА
const ADD_PROBLEM_SELECT = 'ADD_PROBLEM_SELECT'
const ADD_SELECT_DIAGRAMM_STAT = 'ADD_SELECT_DIAGRAMM_STAT'

// Работа с сервером
const ADD_SOURCE = 'ADD_SOURCE'
const ADD_CATEGORIES = 'ADD_CATEGORIES'
const ADD_SALARY = 'ADD_SALARY'
const ADD_RELATIV = 'ADD_RELATIV'

// Сегодняшняя дата -33дня
const ADD_TODAY_S = 'ADD_TODAY_S'
const ADD_TODAY_PO = 'ADD_TODAY_PO'

// Сообщение ежа
const ADD_TEXT = 'ADD_TEXT'
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
    activ: '',
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
            { source: 1, salary_day: '01', salary_month: '13' }, //зарплата
            { source: 3, salary_day: '02', salary_month: '13' } // аванс
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
        euro: { Cur_OfficialRate: '2.9', Date: '' },
        ruble: { Cur_OfficialRate: '4.45', Date: '' },
    },
    relativity:
    {
        name: 'сахара',
        value: 'килограмм',
        amount: 2.02,
        case: ['сахара', 'сахаров', 'сахара']
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
    activHedgehog: '',
    tableSelectValuta: 'BYN', 
    tableTotalSelectValuta: 'BYN', 
}

const diagrammReduser = (state = initialState, action) => {

    switch (action.type) {

        // ГЛАВНАЯ
        // Диаграмма
        case ADD_SELECT_DIAGRAMM:
            return {
                ...state, selectDiagramm: action.selectDiagramm
            }

        // Курсы валют 
        
        case ADD_DOLLAR:
            return {
                ...state,
                exchangeRates: {
                    dollar: {
                        Cur_OfficialRate: action.data[0].Cur_OfficialRate,
                        Date: action.data[0].Date.slice(0, -9)
                    },
                    euro:  {
                        Cur_OfficialRate: action.data[1].Cur_OfficialRate,
                        Date: action.data[1].Date.slice(0, -9)
                    },
                    ruble: {
                        Cur_OfficialRate: action.data[2].Cur_OfficialRate,
                        Date: action.data[2].Date.slice(0, -9)
                    },
                }
            }


        // СТАТИСТИКА
        //   Выбор категории
        case ADD_ACTIV:

            return {
                ...state, activ: action.data
            }

        //   Выбор периода
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

        // Таблица
        case ADD_TABLE_SELECT:
            return {
                ...state,
                tableSelect: action.select
            }
        case TABLE_VALUTA:
                return {
                    ...state,
                    tableSelectValuta: action.valuta
                }
        case TABLE_TOTAL_VALUTA:
                return {
                     ...state,
                    tableTotalSelectValuta: action.valuta
                    }


        // ГРАФИК
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

        // ДИАГРАММА
        case ADD_SELECT_DIAGRAMM_STAT:
            return {
                ...state, selectDiagrammStat: action.selectDiagrammStat
            }

        case ADD_PROBLEM_SELECT:
            return {
                ...state,
                diagrammSelect: action.select
            }

        //  Сегодняшняя дата -33 дня
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
        case ADD_TEXT:
            return {
                ...state,
                text: action.text
            }

        // РАБОТА С СЕРВЕРОМ
        // Доходы
        case ADD_SOURCE:
            return {
                ...state,
                income: {
                    ...state.income,
                    data: action.data
                }
            }

        // Расходы
        case ADD_CATEGORIES:
            return {
                ...state,
                category: action.data
            }

        // Дата ЗП            
        case ADD_SALARY:
            return {
                ...state,
                income: {
                    ...state.income,
                    salary: action.salary
                }
            }

        // Относительная величина            
        case ADD_RELATIV:
            return {
                ...state,
                relativity: action.data
            }

        default:
            return state
    }
}


// Главная
export const addSelectDiagramm = (selectDiagramm) => {
    return { type: ADD_SELECT_DIAGRAMM, selectDiagramm }
}
export const addDollar = ( data) => {
    return { type: ADD_DOLLAR, data }
}



// Статистика
export const addActiv = (data) => {
    return { type: ADD_ACTIV, data }
}
export const addPeriod = (key, period) => {
    return { type: ADD_PERIOD, key, period }
}
export const addTableSelect = (select) => {
    return { type: ADD_TABLE_SELECT, select }
}
export const tableValuta = (valuta) => {
    return { type: TABLE_VALUTA, valuta }
}
export const tableTotalValuta = (valuta) => {
    return { type: TABLE_TOTAL_VALUTA, valuta }
}


// График
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
export const addSelectDiagrammStat = (selectDiagrammStat) => {
    return { type: ADD_SELECT_DIAGRAMM_STAT, selectDiagrammStat }
}

// Сегодняшняя дата 
export const addTodayS = (date) => {
    return { type: ADD_TODAY_S, date }
}
export const addTodayPo = (date) => {
    return { type: ADD_TODAY_PO, date }
}

// Сообщение ежа
export const addActivHedgehog = (activ) => {

    let qqq = document.getElementById("myPopup")
    setTimeout(() => qqq.focus(), 500)

    return { type: ACTIV_HEDGEHOG, activ }
}
export const addText = (text) => {
    return { type: ADD_TEXT, text }
}

// Работа с сервером
export const addSource = (data) => {
    return { type: ADD_SOURCE, data }
}
export const addCategories = (data) => {
    return { type: ADD_CATEGORIES, data }
}

export const addSalary = (salary) => {
    return { type: ADD_SALARY, salary }
}
export const addRelativ = (data) => {
    return { type: ADD_RELATIV, data }
}






// Доходы
export const sources = () => (dispatch) => {
    getSources()
        .then(data => {
            dispatch(addSource(data))})
}
// Добавление отдельного дохода
export const addIncome = (created, amount, category) => (dispatch) => {
    postIncomes(created, amount, category)
        .then(() => dispatch(sources()))
}
// Расходы
export const categories = () => (dispatch) => {
    getСategories()
        .then(data => {
            dispatch(addCategories(data.sort((a, b) => a.id - b.id)))
            dispatch(addActiv(data[0]))
        }) 
}

// Добавление отдельного расхода\дов
export const addDiagramm = (data) => (dispatch) => {
    postExpenses(data)
        .then(() => dispatch(categories()))
}

// НАСТРОЙКИ
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
export const updateItemCategories = (name, color, id, activID) => (dispatch) => {
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
        .then(data => dispatch(addSalary(data)))
}
export const updateSalary = (day, month, id, user) => (dispatch) => {
    putSalary(day, month, id, user)
        .then(() => dispatch(salary()))
}

// Относительная величина
export const relativ = () => (dispatch) => {
    getRelativity()
        .then(data => dispatch(addRelativ(data)))
}
export const nameCaseRelativity = (name, unit, prise) => (dispatch) => {
    getItem(name)
        .then(data => postRelativity(data.Р, unit, prise, {
            "name1": data.Р,
            "name2": data.множественное
                ? data.множественное.Р
                : data.Р,
            "name3": name
        }))
        .then(() => dispatch(relativ()))
}

// Курсы валюты

export const getValute = () => (dispatch) => {
    return new Promise((resolve, reject) => {
    Promise.all([ getDollar(), getEuro(),getRuble() ])
    .then((values)=> {
        dispatch(addDollar(values))
        resolve()})
    })
}


export const deleteAppRecording = (category,id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        deleteRecording(category,id)
        .then(data=> {
            if (category === 'expenses') {
                dispatch(categories())
            }
            else {
                dispatch(sources())
            }
            resolve()
        })
})
}




export default diagrammReduser