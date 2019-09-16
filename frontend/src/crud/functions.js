import moment from 'moment';

export const stringToFloat = string => {
    if (!string) return 0;
    if (string.length === 1) return parseFloat(`.0${string}`);
    if (string.length === 2) return parseFloat(`.${string}`);

    const onlyNumbers = getOnlyNumbers(string);
    const i = onlyNumbers.length - 2;
    // dispatch => {};
    return parseFloat(onlyNumbers.slice(0, i) + '.' + onlyNumbers.slice(i));
};

export const floatToString = float => {
    if (!float || Number.isNaN(parseFloat(float))) return '';
    let string = parseFloat(float).toFixed(2).split('.').join(',');
    // separador de milhar
    for (let i = string.length - 6; i > 0; i -= 3) {
        string = `${string.slice(0, i)}.${string.slice(i)}`;
        // string = string.slice(0, i) + '.' + string.slice(i);
    }
    return string;
};

const getOnlyNumbers = value => value.replace(/[^\d]/g, '');

export const convertStringToDate = date => { // 03/06/2019
    // console.log(date);
    const dateParts = date.split('/');
    const data = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return data;
    // return data.toString();
}

export const convertStringToDateTime = data => {
    // const data = "15/01/2012 21:10:17";
    const readableDate = data.substring(3, 6) + data.substring(0, 2) + data.substring(5, data.length);
    return new Date(readableDate);
}

export const convertDateTimeToString = data => {
    // const data = "15/01/2012 21:10:17";
    const readableDate = data.substring(3, 6) + data.substring(0, 2) + data.substring(5, data.length);
    return new Date(readableDate).toLocaleString();
}

export function convertDateTimeToStringMoment(date) {
    let data = moment(date);
    return data.format('DD/MM/YYYY - HH:mm');
}

export const setDateTime = data => {
    const nowHour = new Date();
    data = new Date(data);
    return `${data.toLocaleDateString()} ${nowHour.toLocaleTimeString()}`;
}
