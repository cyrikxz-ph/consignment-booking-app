import { createStore, combineReducers, applyMiddleware } from 'redux'
import { sessionReducer } from 'redux-react-session';
import thunk from 'redux-thunk'
import appReducer from '../reducers/app'
import notificationReducer from '../reducers/notification'
import shipmentsReducer from '../reducers/shipments'
import themeReducer from '../reducers/theme'
import uiReducer from '../reducers/ui'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default (history) => {

  const rootReducer = combineReducers({
    app: appReducer,
    notification: notificationReducer,
    shipments: shipmentsReducer,
    session: sessionReducer,
    theme: themeReducer,
    ui: uiReducer
  })

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        thunk)
      )
  )

  return store
}
