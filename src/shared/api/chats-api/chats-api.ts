import { BaseAPI } from '../base-api'

class ChatsApi extends BaseAPI {
  constructor() {
    super('chats')
  }

  getChats() {
    return this.http.get('')
  }
}

export default new ChatsApi()
