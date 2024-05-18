export class Validator {
  private _validate(input: string, regex: RegExp, errorMessage: string) {
    if (regex.test(input)) {
      return { isValid: true, errorMessage: '' }
    }
    return { isValid: false, errorMessage }
  }

  validateLogin(login: string) {
    const loginRegex = /^(?![0-9]+$)[A-Za-z0-9_-]{3,20}$/
    return this._validate(login, loginRegex, 'Некорректный логин')
  }

  validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
    return this._validate(password, passwordRegex, 'Некорректный пароль')
  }
}
