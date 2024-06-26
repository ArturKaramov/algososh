import React, { useState, useMemo } from 'react';
import styles from './queue-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Queue } from '../../utils/queue';
import { QUEUE_SIZE } from '../../constants/limits';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/types';
import { delay } from '../../utils/utils';
import { HEAD, TAIL } from '../../constants/element-captions';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { useForm } from '../../hooks/useForm';

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(QUEUE_SIZE));
  const [data, setData] = useState<(string | null)[]>(queue.getItems());
  const { values, handleChange, setValues } = useForm<{ element: string }>({
    element: '',
  });
  const [color, setColor] = useState<{ [key: string]: boolean }>({
    HEAD: false,
    TAIL: false,
  });
  const [loader, setLoader] = useState<{ [key: string]: boolean }>({
    add: false,
    delete: false,
    clear: false,
  });

  const disable = useMemo(
    () => Object.values(loader).some((load) => load),
    [JSON.stringify(loader)],
  );

  const addItem = async () => {
    setLoader({ ...loader, add: true });
    queue.enqueue(values.element);
    setColor({
      head: false,
      tail: true,
    });
    await delay(SHORT_DELAY_IN_MS);
    setColor({
      head: false,
      tail: false,
    });
    setData([...queue.getItems()]);
    setValues({ element: '' });
    setLoader({ ...loader, add: false });
  };

  const deleteItem = async () => {
    setLoader({ ...loader, delete: true });
    setColor({
      head: true,
      tail: false,
    });
    await delay(SHORT_DELAY_IN_MS);
    setColor({
      head: false,
      tail: false,
    });
    queue.dequeue();
    setData([...queue.getItems()]);
    setLoader({ ...loader, delete: false });
  };

  const deleteQueue = async () => {
    setLoader({ ...loader, clear: true });
    queue.clearQueue();
    setData([...queue.getItems()]);
    await delay(SHORT_DELAY_IN_MS);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input
          isLimitText={true}
          maxLength={4}
          name="element"
          value={values.element}
          onChange={handleChange}
          disabled={disable}
        />
        <Button
          text="Добавить"
          id="add"
          extraClass="ml-6"
          onClick={addItem}
          disabled={!values.element.length || disable}
          isLoader={loader.add}
        />
        <Button
          text="Удалить"
          id="delete"
          extraClass="ml-6"
          onClick={deleteItem}
          disabled={!data.some((elem) => elem !== null) || disable}
          isLoader={loader.delete}
        />
        <Button
          text="Очистить"
          id="clear"
          extraClass="ml-40"
          onClick={deleteQueue}
          disabled={!data.some((elem) => elem !== null) || disable}
          isLoader={loader.clear}
        />
      </div>
      <ul className={styles.circleList}>
        {data.map((item, i) => (
          <li key={i}>
            <Circle
              letter={item ? item : ''}
              index={i}
              state={
                (i === queue.getHead() && color.head) || (i === queue.getTail() && color.tail)
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
              head={
                (i === queue.getHead() && item) ||
                (i + 1 === queue.getHead() && i + 1 === queue.getSize())
                  ? HEAD
                  : null
              }
              tail={i === queue.getTail() && item ? TAIL : null}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
