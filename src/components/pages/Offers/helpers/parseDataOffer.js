export const parseDataOffer = (data) => {
  return {
    ...data,
    country: data.country.label,
    state: data.state.label,
    city: data.city.label,
    experience: data.experience.label,
    contract: data.contract.label,
    period: data.period.label,
    currency: data.currency.label,
    sectors: data.sectors.map((sector) => ({ id: sector.id })),
  }
}
