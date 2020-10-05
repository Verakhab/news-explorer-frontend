export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  static _addListener(element, event, callback) {
    element.addEventlistener(event, callback);
  }

  _setListener(listeners) {
    listeners.forEach((listener) => {
      this._addListener(...listener);
    });
  }

  _clearListener() {
    this._listeners.forEach((listener) => {
      const { element, event, callback } = listener;
      element.removeEventListeners(event, callback);
    });
  }
}
