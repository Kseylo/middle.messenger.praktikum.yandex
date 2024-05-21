export enum FIELDS {
  LOGIN = 'login',
  PASSWORD = 'password',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
}

export class Validator {
  private _validate(input: string, regex: RegExp, errorMessage: string) {
    if (regex.test(input)) {
      return { isValid: true, errorMessage: '' }
    }
    return { isValid: false, errorMessage }
  }

  private _validateLogin(login: string) {
    const loginRegex = /^(?![0-9]+$)[A-Za-z0-9_-]{3,20}$/
    return this._validate(login, loginRegex, 'Некорректный логин')
  }

  private _validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
    return this._validate(password, passwordRegex, 'Некорректный пароль')
  }

  private _validateFirstName(name: string) {
    const nameRegex = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/
    return this._validate(name, nameRegex, 'Некорректное имя')
  }

  private _validateSecondName(name: string) {
    const nameRegex = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/
    return this._validate(name, nameRegex, 'Некорректная фамилия')
  }

  validate(input: string, value: string) {
    switch (input) {
      case FIELDS.LOGIN:
        return this._validateLogin(value)
      case FIELDS.PASSWORD:
        return this._validatePassword(value)
      case FIELDS.FIRST_NAME:
        return this._validateFirstName(value)
      case FIELDS.SECOND_NAME:
        return this._validateSecondName(value)
      default:
        return { isValid: true, errorMessage: '' }
    }
  }
}
