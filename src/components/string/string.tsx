import React, { useEffect, useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StringComponent = () => {
  const [word, setWord] = useState<string[]>([]);
  const [color, setColor] = useState<ElementStates[]>([]);
  const [buttonState, setButtonState] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value.split(""));
    setColor([]);
  };

  const swap = (
    arr: string[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    setWord(arr.slice(0));
  };

  const changeColors = async (
    arr: ElementStates[],
    firstIndex: number,
    secondIndex: number
  ) => {
    arr[firstIndex] = ElementStates.Changing;
    arr[secondIndex] = ElementStates.Changing;
    setColor(arr.slice(0));

    await delay(DELAY_IN_MS);

    arr[firstIndex] = ElementStates.Modified;
    arr[secondIndex] = ElementStates.Modified;
    setColor(arr.slice(0));
  };

  const reverseWithDelay = async () => {
    setButtonState(true);
    let end = word.length - 1;
    let start = 0;
    while (start <= end) {
      swap(word, start, end);
      changeColors(color, start, end);
      await delay(DELAY_IN_MS);
      start++;
      end--;
    }
    setButtonState(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.inputData}>
        <Input
          isLimitText={true}
          maxLength={11}
          name="string"
          value={word.join("")}
          onChange={onChange}
          disabled={buttonState}
        />
        <Button
          text={"Развернуть"}
          onClick={reverseWithDelay}
          disabled={!word.length}
          isLoader={buttonState}
        />
      </div>
      <ul className={styles.circleList}>
        {word.map((letter, i) => (
          <li key={i}>
            <Circle
              state={color[i] ? color[i] : ElementStates.Default}
              letter={letter}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
