import axios from "axios";



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
    const response = await axios.get(`http://37.228.117.77/api/sources/`);
    return response.data;
}
export const postSources = async (name, color) => {
    const response = await axios.post(`http://37.228.117.77/api/sources/`, {
        'name': name,
        'color': color
    });
    return response;
}


// Отдельный доход
export const getSourcesId = async (id) => {
    const response = await axios.get(`http://37.228.117.77/api/sources/${id}/`);
    return response;
}
export const deleteSources = async (id) => {
    const response = await axios.delete(`http://37.228.117.77/api/sources/${id}/`);
    return response;
}

export const putSources = async (name, color, id) => {
    const response = await axios.put(`http://37.228.117.77/api/sources/${id}/`, {
        'name': name,
        'color': color
    });
    return response;
}

// Записи в доходе

export const getIncomes = async (id) => {
    const response = await axios.get(`http://37.228.117.77/api/incomes/`);
    return response;
}
export const postIncomes = async (created, amount, category) => {
    const response = await axios.post(`http://37.228.117.77/api/incomes/`, {
        "created": created,
        "amount": amount,
        "category": category
    });
    return response;
}



// Расходы
export const getСategories = async () => {
    const response = await axios.get(`http://37.228.117.77/api/categories/`);
    return response.data;
}
export const postСategories = async (name, nameRusСase, color) => {
    const response = await axios.post(`http://37.228.117.77/api/categories/`, {
        'name': name,
        'nameRusСase': nameRusСase,
        'color': color
    });
    return response;
}

// Отдельный расход
export const getСategoriesId = async (id) => {
    const response = await axios.get(`http://37.228.117.77/api/categories/${id}/`);
    return response;
}
export const deleteСategories = async (id) => {
    const response = await axios.delete(`http://37.228.117.77/api/categories/${id}/`);
    return response;
}

export const putСategories = async (name, nameRusСase, color, id) => {
    const response = await axios.put(`http://37.228.117.77/api/categories/${id}/`, {
        'name': name,
        'nameRusСase': nameRusСase,
        'color': color
    });
    return response;
}

// Записи в доходе

export const getExpenses = async (id) => {
    const response = await axios.get(`http://37.228.117.77/api/expenses/`);
    return response;
}
export const postExpenses = async (data) => {
    const response = await axios.post(`http://37.228.117.77/api/expenses/`, {
        'data': data
    });
    return response;
}




// Дата зарплаты и аванса

export const getSalary = async () => {
    const response = await axios.get(`http://37.228.117.77/api/set-data/`);
    return response.data;
}
export const putSalary = async (day, month, id) => {
    const response = await axios.put(`http://37.228.117.77/api/set-data/`, {
        "salary_day": day,
        "salary_month": month,
        "source": id
    });
    return response;
}





// Относительная величина 

export const getRelatiity = async () => {
    const response = await axios.get(`http://37.228.117.77/api/relativity/`);
    return response.data;
}

export const postRelatiity = async (name, unit, price) => {
    const response = await axios.post(`http://37.228.117.77/api/relativity/`,   {
        "name": name,
        "value": unit,
        "amount": price
    });
    return response;
}

