import { Block } from '@/shared/lib'

interface RouteProps {
  rootQuery: string
}

class Route {
  private _pathname: string
  private readonly _blockClass: typeof Block
  private _block: Block | null
  private _props: RouteProps

  constructor(pathname: string, view: typeof Block, props: RouteProps) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({})
    }

    const root = document.querySelector(this._props.rootQuery)

    if (root) {
      root.textContent = ''
      root.append(this._block.getContent())
    }
  }
}

export class Router {
  private static __instance: Router
  private _routes: Route[] = []
  private _history = window.history
  private _currentRoute: Route | null = null
  private _rootQuery = ''

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this._rootQuery = rootQuery
    Router.__instance = this
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this._routes.push(route)
    return this
  }

  start() {
    window.addEventListener('popstate', (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname)
    })
    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }
    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    this._history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this._history.back()
  }

  forward() {
    this._history.forward()
  }

  getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname))
  }
}
