import { Block, BlockProps } from '@/shared/lib'
import { Route } from './route'

export interface Page<Props extends BlockProps = BlockProps> {
  block: new (props: Props) => Block<Props>
  props?: Props
}

export class Router {
  private static _instance: Router
  private _routes: Route[] = []
  private _history = window.history
  private _currentRoute: Route | null = null
  private _rootQuery = ''

  constructor(rootQuery: string) {
    if (Router._instance) {
      return Router._instance
    }

    this._rootQuery = rootQuery
    Router._instance = this
  }

  use(pathname: string, page: Page) {
    const route = new Route(pathname, page, { rootQuery: this._rootQuery })
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
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    this._history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname))
  }
}

export default new Router('#root')
