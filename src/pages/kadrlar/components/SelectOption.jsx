export const selsectOption = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', height: '42px' }),
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