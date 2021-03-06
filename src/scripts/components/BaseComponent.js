export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  _addListener(element, eventType, callback) {
    element.addEventListener(eventType, callback);
  }

  _setListener(listeners) {
    listeners.forEach((listener) => {
      if (listener.element === null) {
        console.log(listener.callback, listener.element);
      } else {
        this._addListener(listener.element, listener.eventType, listener.callback);
      }
    });
  }

  _clearListener() {
    this._listeners.forEach((listener) => {
      const { element, eventType, callback } = listener;
      element.removeEventListener(eventType, callback);
    });
  }
}
