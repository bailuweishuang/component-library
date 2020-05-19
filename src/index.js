import React from 'react';
import ReactDOM from 'react-dom';
import Route from '@/router';
import 'antd/dist/antd.css';
import Util from '@/js/util';

window.Util = Util;
ReactDOM.render(<Route />, document.getElementById('app'));
