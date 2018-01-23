const CEREMONY_STATUSES = Object.freeze([
  'accepted',
  'complete',
  'esign',
  'esigned',
  'failed',
  'in progress',
  'ready',
  'sent',
])

const docTypes = {
  ESIGN: {
    countField: 'numSignOnlineDocs',
  },
  PRINT_SIGN_MAIL: {
    countField: 'numPrintSignMailDocs',
  },
}

module.exports = {
  CEREMONY_STATUSES,
  docTypes,
}
