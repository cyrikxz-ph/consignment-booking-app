

export const APP_INIT = 'APP_INIT'
export const APP_INIT_SUCCESS = 'APP_INIT_SUCCESS'
export const APP_INIT_FAILED = 'APP_INIT_FAILED'
export const APP_NOTIFY = 'APP_NOTIFY'

export const appInitStart = (payload) => (
  {
    type: APP_INIT
  }
)
export const appInitEnd = (payload) => (
  {
    type: APP_INIT_SUCCESS
  }
)
export const appInitFailed = ({ code, msg}) => (
  {
    type: APP_INIT_FAILED,
    payload: {
      error: {
        code,
        msg
      } 
    }
  }
)
// export const appInit = () => {
//   return (dispatch) => {
//     dispatch(appInitStart())
//     dispatch(checkUserAuth()).then(() => {
//       dispatch(appInitEnd())
//       Promise.resolve()
//     }).catch((e) => {
//       dispatch(appInitFailed(e))
//     })
//   }
// }