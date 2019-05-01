import React from 'react'

const Spinner = ({
    className = ''
}) => {
    return (
        <span className={`spinner-border spinner-border-md ${className}`}></span>
    );
}

export default Spinner;
