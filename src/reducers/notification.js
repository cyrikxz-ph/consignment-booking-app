import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from '../actions/notificationAction'

const notificationDefaultState = {
  show: false,
  header: '',
  message: '',
  type: 'info'
}

export default (state = notificationDefaultState, { type, payload } ) => {
  switch(type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        show: true,
        header: payload.header,
        message: payload.message,
        type: payload.type
      }
    case HIDE_NOTIFICATION:
      return {
        ...state,
        show: false,
        header: '',
        message: '',
        type: notificationDefaultState.type
      }
    default:
      return state
  }
}

