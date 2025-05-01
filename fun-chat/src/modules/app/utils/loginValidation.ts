// LOGIN VALIDATION CONST
export const LOGIN_NAME_MIN: number = 3;
export const LOGIN_NAME_MAX: number = 18;
const LOGIN_NAME_CAPITAL: boolean = false;

export const LOGIN_PWD_MIN: number = 6;
export const LOGIN_PWD_MAX: number = 28;
const LOGIN_PWD_CAPITAL: boolean = true;


export function loginNameValidation(name: string): boolean | string {

  if (name.length < LOGIN_NAME_MIN) {
    return `Length must be more than ${LOGIN_NAME_MIN} characters`;
  }
  if (name.length >= LOGIN_NAME_MAX) {
    return `Length must not exceed ${LOGIN_NAME_MAX} characters`;
  }

  return true;
}

export function loginPwdValidation(password: string): boolean | string {

  if (password.length < LOGIN_PWD_MIN) {
    return `Length must be more than ${LOGIN_PWD_MIN} characters`;
  }
  if (password.length >= LOGIN_PWD_MAX) {
    return `Length must must not exceed ${LOGIN_PWD_MAX} characters`;
  }
  if (LOGIN_PWD_CAPITAL) {
    const reg: RegExp = /[A-Z]/;
    if (!reg.test(password)) {
      return 'Use at least one uppercase letter.'
    }
    return true;
  }

  return true;
}

