import { DisabledBooleanToTrueAndSetTimerToClearErrors } from './DisabledBooleanToTrueAndSetTimerToClearErrors';

export function HandleErrors(setDisabled, setErrors) {
    DisabledBooleanToTrueAndSetTimerToClearErrors(setDisabled, setErrors);
    return () => {
        setDisabled(() => false);
    };
}
