import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react'
import _ from 'lodash'
import referencesApi from '../../services/referencesApi'

class SuburbPCodeStateFormSelect extends Component {
  constructor(props) {
    super(props)
    const { names, disabled = false, form: {errors, touched} } = props

    const errorsObj = {}
    _.has(errors, names.suburb ) && _.set(errorsObj, names.suburb, errors[names.suburb])
    _.has(errors, names.postCode ) && _.set(errorsObj, names.postCode, errors[names.postCode])
    _.has(errors, names.state ) && _.set(errorsObj, names.state, errors[names.state])

    const touchedObj = {}
    _.has(touched, names.suburb ) && _.set(touchedObj, names.suburb, touched[names.suburb])
    _.has(touched, names.postCode ) && _.set(touchedObj, names.postCode, touched[names.postCode])
    _.has(touched, names.state ) && _.set(touchedObj, names.state, touched[names.state])

    this.state = {
      id: '',
      loading: false,
      disabled: disabled,
      postCode: '',
      referenceId: 'suburbPcodeState',
      referenceData: [],
      state: '',
      suburb: '',
      suburbOptions: [],
      touched: touchedObj,
      errors: errorsObj,
    }
  }
  componentDidMount() {
    const { names, form: { values } } = this.props
    this.setState({ loading: true })
    this.fetchReferenceOptions()
      .then((suburbs) => {
        let suburbOptions = suburbs.map((suburb) => ({
          text: _.startCase(suburb.suburb.toLowerCase()),
          content: `${_.startCase(suburb.suburb.toLowerCase())} ${suburb.postCode} ${suburb.state}`,
          value: suburb.id
        }))

        if ( values[names.suburb] && values[names.postCode] && values[names.state] ) {
          const currentSuburb = suburbs.find((refData) => (
            refData.suburb === values[names.suburb] &&
            refData.postCode === values[names.postCode] &&
            refData.stateCode === values[names.state]
          ))
          if (currentSuburb) {
            const { id, postCode, suburb, state } = currentSuburb
              return Promise.resolve({
                id,
                loading: false,
                postCode,
                referenceData: suburbs,
                state,
                suburb,
                suburbOptions,
              })
          } else {
            return this.fetchReferenceOptions(values[names.suburb])
              .then((newSuburbs) => {
                suburbOptions = newSuburbs.map((suburb) => ({
                  text: _.startCase(suburb.suburb.toLowerCase()),
                  content: `${_.startCase(suburb.suburb.toLowerCase())} ${suburb.postCode} ${suburb.state}`,
                  value: suburb.id
                }))

                const resultSuburb = newSuburbs.find((refData) => (
                  refData.suburb === values[names.suburb] &&
                  refData.postCode === values[names.postCode] &&
                  refData.stateCode === values[names.state]
                ))
                const { id, postCode, suburb, state } = resultSuburb
                return {
                  id,
                  loading: false,
                  postCode,
                  referenceData: newSuburbs,
                  state,
                  suburb,
                  suburbOptions,
                }
              })
          }
        } else {
            return Promise.resolve({
              loading: false,
              referenceData: suburbs,
              suburbOptions,
            })
        }
      })
      .then((newState) => {
        this.setState(() => ({ ...newState }))
      })
      .catch((e) => {
        console.log(e)
      })
  }
  componentWillReceiveProps(nextProps) {
    const { names, disabled, form: { values: newValues, errors, touched }} = nextProps
    const { form: { values: prevValues}} = this.props
    const { errors: prevErrors, touched: prevTouched, disabled: prevDisabled } = this.state

    if(newValues[names.suburb] !== prevValues[names.suburb] && 
      newValues[names.postCode] !== prevValues[names.postCode] && 
      newValues[names.state] !== prevValues[names.state] ) {
        this.fetchReferenceOptions()
          .then((suburbs) => {
            const suburbOptions = suburbs.map((suburb) => ({
              text: _.startCase(suburb.suburb.toLowerCase()),
              content: `${_.startCase(suburb.suburb.toLowerCase())} ${suburb.postCode} ${suburb.state}`,
              value: suburb.id
            }))
            const currentSuburb = suburbs.find((refData) => (
              refData.suburb === newValues[names.suburb] &&
              refData.postCode === newValues[names.postCode] &&
              refData.stateCode === newValues[names.state]
            ))
            if (currentSuburb) {
              return Promise.resolve({
                  id: currentSuburb.id,
                  suburb: currentSuburb.suburb,
                  postCode: currentSuburb.postCode,
                  state: currentSuburb.state,
                  suburbOptions,
                  referenceData: suburbs
                })
            } else {
              return this.fetchReferenceOptions(newValues[names.suburb])
                .then((searchSuburb) => {
                  const newSuburbOptions = searchSuburb.map((suburb) => ({
                    text: _.startCase(suburb.suburb.toLowerCase()),
                    content: `${_.startCase(suburb.suburb.toLowerCase())} ${suburb.postCode} ${suburb.state}`,
                    value: suburb.id
                  }))

                  const { id, suburb, postCode, state} = suburbs.concat(searchSuburb).find((refData) => (
                    refData.suburb === newValues[names.suburb] &&
                    refData.postCode === newValues[names.postCode] &&
                    refData.stateCode === newValues[names.state]
                  ))
                  return {
                    id,
                    suburb,
                    postCode,
                    state,
                    suburbOptions: suburbOptions.concat(newSuburbOptions),
                    referenceData: suburbs.concat(searchSuburb)
                  }
                })
            }
          })
          .then((newState) => {
            this.setState(() => ({ ...newState }))
          })
    } 
    if (errors[names.suburb] !== prevErrors[names.suburb] &&
      errors[names.postCode] !== prevErrors[names.postCode] &&
      errors[names.state] !== prevErrors[names.state]) {
        this.setState((prevState) => {
          const newErrors = {}
          _.has(errors, names.suburb ) && _.set(newErrors, names.suburb, errors[names.suburb])
          _.has(errors, names.postCode ) && _.set(newErrors, names.postCode, errors[names.postCode])
          _.has(errors, names.state ) && _.set(newErrors, names.state, errors[names.state])
          return {
            errors: newErrors
          }
        })
    } 
    if (touched[names.suburb] !== prevTouched[names.suburb] &&
      touched[names.postCode] !== prevTouched[names.postCode] &&
      touched[names.state] !== prevTouched[names.state]) {
        this.setState((prevState) => {
          const newTouched = {}
          _.has(touched, names.suburb ) && _.set(newTouched, names.suburb, touched[names.suburb])
          _.has(touched, names.postCode ) && _.set(newTouched, names.postCode, touched[names.postCode])
          _.has(touched, names.state ) && _.set(newTouched, names.state, touched[names.state])
          return {
            touched: newTouched
          }
        })
    }
    if (disabled !== prevDisabled) {
      this.setState(() => ({ disabled }))
    }
  }
  onChange = (e, { value } ) => {
    const { names, form: { values, setValues }} = this.props
    const { suburb: suburbVal, postCode: postCodeVal, stateCode: stateCodeVal } = this.state.referenceData.find((res) => res.id === value)
    const newValues = {}
    newValues[names.suburb] = suburbVal
    newValues[names.postCode] = postCodeVal
    newValues[names.state] = stateCodeVal
    setValues(_.assign({}, values, newValues))
  }
  onBlur = (e) => {
    const { names, form: { touched, setTouched }} = this.props
    const newTouched = {}
    newTouched[names.suburb] = true
    newTouched[names.postCode] = true
    newTouched[names.state] = true
    setTouched(_.assign({}, touched, newTouched))
  }
  onSearchChange = (e, { searchQuery }) => {
    this.setState({ loading: true })
    this.fetchReferenceOptions(searchQuery)
      .then((suburbs) => {
        this.setState(() => ({
          referenceData: suburbs,
          suburbOptions: suburbs.map((suburb) => ({
            key: suburb.id,
            text: _.startCase(suburb.suburb.toLowerCase()),
            content: `${_.startCase(suburb.suburb.toLowerCase())} ${suburb.postCode} ${suburb.state}`,
            value: suburb.id
          })),
          loading: false
        }))
      })
  }
  fetchReferenceOptions = (searchText = '') => {
    return referencesApi(this.state.referenceId, searchText)
  }
  render() {
    const { disabled, errors, suburb, id, suburbOptions, postCode, state, loading, touched } = this.state
    const { names } = this.props
    return (
      <Form.Group>
        <Form.Select
          disabled={disabled}
          error={_.has(touched, names.state) && _.has(errors,names.state)}
          search
          label={<label> Suburb:
                    {(_.has(touched, names.suburb) && _.has(errors, names.suburb)) &&
                      <label style={{color: 'red', marginLeft: '0.5em'}}>*{errors[names.suburb]}</label>}
                    </label>}
          loading={loading}
          placeholder='Suburb'
          options={suburbOptions}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onSearchChange={this.onSearchChange}
          value={id}
          width={8}
        />
        <Form.Input
          disabled={disabled}
          error={_.has(touched, names.state) && _.has(errors,names.state)}
          label={<label color='red'> Post Code:
                  {_.has(touched, names.postCode) &&
                    _.has(errors,names.postCode) &&
                    <label style={{color: 'red', marginLeft: '0.5em'}}>*{errors[names.postCode]}</label>}
                  </label>}
          placeholder='Post Code'
          value={postCode}
          width={3}
        />
        <Form.Input
          disabled={disabled}
          error={_.has(touched, names.state) && _.has(errors,names.state)}
          label={<label color='red'> State: 
                {_.has(touched, names.state) &&
                  _.has(errors,names.state) &&
                  <label style={{color: 'red', marginLeft: '0.5em'}}>*{errors[names.state]}</label>}
                </label>}
          placeholder='State'
          value={state}
          width={5}
        />
      </Form.Group>
    )
  }
}
export default SuburbPCodeStateFormSelect