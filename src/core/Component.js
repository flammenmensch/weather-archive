document.componentRegistry = {};
document.nextId = 0;

export default class Component {
  constructor() {
    this.__id = ++document.nextId;
    document.componentRegistry[this.__id] = this;
  }
  getSelf() {
    return `document.componentRegistry['${this.__id}']`;
  }
}
