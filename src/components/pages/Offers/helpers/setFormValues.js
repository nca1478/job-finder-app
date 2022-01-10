// Helpers
import {
  getCountrySelect,
  getStateSelect,
  getCitySelect,
  getSectorsSelect,
  getSkillsSelect,
  getExperienceSelect,
  getContractSelect,
  getPeriodSelect,
  getCurrencySelect,
} from '../../../../helpers/getSelectOption'

export const setFormValues = (response) => {
  return {
    ...response.data,
    country: getCountrySelect(response.data.country),
    state: getStateSelect(response.data.state),
    city: getCitySelect(response.data.city),
    sectors: getSectorsSelect(response.data.sectors),
    skills: getSkillsSelect(response.data.skills),
    experience: getExperienceSelect(response.data.experience),
    contract: getContractSelect(response.data.contract),
    period: getPeriodSelect(response.data.period),
    currency: getCurrencySelect(response.data.currency),
  }
}
