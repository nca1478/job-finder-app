// Dependencies
import moment from 'moment'

export const parseDataUser = (data, getValues) => {
  return {
    ...data,
    password: getValues('password'),
    birthday: moment(data.dateBirthday).format('YYYY-MM-DD'),
    education: data.educationSelect.label,
  }
}
