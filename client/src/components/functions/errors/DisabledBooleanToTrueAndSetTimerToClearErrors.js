export function DisabledBooleanToTrueAndSetTimerToClearErrors(setDisabled, setErrors) {
    setDisabled(() => true);
    setTimeout(() => {
        setErrors();
    }, 3000);
}
