import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();

  return (
    <nav className='Nav-container'>
      <ul>
        <li className={location.pathname === '/BubbleSort' ? 'active' : ''}>
          <Link to="/BubbleSort">Bubble</Link>
        </li>
        <li className={location.pathname === '/SelectionSort' ? 'active' : ''}>
          <Link to="/SelectionSort">Selection</Link>
        </li>
        <li className={location.pathname === '/InsertionSort' ? 'active' : ''}>
          <Link to="/InsertionSort">Insertion</Link>
        </li>
        <li className={location.pathname === '/MergeSort' ? 'active' : ''}>
          <Link to="/MergeSort">Merge</Link>
        </li>

      </ul>
    </nav>
  );
}
