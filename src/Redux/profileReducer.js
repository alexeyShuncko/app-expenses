import {
    createToken, createUser, postDataUser, postRelativity, postSources, Users,
    postСategories,
    postSalary
} from "../API/api"

const ADD_USERS = 'ADD_USERS'
const ADD_ACTION_USER = 'ADD_ACTION_USER'
const ADD_LOGIN = 'ADD_LOGIN'
const ADD_FIRST_LOGIN = 'ADD_FIRST_LOGIN'


let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1MTUxMzY3LCJqdGkiOiIyNjdlN2IwMzcxYzA0MTZkOTUyZGY2OWRlODQ2YjE1ZSIsInVzZXJfaWQiOjV9.Rd72Ld_vccqg1ezDAvJ2gA6_FuPWgfwoax7sTjr6f_k'


let initialState = {
    users: [{username:'testUser'}],
    actionUser: '',
    login: false,
    test: {
        password: 'test1234Q'
    },
    firstLogin: false
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
        case ADD_FIRST_LOGIN:
            return {
                ...state,
                firstLogin: action.data
            }


        default:
            return state
    }
}




export const addUsers = (data) => {
    return { type: ADD_USERS, data }
}
export const addActionUser = (data) => {
    return { type: ADD_ACTION_USER, data }
}
export const updateLogin = (data) => {
    return { type: ADD_LOGIN, data }
}
export const addFirstLogin = (data) => {
    return { type: ADD_FIRST_LOGIN, data }
}





export const getUser = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        Users(token)
            .then(data => {
                resolve()
                dispatch(addUsers(data))
            })
            .catch(() => {
                reject()
            })
    })
}



export const registration = (name, password, email) => (dispatch) => {

    return new Promise((resolve, reject) => {
        createUser(name, password, email)
            .then(data => dispatch(addActionUser(data)))
            .then(() => createToken(name, password, email))
            .then(data => {
                localStorage.removeItem('key')
                localStorage.setItem('key', data.access)
            })
            .then(() => dispatch(getUser()))
            .then(() => dispatch(addFirstLogin(true)))
            .then(() => dispatch(updateLogin('login')))
            .then(() => {

                postRelativity('сахара', 'килограмм', 2.02, {
                    name1: 'сахара',
                    name2: 'сахаров',
                    name3: 'сахара'
                })

                postSources('Зарплата', 'rgb(18, 145, 28)')
                    .then(() => postSources('Другие', 'rgb(224, 83, 118)'))
                    .then(() => postSources('Аванс', 'rgb(201, 138, 45)'))

                postСategories('Еда', 'Еду', 'rgb(253, 226, 62)')
                postСategories('Алкоголь', 'Алкоголь', 'rgb(33, 33, 209)')
                postСategories('Квартира', 'Квартиру', 'rgb(87, 217, 255)')
                postСategories('Транспорт', 'Транспорт', 'rgb(22, 153, 40)')

                postSalary(1, 13, 1)
                    .then(() => postSalary(1, 13, 3))

            })
            .catch(() => reject())
    })

}

export const login = (name, password) => (dispatch) => {

    if (name === 'test') {
        return new Promise(() => {
            localStorage.removeItem('key')
            localStorage.setItem('key', token)
            postDataUser(localStorage.getItem('key'))
                .then(() => dispatch(updateLogin(true)))
                .then(() => dispatch(addFirstLogin(false)))
                .catch(() => createToken(name, password)
                    .then(data => {
                        token = data.access
                        dispatch(login(name, password))
                    }))

        })
    }
    else {
        return new Promise((resolve, reject) => {
            createToken(name, password)
                .then(data => {
                    localStorage.removeItem('key')
                    localStorage.setItem('key', data.access)
                })
                .then(() => {
                    postDataUser(localStorage.getItem('key'))
                        .then(() => dispatch(updateLogin(true)))
                })
                .then(() => dispatch(addFirstLogin(false)))
                .catch(() => reject())
        })
    }
}
export const verification = () => (dispatch) => {

    return new Promise((resolve, reject) => {
        postDataUser(localStorage.getItem('key'))
            .then(() => {
                resolve()
            })
            .catch((data) => {
                dispatch(updateLogin('login'))
            })
    })

}









export default profileReducer