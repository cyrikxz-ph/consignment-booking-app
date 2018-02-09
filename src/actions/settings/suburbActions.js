import _ from 'lodash'
import { errorHandler } from '../errorAction'
import { sendNotification } from '../notificationAction'
import { getSession } from '../sessionActions'
import * as SettingsService from '../../services/api/SettingsService'

const model = 'suburbs'
const filteredField = ['name']

const transformToFormData = (data) => ({
  ...data,
  name: _.startCase(data.name.toLowerCase()),
  postCode: data.postCode.code,
  state: _.startCase(data.state.name.toLowerCase()),
})

const find = (filter) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.find({ model, filter, access_token })
    })
    .then(({ data, totalCount }) => {
      return { data, totalCount }
    })
    .catch((e) => dispatch(errorHandler(e)))
}

const findById = (id) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.findById({model, id, access_token })
    })
    .then((responseData) => (transformToFormData(responseData)))
    .catch((e) => dispatch(errorHandler(e)))
}

const add = ({
  suburb,
  postCode,
  state,
  active
}) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.add({
        model, 
        data: {
          name: suburb.toUpperCase(),
          postCode,
          state,
          active,
          access_token
        },
        access_token 
      })
    })
    .then((res) => {
      dispatch(sendNotification({
        type: 'success',
        header: `Create ${_.startCase(model)}`,
        message: 'Success'
      }))
    })
    .catch((e) => dispatch(errorHandler(e)))
}

const update = ({
  id,
  suburb,
  postCode,
  state,
  active
}) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.update({
        model,
        id,
        data: {
          name: suburb.toUpperCase(),
          postCode,
          state,
          active,
          access_token,
        },
        access_token
      })
    })
    .then((res) => {
      dispatch(sendNotification({
        type: 'success',
        header: `Update ${_.startCase(model)}`,
        message: 'Success'
      }))
    })
    .catch((e) => dispatch(errorHandler(e)))
}

const destroy = (id) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.destroy({model, id, access_token })
    })
    .then(() => {
      dispatch(sendNotification({
        type: 'success',
        header: `Delete ${_.startCase(model)}`,
        message: 'Success'
      }))
    })
    .catch((e) => dispatch(errorHandler(e)))
}

const searchData = (filter) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.searchData({model, filter, access_token, filteredField})
    })
    .then(({ data, totalCount }) => {
      return {
        data: data.map((datum) => (transformToFormData(datum))),
        totalCount
      }
    })
    .catch((e) => dispatch(errorHandler(e)))
}

export { 
  find,
  findById,
  add,
  update,
  destroy,
  searchData,
}