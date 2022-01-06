import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders ChatJoin when current user is not set', () => {
  localStorage.setItem("currentUser", "{}")
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Username/i)).toBeInTheDocument();
  expect(getByText(/Join/i)).toBeInTheDocument();
});

test('renders Chat Room when current user is set', () => {
  localStorage.setItem("currentUser", JSON.stringify({ username: 'test', status: 'online', messages: [] }));
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Send/i)).toBeInTheDocument();
  expect(screen.getByRole("textbox").getAttribute("placeholder")).toEqual("Message");
});
