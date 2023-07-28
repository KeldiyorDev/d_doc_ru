export const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', height: '45px' }),
    option: (styles, { isDisabled }) => {
        return {
            ...styles,
            textTransform: 'upperCase',
            fontWeight: isDisabled ? "bold" : " ",
            fontSize: isDisabled ? "16px" : '14px',
            color: isDisabled ? "blue" : "black",
            cursor: isDisabled ? "not-allowed" : "default",

        };
    }
};

export const dateFormat = (date) => {
    return date?.split('/')[2] + '-' + date?.split('/')[0] + '-' + (parseInt(date?.split('/')[1]) < 10 ? (`0${date?.split('/')[1]}`) : date?.split('/')[1])
}

//close all options
export const closeOptions = () => {
    let input_checkbox_items = document.querySelectorAll('.input_checkbox_items');
    input_checkbox_items.forEach((d, i) => {
        d.style.display = "none";
    })
}