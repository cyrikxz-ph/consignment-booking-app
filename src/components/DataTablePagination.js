import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'

const DataTablePagination = (props) => (
  <Menu pagination floated='right'>
    <Menu.Item
      disabled={props.pageNumberCurrent === 1}
      name='prev'
      onClick={props.onPagePrev}
    />
    <Menu.Item
      active={true}
      name={props.pageNumberCurrent.toString()} 
    />
    <Menu.Item
      disabled={props.pageNumberCurrent === props.pageNumberTotal}
      name='next'
      onClick={props.onPageNext}
    />
  </Menu>
)

DataTablePagination.propTypes = {
  onPageNext: PropTypes.func.isRequired,
  onPagePrev: PropTypes.func.isRequired,
  pageNumberCurrent: PropTypes.number.isRequired,
  pageNumberTotal: PropTypes.number.isRequired,
}

export default DataTablePagination


// { props.pageNumberCurrent > 3 && <Menu.Item disabled>...</Menu.Item>}
// { Array.from(Array(10).keys()).filter(
//     (pageNumber) => {
//       return pageNumber >= props.pageNumberCurrent - 2 
//         && pageNumber <= props.pageNumberCurrent + 2
//         && pageNumber > 0
//         && pageNumber + 1 <= props.pageNumberTotal
//     }
//   ).map((pageNumber) => (
//   ))
// }
// { props.pageNumber !== props.pageNumberTotal && <Menu.Item disabled>...</Menu.Item>}
    // <Menu.Item name={props.pageNumber.toString()} active />