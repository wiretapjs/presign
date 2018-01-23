import LegacyDestinationBuilder from 'lib/destination/LegacyDestinationBuilder'

export default function (handstampSuffix) {
  return new LegacyDestinationBuilder()
    .withAuthenticatedDestination()
    .withHandstamp(handstampSuffix)
    .withQueryParamModifier((params) => {
      params.uri = 'esign'
      params.dest = 'welcome'
    })
    .build()
}
