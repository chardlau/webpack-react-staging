import React from 'react';  // 必须引入
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import BasicExample from './BasicExample';

ReactDOM.render(
  <AppContainer>
    <BasicExample/>
  </AppContainer>,
  document.getElementById('main')
);

import $ from 'jquery';
$('body').append('<p>Hello vendor</p>');

if (module.hot) {
  module.hot.accept();
}
