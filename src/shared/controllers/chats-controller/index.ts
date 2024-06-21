import { ChatsApi } from '@/shared/api'
import type {
  AddUser,
  CreateChatData,
  DeleteUser,
  IChat,
} from '@/shared/config'
import { Store } from '@/shared/lib'

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
  }

  async deleteUser(data: DeleteUser) {
    try {
      await ChatsApi.deleteUser(data)
    } catch (error) {
      alert('Не получилось удалить пользователя')
    }
  }

  async addUser(data: AddUser) {
    try {
      await ChatsApi.addUser(data)
      alert('Пользователь добавлен')
    } catch (error) {
      alert('Не получилось добавить пользователя')
    }
  }
}

export default new ChatsController()
