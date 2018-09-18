import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as VKConnect from '@vkontakte/vkui-connect';
import * as VKConnect from './vkui-connect';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

VKConnect.send('VKWebAppInit', {no_toolbar: false});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
