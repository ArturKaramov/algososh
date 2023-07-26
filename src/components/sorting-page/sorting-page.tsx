import React, { useEffect, useState } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { delay } from "../../utils/utils";
import { IColorNumbers } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import {
  MIN_LENGTH,
  MAX_LENGTH,
  MIN_VALUE,
  MAX_VALUE,
} from "../../constants/limits";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<IColorNumbers[]>([]);
  const [sortType, setSortType] = useState<"bubble" | "selection">("selection");
  const [buttonState, setButtonState] = useState<Direction | null>(null);

  useEffect(() => {
    randomArr();
  }, []);

  const swap = (
    arr: IColorNumbers[],
    firstIndex: number,
    secondIndex: number
  ): IColorNumbers[] => {
    let temp = arr[firstIndex].value;
    arr[firstIndex].value = arr[secondIndex].value;
    arr[secondIndex].value = temp;
    return arr;
  };

  const randomArr = () => {
    const length = Math.random() * (MAX_LENGTH - MIN_LENGTH) + MIN_LENGTH;
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({
        value: Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE),
        color: ElementStates.Default,
      });
    }
    setArr(arr);
  };

  const bubbleSort = async (direction: Direction) => {
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr.length - i - 1; j++) {
        newArr[j].color = ElementStates.Changing;
        newArr[j + 1].color = ElementStates.Changing;
        await delay(DELAY_IN_MS);
        setArr([...newArr]);
        if (
          direction === Direction.Descending
            ? newArr[j].value < newArr[j + 1].value
            : newArr[j].value > newArr[j + 1].value
        ) {
          setArr(swap(newArr, j, j + 1).slice(0));
        }
        newArr[j].color = ElementStates.Default;
      }
      newArr[newArr.length - i - 1].color = ElementStates.Modified;
      setArr([...newArr]);
    }
    setButtonState(null);
  };

  const selectionSort = async (direction: Direction) => {
    const newArr = [...arr];
    for (let i = 0; i < newArr.length - 1; i++) {
      newArr[i].color = ElementStates.Changing;
      let temp = i;
      for (let j = i + 1; j < newArr.length; j++) {
        newArr[j].color = ElementStates.Changing;
        setArr([...newArr]);
        await delay(DELAY_IN_MS);
        if (
          direction === Direction.Descending
            ? newArr[j].value > newArr[temp].value
            : newArr[j].value < newArr[temp].value
        ) {
          temp = j;
        }
        newArr[j].color = ElementStates.Default;
      }

      setArr(swap(newArr, temp, i).slice(0));
      newArr[i].color = ElementStates.Modified;
    }
    newArr[newArr.length - 1].color = ElementStates.Modified;
    setArr([...newArr]);
    setButtonState(null);
  };

  const sort = (direction: Direction) => {
    setButtonState(direction);
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].color = ElementStates.Default;
    }
    setArr([...newArr]);
    sortType === "selection" ? selectionSort(direction) : bubbleSort(direction);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.settings}>
        <div className={`mr-25 ${styles.radio}`}>
          <RadioInput
            label="Выбор"
            name="sort"
            value="selection"
            checked={sortType === "selection"}
            onChange={() => setSortType("selection")}
            disabled={!!buttonState}
          />
          <RadioInput
            label="Пузырёк"
            name="sort"
            value="bubble"
            checked={sortType === "bubble"}
            onChange={() => setSortType("bubble")}
            disabled={!!buttonState}
          />
        </div>
        <div className={`ml-2 ${styles.direction}`}>
          <Button
            sorting={Direction.Ascending}
            text="По возрастанию"
            extraClass={styles.button}
            onClick={() => sort(Direction.Ascending)}
            isLoader={buttonState === Direction.Ascending}
            disabled={!!buttonState}
          />
          <Button
            sorting={Direction.Descending}
            text="По убыванию"
            extraClass={styles.button}
            onClick={() => sort(Direction.Descending)}
            isLoader={buttonState === Direction.Descending}
            disabled={!!buttonState}
          />
        </div>
        <Button
          text="Новый массив"
          extraClass={`ml-40 ${styles.button}`}
          onClick={randomArr}
          disabled={!!buttonState}
        />
      </div>
      <div className={styles.histogram}>
        {arr.map((obj, i) => (
          <Column index={obj.value} key={i} state={obj.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
