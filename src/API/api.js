import  axios from "axios";


export const getDollar = async () => {
    const response = await axios.get('https://www.nbrb.by/api/exrates/rates/431');
    return response.data;
}

export const getEuro = async () => {
    const response = await axios.get('https://www.nbrb.by/api/exrates/rates/EUR?parammode=2 ');
    return response.data;
}


export const getItem = async () => {
    const response = await axios.get('http://htmlweb.ru/api/service/inflect/?inflect=Олень&grammems=РД&nolimit&html&letter_case=ucfirst ');
    return response;
}
