import React, { useEffect, useState, useMemo } from 'react';
import styles from './list-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ILinkedList, LinkedList } from '../../utils/linked-list';
import { Circle } from '../ui/circle/circle';
import { INIT_LIST } from '../../constants/limits';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { ElementStates } from '../../types/types';
import { HEAD, TAIL } from '../../constants/element-captions';
import { useForm } from '../../hooks/useForm';

export const ListPage: React.FC = () => {
  const [list] = useState<ILinkedList<number | string>>(new LinkedList<number | string>());
  const { values, handleChange, setValues } = useForm<{
    node: number | string;
    index: string;
  }>({ node: '', index: '' });
  const [nodes, setNodes] = useState<(number | string)[]>([]);
  const [color, setColor] = useState<{ [key: number]: ElementStates }>({});
  const [head, setHead] = useState<number | string | null>(null);
  const [tail, setTail] = useState<number | string | null>(null);
  const [loader, setLoader] = useState<{
    addHead: boolean;
    addTail: boolean;
    addIndex: boolean;
    delHead: boolean;
    delTail: boolean;
    delIndex: boolean;
  }>({
    addHead: false,
    addTail: false,
    addIndex: false,
    delHead: false,
    delTail: false,
    delIndex: false,
  });

  const disable = useMemo(
    () => Object.values(loader).some((val) => val === true),
    [JSON.stringify(loader)],
  );

  const isValid = useMemo(() => !(parseInt(values.index) < nodes.length), [nodes, values.index]);

  useEffect(() => {
    INIT_LIST.forEach((item: string | number) => {
      list.append(item);
    });
    setNodes([...list.print()]);
  }, []);

  const prepend = async () => {
    setLoader({ ...loader, addHead: true });
    list.prepend(values.node);
    setHead(0);
    await delay(SHORT_DELAY_IN_MS);
    setHead(null);
    setColor({ 0: ElementStates.Modified });
    setNodes([...list.print()]);
    await delay(SHORT_DELAY_IN_MS);
    setColor({ 0: ElementStates.Default });
    setValues({ node: '', index: '' });
    setLoader({ ...loader, addHead: false });
  };

  const append = async () => {
    setLoader({ ...loader, addTail: true });
    const lastIndex: number = list.getSize();
    list.append(values.node);
    setHead(lastIndex - 1);
    await delay(SHORT_DELAY_IN_MS);
    setHead(null);
    setColor({ [lastIndex]: ElementStates.Modified });
    setNodes([...list.print()]);
    await delay(SHORT_DELAY_IN_MS);
    setColor({});
    setValues({ node: '', index: '' });
    setLoader({ ...loader, addTail: false });
  };

  const insertAt = async () => {
    setLoader({ ...loader, addIndex: true });
    const index = parseInt(values.index);
    if (index) {
      const newColor: { [key: number]: ElementStates } = {};
      list.insertAt(values.node, index);
      for (let i = 0; i <= index; i++) {
        setHead(i);
        newColor[i - 1] = ElementStates.Changing;
        setColor(newColor);
        await delay(SHORT_DELAY_IN_MS);
        setHead(null);
        setColor({});
      }
      setColor({ [index]: ElementStates.Modified });
      console.log(list.print());
      setNodes([...list.print()]);
      await delay(SHORT_DELAY_IN_MS);
      setColor({});
      setValues({ node: '', index: '' });
      setLoader({ ...loader, addIndex: false });
    }
  };

  const deleteHead = async () => {
    setLoader({ ...loader, delHead: true });
    list.deleteHead();
    setTail(0);
    await delay(SHORT_DELAY_IN_MS);
    setTail(null);
    setNodes([...list.print()]);
    setLoader({ ...loader, delHead: false });
  };

  const deleteTail = async () => {
    setLoader({ ...loader, delTail: true });
    list.deleteTail();
    setTail(list.getSize());
    await delay(SHORT_DELAY_IN_MS);
    setTail(null);
    setNodes([...list.print()]);
    setLoader({ ...loader, delTail: false });
  };

  const deleteAt = async () => {
    const index = parseInt(values.index);
    if (index) {
      setLoader({ ...loader, delIndex: true });
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
      setNodes([...list.print()]);
      setValues({ node: '', index: '' });
      setLoader({ ...loader, delIndex: false });
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
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
        <Input
          placeholder="Введите индекс"
          type="number"
          name="index"
          value={values.index}
          onChange={handleChange}
          disabled={disable}
        />
        <Button
          text="Добавить по индексу"
          id="addIndex"
          extraClass={styles.insertAt}
          onClick={insertAt}
          disabled={!values.index || !values.node || disable || isValid}
          isLoader={loader.addIndex}
        />
        <Button
          text="Удалить по индексу"
          id="deleteIndex"
          extraClass={styles.deleteAt}
          onClick={deleteAt}
          disabled={!values.index || disable || isValid}
          isLoader={loader.delIndex}
        />
      </div>
      <ul className={styles.circleList}>
        {nodes.map((item, i) => (
          <li className={styles.circle} key={i}>
            <Circle
              state={i in color ? color[i] : undefined}
              letter={i === tail ? '' : item.toString()}
              extraClass="ml-8 mr-8"
              head={
                i === head ? (
                  <Circle letter={values.node.toString()} state={ElementStates.Changing} isSmall />
                ) : i === 0 ? (
                  HEAD
                ) : null
              }
              tail={
                i === tail ? (
                  <Circle letter={item.toString()} state={ElementStates.Changing} isSmall />
                ) : i === nodes.length - 1 ? (
                  TAIL
                ) : null
              }
            />
            {i !== nodes.length - 1 && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
