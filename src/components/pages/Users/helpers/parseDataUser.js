// Dependencies
import moment from 'moment'

export const parseDataUser = (data) => {
  return {
    ...data,
    birthday: moment(data.dateBirthday).format('YYYY-MM-DD'),
    education:
      data.educationSelect === undefined ? null : data.educationSelect.label,
  }
}
