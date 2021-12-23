// API Config
import { get, put } from '../../../../config/api'

// Helpers
import {
  getCountrySelect,
  getStateSelect,
  getCitySelect,
  getSectorsSelect,
  getExperienceSelect,
  getContractSelect,
  getPeriodSelect,
  getCurrencySelect,
} from '../../../../helpers/getSelectOption'

export const getOffer = async (offerId, user, reset, toast, setLoaded) => {
  await get(`/offers/${offerId}`, user.data.token)
    .then((response) => {
      reset({
        ...response.data,
        country: getCountrySelect(response.data.country),
        state: getStateSelect(response.data.state),
        city: getCitySelect(response.data.city),
        sectors: getSectorsSelect(response.data.sectors),
        experience: getExperienceSelect(response.data.experience),
        contract: getContractSelect(response.data.contract),
        period: getPeriodSelect(response.data.period),
        currency: getCurrencySelect(response.data.currency),
      })
    })
    .catch((error) => {
      toast.error('Error fetching data.')
      console.log(error)
    })
    .finally(() => {
      setLoaded(true)
    })
}

export const updateOffer = async (offerId, dataOffer, user, toast) =>
  await put(`/offers/${offerId}/update`, dataOffer, user.data.token)
    .then((response) => {
      if (response.data === null) {
        toast.error(response.errors.msg)
      } else {
        toast.info(response.data.msg)
      }
    })
    .catch((error) => {
      toast.error('Error updating job offers. Try again.')
      console.log(error)
    })
