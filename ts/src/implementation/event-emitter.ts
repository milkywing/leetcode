type EventType = string | symbol;

type Handler<T = any> = (event?: T) => void;

type EventHandlerMap = Map<EventType, Handler[]>;

export class EventEmitter {
  static readonly map: EventHandlerMap = new Map();

  static readonly onceMap: EventHandlerMap = new Map();

  public static once<T = any>(type: EventType, handler: Handler<T>): void {
    if (EventEmitter.onceMap.has(type)) {
      EventEmitter.onceMap.get(type)!.push(handler);
      return;
    }
    EventEmitter.onceMap.set(type, [handler]);
  }

  public static on<T = any>(type: EventType, handler: Handler<T>): void {
    if (EventEmitter.map.has(type)) {
      EventEmitter.map.get(type)!.push(handler);
      return;
    }
    EventEmitter.map.set(type, [handler]);
  }

  public static off<T = any>(type: EventType, handler: Handler<T>): void {
    const handlers = EventEmitter.map.get(type);
    if (handlers && handlers.includes(handler)) {
      handlers.splice(handlers.indexOf(handler), 1);
    }
  }

  public static emit<T = any>(type: EventType, event?: T): void {
    this.map.get(type)?.forEach((handler) => {
      handler(event);
    });

    if (this.onceMap.has(type)) {
      this.onceMap.get(type)!.forEach((handler) => {
        handler(event);
      });
      this.onceMap.delete(type);
    }
  }
}
