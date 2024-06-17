import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './sorting-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { delay } from '../../utils/utils';
import { Direction, ElementStates, IColorNumbers, Part } from '../../types/types';
import { DELAY_IN_MS } from '../../constants/delays';
import { MIN_LENGTH, MAX_LENGTH, MIN_VALUE, MAX_VALUE } from '../../constants/limits';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

interface ISortingPage {
  initArr?: number[] | null;
}

export const SortingPage: FC<ISortingPage> = ({ initArr = null }) => {
  const [arr, setArr] = useState<IColorNumbers[]>([]);
  const [sortType, setSortType] = useState<'bubble' | 'selection' | 'quick'>('selection');
  const [buttonState, setButtonState] = useState<Direction | null>(null);

  useEffect(() => {
    setArray();
    return () => {
      setArr([]);
    };
  }, []);

  const setArray = () => {
    if (initArr) {
      const obj: IColorNumbers[] = [];
      for (let i = 0; i < initArr.length; i++) {
        obj.push({ value: initArr[i], color: ElementStates.Default });
      }
      setArr(obj);
    } else {
      randomArr();
    }
  };

  const randomArr = () => {
    const length = Math.random() * (MAX_LENGTH - MIN_LENGTH) + MIN_LENGTH;
    const arr = [];
    for (let i = 0; i < length; i++) {
      const id = uuidv4();
      arr.push({
        value: Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE),
        color: ElementStates.Default,
        id: id,
      });
    }
    setArr(arr);
  };

  const swap = (arr: IColorNumbers[], firstIndex: number, secondIndex: number): IColorNumbers[] => {
    let temp = arr[firstIndex].value;
    arr[firstIndex].value = arr[secondIndex].value;
    arr[secondIndex].value = temp;
    return arr;
  };

  const changeColor = (index: number, part: Part) => {
    setArr((prev) => {
      prev[index].color = ElementStates.Changing;
      prev[index].part = part;
      return [...prev];
    });
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

  const quickSort = async (direction: Direction) => {
    const stack = [];
    async function sort(array: IColorNumbers[], start: number = 0, finish: number = arr.length) {
      if (finish - start < 2) return;

      const pivot = start + Math.floor(Math.random() * (finish - start));

      setArr((prev) => {
        prev[pivot].color = ElementStates.Modified;
        return prev;
      });
      const right: IColorNumbers[] = [];
      const left: IColorNumbers[] = [];

      for (let i = start; i < finish; i++) {
        if (i === pivot) {
          continue;
        }
        if (
          direction === Direction.Ascending
            ? array[pivot].value > array[i].value
            : array[pivot].value < array[i].value
        ) {
          left.push(array[i]);
          changeColor(i, Part.left);
        } else {
          right.push(array[i]);
          changeColor(i, Part.right);
        }
        await delay(DELAY_IN_MS);
      }

      const itog = array
        .slice(0, start)
        .concat(left, array[pivot], right, array.slice(finish, array.length))
        .map((i) => {
          if (i.color === ElementStates.Changing) {
            i.color = ElementStates.Default;
            delete i.part;
          }
          return i;
        });

      setArr((prev) => {
        return prev.map((elem, i) => elem);
      });

      await delay(DELAY_IN_MS);
      await sort(itog, start, start + left.length);
      await sort(itog, start + left.length + 1, finish);
    }

    await sort(arr);
    setArr((prev) => {
      prev.map((i) => {
        i.color = ElementStates.Default;
        return i;
      });
      return prev;
    });
    setButtonState(null);
  };

  const sort = (direction: Direction) => {
    setButtonState(direction);
    const newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].color = ElementStates.Default;
    }
    setArr([...newArr]);
    switch (sortType) {
      case 'selection':
        selectionSort(direction);
        break;
      case 'bubble':
        bubbleSort(direction);
        break;
      case 'quick':
        quickSort(direction);
        break;
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.settings}>
        <div className={`mr-25 ${styles.radio}`}>
          <RadioInput
            label="Выбор"
            name="sort"
            value="selection"
            checked={sortType === 'selection'}
            onChange={() => setSortType('selection')}
            disabled={!!buttonState}
          />
          <RadioInput
            label="Пузырёк"
            name="sort"
            value="bubble"
            checked={sortType === 'bubble'}
            onChange={() => setSortType('bubble')}
            disabled={!!buttonState}
          />
          <RadioInput
            label="Быстрая"
            name="sort"
            value="quick"
            checked={sortType === 'quick'}
            onChange={() => setSortType('quick')}
            disabled={!!buttonState}
          />
        </div>
        <div className={`ml-2 ${styles.direction}`}>
          <Button
            sorting={Direction.Ascending}
            text="По возрастанию"
            data-testid="asc"
            extraClass={styles.button}
            onClick={() => sort(Direction.Ascending)}
            isLoader={buttonState === Direction.Ascending}
            disabled={!!buttonState || !arr.length}
          />
          <Button
            sorting={Direction.Descending}
            text="По убыванию"
            data-testid="des"
            extraClass={styles.button}
            onClick={() => sort(Direction.Descending)}
            isLoader={buttonState === Direction.Descending}
            disabled={!!buttonState || !arr.length}
          />
        </div>
        <Button
          text="Новый массив"
          extraClass={`ml-40 ${styles.button}`}
          onClick={randomArr}
          disabled={!!buttonState}
        />
      </div>
      <div className={styles.histogram} data-testid="array">
        {arr.map((obj) => (
          <Column index={obj.value} key={obj.id} state={obj.color} part={obj.part} />
        ))}
      </div>
    </SolutionLayout>
  );
};
