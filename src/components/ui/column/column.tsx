import React from 'react';
import styles from './column.module.css';
import { ElementStates, Part } from '../../../types/types';

interface ColumnProps {
  index: number;
  part?: Part;
  state?: ElementStates;
  extraClass?: string;
}

export const Column: React.FC<ColumnProps> = ({
  index,
  part,
  state = ElementStates.Default,
  extraClass = '',
}) => (
  <div className={`${styles.content} ${extraClass}`}>
    <div
      className={`${styles.column} ${styles[state]}`}
      style={{ height: (320 * index) / 100 || 1 }}
    ></div>
    <p data-testid="column" className={`text text_type_column text_color_input mt-3`}>
      {index}
    </p>
    <span className={`${styles.part} text text_type_column text_color_input mt-1`}>{part}</span>
  </div>
);
