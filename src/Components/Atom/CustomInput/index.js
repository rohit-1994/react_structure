import React from 'react';
import './styles.scss';

import { FormLabel, FormGroup, FormText, FormControl } from 'react-bootstrap';

const CustomInput = ({
    label,
    formText,
    formTextError = true,
    controlClassName = '',
    ...restProps
}) => {
    return (
        <FormGroup className={'custom-form-group'}>
            {!!label &&
                <FormLabel>{label}</FormLabel>
            }
            <FormControl
                className={`input ${controlClassName}`}
                {...restProps}
            />
            {!!formText &&
                <FormText className={formTextError ? 'error-text' : ''}>{formText}</FormText>
            }
        </FormGroup>
    )
}

export default CustomInput;
