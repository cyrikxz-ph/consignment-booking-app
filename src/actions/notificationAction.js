export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export const showNotification = (payload) => ({
  type: SHOW_NOTIFICATION,
  payload
})

export const hideNotification = (payload) => ({
  type: HIDE_NOTIFICATION
})

export const sendNotification = ({ type = 'info', header = 'Information', message}) => {
  return (dispatch) => {
    dispatch(showNotification({type, header, message}))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3500)
  }
}