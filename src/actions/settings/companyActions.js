import _ from 'lodash'
import { getSession } from '../sessionActions'
import { errorHandler } from '../errorAction'
import { sendNotification } from '../notificationAction'
import * as SettingsService from '../../services/api/SettingsService'

const model = 'companies'
const filteredField = ['name']

const transformToFormData = (data) => ({
  ...data,
  name: _.startCase(data.name.toLowerCase()),
  contactPerson: _.startCase(data.contactPerson.toLowerCase()),
  parentCompanyName: data.parentCompany ? _.startCase(data.parentCompany.name.toLowerCase()) : '',
  phone: data.phone ? `+${data.phone}` : '',
})


const add = ({
  name,
  contactPerson,
  addressLine1,
  addressLine2,
  addressLine3,
  suburb,
  state,
  senderAddressContactPerson,
  senderAddressAddrLine1,
  senderAddressAddrLine2,
  senderAddressAddrLine3,
  senderAddressSuburb,
  senderAddressState,
  returnAddressContactPerson,
  returnAddressAddrLine1,
  returnAddressAddrLine2,
  returnAddressAddrLine3,
  returnAddressSuburb,
  returnAddressState,
  ...restOfData
}) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.add({
        model, 
        data: {
          name: name.toUpperCase(),
          contactPerson: contactPerson.toUpperCase(),
          addressLine1: addressLine1.toUpperCase(),
          addressLine2: addressLine2.toUpperCase(),
          addressLine3: addressLine3.toUpperCase(),
          suburb: suburb.toUpperCase(),
          state: state.toUpperCase(),
          senderAddressContactPerson: senderAddressContactPerson.toUpperCase(),
          senderAddressAddrLine1: senderAddressAddrLine1.toUpperCase(),
          senderAddressAddrLine2: senderAddressAddrLine2.toUpperCase(),
          senderAddressAddrLine3: senderAddressAddrLine3.toUpperCase(),
          senderAddressSuburb: senderAddressSuburb.toUpperCase(),
          senderAddressState: senderAddressState.toUpperCase(),
          returnAddressContactPerson: returnAddressContactPerson.toUpperCase(),
          returnAddressAddrLine1: returnAddressAddrLine1.toUpperCase(),
          returnAddressAddrLine2: returnAddressAddrLine2.toUpperCase(),
          returnAddressAddrLine3: returnAddressAddrLine3.toUpperCase(),
          returnAddressSuburb: returnAddressSuburb.toUpperCase(),
          returnAddressState: returnAddressState.toUpperCase(),
          ...restOfData
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

const update = (
  {
    id,
    name,
    contactPerson,
    addressLine1,
    addressLine2,
    addressLine3,
    suburb,
    state,
    senderAddressContactPerson,
    senderAddressAddrLine1,
    senderAddressAddrLine2,
    senderAddressAddrLine3,
    senderAddressSuburb,
    senderAddressState,
    returnAddressContactPerson,
    returnAddressAddrLine1,
    returnAddressAddrLine2,
    returnAddressAddrLine3,
    returnAddressSuburb,
    returnAddressState,
    ...restOfData
  }
) => (dispatch) => {
  return getSession()
    .then(({ token: access_token }) => {
      return SettingsService.update({
        model,
        id,
        data: {
          name: name.toUpperCase(),
          contactPerson: contactPerson.toUpperCase(),
          addressLine1: addressLine1.toUpperCase(),
          addressLine2: addressLine2.toUpperCase(),
          addressLine3: addressLine3.toUpperCase(),
          suburb: suburb.toUpperCase(),
          state: state.toUpperCase(),
          senderAddressContactPerson: senderAddressContactPerson.toUpperCase(),
          senderAddressAddrLine1: senderAddressAddrLine1.toUpperCase(),
          senderAddressAddrLine2: senderAddressAddrLine2.toUpperCase(),
          senderAddressAddrLine3: senderAddressAddrLine3.toUpperCase(),
          senderAddressSuburb: senderAddressSuburb.toUpperCase(),
          senderAddressState: senderAddressState.toUpperCase(),
          returnAddressContactPerson: returnAddressContactPerson.toUpperCase(),
          returnAddressAddrLine1: returnAddressAddrLine1.toUpperCase(),
          returnAddressAddrLine2: returnAddressAddrLine2.toUpperCase(),
          returnAddressAddrLine3: returnAddressAddrLine3.toUpperCase(),
          returnAddressSuburb: returnAddressSuburb.toUpperCase(),
          returnAddressState: returnAddressState.toUpperCase(),
          ...restOfData
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

export { 
  find,
  findById,
  add,
  update,
  destroy,
  searchData,
}
// export const getCompaniesData = (filter) => {
//   return (dispatch) => {
//     return getSession()
//       .then(({ token: access_token }) => {
//         return CompanyService.getCompaniesData({ filter, access_token })
//       })
//       .then(({ data, totalCount }) => {
//         return { data, totalCount }
//       })
//       .catch((e) => dispatch(errorHandler(e)))
//   }
// }
// export const getCompany = (id) => {
//   return (dispatch) => {
//     return getSession()
//       .then(({ token: access_token }) => {
//         return CompanyService.getCompany({id, access_token})
//       })
//       .then((company) => ({ ...company }))
//       .catch((e) => dispatch(errorHandler(e)))
//   }
// }
// export const addCompany = ({
//   name,
//   contactPerson,
//   phone,
//   email,
//   addressLine1,
//   addressLine2,
//   addressLine3,
//   suburb,
//   postCode,
//   state,
//   active,
//   senderAddressUseCompanyAddr,
//   senderAddressContactPerson,
//   senderAddressPhone,
//   senderAddressEmail,
//   senderAddressAddrLine1,
//   senderAddressAddrLine2,
//   senderAddressAddrLine3,
//   senderAddressSuburb,
//   senderAddressPostCode,
//   senderAddressState,
//   returnAddressUseCourier,
//   returnAddressContactPerson,
//   returnAddressPhone,
//   returnAddressEmail,
//   returnAddressAddrLine1,
//   returnAddressAddrLine2,
//   returnAddressAddrLine3,
//   returnAddressSuburb,
//   returnAddressPostCode,
//   returnAddressState,
//   parentId,
//   allowedManifest,
//   serviceTypes,
//   notifyOnCreate,
//   notifyOnManifest,
//   notifyOnDeliveryRoute,
//   notifyOnDelivered,
//   notifyOnCarded,
//   apiKey,
// }) => {
//   return (dispatch) => {
//     return getSession()
//       .then(({ token: access_token }) => {
//         return CompanyService.postCompany({
//           name: name.toUpperCase(),
//           contactPerson: contactPerson.toUpperCase(),
//           phone,
//           email,
//           addressLine1: addressLine1.toUpperCase(),
//           addressLine2: addressLine2.toUpperCase(),
//           addressLine3: addressLine3.toUpperCase(),
//           suburb: suburb.toUpperCase(),
//           postCode,
//           state: state.toUpperCase(),
//           active,
//           senderAddressUseCompanyAddr,
//           senderAddressContactPerson: senderAddressContactPerson.toUpperCase(),
//           senderAddressPhone,
//           senderAddressEmail,
//           senderAddressAddrLine1: senderAddressAddrLine1.toUpperCase(),
//           senderAddressAddrLine2: senderAddressAddrLine2.toUpperCase(),
//           senderAddressAddrLine3: senderAddressAddrLine3.toUpperCase(),
//           senderAddressSuburb: senderAddressSuburb.toUpperCase(),
//           senderAddressPostCode,
//           senderAddressState: senderAddressState.toUpperCase(),
//           returnAddressUseCourier,
//           returnAddressContactPerson: returnAddressContactPerson.toUpperCase(),
//           returnAddressPhone,
//           returnAddressEmail,
//           returnAddressAddrLine1: returnAddressAddrLine1.toUpperCase(),
//           returnAddressAddrLine2: returnAddressAddrLine2.toUpperCase(),
//           returnAddressAddrLine3: returnAddressAddrLine3.toUpperCase(),
//           returnAddressSuburb: returnAddressSuburb.toUpperCase(),
//           returnAddressPostCode,
//           returnAddressState: returnAddressState.toUpperCase(),
//           parentId,
//           allowedManifest,
//           serviceTypes,
//           notifyOnCreate,
//           notifyOnManifest,
//           notifyOnDeliveryRoute,
//           notifyOnDelivered,
//           notifyOnCarded,
//           apiKey,
//           access_token
//         })
//       })
//       .then(() => {
//         dispatch(sendNotification({
//           type: 'success',
//           header: 'Add Company',
//           message: 'Success'
//         }))
//       })
//       .catch((e) => dispatch(errorHandler(e)))
//   }
// }
// export const updateCompany = ({
//   id,
//   name,
//   contactPerson,
//   phone,
//   email,
//   addressLine1,
//   addressLine2,
//   addressLine3,
//   suburb,
//   postCode,
//   state,
//   active,
//   senderAddressUseCompanyAddr,
//   senderAddressContactPerson,
//   senderAddressPhone,
//   senderAddressEmail,
//   senderAddressAddrLine1,
//   senderAddressAddrLine2,
//   senderAddressAddrLine3,
//   senderAddressSuburb,
//   senderAddressPostCode,
//   senderAddressState,
//   returnAddressUseCourier,
//   returnAddressContactPerson,
//   returnAddressPhone,
//   returnAddressEmail,
//   returnAddressAddrLine1,
//   returnAddressAddrLine2,
//   returnAddressAddrLine3,
//   returnAddressSuburb,
//   returnAddressPostCode,
//   returnAddressState,
//   parentId,
//   allowedManifest,
//   serviceTypes,
//   notifyOnCreate,
//   notifyOnManifest,
//   notifyOnDeliveryRoute,
//   notifyOnDelivered,
//   notifyOnCarded,
//   apiKey,
// }) => {
//   return (dispatch) => {
//     return getSession()
//       .then(({ token: access_token }) => {
//         return CompanyService.updateCompany({
//           id,
//           name: name.toUpperCase(),
//           contactPerson: contactPerson.toUpperCase(),
//           phone,
//           email,
//           addressLine1: addressLine1.toUpperCase(),
//           addressLine2: addressLine2.toUpperCase(),
//           addressLine3: addressLine3.toUpperCase(),
//           suburb: suburb.toUpperCase(),
//           postCode,
//           state: state.toUpperCase(),
//           active,
//           senderAddressUseCompanyAddr,
//           senderAddressContactPerson: senderAddressContactPerson.toUpperCase(),
//           senderAddressPhone,
//           senderAddressEmail,
//           senderAddressAddrLine1: senderAddressAddrLine1.toUpperCase(),
//           senderAddressAddrLine2: senderAddressAddrLine2.toUpperCase(),
//           senderAddressAddrLine3: senderAddressAddrLine3.toUpperCase(),
//           senderAddressSuburb: senderAddressSuburb.toUpperCase(),
//           senderAddressPostCode,
//           senderAddressState: senderAddressState.toUpperCase(),
//           returnAddressUseCourier,
//           returnAddressContactPerson: returnAddressContactPerson.toUpperCase(),
//           returnAddressPhone,
//           returnAddressEmail,
//           returnAddressAddrLine1: returnAddressAddrLine1.toUpperCase(),
//           returnAddressAddrLine2: returnAddressAddrLine2.toUpperCase(),
//           returnAddressAddrLine3: returnAddressAddrLine3.toUpperCase(),
//           returnAddressSuburb: returnAddressSuburb.toUpperCase(),
//           returnAddressPostCode,
//           returnAddressState: returnAddressState.toUpperCase(),
//           parentId,
//           allowedManifest,
//           serviceTypes,
//           notifyOnCreate,
//           notifyOnManifest,
//           notifyOnDeliveryRoute,
//           notifyOnDelivered,
//           notifyOnCarded,
//           apiKey,
//           access_token
//         })
//       })
//       .then((res) => {
//         dispatch(sendNotification({
//           type: 'success',
//           header: 'Edit',
//           message: 'Success'
//         }))
//       })
//       .catch((e) => dispatch(errorHandler(e)))
//   }
// }
// export const deleteCompany = (id) => {
//   return (dispatch) => {
//     return getSession()
//       .then(({ token: access_token }) => {
//         return CompanyService.deleteCompany({ id, access_token })
//       })
//       .then(() => {
//         dispatch(sendNotification({
//           type: 'success',
//           header: 'Delete Company',
//           message: 'Success'
//         }))
//       })
//       .catch((e) => dispatch(errorHandler(e)))
//   }
// }