import { ChatsApi } from '@/shared/api'
import {
  AddUser,
  CreateChatData,
  DeleteUser,
  IChat,
  Routes,
} from '@/shared/config'
import { Router, Store } from '@/shared/lib'

class ChatsController {
  async getChats() {
    const { response } = await ChatsApi.getChats()
    const chats = JSON.parse(response) as IChat[]
    Store.setState('chats', chats)
  }

  async createChat(data: CreateChatData) {
    try {
      await ChatsApi.createChat(data)
      await this.getChats()
    } catch (error) {
      alert('Не получилось создать чат ')
    }
  }

  selectChat(id: IChat['id']) {
    Store.setState('selectedChatId', id)
    const currentPath = window.location.pathname
    if (currentPath !== Routes.Messenger) {
      Router.go(Routes.Messenger)
    }
  }

  async deleteUser(data: DeleteUser) {
    try {
      await ChatsApi.deleteUser(data)
      alert('Пользователь удален из чата')
    } catch (error) {
      alert('Не получилось удалить пользователя')
    }
  }

  async addUser(data: AddUser) {
    try {
      await ChatsApi.addUser(data)
      alert('Пользователь добавлен в чат')
    } catch (error) {
      alert('Не получилось добавить пользователя')
    }
  }

  async getChatToken(id: IChat['id']) {
    try {
      const { response } = await ChatsApi.getChatToken(id)
      return JSON.parse(response)
    } catch (error) {
      console.error('Не получилось получить токен чата')
    }
  }
}

export default new ChatsController()
