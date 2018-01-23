import React from 'react'
import { storiesOf } from '@storybook/react'
import muiTheme from 'app/muiTheme'
import PasswordInput from 'app/registration/passwordInput/PasswordInput'
import Formsy from 'formsy-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

storiesOf('Password Input', module)
  .addDecorator((story) => {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {story()}
      </MuiThemeProvider>
    )
  })
  .add('default', () => {
    return (
      <Formsy.Form noValidate
        onValid={() => {}}
        onInvalid={() => {}}
        onValidSubmit={() => {}}
      >
        <PasswordInput
          areFieldsDisabled={false}
          isPasswordVisible={false}
          togglePassword={() => {}}
          isPasswordHintVisible={false}
          onFocus={() => {}}
          onBlur={() => {}}
          onEnterPress={() => {}}
          onPasswordChange={() => {}}
          validationRegex={/abc/}
          minLength={3}
        />
      </Formsy.Form>
    )
  })
  .add('with disabled fields', () => {
    return (
      <Formsy.Form noValidate
        onValid={() => {}}
        onInvalid={() => {}}
        onValidSubmit={() => {}}
      >
        <PasswordInput
          areFieldsDisabled
          isPasswordVisible={false}
          togglePassword={() => {}}
          isPasswordHintVisible={false}
          onFocus={() => {}}
          onBlur={() => {}}
          onEnterPress={() => {}}
          onPasswordChange={() => {}}
          validationRegex={/abc/}
          minLength={3}
        />
      </Formsy.Form>
    )
  })
  .add('with a visible password', () => {
    return (
      <Formsy.Form noValidate
        onValid={() => {}}
        onInvalid={() => {}}
        onValidSubmit={() => {}}
      >
        <PasswordInput
          areFieldsDisabled={false}
          isPasswordVisible
          togglePassword={() => {}}
          isPasswordHintVisible={false}
          onFocus={() => {}}
          onBlur={() => {}}
          onEnterPress={() => {}}
          onPasswordChange={() => {}}
          validationRegex={/abc/}
          minLength={3}
        />
      </Formsy.Form>
    )
  })
