import { InputWithLabel } from '@/shared/ui'

export enum FIELDS {
  LOGIN = 'login',
  PASSWORD = 'password',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
}

export class Validator {
  static rules = {
    [FIELDS.LOGIN]: {
      regex: /^(?![0-9]+$)[A-Za-z0-9_-]{3,20}$/,
      errorMessage: 'Некорректный логин',
    },
    [FIELDS.PASSWORD]: {
      regex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'Некорректный пароль',
    },
    [FIELDS.FIRST_NAME]: {
      regex: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
      errorMessage: 'Некорректное имя',
    },
    [FIELDS.SECOND_NAME]: {
      regex: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
      errorMessage: 'Некорректная фамилия',
    },
  }

  static validate(name: FIELDS, value: string) {
    return {
      isValid: this.rules[name].regex.test(value),
      errorMessage: this.rules[name].errorMessage,
    }
  }

  static validateInput(...inputs: InputWithLabel[]) {
    inputs.forEach((inputElement) => {
      const input = inputElement.getContent().querySelector('input')
      if (input) {
        const { isValid, errorMessage } = this.validate(
          input.name as FIELDS,
          input.value,
        )
        inputElement.setProps({
          ...inputElement.props,
          errorMessage: isValid ? '' : errorMessage,
        })
      }
    })
  }
}
