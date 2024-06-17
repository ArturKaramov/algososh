export interface INode<T> {
  value: T;
  left: INode<T> | null;
  right: INode<T> | null;
}

export class BinaryTree<T> implements INode<T> {
  value: T;
  left: BinaryTree<T> | null;
  right: BinaryTree<T> | null;

  constructor(value: T, left: BinaryTree<T> | null, right: BinaryTree<T> | null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  getMaxDepth(root: BinaryTree<T> | null): number {
    if (!root) {
      return 0;
    }
    const leftMax = this.getMaxDepth(root.left);
    const rightMax = this.getMaxDepth(root.right);
    return Math.max(leftMax, rightMax) + 1;
  }

  preorder(root: BinaryTree<T> | null, fn: (value: T) => void) {
    if (root === null) {
      return;
    } else {
      const stack: BinaryTree<T>[] = [root];
      while (stack.length > 0) {
        const node = stack.pop();
        if (node) {
          fn(node.value);

          if (node.right !== null) {
            stack.push(node.right);
          }
          if (node.left !== null) {
            stack.push(node.left);
          }
        }
      }
    }
  }
}
