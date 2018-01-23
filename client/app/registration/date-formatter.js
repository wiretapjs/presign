// yyyy-mm-dd
// this how a date picker returns the value
const dateRegExWithPicker = new RegExp('^(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$')
// mm/dd/yyyy
const dateRegExFormatNoPicker = new RegExp('^(?:(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4})$')

const formatDateObject = function (date) {
  const actualMonth = date.getMonth() + 1
  const formatedMonth = (actualMonth < 10) ? `0${actualMonth}` : actualMonth
  const actualDate = date.getDate()
  const formatedDate = (actualDate < 10) ? `0${actualDate}` : actualDate
  return `${date.getFullYear()}-${formatedMonth}-${formatedDate}`
}

export const isValidDate = function (dateString) {
  if (!dateString) {
    return false
  }
  const dateRegExWithPickerTest = dateRegExWithPicker.test(dateString)
  const dateRegExFormatNoPickerTest = dateRegExFormatNoPicker.test(dateString)
  return dateRegExWithPickerTest || dateRegExFormatNoPickerTest
}

export const formatDateString = function (dateString) {
  if (dateString.match(dateRegExWithPicker)) {
    return dateString
  }
  const date = new Date(dateString)

  // some browsers don't support an input of a type of "date"
  // in these cases we need to format the date manually
  return formatDateObject(date)
}
