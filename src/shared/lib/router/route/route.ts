import { Block, BlockProps } from '@/shared/lib'
import type { Page } from '../router'

interface RouteProps {
  rootQuery: string
}

export class Route {
  private _pathname: string
  private readonly _blockClass: new (props: BlockProps) => Block
  private _block: Block | null
  private _props: RouteProps
  private _blockProps: BlockProps

  constructor(pathname: string, page: Page, props: RouteProps) {
    this._pathname = pathname
    this._blockClass = page.block
    this._block = null
    this._props = props
    this._blockProps = page.props || {}
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block = null
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._blockProps)
    }

    const root = document.querySelector(this._props.rootQuery)

    if (root) {
      root.textContent = ''
      root.append(this._block.getContent())
    }
  }
}
