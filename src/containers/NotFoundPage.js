import React from 'react'
import { compose, branch, renderNothing } from 'recompose'
import { Link } from 'react-router-dom'

const NotFoundPage = ({ authenticated }) => (
  <div>
    Page not found
  </div>
)

export default compose(
)(NotFoundPage)
