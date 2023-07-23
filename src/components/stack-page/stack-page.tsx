import React, { useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "../../utils/stack";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [stack] = useState(new Stack<string>());
  const [data, setData] = useState<string[]>([]);
  const [color, setColor] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addItem = async () => {
    stack.push(input);
    setData([...stack.getItems()]);
    setInput("");
    setColor(true);
    await delay(SHORT_DELAY_IN_MS);
    setColor(false);
  };

  const deleteItem = async () => {
    setColor(true);
    await delay(SHORT_DELAY_IN_MS);
    setColor(false);
    stack.pop();
    setData([...stack.getItems()]);
  };

  const deleteStack = () => {
    const length = stack.getSize();
    for (let i = 0; i < length; i++) {
      stack.pop();
    }
    setData([...stack.getItems()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={onChange}
          value={input}
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
          onClick={deleteStack}
          disabled={!data.length}
        />
      </div>
      <ul className={styles.circleList}>
        {data.map((item, i) => (
          <li key={i}>
            <Circle
              letter={item}
              index={i}
              head={i === stack.getSize() - 1 ? "top" : null}
              state={
                i === stack.getSize() - 1 && color
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
