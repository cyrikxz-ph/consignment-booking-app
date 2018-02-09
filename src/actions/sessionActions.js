import { sessionService } from 'redux-react-session';
import { push } from 'react-router-redux'
import { isEmpty } from 'lodash'
import { sendNotification } from './notificationAction';
import * as AuthService from '../services/api/AuthService'

export const login = (user) => {
  return (dispatch) => {
    return AuthService.login(user).then((response) => {
      console.log(response)
      const session = {
        token: response.id,
        userId: response.userId,
        created: response.created,
        ttl: response.ttl
      }
      return sessionService.saveSession(session).then(() => {
            return response.user
      })
      .then((userInfo) => {
        dispatch(sendNotification({
          type: 'success',
          header: 'Welcome',
          message: `Good day!`
        }))
        return sessionService.saveUser(userInfo)
      })
      .catch(err => console.error(err));
    });
  };
};

export const logout = (history) => {
    return (dispatch) => {
    return sessionService.loadSession()
      .then((currentSession) => {
        return AuthService.logout(currentSession.token)
      })
      .then(() => {
        return sessionService.deleteUser()
      })
      .then(() => {
        return sessionService.deleteSession()
      })
      .then(() => {
        history.push('/login')
      })
      .catch(err => {
        throw (err);
      });
  };
};

export const getUserInfo = () => {
  return (dispatch, getState) => {
    const { session: { user } } = getState();
    // console.log(user)
    return sessionService.loadUser()
      .then((user) => {

        console.log(user)
      })
    // if (!isEmpty(user)) {
    //   console.log(user)
    // } else {
    //   return sessionService.loadSession()
    //     .then(({ userId, token }) => {
    //       console.log('here')
    //       return UserService.getUser({ userId, access_token: token})
    //     })
    //     .then((user) => {
    //       return sessionService.saveUser(user)
    //       .then(() => {
    //         return user
    //       })
    //     })
    //     .catch(err => {
    //       throw (err);
    //     });
    // }

    // return sessionService.loadUser()
    // .then(() => {
    //   return user
    // })
    // .catch((err) => {
    //   sessionService.loadSession()
    //     .then(({ userId, token }) => {
    //       console.log('here')
    //       return UserService.getUser({ userId, access_token: token})
    //     })
    //     .then((user) => {
    //       console.log(user)
    //     })
    //   // UserService.getUser()
    //   // console.error(err)
    //   // throw (err);
    // });
  }
}

export const getSession = () => {
  return sessionService.loadSession()
    .then((session) => {
      return session
    }) 
}