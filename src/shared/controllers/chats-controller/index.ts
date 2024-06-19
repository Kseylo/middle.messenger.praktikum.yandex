import { ChatsApi } from '@/shared/api'
import type { CreateChatData, IChat } from '@/shared/config'
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
    } catch (error) {
      alert('Не получилось создать чат ')
    }
  }
}

export default new ChatsController()
