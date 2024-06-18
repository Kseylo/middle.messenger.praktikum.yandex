import Handlebars from 'handlebars'
import { v4 as makeUUID } from 'uuid'
import { EventBus } from '@/shared/lib/event-bus'

type Events = {
  [key in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[key]) => void
}

export type BlockProps = Record<string, unknown> & {
  events?: Events
} & object

export class Block<TypeProps extends BlockProps = BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _element: HTMLElement | null = null
  private _eventBus: EventBus
  private readonly _id: string
  readonly children: Record<string, Block>
  private readonly _lists: Record<string, unknown[]>
  readonly props: TypeProps
  _setUpdate = false

  constructor(propsWithChildren: TypeProps) {
    this._id = makeUUID()
    const { props, children, lists } = this._getChildren(propsWithChildren)
    this.props = this._makePropsProxy({
      ...props,
      _id: this._id,
    } as unknown as TypeProps)
    this.children = this._makePropsProxy(children)
    this._lists = this._makePropsProxy(lists)

    this._eventBus = new EventBus()
    this._registerEvents()
    this._eventBus.dispatch(Block.EVENTS.INIT)
  }

  private _getChildren(propsWithChildren: TypeProps) {
    const children: Record<string, Block> = {}
    const props: BlockProps = {}
    const lists: Record<string, unknown[]> = {}

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else if (Array.isArray(value)) {
        lists[key] = value
      } else {
        props[key] = value
      }
    })
    return { props, children, lists }
  }

  private _makePropsProxy<T extends object>(props: T): T {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop as keyof T]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop: string, value) => {
        if (target[prop as keyof T] !== value) {
          target[prop as keyof T] = value
          this._setUpdate = true
        }
        return true
      },
    })
  }

  private _registerEvents() {
    this._eventBus.subscribe(Block.EVENTS.INIT, this.init.bind(this))
    this._eventBus.subscribe(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this),
    )
    this._eventBus.subscribe(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    )
    this._eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  compile(template: string, props: TypeProps) {
    const propsAndStubs = { ...(props as BlockProps) }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })
    Object.entries(this._lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${key}"></div>`
    })

    const fragment = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      if (stub) {
        stub.replaceWith(child.getContent())
      }
    })

    Object.entries(this._lists).forEach(([key, list]) => {
      const stub = fragment.content.querySelector(`[data-id="__l_${key}"]`)
      if (stub) {
        const listContent = this._createDocumentElement(
          'template',
        ) as HTMLTemplateElement

        list.forEach((item) => {
          if (item instanceof Block) {
            listContent.content.append(item.getContent())
          } else {
            listContent.content.append(`${item}`)
          }
        })

        stub.replaceWith(listContent.content)
      }
    })
    return fragment.content
  }

  init() {
    this._element = this._createDocumentElement()
    this._eventBus.dispatch(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidMount() {
    this.componentDidMount()
    this._eventBus.dispatch(Block.EVENTS.FLOW_RENDER)
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.dispatch(Block.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  private _componentDidUpdate(oldProps: TypeProps, newProps: TypeProps) {
    const isComponentDidUpdate = this.componentDidUpdate(oldProps, newProps)
    if (isComponentDidUpdate) {
      this._eventBus.dispatch(Block.EVENTS.FLOW_RENDER)
    }
  }

  componentDidUpdate(oldProps?: TypeProps, newProps?: TypeProps) {
    return oldProps !== newProps
  }

  private _render() {
    const block = this.render() as unknown as HTMLElement
    const newElement = block.firstElementChild as HTMLElement
    this.removeEvents()

    if (this._element) {
      this._element.replaceWith(newElement)
      this._element = newElement
    }

    this.addEvents()
  }

  render() {}

  private _createDocumentElement(tagName = 'div') {
    const element = document.createElement(tagName)
    element.dataset.id = this._id
    return element
  }

  setProps(nextProps: TypeProps) {
    if (!nextProps) {
      return
    }
    this._setUpdate = false
    const oldProps = { ...this.props }

    const { children, props, lists } = this._getChildren(nextProps)

    if (Object.values(children).length > 0) {
      Object.assign(this.children, children)
    }

    if (Object.values(props).length > 0) {
      Object.assign(this.props, props)
    }

    if (Object.values(lists).length > 0) {
      Object.assign(this._lists, lists)
    }

    if (this._setUpdate) {
      this._eventBus.dispatch(Block.EVENTS.FLOW_CDU, oldProps, this.props)
      this._setUpdate = false
    }
  }

  removeEvents() {
    const { events = {} } = this.props
    ;(Object.keys(events) as (keyof HTMLElementEventMap)[]).forEach(
      (eventName) => {
        this._element?.removeEventListener(
          eventName,
          events[eventName] as EventListener,
        )
      },
    )
  }

  addEvents() {
    const { events = {} } = this.props
    ;(Object.keys(events) as (keyof HTMLElementEventMap)[]).forEach(
      (eventName) => {
        this._element?.addEventListener(
          eventName,
          events[eventName] as EventListener,
        )
      },
    )
  }

  getContent() {
    return this._element!
  }

  show() {
    this.getContent().style.display = 'flex'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
