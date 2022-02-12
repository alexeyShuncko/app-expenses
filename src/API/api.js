import  axios from "axios";


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
