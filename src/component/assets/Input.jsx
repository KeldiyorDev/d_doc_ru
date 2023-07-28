import React from 'react';

const Input = ({className, type='text', id, placeholder, disabled=false, label, styles}) => {
    return !label ? (
        <input
            type={type}
            id={id}
            className={`form-control form-control-outline ${className}`}
            placeholder={placeholder}
            disabled={disabled}
            style={styles}
        />
    ) : (
        <div className="position-relative">
            <input
                type={type}
                id={id}
                className={`form-control form-control-outline ${className}`}
                placeholder={placeholder}
                disabled={disabled}
                style={styles}
            />
            <label className="label-floating">{label}</label>
        </div>
    )
};

export default Input;