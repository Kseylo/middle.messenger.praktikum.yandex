import { Indexed } from '@/shared/config'
import { queryStringify } from './query-stringify'

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  data?: unknown
}

interface OptionsWithMethod extends Options {
  method: METHODS
}

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>

export class HTTPTransport {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  get: HTTPMethod = (url, options) => {
    return this._request(url, {
      ...options,
      method: METHODS.GET,
    })
  }

  post: HTTPMethod = (url: string, options) => {
    return this._request(url, {
      ...options,
      method: METHODS.POST,
    })
  }

  put: HTTPMethod = (url, options) => {
    return this._request(url, {
      ...options,
      method: METHODS.PUT,
    })
  }

  delete: HTTPMethod = (url, Options) => {
    return this._request(url, {
      ...Options,
      method: METHODS.DELETE,
    })
  }

  private _request = (
    url: string,
    options: OptionsWithMethod,
  ): Promise<XMLHttpRequest> => {
    const { method, data } = options

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method provided')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(
        method,
        isGet && Boolean(data)
          ? `${this.endpoint + url}${queryStringify(data as Indexed)}`
          : this.endpoint + url,
      )

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr)
        } else {
          reject(xhr)
        }
      })

      xhr.addEventListener('abort', reject)
      xhr.addEventListener('error', reject)

      xhr.withCredentials = true

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }

      if (isGet || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
