import React from 'react';
import './styles.scss';

const TextButton = ({
    className = '',
    onClick = () => { },
    text
}) => {
    return (
        <button
            className={`custom-text-button ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default TextButton;
