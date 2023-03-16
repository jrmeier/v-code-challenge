import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';

import { AppContext } from './AppContext';
import { AppNoProvider } from './App';

vi.mock(AppContext, () => ({
  items: [],
  setItems: Function,
  loadItems: Function,
}));

describe('App', () => {
  beforeEach(() => {
    // mock axios.get
    // axios.get.mockReset();
  });
  it('Renders the application and make sure the shopping list is there', () => {
    render(<AppNoProvider />);
    const appbarText = screen.getByText('SHOPPING LIST');
    expect(appbarText).toBeTruthy();
  });
});
