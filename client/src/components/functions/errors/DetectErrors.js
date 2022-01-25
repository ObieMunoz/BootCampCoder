import { useEffect } from 'react';
import { HandleErrors } from './HandleErrors';

export function DetectErrors(errors, setDisabled, setErrors) {
    useEffect(() => {
        if (errors) {
            return HandleErrors(setDisabled, setErrors);
        }
    }, [errors, setDisabled, setErrors]);
}
