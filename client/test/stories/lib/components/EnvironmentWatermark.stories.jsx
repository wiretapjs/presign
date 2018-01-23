import React from 'react'
import { storiesOf } from '@storybook/react'
import { EnvironmentWatermark } from 'lib/components'

storiesOf('EnvironmentWatermark', module)
  .add('within a non-production environment (e.g. localhost)', () => (
    <EnvironmentWatermark environment={'localhost'} />
  ))
  .add('within the production environment', () => (
    <div>
      <EnvironmentWatermark environment={'production'} />
      <div>This page intentionally left blank.</div>
    </div>
  ))
