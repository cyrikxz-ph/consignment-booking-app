import React, { Component } from 'react'
import _ from 'lodash'
import { Button, Divider, Form, Container, Menu, Label, Tab } from 'semantic-ui-react'
import { withFormik } from 'formik'
import Yup from 'yup'
import GeneralInfoPane from './Company/GeneralInfoPane'
import SettingsPane from './Company/SettingsPane'
import SenderReturnAddressPane from './Company/SenderReturnAddressPane';
import { transformApiToFormikErrors } from '../../../utils/utils'

const getErrorCount = (errors, key) => {
  let errorCount = 0
  switch(key){
    case 'generalInfo':
      _.has(errors, 'name') && errorCount++
      _.has(errors, 'contactPerson') && errorCount++
      _.has(errors, 'phone') && errorCount++
      _.has(errors, 'email') && errorCount++
      _.has(errors, 'addressLine1') && errorCount++
      _.has(errors, 'addressLine2') && errorCount++
      _.has(errors, 'addressLine3') && errorCount++
      _.has(errors, 'suburb')  && errorCount++
      _.has(errors, 'postCode')  && errorCount++
      _.has(errors, 'state')  && errorCount++
      _.has(errors, 'active')  && errorCount++
      return errorCount
    case 'senderReturnAddress':
      _.has(errors, 'senderAddressUseCompanyAddr') && errorCount++
      _.has(errors, 'senderAddressContactPerson') && errorCount++
      _.has(errors, 'senderAddressPhone') && errorCount++
      _.has(errors, 'senderAddressEmail') && errorCount++
      _.has(errors, 'senderAddressAddrLine1') && errorCount++
      _.has(errors, 'senderAddressAddrLine2') && errorCount++
      _.has(errors, 'senderAddressAddrLine3') && errorCount++
      _.has(errors, 'senderAddressSuburb') && errorCount++
      _.has(errors, 'senderAddressPostCode') && errorCount++
      _.has(errors, 'senderAddressState') && errorCount++
      _.has(errors, 'returnAddressUseCourier') && errorCount++
      _.has(errors, 'returnAddressContactPerson') && errorCount++
      _.has(errors, 'returnAddressPhone') && errorCount++
      _.has(errors, 'returnAddressEmail') && errorCount++
      _.has(errors, 'returnAddressAddrLine1') && errorCount++
      _.has(errors, 'returnAddressAddrLine2') && errorCount++
      _.has(errors, 'returnAddressAddrLine3') && errorCount++
      _.has(errors, 'returnAddressSuburb') && errorCount++
      _.has(errors, 'returnAddressPostCode') && errorCount++
      _.has(errors, 'returnAddressState') && errorCount++
      return errorCount
    case 'settings':
      _.has(errors, 'parentId') && errorCount++
      _.has(errors, 'allowedManifest') && errorCount++
      _.has(errors, 'serviceTypes') && errorCount++
      _.has(errors, 'notifyOnCreate') && errorCount++
      _.has(errors, 'notifyOnManifest') && errorCount++
      _.has(errors, 'notifyOnDeliveryRoute') && errorCount++
      _.has(errors, 'notifyOnDelivered') && errorCount++
      _.has(errors, 'notifyOnCarded') && errorCount++
      _.has(errors, 'apiKey') && errorCount++
      return errorCount
    default:
      return 0
  }
}
const CompanyForm = ({
  errors,
  handleSubmit,
  isSubmitting,
  onBack,
  setFieldTouched,
  setFieldValue,
  setTouched,
  setValues,
  touched,
  values,
}) => {
  return (
    <Form
      onSubmit={handleSubmit}
      loading={isSubmitting}>
      <Tab
        defaultActiveIndex={0}
        menu={{ secondary: true, pointing: true,  widths: 3 }}
        panes={[
          {
            menuItem: <Menu.Item key='generalInfo'>
                        General Info
                        {getErrorCount(errors, 'generalInfo') > 0 
                          ? <Label color='red'>{getErrorCount(errors, 'generalInfo')}</Label> 
                          : ''
                        }
                      </Menu.Item>,
            render: (props) => <GeneralInfoPane {...props} /> 
          },
          {
            menuItem: <Menu.Item key='senderReturnAddress'>
                        Sender and Return Address
                        {getErrorCount(errors, 'senderReturnAddress') > 0 
                          ? <Label color='red'>{getErrorCount(errors, 'senderReturnAddress')}</Label> 
                          : ''
                        }
                      </Menu.Item>,
            render: (props) => <SenderReturnAddressPane {...props} />
          },
          {
            menuItem: <Menu.Item key='settings'>
                        Company Settings
                        {getErrorCount(errors, 'settings') > 0 
                          ? <Label color='red'>{getErrorCount(errors, 'settings')}</Label> 
                          : ''
                        }
                      </Menu.Item>,
            render: (props) => <SettingsPane {...props} />
          }
        ]}
        values={values}
        errors={errors}
        touched={touched}
      />
      <Divider />
      <Button.Group size='large'>
        <Button type='button' onClick={(e) => { onBack() }}>Back</Button>
        <Button.Or />
        <Button primary>Save</Button>
      </Button.Group>
    </Form>
  )
}
export default withFormik({
  displayName: 'CompanyForm',
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { data: company } = props
    return {
      id: _.has(company, 'id') ?  company.id : '',
      name: _.has(company, 'name') ? _.startCase(company.name.toLowerCase()) : '',
      contactPerson: _.has(company, 'contactPerson') ? _.startCase(company.contactPerson.toLowerCase()) : '',
      phone: _.has(company, 'phone') ?  company.phone : '',
      email: _.has(company, 'email') ?  company.email : '',
      addressLine1: _.has(company, 'addressLine1') ? _.startCase(company.addressLine1.toLowerCase()) : '',
      addressLine2: _.has(company, 'addressLine2') ? _.startCase(company.addressLine2.toLowerCase()) : '',
      addressLine3: _.has(company, 'addressLine3') ? _.startCase(company.addressLine3.toLowerCase()) : '',
      suburb: _.has(company, 'suburb') ?  company.suburb : '',
      postCode: _.has(company, 'postCode') ?  company.postCode : '',
      state: _.has(company, 'state') ?  company.state : '',
      active: _.has(company, 'active') ?  company.active : true,
      senderAddressUseCompanyAddr: _.has(company, 'senderAddressUseCompanyAddr') ?  company.senderAddressUseCompanyAddr : true,
      senderAddressContactPerson:  _.has(company, 'senderAddressContactPerson') ? _.startCase(company.senderAddressContactPerson.toLowerCase()) : '',
      senderAddressPhone: _.has(company, 'senderAddressPhone') ?  company.senderAddressPhone : '',
      senderAddressEmail: _.has(company, 'senderAddressEmail') ?  company.senderAddressEmail : '',
      senderAddressAddrLine1: _.has(company, 'senderAddressAddrLine1')? _.startCase(company.senderAddressAddrLine1.toLowerCase()) : '',
      senderAddressAddrLine2: _.has(company, 'senderAddressAddrLine2') ? _.startCase(company.senderAddressAddrLine2.toLowerCase()) : '',
      senderAddressAddrLine3: _.has(company, 'senderAddressAddrLine3') ? _.startCase(company.senderAddressAddrLine3.toLowerCase()) : '',
      senderAddressSuburb: _.has(company, 'senderAddressSuburb') ?  company.senderAddressSuburb : '',
      senderAddressPostCode: _.has(company, 'senderAddressPostCode') ?  company.senderAddressPostCode : '',
      senderAddressState: _.has(company, 'senderAddressState') ?  company.senderAddressState : '',
      returnAddressUseCourier: _.has(company, 'returnAddressUseCourier') ?  company.returnAddressUseCourier : true,
      returnAddressContactPerson: company.returnAddressContactPerson ? _.startCase(company.returnAddressContactPerson.toLowerCase()) : '',
      returnAddressPhone: _.has(company, 'returnAddressPhone') ?  company.returnAddressPhone : '',
      returnAddressEmail: _.has(company, 'returnAddressEmail') ?  company.returnAddressEmail : '',
      returnAddressAddrLine1: _.has(company, 'returnAddressAddrLine1') ? _.startCase(company.returnAddressAddrLine1.toLowerCase()) : '',
      returnAddressAddrLine2: _.has(company, 'returnAddressAddrLine2') ? _.startCase(company.returnAddressAddrLine2.toLowerCase()) : '',
      returnAddressAddrLine3: _.has(company, 'returnAddressAddrLine3') ? _.startCase(company.returnAddressAddrLine3.toLowerCase()) : '',
      returnAddressSuburb: _.has(company, 'returnAddressSuburb') ?  company.returnAddressSuburb : '',
      returnAddressPostCode: _.has(company, 'returnAddressPostCode') ?  company.returnAddressPostCode : '',
      returnAddressState: _.has(company, 'returnAddressState') ?  company.returnAddressState : '',
      parentId: _.has(company, 'parentId') ?  company.parentId : '',
      allowedManifest: _.has(company, 'allowedManifest') ?  company.allowedManifest : false,
      serviceTypes: _.has(company, 'serviceTypes') ?  company.serviceTypes : [],
      notifyOnCreate: _.has(company, 'notifyOnCreate') ?  company.notifyOnCreate : false,
      notifyOnManifest: _.has(company, 'notifyOnManifest') ?  company.notifyOnManifest : false,
      notifyOnDeliveryRoute: _.has(company, 'notifyOnDeliveryRoute') ?  company.notifyOnDeliveryRoute : false,
      notifyOnDelivered: _.has(company, 'notifyOnDelivered') ?  company.notifyOnDelivered : false,
      notifyOnCarded: _.has(company, 'notifyOnCarded') ?  company.notifyOnCarded : false,
      apiKey: _.has(company, 'apiKey') ?  company.apiKey : '',
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
              .required('required field'),
    contactPerson: Yup.string()
                      .required('required field'),
    email: Yup.string()
              .email('must be a valid email')
              .required('required field'),
    addressLine1: Yup.string()
                      .required('required field'),
    suburb: Yup.string()
                .required('required field'),
    postCode: Yup.string()
                  .min(4,'minimun of 4 numeric')
                  .max(4,'maximum of 4 numeric')
                  .matches(/[0-9]/, 'must be valid postCode')
                  .required('required field'),
    state: Yup.string()
              .required('required field'),
    active: Yup.boolean(),
    senderAddressUseCompanyAddr: Yup.boolean(),
    senderAddressContactPerson: Yup.string()
                              .when('senderAddressUseCompanyAddr', {
                                  is: false,
                                  then: Yup.string().required('required field'),
                                  otherwise: Yup.string().ensure(),
                                }),
    senderAddressEmail: Yup.string()
                        .when('senderAddressUseCompanyAddr', {
                          is: false,
                          then: Yup.string().required('required field').email('must be a valid email'),
                          otherwise: Yup.string().ensure(),
                        }),
    senderAddressPhone: Yup.string().ensure(),
    senderAddressAddrLine1: Yup.string()
                            .when('senderAddressUseCompanyAddr', {
                                is: false,
                                then: Yup.string().required('required field'),
                                otherwise: Yup.string().ensure(),
                              }),
    senderAddressAddrLine2: Yup.string().ensure(),
    senderAddressAddrLine3: Yup.string().ensure(),
    senderAddressSuburb: Yup.string()
                            .when('senderAddressUseCompanyAddr', {
                                is: false,
                                then: Yup.string().required('required field'),
                                otherwise: Yup.string().ensure(),
                              }),
    senderAddressPostCode: Yup.string()
                              .when('senderAddressUseCompanyAddr', {
                                  is: false,
                                  then: Yup.string()
                                    .min(4,'minimun of 4 numeric')
                                    .max(4,'maximum of 4 numeric')
                                    .matches(/[0-9]/, 'must be valid postCode')
                                    .required('required field'),
                                  otherwise: Yup.string().ensure(),
                                }),
    senderAddressState: Yup.string()
                            .when('senderAddressUseCompanyAddr', {
                                is: false,
                                then: Yup.string().required('required field'),
                                otherwise: Yup.string().ensure(),
                              }),
    returnAddressUseCourier: Yup.boolean(),
    returnAddressContactPerson: Yup.string()
      .when('returnAddressUseCourier', {
          is: false,
          then: Yup.string().required('required field'),
          otherwise: Yup.string().ensure(),
        }),
    returnAddressPhone: Yup.string().ensure(),
    returnAddressEmail: Yup.string()
      .when('returnAddressUseCourier', {
        is: false,
        then: Yup.string()
          .required('required field')
          .email('must be a valid email'),
        otherwise: Yup.string().ensure(),
      }),
    returnAddressAddrLine1: Yup.string()
      .when('returnAddressUseCourier', {
          is: false,
          then: Yup.string().required('required field'),
          otherwise: Yup.string().ensure(),
        }),
    returnAddressAddrLine2: Yup.string().ensure(),
    returnAddressAddrLine3: Yup.string().ensure(),
    returnAddressSuburb: Yup.string()
      .when('returnAddressUseCourier', {
          is: false,
          then: Yup.string().required('required field'),
          otherwise: Yup.string().ensure(),
        }),
    returnAddressPostCode: Yup.string()
      .when('returnAddressUseCourier', {
          is: false,
          then: Yup.string()
            .min(4,'minimun of 4 numeric')
            .max(4,'maximum of 4 numeric')
            .matches(/[0-9]/, 'must be valid postCode')
            .required('required field'),
          otherwise: Yup.string().ensure(),
        }),
    returnAddressState: Yup.string()
      .when('returnAddressUseCourier', {
          is: false,
          then: Yup.string().required('required field'),
          otherwise: Yup.string().ensure(),
        }),
    parentId: Yup.string().required('required field')
  }),
  handleSubmit: (values, { props, setErrors, setSubmitting }) => {
    props.onSubmit(values)
      .then(() => {
        setSubmitting(false)
        props.onBack()
      })
      .catch((errors) => {
        if (errors) {
          setErrors(transformApiToFormikErrors(error))
        }
        setSubmitting(false)
      })
  },
  validateOnBlur: false,
  validateOnChange: false,
})(CompanyForm)