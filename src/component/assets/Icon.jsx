import PropTypes from "prop-types";

const Icon = ({className, color, styles, onClick, ml, mr, mt, mb, m, size, font}) => {
    return (
        <i
            className={`${className} fa-${size}x ml-${ml} mr-${mr} mt-${mt} mb-${mb} m-${m}`}
            style={{fontSize: font, color: color, ...styles}}
            onClick={onClick}
        />
    );
};

Icon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    ml: PropTypes.number,
    mr: PropTypes.number,
    mt: PropTypes.number,
    mb: PropTypes.number,
    m: PropTypes.number,
    size: PropTypes.number,
    font: PropTypes.number,
    style: PropTypes.object,
}

export default Icon;