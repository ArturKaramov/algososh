interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clearQueue: () => void;
  getItems: () => (T | null)[];
  getSize: () => number;
  getTail: () => number;
  getHead: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private readonly size: number = 0;
  private length: number = 0;
  private head: number = 0;
  private tail: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = new Array(size).fill(null);
  }

  enqueue(item: T) {
    if (this.tail < this.size) {
      this.container[this.tail] = item;
      this.tail++;
      this.length++;
    }
  }

  dequeue() {
    if (this.head < this.tail) {
      this.container[this.head] = null;
      this.head++;
      this.length--;
    }
  }

  getItems() {
    return this.container;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail - 1;
  }

  clearQueue() {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = new Array(this.size).fill(null);
  }
}
