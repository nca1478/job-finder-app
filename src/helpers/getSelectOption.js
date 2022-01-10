import {
  cityOptions,
  contractOptions,
  countryOptions,
  currencyOptions,
  experienceOptions,
  periodOptions,
  stateOptions,
} from '../data/selectOptions'

export const getCountrySelect = (value) =>
  countryOptions.find((item) => item.label === value)

export const getStateSelect = (value) =>
  stateOptions.find((item) => item.label === value)

export const getCitySelect = (value) =>
  cityOptions.find((item) => item.label === value)

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

export const getExperienceSelect = (value) =>
  experienceOptions.find((item) => item.label === value)

export const getContractSelect = (value) =>
  contractOptions.find((item) => item.label === value)

export const getPeriodSelect = (value) =>
  periodOptions.find((item) => item.label === value)

export const getCurrencySelect = (value) =>
  currencyOptions.find((item) => item.label === value)
