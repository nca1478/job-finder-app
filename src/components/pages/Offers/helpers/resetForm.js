export const resetForm = (reset, setValue) => {
  reset()
  setValue('country', null)
  setValue('state', null)
  setValue('city', null)
  setValue('experience', null)
  setValue('contract', null)
  setValue('period', null)
  setValue('currency', null)
  setValue('sectors', null)
}
