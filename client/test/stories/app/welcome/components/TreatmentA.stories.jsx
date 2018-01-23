import React from 'react'
import { storiesOf } from '@storybook/react'
import TreatmentA from 'app/welcome/components/TreatmentA/TreatmentA'

storiesOf('TreatmentA', module)
  .add('default', () => {
    return <TreatmentA />
  })
