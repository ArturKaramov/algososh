export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  deleteAt: (index: number) => void;
  getSize: () => number;
  print: () => T[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append = (element: T) => {
    const elem = new Node(element);
    !this.head && (this.head = elem);
    this.tail && (this.tail.next = elem);
    elem.next = null;
    this.tail = elem;
    this.size++;
  };

  prepend = (element: T) => {
    const elem = new Node(element);
    elem.next = this.head;
    this.head = elem;
    !this.tail && (this.tail = elem);
    this.size++;
  };

  insertAt = (element: T, index: number) => {
    let currIndex = 0;
    let curr = this.head;
    let prev = null;
    while (currIndex !== index && curr) {
      prev = curr;
      curr = curr.next;
      currIndex++;
    }
    console.log(prev, curr, currIndex);
    const elem = new Node(element);

    if (curr && prev) {
      prev.next = elem;
      elem.next = curr;
      curr = elem;
    }
    this.size++;
  };

  deleteHead = () => {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  };

  deleteTail = () => {
    if (this.tail) {
      let curr = this.head;
      while (curr && curr.next !== this.tail) {
        curr = curr.next;
      }
      if (curr) {
        curr.next = null;
        this.tail = curr;
      }
    }
    this.size--;
  };

  deleteAt = (index: number) => {
    let currIndex = 0;
    let prev = null;
    let curr = this.head;
    while (curr && currIndex !== index) {
      prev = curr;
      curr = curr.next;
      currIndex++;
    }
    if (prev && curr) {
      prev.next = curr.next;
    }
    this.size--;
  };

  getSize = () => {
    return this.size;
  };

  print = () => {
    const res = [];
    let curr = this.head;
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  };
}
