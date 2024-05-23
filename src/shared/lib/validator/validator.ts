import { InputWithLabel } from '@/shared/ui'

export enum FIELDS {
  LOGIN = 'login',
  PASSWORD = 'password',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  EMAIL = 'email',
  PHONE = 'phone',
  DISPLAY_NAME = 'display_name',
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
      errorMessage: 'Имя должно начинаться с большой буквы',
    },
    [FIELDS.SECOND_NAME]: {
      regex: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
      errorMessage: 'Фамилия должна начинаться с большой буквы',
    },
    [FIELDS.EMAIL]: {
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: 'Некорректная почта',
    },
    [FIELDS.PHONE]: {
      regex: /^\+?[0-9]{10,15}$/,
      errorMessage: 'Некорректный номер телефона',
    },
    [FIELDS.DISPLAY_NAME]: {
      regex: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
      errorMessage: 'Должно начинаться с большой буквы',
    },
  }

  static validate(name: FIELDS, value: string) {
    return {
      isValid: this.rules[name].regex.test(value),
      errorMessage: this.rules[name].errorMessage,
    }
  }

  static validateInput(inputElement: InputWithLabel) {
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
      return { isValid }
    }
  }

  static validateInputs(inputs: InputWithLabel[]) {
    let allFieldsValid = true
    inputs.forEach((input) => {
      const { isValid } = this.validateInput(input)!
      if (!isValid) {
        allFieldsValid = false
      }
    })
    return allFieldsValid
  }
}
