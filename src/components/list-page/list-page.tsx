import React, { useEffect, useState, useMemo } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ILinkedList, LinkedList } from "../../utils/linked-list";
import { Circle } from "../ui/circle/circle";
import { INIT_LIST } from "../../constants/limits";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { IColor } from "../../types/types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { HEAD, TAIL } from "../../constants/element-captions";

export const ListPage: React.FC = () => {
  const [list] = useState<ILinkedList<number | string>>(
    new LinkedList<number | string>()
  );
  const [values, setValues] = useState<(number | string)[]>([]);
  const [value, setValue] = useState<number | string>("");
  const [index, setIndex] = useState<number | null>(null);
  const [color, setColor] = useState<{ [key: number]: ElementStates }>({});
  const [head, setHead] = useState<number | string | null>(null);
  const [tail, setTail] = useState<number | string | null>(null);

  useEffect(() => {
    INIT_LIST.forEach((item: string | number) => {
      list.append(item);
    });
    setValues([...list.print()]);
  }, []);

  const prepend = async () => {
    list.prepend(value);
    setHead(0);
    await delay(SHORT_DELAY_IN_MS);
    setHead(null);
    setColor({ 0: ElementStates.Modified });
    setValues([...list.print()]);
    await delay(SHORT_DELAY_IN_MS);
    setColor({ 0: ElementStates.Default });
  };

  const append = async () => {
    const lastIndex: number = list.getSize();
    list.append(value);
    setHead(lastIndex - 1);
    await delay(SHORT_DELAY_IN_MS);
    setHead(null);
    setColor({ [lastIndex]: ElementStates.Modified });
    setValues([...list.print()]);
    await delay(SHORT_DELAY_IN_MS);
    setColor({});
  };

  const insertAt = async () => {
    if (index) {
      const newColor: { [key: number]: ElementStates } = {};
      list.insertAt(value, index);
      for (let i = 0; i <= index; i++) {
        setHead(i);
        newColor[i - 1] = ElementStates.Changing;
        setColor(newColor);
        await delay(SHORT_DELAY_IN_MS);
        setHead(null);
        setColor({});
      }
      setColor({ [index]: ElementStates.Modified });
      setValues([...list.print()]);
      await delay(SHORT_DELAY_IN_MS);
      setColor({});
    }
  };

  const deleteHead = async () => {
    list.deleteHead();
    setTail(0);
    await delay(SHORT_DELAY_IN_MS);
    setTail(null);
    setValues([...list.print()]);
  };

  const deleteTail = async () => {
    list.deleteTail();
    setTail(list.getSize());
    await delay(SHORT_DELAY_IN_MS);
    setTail(null);
    setValues([...list.print()]);
  };

  const deleteAt = async () => {
    if (index) {
      const newColor: { [key: number]: ElementStates } = {};
      list.deleteAt(index);
      for (let i = 0; i <= index; i++) {
        newColor[i] = ElementStates.Changing;
        setColor(newColor);
        await delay(SHORT_DELAY_IN_MS);
        setColor({});
      }
      setTail(index);
      await delay(SHORT_DELAY_IN_MS);
      setTail(null);
      setValues([...list.print()]);
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          placeholder="Введите значение"
          isLimitText={true}
          maxLength={4}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        <Button text="Добавить в head" onClick={prepend} disabled={!value} />
        <Button text="Добавить в tail" onClick={append} disabled={!value} />
        <Button
          text="Удалить из head"
          onClick={deleteHead}
          disabled={!values.length}
        />
        <Button
          text="Удалить из tail"
          onClick={deleteTail}
          disabled={!values.length}
        />
        <Input
          placeholder="Введите индекс"
          type="number"
          value={index ? index : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIndex(Number(e.target.value))
          }
        />
        <Button
          text="Добавить по индексу"
          extraClass={styles.insertAt}
          onClick={insertAt}
          disabled={!index || !value}
        />
        <Button
          text="Удалить по индексу"
          extraClass={styles.deleteAt}
          onClick={deleteAt}
          disabled={!index}
        />
      </div>
      <ul className={styles.circleList}>
        {values.map((item, i) => (
          <li className={styles.circle} key={i}>
            <Circle
              state={i in color ? color[i] : undefined}
              letter={i === tail ? "" : item.toString()}
              extraClass="ml-8 mr-8"
              head={
                i === head ? (
                  <Circle
                    letter={value.toString()}
                    state={ElementStates.Changing}
                    isSmall
                  />
                ) : i === 0 ? (
                  HEAD
                ) : null
              }
              tail={
                i === tail ? (
                  <Circle
                    letter={item.toString()}
                    state={ElementStates.Changing}
                    isSmall
                  />
                ) : i === values.length - 1 ? (
                  TAIL
                ) : null
              }
            />
            {i !== values.length - 1 && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
