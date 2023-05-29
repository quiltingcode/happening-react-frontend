import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Avatar from '../Avatar';

describe('Avatar renders', () => {
  const renderComponent = () =>
    render(
      <Router>
        <Avatar />
      </Router>,
    );

  test('renders the avatar component', () => {
    renderComponent();
  });
});