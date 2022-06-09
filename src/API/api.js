import axios from "axios";



// let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU4OTEwMTg1LCJqdGkiOiJhN2UxODgyYzVhOGU0YzAxYTBjNjRjYTk1YzdiMjNkYiIsInVzZXJfaWQiOjJ9._kZ92ITOOrlRdZtOqZK2oh3chllGqjmvg72CyY6KwHw'


const instance = axios.create({
    baseURL: 'https://shkoders.at.by/'
})


export const getDollar = async () => {
    const response = await axios.get('https://www.nbrb.by/api/exrates/rates/431');
    return response.data;
}

export const getEuro = async () => {
    const response = await axios.get('https://www.nbrb.by/api/exrates/rates/EUR?parammode=2 ');
    return response.data;
}


export const getItem = async (text) => {
    const response = await axios.get(`https://ws3.morpher.ru/russian/declension?s=${text}&format=json`);
    return response.data;
}


// Сервер совместный

// Доходы
export const getSources = async () => {
    const response = await instance.get(`api/sources/`,
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response.data;
}
export const postSources = async (name, color) => {
    const response = await instance.post(`api/sources/`, {
        'name': name,
        'color': color
    },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('key')}`
            }
        }
    );
    return response;
}


// Отдельный доход
export const getSourcesId = async (id) => {
    const response = await instance.get(`api/sources/${id}/`);
    return response;
}
export const deleteSources = async (id) => {
    const response = await instance.delete(`api/sources/${id}/`,
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response;
}

export const putSources = async (name, color, id) => {
    const response = await instance.put(`api/sources/${id}/`, {
        'name': name,
        'color': color
    });
    return response;
}


// Записи в доходе

export const getIncomes = async () => {
    const response = await instance.get(`api/incomes/`);
    return response;
}
export const postIncomes = async (created, amount, category) => {
    const response = await instance.post(`api/incomes/`, {
        "created": created,
        "amount": amount,
        "category": category
    },
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response;
}



// Расходы
export const getСategories = async () => {
    const response = await instance.get(`api/categories/`,
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response.data;
}
export const postСategories = async (name, nameRusCase, color) => {
    const response = await instance.post(`api/categories/`, {
        'name': name,
        'nameRusCase': nameRusCase,
        'color': color
    },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('key')}`
            }
        }
    );
    return response;
}

// Отдельный расход
export const getСategoriesId = async (id) => {
    const response = await instance.get(`api/categories/${id}/`);
    return response.data;
}
export const deleteСategories = async (id) => {
    const response = await instance.delete(`api/categories/${id}/`,
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response;
}

export const putСategories = async (name, nameRusCase, color, id) => {
    const response = await instance.put(`api/categories/${id}/`, {
        'name': name,
        'nameRusCase': nameRusCase,
        'color': color
    },
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response;
}


// Записи в расходе

export const getExpenses = async (id) => {
    const response = await instance.get(`api/expenses/`);
    return response;
}
export const postExpenses = async (data) => {
    const response = await instance.post(`api/expenses/`, {
        'data': data
    },
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response;
}




// Дата зарплаты и аванса

export const getSalary = async () => {
    const response = await instance.get(`api/set-date/`,
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response.data;
}
export const putSalary = async (day, month, source, id) => {
    const response = await instance.put(`api/set-date/${id}/`, {
        "salary_day": day,
        "salary_month": month,
        "source": source,
    },
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response;
}
export const postSalary = async (day, month, id) => {
    const response = await instance.post(`api/set-date/`, {
        "salary_day": day,
        "salary_month": month,
        "source": id
    },
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    }
    );
    return response;
}
export const deleteSalary = async (id) => {
    const response = await instance.delete(`api/set-date/${id}/`, 
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    }
    );
    return response;
}



// Относительная величина 

export const getRelativity = async () => {
    const response = await instance.get(`api/relativity/`,
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    });
    return response.data;
}

export const postRelativity = async (name, unit, price, padej) => {
    const response = await instance.post(`api/relativity/`, {
        "name": name,
        "value": unit,
        "amount": price,
        "case": padej
    },
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('key')}`
        }
    }
    );
    return response;
}



// Создание новой учётной записи
export const createUser = async (username, password, email) => {
    const response = await instance.post(`auth/users/`, {
        'username': username,
        'password': password,
        'email': email
    });
    return response.data;
}


// Получение токена
export const createToken = async (username, password, email) => {
    const response = await instance.post(`auth/jwt/create/`, {
        'username': username,
        'password': password,
        'email': email
    });
    return response.data;
}


// Верификация
export const postDataUser = async (token) => {
    const response = await instance.post(`auth/jwt/verify/ `, {
        'token': token
    });
    return response;
}

// Изменение данных пользователя
// export const updateDataUser = async () => {
//     const response = await instance.put(`https://shkoders.at.by/`, {

//     });
//     return response.data;
// }


// Получение списка юзеров
export const Users = async (token) => {
    const response = await instance.get(`api/users/`, 
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    );
    return response.data;
}





