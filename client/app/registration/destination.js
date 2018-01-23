import LegacyDestinationBuilder from 'lib/destination/LegacyDestinationBuilder'

export const getESignRegDestination = function (handstampSuffix) {
  return new LegacyDestinationBuilder()
    .withHandstamp(handstampSuffix)
    .withQueryParamModifier((params) => {
      params.uri = 'eSignReg'
    })
    .build()
}

export const getEsignLoginDestination = function (handstampSuffix) {
  return new LegacyDestinationBuilder()
    .withAuthenticatedDestination()
    .withHandstamp(handstampSuffix)
    .withQueryParamModifier((params) => {
      params.uri = 'esign'
    })
    .build()
}
