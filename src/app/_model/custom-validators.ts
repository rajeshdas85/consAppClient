import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
	/**
	 * Validates that child controls in the form group are equal
	 */
	static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
		const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
		const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
		return isValid ? null : { childrenNotEqual: true };
	}
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return control.parent.invalid && control.touched;
	}
}

/**
* Collection of reusable RegExps
*/
export const regExps: { [key: string]: RegExp } = {
   password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
	firstName: 'First name must be between 1 and 128 characters',
	desc:'Desc  must be between 1 and 128 characters',
	lastName: 'Last name must be between 1 and 128 characters',
	photo: 'Enter photo details',
	idProof: 'Enter Any Id proof like adarar no/passport/pan number',
	email: 'Email must be a valid email address (username@domain)',
	confirmEmail: 'Email addresses must match',
	password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
	confirmPassword: 'Passwords must match',
	projName: 'Project name must be between 1 and 128 characters',
	projDesc: 'Project name must be between 1 and 128 characters',
	projManagerId: 'Project Manager Id as 5c21446351b1f00d74255334',
	projval: 'Enter Project value',
	client: 'Client name must be between 1 and 128 characters',
	location: 'location name must be between 1 and 128 characters'
};
