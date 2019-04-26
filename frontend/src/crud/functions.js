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
