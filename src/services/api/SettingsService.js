import _ from 'lodash'
import request from '../request'
import { transformToApiFilter } from '../../utils/utils'

export const find = ({
  model,
  filter,
  access_token
}) => {
  return request({
    url: `/${model}`,
    method: 'GET',
    params: {
      filter: JSON.stringify(filter),
      access_token
    }
  })
}

export const findById = ({
  model,
  id,
  access_token
}) => {
  return request({
    url: `/${model}/${id}`,
    method: 'GET',
    params: {
      access_token
    }
  })
}

export const count = ({
  model,
  filter,
  access_token
}) => {
  return request({
    url: `/${model}/count`,
    method: 'GET',
    params: {
      where: JSON.stringify(filter.where),
      access_token
    }
  });
}

export const add = ({
  model,
  data,
  access_token
}) => {
  return request({
    url: `/${model}`,
    method: 'POST',
    data,
    params: {
      access_token
    }
  });
}

export const update = ({
  model,
  id,
  data,
  access_token
}) => {
  return request({
    url: `/${model}/${id}`,
    method: 'PATCH',
    data,
    params: {
      access_token
    }
  });
}

export const destroy = ({
  model,
  id,
  access_token
}) => {
  return request({
    url:  `/${model}/${id}`,
    method: 'DELETE',
    params: {
      access_token
    }
  });
}

export const searchData = ({
  model,
  filter,
  access_token,
  filteredField = ['description']
}) => {
  let totalCount = count
  return count({ model, filter: transformToApiFilter(filter,filteredField), access_token})
    .then(({ count }) => {
      totalCount = count
      return find({ model, filter: transformToApiFilter(filter,filteredField), access_token})
    })
    .then((data) => {
      return {
        data,
        totalCount
      }
    })
}
  