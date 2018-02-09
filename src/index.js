import React from 'react'
import ReactDOM from 'react-dom'
import { sessionService } from 'redux-react-session';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './store/configureStore'
import App from './components/App'
import 'normalize.css/normalize.css'
import './styles/styles.scss'


const browserHistory = createHistory()
const store = configureStore(browserHistory)

sessionService.initSessionService(store);

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'))