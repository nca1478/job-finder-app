// Custom Dependencies
import { currencyOptions } from '../data/selectOptions'

export const getCountrySelect = (value) => {
  return { value: 1, label: value, id: 1 }
}

export const getSectorsSelect = (values) => {
  return values.map((sector, i) => ({
    value: i + 1,
    label: sector.name,
    id: sector.id,
  }))
}

export const getSkillsSelect = (values) => {
  return values.map((skill, i) => ({
    value: i + 1,
    label: skill.name,
    id: skill.id,
  }))
}

export const getCurrencySelect = (value) =>
  currencyOptions.find((item) => item.label === value)
