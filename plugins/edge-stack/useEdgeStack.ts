import mitt from 'mitt'

/**
 * This is specially for EdgeStack component event system.
 * It should not be used elsewhere.
 */
export const edgeStackEmitter = mitt()

// Interfaces & types
export type TEventNameWhitelists =
  | 'opening'
  | 'open'
  | 'opened'
  | 'closing'
  | 'close'
  | 'closed'
  | 'toggle'
  | 'toggled'
  | 'confirmFirst'

export interface IEdgeStack {
  id: string
  debug: boolean
  emitter: typeof edgeStackEmitter
  open(id: string): void
  close(id: string): void
  toggle(id: string): void
  shouldConfirm(id: string): void
  shouldNotConfirm(id: string): void
  getEventName(type: TEventNameWhitelists, id: string | null): string
}

export type IEventNameMap = {
  [key in TEventNameWhitelists]: string
}

/**
 * This class is for maintaining states of EdgeStack component easily
 * This is not a npm plugin, rather a local plugin for the app.
 */
export class EdgeStack implements IEdgeStack {
  public id: string = 'default'
  public debug: boolean = false
  public emitter = edgeStackEmitter

  constructor() {
    // this.debug = false
    // this.emitter = edgeStackEmitter
    this.debug && console.log({ EdgeStackEvents: this.emitter.all })
  }

  // Emit events
  open(id: string): void {
    const e = this.getEventName('open', id)

    this.emitter.emit(e)
    this.debug && console.log({ EdgeStackOpener: e })
  }

  close(id: string): void {
    const e = this.getEventName('close', id)

    this.emitter.emit(e)
    this.debug && console.log({ EdgeStackCloser: e })
  }

  toggle(id: string): void {
    const e = this.getEventName('toggle', id)

    this.emitter.emit(e)
    this.debug && console.log({ EdgeStackToggler: e })
  }

  shouldConfirm(id: string): void {
    const e = this.getEventName('confirmFirst', id)

    this.emitter.emit(e, {
      confirmFirst: true,
    })
    this.debug &&
      console.log({
        EdgeStackConfirmFirst_Yes: e,
      })
  }

  shouldNotConfirm(id: string): void {
    const e = this.getEventName('confirmFirst', id)

    this.emitter.emit(e, {
      confirmFirst: false,
    })
    this.debug &&
      console.log({
        EdgeStackConfirmFirst_No: e,
      })
  }

  // Get event name
  getEventName(type: TEventNameWhitelists, id: string | null = null): string {
    const prefixMap = {
      opening: 'es-opening:',
      open: 'es-open:',
      opened: 'es-opened:',

      closing: 'es-closing:',
      close: 'es-close:',
      closed: 'es-closed:',

      // emits opening, opened, closing, closed events
      // also emits toggled event with data { from: bool, to: bool }
      toggle: 'es-toggle:',
      toggled: 'es-toggled:',

      confirmFirst: 'es-confirm-first:',
    }

    if (prefixMap[type]) {
      const theId = id || this.id
      return prefixMap[type].concat(theId)
    }

    this.debug && console.warn('es-trying-to-get-unknown-event-type')
    return 'es-trying-to-get-unknown-event-type'
  }
}
export const edgeStack = new EdgeStack()
export const useEdgeStack = () => edgeStack
