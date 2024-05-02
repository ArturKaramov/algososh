import { SortingPage } from './sorting-page';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import { render, fireEvent } from '@testing-library/react';

describe('Testing SortingPage', () => {
  it('radio buttons', () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[]} />
        </Route>
      </BrowserRouter>,
    );

    const bubble = screen.getByLabelText('Пузырёк');
    const selection = screen.getByLabelText('Выбор');
    fireEvent.click(bubble);
    expect(bubble).toBeChecked();
    expect(selection).not.toBeChecked();

    fireEvent.click(selection);
    expect(selection).toBeChecked();
    expect(bubble).not.toBeChecked();
  });

  it('With empty array', () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[]} />
        </Route>
      </BrowserRouter>,
    );

    const asc = screen.getByTestId('asc');
    const des = screen.getByTestId('des');

    expect(asc).toBeDisabled();
    expect(des).toBeDisabled();
  });

  it('With one element in array, ascending selection', () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[30]} />
        </Route>
      </BrowserRouter>,
    );
    const asc = screen.getByTestId('asc');
    const selection = screen.getByLabelText('Выбор');
    fireEvent.click(selection);
    fireEvent.click(asc);
    expect(screen.getByTestId('column').textContent).toBe('30');
  });

  it('With one element in array, descending selection', () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[30]} />
        </Route>
      </BrowserRouter>,
    );
    const des = screen.getByTestId('des');
    const selection = screen.getByLabelText('Выбор');
    fireEvent.click(selection);
    fireEvent.click(des);
    expect(screen.getByTestId('column').textContent).toBe('30');
  });

  it('With one element in array, descending bubble', () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[30]} />
        </Route>
      </BrowserRouter>,
    );
    const des = screen.getByTestId('des');
    const bubble = screen.getByLabelText('Пузырёк');
    fireEvent.click(bubble);
    fireEvent.click(des);
    expect(screen.getByTestId('column').textContent).toBe('30');
  });

  it('With one element in array, ascending bubble', () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[30]} />
        </Route>
      </BrowserRouter>,
    );
    const asc = screen.getByTestId('asc');
    const bubble = screen.getByLabelText('Пузырёк');
    fireEvent.click(bubble);
    fireEvent.click(asc);
    expect(screen.getByTestId('column')).toHaveTextContent('30');
  });

  it('With normal length array, ascending selection', async () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[30, 15, 45]} />
        </Route>
      </BrowserRouter>,
    );

    const asc = screen.getByTestId('asc');
    const selection = screen.getByLabelText('Выбор');
    fireEvent.click(selection);
    fireEvent.click(asc);
    const result = screen.getAllByTestId('column');
    await waitFor(
      () => {
        expect(result[0]).toHaveTextContent('15');
      },
      { timeout: 4000 },
    );
    expect(result[1]).toHaveTextContent('30');
    expect(result[2]).toHaveTextContent('45');
  });

  it('With normal length array, descending selection', async () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[30, 15, 45]} />
        </Route>
      </BrowserRouter>,
    );

    const des = screen.getByTestId('des');
    const selection = screen.getByLabelText('Выбор');
    fireEvent.click(selection);
    fireEvent.click(des);

    const result = screen.getAllByTestId('column');
    await waitFor(
      () => {
        expect(result[0]).toHaveTextContent('45');
      },
      { timeout: 4000 },
    );
    await waitFor(
      () => {
        expect(result[1]).toHaveTextContent('30');
      },
      { timeout: 4000 },
    );
    await waitFor(
      () => {
        expect(result[2]).toHaveTextContent('15');
      },
      { timeout: 4000 },
    );
  });

  it('With normal length array, ascending bubble', async () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[30, 15, 45]} />
        </Route>
      </BrowserRouter>,
    );

    const asc = screen.getByTestId('asc');
    const bubble = screen.getByLabelText('Пузырёк');
    fireEvent.click(bubble);
    fireEvent.click(asc);

    const result = screen.getAllByTestId('column');
    await waitFor(
      () => {
        expect(result[0]).toHaveTextContent('15');
      },
      { timeout: 4000 },
    );
    expect(result[1]).toHaveTextContent('30');
    expect(result[2]).toHaveTextContent('45');
  });

  it('With normal length array, descending bubble', async () => {
    render(
      <BrowserRouter>
        <Route>
          <SortingPage initArr={[30, 15, 45]} />
        </Route>
      </BrowserRouter>,
    );

    const des = screen.getByTestId('des');
    const selection = screen.getByLabelText('Выбор');
    fireEvent.click(selection);
    fireEvent.click(des);
    const result = screen.getAllByTestId('column');
    await waitFor(
      () => {
        expect(result[0]).toHaveTextContent('45');
      },
      { timeout: 4000 },
    );
    await waitFor(
      () => {
        expect(result[1]).toHaveTextContent('30');
      },
      { timeout: 4000 },
    );
    await waitFor(
      () => {
        expect(result[2]).toHaveTextContent('15');
      },
      { timeout: 4000 },
    );
  });
});
