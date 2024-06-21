import { EventBus } from '@/shared/lib'

export enum WSTransportEvents {
  CONNECTED = 'ws:connected',
  ERROR = 'ws:error',
  MESSAGE = 'ws:message',
  CLOSE = 'ws:close',
}

export class WSTransport extends EventBus {
  private _ws: WebSocket | null = null
  private _pingInterval: NodeJS.Timeout | number = 0
  private readonly _url: string

  constructor(url: string) {
    super()
    this._url = url
  }

  send(data: { type: string; content?: string }) {
    if (!this._ws) {
      throw new Error('WebSocket is not connected')
    }
    this._ws.send(JSON.stringify(data))
  }

  connect() {
    this._ws = new WebSocket(this._url)

    this._subscribe(this._ws)

    this._ping()

    return new Promise<void>((resolve) => {
      this.subscribe(WSTransportEvents.CONNECTED, () => {
        resolve()
      })
    })
  }

  disconnect() {
    this._ws?.close()
  }

  _subscribe(ws: WebSocket) {
    ws.addEventListener('open', () => {
      this.dispatch(WSTransportEvents.CONNECTED)
    })

    ws.addEventListener('close', () => {
      this.dispatch(WSTransportEvents.CLOSE)
    })

    ws.addEventListener('error', (error) => {
      this.dispatch(WSTransportEvents.ERROR, error)
    })

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)

      if (!(data.type && data.type === 'pong')) {
        this.dispatch(WSTransportEvents.MESSAGE, data)
      }
    })
  }

  _ping() {
    this._pingInterval = setInterval(() => {
      this.send({ type: 'ping' })
    }, 5000)

    this.subscribe(WSTransportEvents.CLOSE, () => {
      clearInterval(this._pingInterval)
      this._pingInterval = 0
    })
  }
}
