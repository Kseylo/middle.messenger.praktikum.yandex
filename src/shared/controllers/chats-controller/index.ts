import { ChatsApi } from '@/shared/api'
import { type CreateChatData, type IChat } from '@/shared/api'
import { Store } from '@/shared/lib'

class ChatsController {
  async getChats() {
    try {
      const { response } = await ChatsApi.getChats()
      const chats = JSON.parse(response) as IChat[]
      Store.setState('chats', chats)
    } catch (error) {
      console.log(`Error occurred while getting chats`)
    }
  }

  async createChat(data: CreateChatData) {
    try {
      await ChatsApi.createChat(data)
    } catch (error) {
      alert('Не получилось создать чат ')
    }
  }
}

export default new ChatsController()
