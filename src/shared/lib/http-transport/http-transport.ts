enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  method: METHODS
  data?: string
}

type HTTPMethod = (url: string, options: Options) => Promise<XMLHttpRequest>

function queryStringify(data: string | undefined) {
  if (typeof data !== 'object') {
    throw new TypeError('Data must be an object')
  }

  const keys = Object.keys(data)
  return Object.keys(data).reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}

export class HTTPTransport {
  get: HTTPMethod = (url, options) => {
    return this._request(url, { ...options, method: METHODS.GET })
  }

  post: HTTPMethod = (url, options) => {
    return this._request(url, { ...options, method: METHODS.POST })
  }

  put: HTTPMethod = (url, options) => {
    return this._request(url, { ...options, method: METHODS.PUT })
  }

  delete: HTTPMethod = (url, Options) => {
    return this._request(url, { ...Options, method: METHODS.DELETE })
  }

  private _request: HTTPMethod = (url, options) => {
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
        isGet && Boolean(data) ? `${url}${queryStringify(data)}` : url,
      )

      xhr.addEventListener('load', () => {
        resolve(xhr)
      })

      xhr.addEventListener('abort', reject)
      xhr.addEventListener('error', reject)

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}
