import React from 'react';
import { render } from '@testing-library/react';
import Board from '../components/Board/Board';

describe('Board Component', () => {
  it('render Board', () => {
    const { queryByTestId } = render(<Board />);

    expect(queryByTestId('board-container')).toBeTruthy();
  });
});
