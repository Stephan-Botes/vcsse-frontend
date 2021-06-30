import React from 'react';
import ReactDOM from 'react-dom';
import ItemList from '../components/ItemList/ItemList';

// Test to check if the ItemList component renders correctly
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ItemList/>, div);
});
