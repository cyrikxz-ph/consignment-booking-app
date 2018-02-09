import { APP_INIT, APP_INIT_SUCCESS, APP_INIT_FAILED } from '../actions/appActions'

const appReducerDefaultState = {
  loading: true,
  error: {
    code: '',
    msg: ''
  }
}

export default (state = appReducerDefaultState, { type, payload }) => {
  switch(type) {
    case APP_INIT:
      return {
        ...state,
        loading: true
      }
    case APP_INIT_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case APP_INIT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error
      }
    default:
      return state
  }
}