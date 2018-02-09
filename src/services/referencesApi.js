import _ from 'lodash'
import * as RefDataService from './api/SettingsService'

export default ({
  reference,
  searchText = '',
  access_token
}) => {
  let filter = {}
  switch(reference) {
    case 'postCode':
      filter = {
          order: 'code ASC',
          limit: '10'
        }
      if (searchText) {
        filter['where'] = {
          code: {
            like: `^${searchText}`
          }
        }
      }
      return RefDataService.find({model: 'postCodes', filter, access_token })
        .then(postCodes => {
          return postCodes.map((postCode) => ({
            key:  postCode.code,
            text:  _.startCase(postCode.code),
            value: postCode.code
          }))
        })
    case 'state':
      filter = {
          order: 'name ASC',
          limit: '10'
        }
        if (searchText) {
          filter['where'] = {
            or: [{
              code: {
                like: `${searchText.toUpperCase()}`
              }
            },{
              name: {
                like: `${searchText.toUpperCase()}`
              }
            }]
          }
        }
      return RefDataService.find({model: 'states', filter, access_token })
        .then(states => {
          return states.map(state => ({
            key:  state.code,
            text:  _.startCase(state.name.toLowerCase()),
            value: state.code
          }))
        })

    case 'suburbPcodeState':
      filter = {
        order: 'name ASC',
        limit: '10'
      }
      if (searchText) {
        filter['where'] = {
          name: {
            like: `${searchText.toUpperCase()}`
          }
        }
      }
      return RefDataService.find({model: 'suburbs', filter, access_token })
        .then((suburbs) => {
          return suburbs.map((suburb) => ({
            id:  suburb.id,
            suburb: suburb.name,
            postCode: suburb.postCode.code,
            stateCode: suburb.state.code,
            state: suburb.state.name,
          }))
        })
    case 'companies':
      filter = {
          order: 'name ASC',
          limit: '10'
        }
      if (searchText) {
        filter['where'] = {
          or: [
            {
              name: {
                like: `^${searchText.toUpperCase()}`
              }
            },
            {
              id: searchText
            }
          ]
        }
      }
      return RefDataService.find({model: 'companies', filter, access_token })
        .then((companies) => {
          return companies.map((company) => ({
            key:  company.id,
            text:  _.startCase(company.name.toLowerCase()),
            value: company.id
          }))
        })
    default:
      return Promise.reject('Unknown reference name: ', reference)
  }
}