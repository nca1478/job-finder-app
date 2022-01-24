// Dependencies
import moment from 'moment'

export const parseDataUser = (props) => {
  return {
    ...props.formValues,
    password: props.getValues('password'),
    birthday: moment(props.dateBirthday).format('YYYY-MM-DD'),
    education: props.educationSelect.label,
  }
}
