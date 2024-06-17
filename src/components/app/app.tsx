import React from 'react';
import styles from './app.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FibonacciPage } from '../fibonacci-page/fibonacci-page';
import { ListPage } from '../list-page/list-page';
import { MainPage } from '../main-page/main-page';
import { QueuePage } from '../queue-page/queue-page';
import { StringComponent } from '../string/string';
import { SortingPage } from '../sorting-page/sorting-page';
import { StackPage } from '../stack-page/stack-page';
import { BinaryTreePage } from '../tree-page';

import {
  BASE_URL,
  STRING_URL,
  FIBO_URL,
  SORT_URL,
  STACK_URL,
  QUEUE_URL,
  LIST_URL,
  BINARY_URL,
} from '../../constants/url';

export function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route path={BASE_URL} exact>
            <MainPage />
          </Route>
          <Route path={STRING_URL}>
            <StringComponent />
          </Route>
          <Route path={FIBO_URL}>
            <FibonacciPage />
          </Route>
          <Route path={SORT_URL}>
            <SortingPage />
          </Route>
          <Route path={STACK_URL}>
            <StackPage />
          </Route>
          <Route path={QUEUE_URL}>
            <QueuePage />
          </Route>
          <Route path={LIST_URL}>
            <ListPage />
          </Route>
          <Route path={BINARY_URL}>
            <BinaryTreePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
