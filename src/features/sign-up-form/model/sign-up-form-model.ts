import AuthApi, { type SignUpRequest } from '@/shared/api'
import { Routes } from '@/shared/config'
import Router from '@/shared/lib'

class SignUpFormModel {
  async signUp(data: SignUpRequest) {
    try {
      await AuthApi.signup(data)
      Router.go(Routes.SelectChat)
    } catch (error) {
      console.log(`Error occurred while signup`)
    }
  }
}

export default new SignUpFormModel()
