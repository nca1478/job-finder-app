export const parseData = (data) => {
  return data.map((item, i) => ({
    id: item.id,
    value: i + 1,
    label: item.name,
  }))
}

export const parseDataCountries = (data) => {
  return data.map((item, i) => ({
    id: item.id,
    value: i + 1,
    label: item.name,
    ciso: item.iso2,
  }))
}

export const parseDataOffer = (data) => {
  return {
    ...data,
    country: data.country.label,
    currency: data.currency.label,
    sectors: data.sectors.map((sector) => ({ id: sector.id })),
    skills: data.skills.map((skill) => ({ id: skill.id })),
  }
}

export const parseDataCurrencies = (data) => {
  return data.map((item, i) => ({
    id: i,
    value: item.id,
    label: `${item.name} (${item.id})`,
  }))
}
