import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import _ from 'lodash'
import referencesApi from '../../services/referencesApi'


export class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      loading: false,
      value: this.props.value || ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if ( nextProps.value !== this.props.value) {

      this.setState({ loading: true })
      this.fetchReferenceOptions(nextProps.value)
        .then((newValOptions) => {
          this.setState((prevState) => {
            const newOptions = prevState.options.some((option) => option.value === newValOptions[0].value) 
                                ? prevState.options
                                : newValOptions.concat(prevState.options)
            return {
              options: newOptions,
              loading: false,
              value: nextProps.value,
            }
          })
        })
    }
  }
  componentWillMount() {
    this.setState({ loading: true })
    this.fetchReferenceOptions(this.state.value)
      .then((options) => {
        this.setState(() => ({
          loading: false,
          options
        }))
      })
  }
  onChange = (e, { value }) => {
    this.setState({ value })
    this.props.onChange(value)
    this.props.onBlur()
  }
  onBlur = (e) => {
    this.props.onBlur()
  }
  onSearchChange = (e, { searchQuery }) => {
    this.setState({ loading: true })
    this.fetchReferenceOptions(searchQuery)
      .then((options) => {
        this.setState(() => ({
          loading: false,
          options
        }))
      })
  }
  fetchReferenceOptions = (searchText = '') => {
    return referencesApi(this.props.referenceName, searchText)
  }
  render() {
    const { options, value } = this.state
    const {
      label,
      placeholder = '',
      required = false,
      search = false,
      error = false,
    } = this.props
    
    return (
      <Form.Select
          error={error}
          label={label}
          placeholder={placeholder}
          required={required}
          search={search}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onSearchChange={this.onSearchChange}
          onOpen={() => this.fetchReferenceOptions()}
          value={value}
          options={options}
        />
    )
  }
}
Select.propTypes = {
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  required: PropTypes.bool,
  search: PropTypes.bool,
}
export default Select