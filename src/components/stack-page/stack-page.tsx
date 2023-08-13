import React, { useState } from "react";
import { Stack } from "../../utils/stack";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ element: "" });
  const [stack] = useState(new Stack<string>());
  const [data, setData] = useState<string[]>([]);
  const [color, setColor] = useState<boolean>(false);
  const [loader, setLoader] = useState<{ [key: string]: boolean }>({
    add: false,
    delete: false,
    clear: false,
  });

  const addItem = async () => {
    setLoader({ ...loader, add: true });
    stack.push(values.element);
    setData([...stack.getItems()]);
    setValues({ element: "" });
    setColor(true);
    await delay(SHORT_DELAY_IN_MS);
    setColor(false);
    setLoader({ ...loader, add: false });
  };

  const deleteItem = async () => {
    setLoader({ ...loader, delete: true });
    setColor(true);
    await delay(SHORT_DELAY_IN_MS);
    setColor(false);
    stack.pop();
    setData([...stack.getItems()]);
    setLoader({ ...loader, delete: false });
  };

  const deleteStack = async () => {
    setLoader({ ...loader, clear: true });
    const length = stack.getSize();
    for (let i = 0; i < length; i++) {
      stack.pop();
    }
    setData([...stack.getItems()]);
    await delay(SHORT_DELAY_IN_MS);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={handleChange}
          name="element"
          value={values.element}
          disabled={Object.values(loader).some((load) => load)}
        />
        <Button
          text="Добавить"
          id="add"
          extraClass="ml-6"
          onClick={addItem}
          disabled={!values.element}
          isLoader={loader.add}
        />
        <Button
          text="Удалить"
          id="delete"
          extraClass="ml-6"
          onClick={deleteItem}
          disabled={!data.length}
          isLoader={loader.delete}
        />
        <Button
          text="Очистить"
          id="clear"
          extraClass="ml-40"
          onClick={deleteStack}
          disabled={!data.length}
          isLoader={loader.clear}
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
