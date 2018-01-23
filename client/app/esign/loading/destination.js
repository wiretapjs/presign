import LegacyDestinationBuilder from 'lib/destination/LegacyDestinationBuilder'

export default function (handstampSuffix) {
  return new LegacyDestinationBuilder()
    .withAuthenticatedDestination()
    .withQueryParamModifier((params) => {
      params.uri = 'esign'
      params.origin = 'eSignReg'
    })
    .withHandstamp(handstampSuffix)
    .build()
}
