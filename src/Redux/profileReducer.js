// import { createToken, createUser, getDataUser, postDataUser } from "../API/api"

const ADD_USER = 'ADD_USER' 
const ADD_ACTION_USER = 'ADD_ACTION_USER'
const ADD_LOGIN = 'ADD_LOGIN'




let initialState = {
   users: [
       {name: 'Валера', email:'@awdawd',password:'1'},
       {name: 'Илья', email:'@awdawd',password:'2'},
       {name: 'Алексей', email:'@awdawd',password:'3'},
       {name: '1', email:'@awdawd',password:'3'}
],
actionUser: {name: 'Валера', email:'@awdawd',password:'1'},
login: true
}



const profileReducer = (state = initialState, action) => {


    switch (action.type) {


        case ADD_USER:
            state.users.push({name: action.name, email: action.email, password:action.password})
            return {
                ...state 
            }

            case ADD_ACTION_USER: 
            return {
                ...state,
                actionUser: action.data
            }
            case  ADD_LOGIN: 
            return {
                ...state,
                login: action.data
            }

           
        default:
            return state
    }
}



 export const addUser = (name, password, email,) => {
     return { type: ADD_USER, name, password, email, }
 }
 export const addActionUser = (data,) => {
    return { type: ADD_ACTION_USER, data }
}
export const updateLogin = (data,) => {
    return { type: ADD_LOGIN, data }
}



export const registration = (name, password, email) => (dispatch) => {
    console.log(`Пользователь зарегистрирован: имя - ${name},пароль -${password}, email - ${email}`)
    // createUser(name, password, email)
    //     .then(data => dispatch(addActionUser(data)))
    //     .then(() => createToken(name, password, email))
    //     .then(data => localStorage.setItem('key', data.access))
      //   .then(() => updateLogin('login'))
}

export const login = (name, password) => (dispatch) => {
    console.log(`Выполнен вход: имя - ${name},пароль -${password}` )
    // postDataUser(name, password)
    //.then(() => updateLogin(true) )
}



export default  profileReducer