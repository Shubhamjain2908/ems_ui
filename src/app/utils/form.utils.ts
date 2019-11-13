import { FormGroup } from '@angular/forms';

export function filterEmptyFields(data: any): any {
    const fields = {};
    let a;
    Object.keys(data).forEach(key => {
        if (typeof data[key] !== 'object' && data[key] !== '') {
            fields[key] = data[key];
        } else if (typeof data[key] === 'object' && data[key] === null) {
            //
        } else if (Array.isArray(data[key])) {
            a = [];
            data[key].forEach(f => {
                Object.keys(this.filterEmptyFields(f)).length !== 0 ? a.push(this.filterEmptyFields(f)) : this.filterEmptyFields(f);
            });
            fields[key] = a;
        } else if (typeof data[key] === 'object' && typeof data[key].length === 'undefined') {
            Object.keys(this.filterEmptyFields(data[key])).length !== 0 ? fields[key] = data[key] : this.filterEmptyFields(data[key]);
        }
    });
    return fields;
}

export function getDateFormat(value) {
    const date = new Date(value);
    return date.getFullYear()
        + '-'
        + (date.getMonth() > 9 ? '' : '0')
        + (date.getMonth() + 1)
        + '-'
        + (date.getDate() > 9 ? '' : '0')
        + date.getDate();
}

export function markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
}
