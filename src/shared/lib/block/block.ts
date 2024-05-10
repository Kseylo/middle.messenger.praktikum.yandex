import { v4 as makeUUID } from 'uuid'
import { EventBus } from '@/shared/lib/event-bus'

export type BlockProps = {
  events?: Record<string, (event: Event) => void>
} & object

export class Block<TypeProps extends BlockProps = BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _element: HTMLElement | null = null
  private readonly _meta: { tagName: string; props: TypeProps }
  private eventBus: EventBus
  readonly props: TypeProps
  private readonly _id

  constructor(tagName = 'div', propsWithChildren: TypeProps) {
    this._meta = {
      tagName,
      props: propsWithChildren,
    }
    this._id = makeUUID()
    this.props = this._makePropsProxy({ ...propsWithChildren, _id: this._id })
    this.eventBus = EventBus.getInstance()
    this._registerEvents()
    this.eventBus.dispatch(Block.EVENTS.INIT)
  }

  private _registerEvents() {
    this.eventBus.subscribe(Block.EVENTS.INIT, this.init.bind(this))
    this.eventBus.subscribe(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this),
    )
    this.eventBus.subscribe(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this),
    )
    this.eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init() {
    this._createDocumentElement()
    this.eventBus.dispatch(Block.EVENTS.FLOW_RENDER)
  }

  private _createDocumentElement() {
    const { tagName } = this._meta
    const element = document.createElement(tagName)
    element.dataset.id = this._id
    this._element = element
  }

  private _componentDidMount() {
    this.componentDidMount()
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus.dispatch(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: TypeProps, newProps: TypeProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(_oldProps: TypeProps, _newProps: TypeProps) {
    return true
  }

  setProps(nextProps: Partial<TypeProps>) {
    Object.assign(this.props, nextProps)
  }

  private _render() {
    const block = this.render() as unknown as string
    this._removeEvents()
    if (this._element) {
      this._element.innerHTML = block
    }
    this._addEvents()
  }

  render() {}

  private _removeEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  private _addEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  private _makePropsProxy(props: TypeProps) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof TypeProps]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop, value) => {
        target[prop as keyof TypeProps] = value
        this.eventBus.dispatch(Block.EVENTS.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  getContent() {
    return this._element!
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}