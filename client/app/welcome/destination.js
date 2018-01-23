import LegacyDestinationBuilder from 'lib/destination/LegacyDestinationBuilder'

const convertPbUriToUri = function (queryParams) {
  const pbUri = queryParams.pbUri
  delete queryParams.pbUri

  if (!pbUri) return

  queryParams.uri = pbUri
}

export default function (choice) {
  return new LegacyDestinationBuilder()
    .withHandstamp(choice.name)
    .withQueryParamModifier(convertPbUriToUri)
    .build()
}
