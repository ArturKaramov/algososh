interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getItems: () => T[];
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push(item: T) {
    this.container.push(item);
  }

  pop() {
    if (this.container.length > 0) {
      this.container.pop();
    }
  }

  peak() {
    return null;
  }

  getSize() {
    return this.container.length;
  }

  getItems() {
    return this.container;
  }
}
