import { useState } from 'react';
import { BinaryTree, INode } from '../../utils/binary-tree';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './binary-tree.module.css';
import { createRandomNumber } from '../../utils/utils';

export const BinaryTreePage = () => {
  /*
  const getRandomTree = (): INode<number> => {
    let levels = createRandomNumber(5);
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const node: INode<number> = { value: array[0], left: null, right: null };
    const queue = [node];
    while (array.length > 0) {
      const currentValue = array.shift();
      const current = queue.shift();
    }
  };
  */

  return (
    <SolutionLayout title="Связный список">
      {/*<div className={styles.container}>
        <Input
          placeholder="Введите значение"
          isLimitText={true}
          maxLength={4}
          name="node"
          value={values.node}
          onChange={handleChange}
          disabled={disable}
        />
        <Button
          text="Добавить в head"
          id="addHead"
          onClick={prepend}
          disabled={!values.node || disable}
          isLoader={loader.addHead}
        />
        <Button
          text="Добавить в tail"
          id="addTail"
          onClick={append}
          disabled={!values.node || disable}
          isLoader={loader.addTail}
        />
        <Button
          text="Удалить из head"
          id="deleteHead"
          onClick={deleteHead}
          disabled={!nodes.length || disable}
          isLoader={loader.delHead}
        />
        <Button
          text="Удалить из tail"
          id="deleteTail"
          onClick={deleteTail}
          disabled={!nodes.length || disable}
          isLoader={loader.delTail}
        />
  </div> */}
      <ul className={styles.circleList}></ul>
    </SolutionLayout>
  );
};
