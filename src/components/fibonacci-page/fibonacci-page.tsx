import React, { useState } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [fib, setFib] = useState<number[]>([]);
  const [buttonState, setButtonState] = useState<boolean>(false);

  const getFib = async () => {
    setButtonState(true);
    const memo: number[] = [];
    const num = parseInt(value);
    for (let i = 0; i <= num; i++) {
      if (i < 2) {
        memo.push(1);
      } else {
        memo.push(memo[i - 1] + memo[i - 2]);
      }
      await delay(SHORT_DELAY_IN_MS);
      setFib(memo.slice(0));
    }
    setButtonState(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.inputData}>
        <Input
          isLimitText={true}
          max={19}
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          disabled={buttonState}
        />
        <Button
          text={"Рассчитать"}
          onClick={getFib}
          isLoader={buttonState}
          disabled={value === ""}
        />
      </div>
      <ul className={styles.circleList}>
        {fib.map((element, i) => (
          <li key={i}>
            <Circle letter={element.toString()} index={i} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
