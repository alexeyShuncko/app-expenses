import {
    createToken, createUser, postDataUser, postRelativity, postSources, Users,
    postСategories
} from "../API/api"

const ADD_USERS = 'ADD_USERS'
const ADD_ACTION_USER = 'ADD_ACTION_USER'
const ADD_LOGIN = 'ADD_LOGIN'


let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU4OTEwMTg1LCJqdGkiOiJhN2UxODgyYzVhOGU0YzAxYTBjNjRjYTk1YzdiMjNkYiIsInVzZXJfaWQiOjJ9._kZ92ITOOrlRdZtOqZK2oh3chllGqjmvg72CyY6KwHw'


let initialState = {
    users: '',
    actionUser: { username: 'Валера', email: '@awdawd' },
    login: false,
    test: {
        password: 'test1234Q'
    }
}



const profileReducer = (state = initialState, action) => {


    switch (action.type) {


        case ADD_USERS:
            return {
                ...state,
                users: action.data
            }

        case ADD_ACTION_USER:
            return {
                ...state,
                actionUser: action.data
            }
        case ADD_LOGIN:
            return {
                ...state,
                login: action.data
            }


        default:
            return state
    }
}



export const addUsers = (data) => {
    return { type: ADD_USERS, data }
}
export const addActionUser = (data,) => {
    return { type: ADD_ACTION_USER, data }
}
export const updateLogin = (data,) => {
    return { type: ADD_LOGIN, data }
}



export const getUser = () => (dispatch) => {
    Users(token)
        .then(data => dispatch(addUsers(data)))
}



export const registration = (name, password, email) => (dispatch) => {
    createUser(name, password, email)
        .then(data => dispatch(addActionUser(data)))
        .then(() => createToken(name, password, email))
        .then(data => {
            localStorage.removeItem('key')
            localStorage.setItem('key', data.access)})
        .then(() => dispatch(updateLogin('login')))
        .then(() => {

            postRelativity('сахара', 'килограмм', 2.02, {
                name1: 'сахара',
                name2: 'сахаров',
                name3: 'сахара'
            })

            postSources('Зарплата', 'rgb(18, 145, 28)')
            postSources('Аванс', 'rgb(201, 138, 45)')
            postSources('Другие', 'rgb(224, 83, 118)')

            postСategories('Еда', 'Еду', 'rgb(253, 226, 62)')
            postСategories('Алкоголь', 'Алкоголь', 'rgb(33, 33, 209)')
            postСategories('Квартира', 'Квартиру', 'rgb(87, 217, 255)')
            postСategories('Транспорт', 'Транспорт', 'rgb(22, 153, 40)')
        })
}

export const login = (name, password) => (dispatch) => {

    if (name === 'test') {
        localStorage.removeItem('key')
        localStorage.setItem('key', token)
    }
    postDataUser(localStorage.getItem('key'))
        .then(() => dispatch(updateLogin(true)))
}








export default profileReducer