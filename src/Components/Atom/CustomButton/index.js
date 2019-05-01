import React from 'react';
import './styles.scss';

const CustomButton = ({
    className = '',
    onClick = () => { },
    outline = false,
    outlineColor,
    backgroundColor,
    children
}) => {
    return (
        <button
            className={`custom-button ${className} ${outline ? 'outline' : ''}`}
            onClick={onClick}
            style={[
                outlineColor && { borderColor: outlineColor },
                backgroundColor && { backgroundColor }
            ]}
        >
            {children}
        </button>
    )
}

export default CustomButton;
