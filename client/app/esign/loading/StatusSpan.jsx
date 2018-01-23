import React from 'react'
import PropTypes from 'prop-types'
import { DangerSpan, WarnSpan, SuccessSpan } from './View.style'

const statuses = {
  inProgress: 'In Progress',
  complete: 'Completed',
  notStarted: 'Not Started',
  processing: 'Processing',
}

const statusTranslations = {
  accepted: statuses.inProgress,
  complete: statuses.complete,
  esigned: statuses.inProgress,
  failed: statuses.processing,
  'in progress': statuses.processing,
  ready: statuses.inProgress,
  sent: statuses.notStarted,
}

const statusSpans = {
  [statuses.inProgress]: WarnSpan,
  [statuses.processing]: WarnSpan,
  [statuses.complete]: SuccessSpan,
  [statuses.notStarted]: DangerSpan,
}

const StatusSpan = function (props) {
  const statusTranslation = statusTranslations[props.ceremony.ceremonyStatus]
  if (!statusTranslation) return null
  const TranslationStatusSpan = statusSpans[statusTranslation]
  return (
    <span>
      &nbsp;-<TranslationStatusSpan>
        &nbsp;{statusTranslation}
      </TranslationStatusSpan>
    </span>
  )
}

StatusSpan.propTypes = {
  ceremony: PropTypes.shape({
    ceremonyStatus: PropTypes.string,
  }),
}

export default StatusSpan
