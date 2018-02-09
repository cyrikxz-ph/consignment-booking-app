import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle, mapProps, onlyUpdateForKeys, setDisplayName,  withHandlers, withState } from 'recompose'
import { Field } from 'formik'
import { Form } from 'semantic-ui-react'
import { omit, has } from 'lodash'
import { fetchReferenceData } from '../../actions/referencesAction'
import { enchanceFormikField } from '../../utils/utils'

export default compose(
  enchanceFormikField,
  connect(),
  mapProps((props) => ({ 
    ...props, 
    value: props.field.value,
    error: has(props.form.errors, props.name),
    label: <label color='red'>{props.label}
            {
              has(props.form.touched, props.name) &&
              has(props.form.errors, props.name) &&
              <label style={{color: 'red', marginLeft: '0.5em'}}>*{props.form.errors[props.name]}</label>
            }
          </label>
  })),
  withState('options', 'setOptions', []),
  withState('loading', 'setLoading', false),
  withHandlers({
    onBlur: ({ name, form: { setFieldTouched }}) => (e) => { setFieldTouched(name, true) },
    onChange: ({ name, form: { setFieldValue } }) => (e, { value }) => { setFieldValue(name, value) },
    onSearchChange: ({ includedoption, reference, setLoading, setOptions, dispatch }) => (e, { searchQuery }) => {
      setLoading(true)
      dispatch(fetchReferenceData(reference, searchQuery))
        .then((options) => {
          if (includedoption) { 
            setOptions(includedoption.concat(options))
          } else {
            setOptions(options)
          }
          setLoading(false)
        })
    },
  }),
  lifecycle({
    componentDidMount() {
      const {
        dispatch,
        form: { setFieldError, setFieldTouched },
        includedoption,
        name,
        reference,
        setErrorText,
        setLoading,
        setOptions,
        value
      } = this.props

      this.props.setLoading(true)
      dispatch(fetchReferenceData(reference))
        .then((refOptions) => {
          if (includedoption) { 
            setOptions(includedoption.concat(refOptions))
          } else {
            setOptions(refOptions)
          }
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
          setFieldError(name, 'Unable to load values')
          setFieldTouched(name, true)
        })
    },
    componentWillReceiveProps(nextProps) {
      const {
        dispatch, 
        form: { setFieldError, setFieldTouched },
        includedoption,
        name,
        options,
        reference,
        setLoading,
        setOptions,
        value
      } = this.props

      const { value: newValue } = nextProps
      if (newValue !== value) {
        setLoading(true)
        dispatch(fetchReferenceData(reference))
          .then((options) => {

            let vOptions = []
            if (includedoption) { 
              vOptions = includedoption.concat(options)
            } else {
              vOptions = options
            }
            
            if (vOptions.some((option) => option.value === newValue)) {
              return Promise.resolve(options)
            } else {
              return dispatch(fetchReferenceData(reference, newValue))
                .then((searchedOption) => {
                  return options.concat(searchedOption)
                })
            }
          })
          .then((finalOptions) => {

            if (includedoption) { 
              setOptions(includedoption.concat(finalOptions))
            } else {
              setOptions(finalOptions)
            }
            setLoading(false)
          })
          .catch((e) => {
            setLoading(false)
            setFieldError(name, 'Unable to load values')
            setFieldTouched(name, true)
            console.log(e)
          })
      }
    }
  }),
  onlyUpdateForKeys(['error', 'errorText', 'loading', 'label', 'options', 'value']),
  mapProps((props) => {
    return omit(props, ['form', 'field', 'setOptions','setLoading','fetchOptions', 'name', 'dispatch'])
  }),
  setDisplayName('FormSelect'),
)(Form.Select);