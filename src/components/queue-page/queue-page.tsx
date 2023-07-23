import React, { useState } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Queue } from "../../utils/queue";
import { QUEUE_SIZE } from "../../constants/limits";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { HEAD, TAIL } from "../../constants/element-captions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(QUEUE_SIZE));
  const [data, setData] = useState<(string | null)[]>(queue.getItems());
  const [input, setInput] = useState<string>("");
  const [color, setColor] = useState<{ [key: string]: boolean }>({
    HEAD: false,
    TAIL: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addItem = async () => {
    queue.enqueue(input);
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
  };

  const deleteItem = async () => {
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
  };

  const deleteQueue = () => {
    queue.clearQueue();
    setData([...queue.getItems()]);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input
          isLimitText={true}
          maxLength={4}
          value={input}
          onChange={onChange}
        />
        <Button
          text="Добавить"
          extraClass="ml-6"
          onClick={addItem}
          disabled={!input.length}
        />
        <Button
          text="Удалить"
          extraClass="ml-6"
          onClick={deleteItem}
          disabled={!data.length}
        />
        <Button
          text="Очистить"
          extraClass="ml-40"
          onClick={deleteQueue}
          disabled={!data.length}
        />
      </div>
      <ul className={styles.circleList}>
        {data.map((item, i) => (
          <li key={i}>
            <Circle
              letter={item ? item : ""}
              index={i}
              state={
                (i === queue.getHead() && color.head) ||
                (i === queue.getTail() && color.tail)
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
