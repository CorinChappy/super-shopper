import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, {history} from './store/configureStore';

const store = configureStore();

ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history}> 
        <div><App/></div>
    </ConnectedRouter>
</Provider>,
document.getElementById('root'));
registerServiceWorker();
