import React from 'react'
import { StyledLink } from '../registration.style'
import { getEsignLoginDestination } from '../destination'

export default function () {
  return (
    <div>
      <div>We see you may already have an online account.</div>
      <div>Please <StyledLink id="already-registered-sign-in-link" href={getEsignLoginDestination()}>Sign In</StyledLink> to continue.</div>
    </div>
  )
}
