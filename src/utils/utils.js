import React, { Component } from 'react'
import _ from 'lodash'
import { Field } from 'formik'
import { isEmpty, mapValues, join } from 'lodash'

export const enchanceFormikField = (Component) => {
  return class extends React.Component {
    render() {
      return (
        <Field name={this.props.name} render={(props) => <Component {...this.props} { ...props}/>}/>
      )
    }
  }
}

export const transformApiToFormikErrors = (error) => {
  const { details } = error
  if (details) {
    return isEmpty(details.messages) ? {} : mapValues(details.messages, (value) => join(value, '; '))
  }
  else {
    return {}
  }
}

export const transformToApiFilter = (filter, filteredField) => {
  const apiFilter = {}
  filter.limit && _.set(apiFilter, 'limit', filter.limit)

  if (filter.pageNumber && filter.limit && filter.pageNumber > 1) {
    _.set(apiFilter, 'skip', (filter.pageNumber - 1) * filter.limit)
  }

  if (! _.isEmpty(filter.sort)) {
    _.set(apiFilter, 'order', `${filter.sort.column} ${filter.sort.direction === 'descending' ? 'DESC' : 'ASC'}`)
  }
  
  if(filter.searchText) {
    if(filteredField.length > 1) {
      _.set(apiFilter,
        'where',
        {
          or: filteredField.map((field) => {
            return _.set({}, field, { like: `${filter.searchText.toUpperCase()}`})
          })
        })
    } else {
      _.set(apiFilter,
        'where',
        _.set({}, filteredField[0], { like: `${filter.searchText.toUpperCase()}`})
      )
    }
  }
  return apiFilter
}