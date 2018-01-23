import React from 'react'
import { storiesOf } from '@storybook/react'
import muiTheme from 'app/muiTheme'
import RegistrationForm from 'app/registration/RegistrationForm'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

storiesOf('Registration Form', module)
  .addDecorator((story) => {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {story()}
      </MuiThemeProvider>
    )
  })
  .add('default', () => {
    return <RegistrationForm
      emailAddress="foo@bar.com"
      areFieldsDisabled={false}
      isButtonDisabled={false}
      displaySsn={false}
      submitLabel="Submit"
      setValid={() => {}}
      setInvalid={() => {}}
      submitFor={() => {}}
      loginDestination="http://www.google.com"
    />
  })
  .add('with a funky email address', () => {
    return <RegistrationForm
      emailAddress="woah@dude.com"
      areFieldsDisabled={false}
      isButtonDisabled={false}
      displaySsn={false}
      submitLabel="Submit"
      setValid={() => {}}
      setInvalid={() => {}}
      submitFor={() => {}}
      loginDestination="http://www.google.com"
    />
  })
  .add('with disabled fields', () => {
    return <RegistrationForm
      emailAddress="foo@bar.com"
      areFieldsDisabled
      isButtonDisabled={false}
      displaySsn={false}
      submitLabel="Submit"
      setValid={() => {}}
      setInvalid={() => {}}
      submitFor={() => {}}
      loginDestination="http://www.google.com"
    />
  })
  .add('with a disabled button', () => {
    return <RegistrationForm
      emailAddress="foo@bar.com"
      areFieldsDisabled={false}
      isButtonDisabled
      displaySsn={false}
      submitLabel="Submit"
      setValid={() => {}}
      setInvalid={() => {}}
      submitFor={() => {}}
      loginDestination="http://www.google.com"
    />
  })
  .add('with SSN displayed', () => {
    return <RegistrationForm
      emailAddress="foo@bar.com"
      areFieldsDisabled={false}
      isButtonDisabled={false}
      displaySsn
      submitLabel="Submit"
      setValid={() => {}}
      setInvalid={() => {}}
      submitFor={() => {}}
      loginDestination="http://www.google.com"
    />
  })
  .add('with a funky submit button label', () => {
    return <RegistrationForm
      emailAddress="foo@bar.com"
      areFieldsDisabled={false}
      isButtonDisabled={false}
      displaySsn={false}
      submitLabel="WOOOOOOAH"
      setValid={() => {}}
      setInvalid={() => {}}
      submitFor={() => {}}
      loginDestination="http://www.google.com"
    />
  })
  .add('with an error code', () => {
    return <RegistrationForm
      emailAddress="foo@bar.com"
      areFieldsDisabled={false}
      isButtonDisabled={false}
      displaySsn={false}
      submitLabel="Submit"
      errorCode="5040"
      setValid={() => {}}
      setInvalid={() => {}}
      submitFor={() => {}}
      loginDestination="http://www.google.com"
    />
  })
