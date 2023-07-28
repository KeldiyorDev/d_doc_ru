import PropTypes from 'prop-types';

const Button = ({ className, variant = 'primary', onClick, children, type = 'button', styles, ml = 1 }) => {
  return (
    <button
      className={`btn btn-${variant} ${className} ml-${ml}`}
      onClick={onClick}
      type={type}
      style={styles}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.object,
  ml: PropTypes.number,
  children: PropTypes.any
}

export default Button;