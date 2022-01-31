// Helpers
import {
  getCountrySelect,
  getSectorsSelect,
  getSkillsSelect,
  getCurrencySelect,
} from '../../../../helpers/getSelectOption'

export const setFormValues = (response) => {
  return {
    ...response.data,
    country: getCountrySelect(response.data.country),
    sectors: getSectorsSelect(response.data.sectors),
    skills: getSkillsSelect(response.data.skills),
    currency: getCurrencySelect(response.data.currency),
  }
}
