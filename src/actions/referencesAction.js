import getReferencesData from '../services/referencesApi'
import { getSession } from './sessionActions'

export const fetchReferenceData = (reference, searchText) => {
  return (dispatch) => {
    return getSession()
      .then(({ token }) => {
        return getReferencesData({ reference, searchText, access_token: token })
      })
  }
}