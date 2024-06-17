import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import styles from './main-page.module.css';
import {
  STRING_URL,
  FIBO_URL,
  SORT_URL,
  STACK_URL,
  QUEUE_URL,
  LIST_URL,
  BINARY_URL,
} from '../../constants/url';

interface MainPageProps {
  extraClass?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ extraClass = '' }) => {
  return (
    <main className={`${styles.content} ${extraClass}`}>
      <div className={styles.title_box}>
        <h1 className={`text text_type_h1 text_color_h1 ${styles.title}`}>МБОУ АЛГОСОШ</h1>
        <p className={`text text_type_fibonacci text_color_secondary ${styles.fibonacci_title}`}>
          им. Фибоначчи
        </p>
      </div>
      <div className={styles.cards_box}>
        <Link className={styles.link} data-testid="stringPage" to={STRING_URL}>
          <div className={`${styles.card} ${styles.string}`} />
        </Link>
        <Link className={styles.link} to={FIBO_URL}>
          <div className={`${styles.card} ${styles.fibonacci}`} />
        </Link>
        <Link className={styles.link} to={SORT_URL}>
          <div className={`${styles.card} ${styles.arr}`} />
        </Link>
        <Link className={styles.link} to={STACK_URL}>
          <div className={`${styles.card} ${styles.stack}`} />
        </Link>
        <Link className={styles.link} to={QUEUE_URL}>
          <div className={`${styles.card} ${styles.queue}`} />
        </Link>
        <Link className={styles.link} to={LIST_URL}>
          <div className={`${styles.card} ${styles.list}`} />
        </Link>
        <Link className={styles.link} to={BINARY_URL}>
          <div className={`${styles.card} ${styles.binary}`} />
        </Link>
      </div>
      <Marquee className={styles.ticker} gradient={false} speed={200}>
        <p className={`text text_type_ticker text_color_secondary ${styles.ticker_text}`}>
          Вдохновлено школами, в которых не учили алгоритмам
        </p>
        <div className={styles.dot_box}>
          <p className={styles.dot} />
        </div>
      </Marquee>
      <p className={`text text_type_column text_color_input mt-14 ${styles.copyright}`}>
        © Сделано в Практикуме.
      </p>
    </main>
  );
};
