import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../test-utils';
import App from '../App';
import { fetch } from '../fetch';
import { Route } from 'react-router-dom';

test('renders employee explorer text', () => {
  render(<App />);
  const linkElement = screen.getByText(/employee explorer/i);
  expect(linkElement).toBeInTheDocument();
});

test('should re-route to the correct path', async () => {
  fetch.get.mockResolvedValue(['employee'])
  render(<Route path='/search'><App /></Route>, '/search')

  const input = screen.getByPlaceholderText('John Doe')

  fireEvent.change(input, { target: { value: 'Johnny Cash' }})
  fireEvent.click(screen.getByText('Search'))

  await waitFor(() => screen.getByText('Johnny Cash'))

  expect(window.location.pathname).toEqual('/search/Johnny%20Cash')
})