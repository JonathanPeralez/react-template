import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import './local.reset.css';
import App from './components/App';

render(
  <div>
    <App />
  </div>,
  document.getElementById('root'),
);
