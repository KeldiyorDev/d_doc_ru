export const DateFormatSet = (date) => {
    return date.split('.').reverse().join('-');
}

export const DateFormatGet = (date) => {
    return date.split('-').reverse().join('.');
}