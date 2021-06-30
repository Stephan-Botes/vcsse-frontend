import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../components/Item/Item';

// Test to check if the Item component renders correctly
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Item/>, div);
});
