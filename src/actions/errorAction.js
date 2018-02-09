import { isEmpty, mapValues, join, has } from 'lodash'
import { sendNotification } from './notificationAction'

export const errorHandler = (e) => {
  console.log(e)
  return (dispatch) => {
    if (has(e,'data.error')) {
      const error = e.data.error
      dispatch(sendNotification({
        type: 'danger',
        header: `${error.code || error.statusCode} - ${error.name || 'HTTP Error'}`,
        message: `${error.errmsg || error.message}`
      }))
      return Promise.reject(error)
    } else {
      dispatch(sendNotification({
        type: 'danger',
        header: 'Error',
        message: `${e}. \n Please contact administrator.`
      }))
      return Promise.reject()
    }
  }
}