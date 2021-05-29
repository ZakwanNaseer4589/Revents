import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/style.css';
import App from './app/layout/App.jsx';
import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from 'react-service-worker';
import { Provider } from 'react-redux';
import { configureStore, history } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import {ConnectedRouter} from 'connected-react-router';


const store = configureStore()
const rootEl = document.getElementById('root')

function render() {
ReactDOM.render( 

    <Provider store={store}>

        <ConnectedRouter history={history}>
            <ScrollToTop />
            <App />
        </ConnectedRouter>

    </Provider>,
    rootEl)
     
}
if (module.hot) {
    module.hot.accept('./app/layout/App.jsx', function () {
        setTimeout(render);
    })
}
render();


serviceWorker.register();