import type { IChat, Message, User } from '@/shared/config'
import { Store, WSTransport, WSTransportEvents } from '@/shared/lib'

class MessageController {
  private _ws: WSTransport | null = null

  async connect(token: string, userId: User['id'], chatId: IChat['id']) {
    this._ws = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
    )
    await this._ws.connect()

    this._addWebsocketListeners()

    this._getOldMessages()
  }

  sendMessage(message: string) {
    if (!this._ws) {
      throw new Error(`Chat is not connected`)
    }
    this._ws.send({ type: 'message', content: message })
  }

  private _getOldMessages() {
    if (!this._ws) {
      throw new Error(`Chat is not connected`)
    }
    this._ws.send({ type: 'get old', content: '0' })
  }

  private _addWebsocketListeners() {
    if (!this._ws) {
      throw new Error(`Chat is not connected`)
    }
    this._ws.subscribe(
      WSTransportEvents.MESSAGE,
      (message: Message | Message[]) => this._onMessage(message),
    )
  }

  private _onMessage(messages: Message | Message[]) {
    let messagesToStore: Message[] = []

    if (Array.isArray(messages)) {
      messagesToStore = messages.reverse()
    } else {
      messagesToStore.push(messages)
    }

    Store.setState('messages', messagesToStore)
  }

  disconnect() {
    this._ws?.disconnect()
  }
}

export default new MessageController()
