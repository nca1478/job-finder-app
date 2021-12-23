// Dependencies
import moment from 'moment'

export const parseDataUser = (
  formValues,
  getValues,
  dateBirthday,
  educationSelect
) => {
  return {
    ...formValues,
    password: getValues('password'),
    birthday: moment(dateBirthday).format('YYYY-MM-DD'),
    education: educationSelect.label,
  }
}
