import _ from 'lodash'
import SuburbService from './api/SuburbService'

export const getSuburbData = (filter) => {
  const apiFilter = {}
  
  if (filter.limit) {
    apiFilter['limit'] = filter.limit
  }
  if (filter.pageNumber && filter.limit && filter.pageNumber > 1) {
    apiFilter['skip'] = (filter.pageNumber - 1) * filter.limit
  }
  if (filter.searchText) {
    apiFilter['where'] = {
      name: {
        like: `${filter.searchText.toUpperCase()}`
      }
    }
  }
  let totalCount
  return SuburbService.getSuburbCount(apiFilter)
    .then(({ count }) => {
      totalCount = count
      return SuburbService.getSuburbs(apiFilter)
    })
    .then((suburbs) => {
      return {
        data: suburbs.map((suburb) => ({
                id: suburb.id,
                suburb: _.startCase(suburb.name.toLowerCase()),
                postCode: suburb.postCode.code,
                state: _.startCase(suburb.state.name.toLowerCase()),
                active: suburb.active
              })),
        totalCount
      };
    })
}