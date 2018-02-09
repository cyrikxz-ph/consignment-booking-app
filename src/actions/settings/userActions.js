import _ from 'lodash'
import { getSession } from '../sessionActions'
import { errorHandler } from '../errorAction'
import * as SettingsService from '../../services/api/SettingsService'
import { sendNotification } from '../notificationAction'

const model = 'users'
const filteredField = ['firstName', 'lastName']

const transformToFormData = (data) => ({
  ...data,
  firstName: data.firstName ? _.startCase(data.firstName.toLowerCase()) : '',
  lastName: data.lastName ? _.startCase(data.lastName.toLowerCase()) : '',
  mi: data.mi ? _.startCase(data.mi.toLowerCase()) : '',
  companyName: data.company ? _.startCase(data.company.name.toLowerCase()) : '',
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
  email,
  password,
  firstName,
  mi,
  lastName,
  companyId,
  active,
}) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.add({
        model, 
        data: {
          email,
          firstName: firstName.toUpperCase(),
          lastName: lastName.toUpperCase(),
          mi: mi.toUpperCase(),
          companyId,
          password,
          active,
          access_token,
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

const update = (
  {
    id,
    email,
    firstName,
    mi,
    lastName,
    companyId,
    active,
  }
) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.update({
        model,
        id,
        data: {
          email,
          firstName: firstName.toUpperCase(),
          lastName: lastName.toUpperCase(),
          mi: mi.toUpperCase(),
          companyId,
          active,
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