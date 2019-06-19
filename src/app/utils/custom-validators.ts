import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(control: FormControl) {
    let emptyValue = false;
    if (typeof control.value === 'string') {
        emptyValue = control.value.length === 0;
    } else {
        return null;
    }
    if (emptyValue) {
        return null;
    }
    const isWhitespace = (control.value || '').trim().length === 0 ? true : control.value.startsWith(' ');
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

export function passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordmatchfailed': true } : null;
}

export function datesValidator(minKey: string, maxKey: string): ValidatorFn {
    return (control: FormGroup): any => {
        const startDate = new Date(control.get(minKey).value);
        const endDate = new Date(control.get(maxKey).value);
        return startDate > endDate ? { 'datesError': true } : null;
    };
}

export function minMaxValidator(minKey: string, maxKey: string): ValidatorFn {
    return (control: FormGroup): any => {
        const minValue = control.get(minKey).value;
        const maxValue = control.get(maxKey).value;
        return minValue > maxValue ? { 'minMaxError': true } : null;
    };
}
