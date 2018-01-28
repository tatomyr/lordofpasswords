import React from 'react';
import { render } from 'react-dom';
import App from './App';

if (document.location.hostname !== 'localhost' && document.location.protocol === 'http:') document.location.href = `https:${document.location.host}`;

render(<App />, document.getElementById('react-root'));

/* eslint-disable no-console */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => { console.log('Service Worker Registered'); })
    .catch(err => { console.error('Service Worker Error:', err); });
}
