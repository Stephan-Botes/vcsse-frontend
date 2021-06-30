import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

// Test to check if the App component renders correctly
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
});
